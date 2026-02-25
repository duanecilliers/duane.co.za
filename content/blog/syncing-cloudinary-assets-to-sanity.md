---
title: Syncing Cloudinary Asset Data Back to Sanity
description: Your Cloudinary assets in Sanity are snapshots. They go stale. Here's how to build a daily sync pipeline that diffs and patches only what changed.
date: 2026-02-25
published: true
tags:
  - sanity
  - cloudinary
  - typescript
---

If you use the [Sanity Cloudinary plugin](https://www.sanity.io/plugins/sanity-plugin-cloudinary), every time an editor selects an asset, Sanity stores a **snapshot** of that asset's data inline in the document. Tags, metadata, display name, dimensions, URL — it's all captured at selection time and never updated.

That means when someone updates tags in Cloudinary, adds structured metadata, or renames an asset, every Sanity document referencing it still has the old data. At scale — thousands of assets across thousands of documents — this divergence becomes a real problem. Your frontend renders stale metadata, search filters use outdated tags, and editors lose trust in the system.

You could ask editors to re-select every asset after changes. That doesn't scale.

## The Solution: A Daily Diff-and-Patch Pipeline

The approach is deliberately simple: a daily full scan that only writes changes.

1. **Build an index** — scan all Sanity documents to find which ones contain Cloudinary assets and where
2. **Fetch fresh data** — batch-query the Cloudinary search API for current asset state
3. **Diff** — compare each snapshot against fresh data across multiple fields
4. **Patch** — fetch live documents from Sanity, replace changed assets in-place, commit via transactions

At ~12,000 assets this completes in under 3 minutes using ~120 API calls. The diff step means only documents with actual changes get written, so the daily cost is negligible.

### Why Not Webhooks?

I built an incremental sync with Cloudinary webhooks and a Redis changelog first. It added webhook signature verification, a Redis dependency, cursor management, and changelog deduplication — significant complexity. Since the bulk diff already ensures only changed documents are patched, the daily workload is identical. The simpler approach won.

Keep the webhook version in your back pocket for when you're past 100k assets and the full scan takes too long.

## Architecture

```
Entry Points (inject dependencies here)
├── Vercel cron route      → runs daily at 00:30 UTC
└── CLI script             → manual runs with --dry-run

Shared Sync Library (framework-agnostic)
├── asset-index.ts         → build Map<publicId, AssetLocation[]>
├── cloudinary-fetcher.ts  → batch-fetch from Cloudinary search API
├── asset-differ.ts        → multi-field diff with normalization
├── sanity-patcher.ts      → fetch live docs, walk/replace, commit
└── find-assets.ts         → recursive walker + selective merge
```

The sync logic is a pure library with dependency-injected interfaces for the Cloudinary SDK, Sanity client, and logger. Both the cron route and CLI consume the same code.

## Step 1: Define the DI Interfaces

External dependencies are injected so the sync logic stays testable and portable:

```typescript
// Cloudinary search — abstracts away the SDK
type CloudinarySearchFn = (
  expression: string,
  maxResults: number,
  nextCursor?: string
) => Promise<{
  resources: Record<string, unknown>[];
  next_cursor?: string;
}>;

// Sanity mutations — abstracts away the client
interface SanityMutationClient {
  fetch<T>(query: string, params: Record<string, unknown>): Promise<T>;
  transaction(): {
    createOrReplace(doc: { _id: string; _type: string }): unknown;
    commit(): Promise<unknown>;
  };
}

// Logger — each consumer provides their own
interface Logger {
  log(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
  progress(message: string): void;
  retry(operation: string, attempt: number, maxRetries: number, error?: string): void;
}
```

The cron route injects the real Cloudinary SDK and Sanity server client. Tests inject mocks.

## Step 2: Build the Asset Index

Scan every Sanity document to find embedded `cloudinary.asset` objects. The index maps each `public_id` to the documents that contain it and the field paths where it appears.

Two modes: stream from Sanity's NDJSON export API, or read a local NDJSON backup file (faster for testing/dry runs).

```typescript
interface AssetLocation {
  documentId: string;
  documentType: string;
  fieldPaths: string[];            // e.g., ["mainImage", "content[3].image"]
  snapshotVersion?: number;        // for quick version check
  snapshotData?: Record<string, unknown>;  // for field-level diffing
  resourceType?: string;           // needed for Cloudinary search grouping
}

type AssetIndex = Map<string, AssetLocation[]>;
```

The key optimization: pre-filter each NDJSON line with a string check before parsing JSON:

```typescript
// Fast string pre-filter — skip JSON.parse for lines that can't contain assets
if (!line.includes('"cloudinary.asset"')) continue;
```

The recursive walker finds assets at any nesting depth — top-level image fields, arrays of images inside Portable Text blocks, nested objects:

```typescript
function findCloudinaryAssets(
  obj: unknown,
  path: string,
  results: Array<{ path: string; asset: Record<string, unknown> }>
): void {
  if (obj === null || obj === undefined) return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      findCloudinaryAssets(obj[i], `${path}[${i}]`, results);
    }
    return;
  }

  if (typeof obj === "object") {
    const record = obj as Record<string, unknown>;
    if (record._type === "cloudinary.asset" && record.public_id) {
      results.push({ path, asset: record });
    }
    for (const key of Object.keys(record)) {
      if (key.startsWith("_") && key !== "_type") continue;
      findCloudinaryAssets(record[key], `${path}.${key}`, results);
    }
  }
}
```

## Step 3: Fetch Fresh Data from Cloudinary

Batch-query the Cloudinary search API, grouped by `resource_type` (required by the API). Each batch searches up to 100 public IDs with pagination support and exponential backoff on failures.

```typescript
// Group by resource_type, then batch in groups of 100
const expression = `resource_type:${type} AND public_id:(${quotedIds.join(" OR ")})`;
```

Rate limiting: 200ms between batches keeps you well under Cloudinary's 500 calls/hour limit.

## Step 4: Diff Snapshots Against Fresh Data

This is where the real value is. Don't just check `version` — compare 9 fields to catch tag, metadata, and display name changes that don't bump the version number:

```typescript
const COMPARABLE_FIELDS = [
  "version", "tags", "metadata", "display_name",
  "secure_url", "width", "height", "bytes", "format",
] as const;
```

### Empty-value normalization

Cloudinary's search API returns `{}` or `[]` for fields that may be `undefined` in your Sanity snapshot. Without normalization, every asset looks "changed":

```typescript
function isEmpty(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v as object).length === 0;
  return false;
}

function fieldsMatch(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (isEmpty(a) && isEmpty(b)) return true;
  if (a == null || b == null) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}
```

### Absent-field skipping

Fields the snapshot never captured are skipped — absence is not a change. Only fields that were previously stored and have since diverged trigger a diff:

```typescript
for (const field of COMPARABLE_FIELDS) {
  if (!(field in snapshotData)) continue;  // never captured, skip
  if (!fieldsMatch(snapshotData[field], freshData[field])) {
    changed.push(field);
  }
}
```

### Exclude `context`

Cloudinary's `context` field (alt text, captions) is editor-managed in Sanity. The search API often returns no context for assets where editors have set alt text via the CMS plugin. Syncing it would **delete** that content. Exclude it from both the diff and the merge.

## Step 5: Selective Field Merge

Don't spread the entire Cloudinary API response into your document. The search API returns extra fields (`image_metadata`, `image_analysis`, `colors`, `quality_analysis`) that would bloat documents past Sanity's 4,000 attribute limit.

Only merge known fields. Preserve everything else from the existing snapshot:

```typescript
const SYNC_FIELDS = [
  "version", "tags", "metadata", "display_name",
  "secure_url", "url", "width", "height", "bytes",
  "format", "resource_type", "type", "created_at",
  "access_mode", "access_control", "duration",
] as const;

function mergeAsset(
  existing: Record<string, unknown>,
  fresh: Record<string, unknown>
): Record<string, unknown> {
  const merged = { ...existing };
  for (const field of SYNC_FIELDS) {
    if (field in fresh) {
      merged[field] = fresh[field];
    }
  }
  // Sanity-internal fields are always preserved via the spread
  return merged;
}
```

## Step 6: Patch Documents

Fetch **live** documents from Sanity before patching — not the stale export data. This avoids race conditions where a document was edited between the index build and the patch:

```typescript
// 1. Collect unique document IDs from all patches
const docIds = collectDocumentIds(patches);

// 2. Fetch latest versions from Sanity
const documents = await client.fetch('*[_id in $ids]', { ids: docIds });

// 3. Walk each document and replace matching assets in-place
for (const doc of documents) {
  const changed = replaceCloudinaryAssets(doc, replacementMap);
  if (changed) docsToCommit.push(doc);
}

// 4. Commit via Sanity transaction (batches of 10, 500ms between)
const transaction = client.transaction();
for (const doc of docsToCommit) {
  transaction.createOrReplace(doc);
}
await transaction.commit();
```

The `replaceCloudinaryAssets` function walks the document tree recursively and calls `mergeAsset` on every matching `cloudinary.asset` object, same as the initial walker but performing replacements in-place.

## Running It

### As a Vercel Cron Job

```typescript
// vercel.json
{ "crons": [{ "path": "/api/sync-cloudinary-assets", "schedule": "30 0 * * *" }] }
```

The route handler authenticates via `CRON_SECRET`, runs the pipeline, and sends a Slack summary:

```
Assets processed: 11,685
Changed: 42 | Unchanged: 11,620 | Missing: 23
Documents patched: 38 | Failed: 0
Duration: 147s
```

### As a CLI Script

For manual runs, dry runs, and debugging:

```bash
# Preview what would change (no writes)
node sync-cloudinary-assets.ts \
  --ndjson ./backup/data.ndjson \
  --dry-run \
  --diff-output changes.ndjson

# Inspect the diff report
cat changes.ndjson | jq -r '.changed_fields[]' | sort | uniq -c | sort -rn
#  370 metadata
#  267 tags
#   20 display_name
#    6 version
```

## Gotchas

**Sanity drafts vs published**: Both `_id: "article-123"` and `_id: "drafts.article-123"` are separate documents in Sanity. Your index needs to track both — they can have different snapshot states.

**Cloudinary search API field extras**: The search API returns more fields than what you stored. If you naively spread the response, you'll add `image_metadata`, `image_analysis`, and other large objects to every document. Use the selective merge.

**Transaction size**: Sanity transactions have a payload limit. Batch 10 documents per transaction. If a document is unusually large (lots of embedded assets), you may need to lower this.

**Missing assets**: Some assets referenced in Sanity may have been deleted from Cloudinary. Log these but don't fail the sync — they need manual attention.

## Summary

| Component | Purpose |
|-----------|---------|
| Asset index | Maps `public_id` to documents + field paths |
| Cloudinary fetcher | Batch search with rate limiting and retry |
| Multi-field differ | Compares 9 fields with empty-value normalization |
| Selective merge | Updates only known fields, preserves document structure |
| Live-fetch patcher | Avoids stale-on-import race conditions |
| DI interfaces | Same logic for cron routes, CLI tools, and tests |

The result: Cloudinary asset data in Sanity stays in sync automatically. Editors update tags and metadata in Cloudinary, and the next daily sync propagates those changes to every document that references the asset. No manual re-selection, no stale data.
