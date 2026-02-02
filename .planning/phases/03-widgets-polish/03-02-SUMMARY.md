# 03-02: Spotify + GitHub Widgets

## Completed

### Spotify Now Playing
- **`src/lib/spotify.ts`** — Token refresh via client_id:client_secret base64, getNowPlaying + getRecentlyPlayed
- **`src/app/api/spotify/route.ts`** — GET handler with fallback chain (now playing → recently played → empty), Cache-Control headers, graceful handling when env vars missing
- **`src/components/widgets/spotify.tsx`** — Client component with 30s polling, album art, track/artist display, animated equaliser bars (3 CSS keyframe bars), skeleton loading state, hides when unconfigured

### GitHub Activity
- **`src/lib/github.ts`** — Fetches public events, parses PushEvents for commits, optional GITHUB_TOKEN for rate limits
- **`src/app/api/github/route.ts`** — GET handler with 5-minute cache, graceful error handling
- **`src/components/widgets/github.tsx`** — Client component with repo name (monospace cyan), truncated commit messages, relative time ("2h ago"), links to commits

### Integration
- Both widgets added to hero section bottom in a flex row (stacks vertically on mobile)
- Subtle design — doesn't compete with hero content
- Equaliser bar animations added to globals.css

### Env vars needed (optional — widgets gracefully hide without them):
- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
- `GITHUB_TOKEN` (optional, for rate limits)

## Commits
- `feat(03-02): spotify now playing widget with API route`
- `feat(03-02): github activity widget with API route`
- `feat(03-02): integrate widgets into page layout`
