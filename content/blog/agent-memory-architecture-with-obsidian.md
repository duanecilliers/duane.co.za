---
title: Building Collective Memory for AI Agents with Obsidian
description: How I built a memory architecture that gives 14 AI agents continuity across sessions and lets them learn from each other using plain markdown files.
date: 2026-02-25
published: true
tags:
  - ai
  - openclaw
  - obsidian
---

I run 14 AI agents in a private Discord server. Each has a distinct persona—Gilfoyle handles code, Holmes does research, Draper runs marketing. They operate independently in their own channels, but they share context through a common brain: an Obsidian vault.

Here's how I built a memory architecture that gives AI agents continuity across sessions and lets them learn from each other.

## The Problem: Stateless Agents

LLMs have no memory between sessions. Every conversation starts fresh. That's fine for one-off questions, but if you're building AI teammates that work on long-running projects, you need persistence.

I wanted:
- **Individual memory** — each agent remembers its own work
- **Shared knowledge** — agents can access common context (user preferences, project details, research)
- **Daily accountability** — a log of what each agent actually did
- **Zero maintenance** — it should just work without manual intervention

## The Architecture

```
~/.openclaw/agents/
├── spark/workspace/           # Coordinator agent
│   ├── SOUL.md               # Personality & rules
│   ├── MEMORY.md             # Long-term memory
│   └── memory/               # Daily logs
│       ├── 2026-02-24.md
│       └── 2026-02-25.md
├── gilfoyle/workspace/        # Coding agent
│   ├── SOUL.md
│   ├── MEMORY.md
│   └── memory/
├── holmes/workspace/          # Research agent
│   └── ...
└── ... (14 agents total)

~/brain/                       # Shared Obsidian vault
├── agents/
│   └── daily/                # Compiled summaries
│       ├── 2026-02-24.md
│       └── 2026-02-25.md
├── projects/                 # Shared project context
├── research/                 # Research findings
└── Todos.md                  # Shared task list
```

Each agent has its own workspace with private memory. The shared `~/brain/` vault is accessible to all agents for cross-pollination.

## Individual Agent Memory

### SOUL.md — Who They Are

Every agent has a `SOUL.md` that defines their personality and capabilities:

```markdown
# SOUL.md — Gilfoyle

You are Bertram Gilfoyle — senior systems architect...
You speak in a flat, deadpan monotone. Your insults are surgical...

## Daily Logging

Log significant activity to `memory/YYYY-MM-DD.md` in your workspace.
Include:
- Tasks completed
- Key decisions or insights
- Issues encountered

This feeds into the nightly agent summary compiled by Spark.
```

The daily logging instruction is key. It tells the agent to persist its work.

### MEMORY.md — Long-Term Context

`MEMORY.md` holds durable facts that persist across sessions:

```markdown
# MEMORY.md — Gilfoyle

## Current Projects
- TubeMind: Phase 8 complete, Phase 9 in progress
- OpenClaw Admin: All 6 phases shipped

## Key Decisions
- Use Claude Code for all coding execution (2026-01-30)
- Sonnet for sub-agents, Opus for main session

## Technical Context
- GSD methodology for spec-driven development
- Project directory: ~/projects/
```

Agents read this at session start for continuity.

### memory/YYYY-MM-DD.md — Daily Logs

Each day, agents write to a dated file:

```markdown
# 2026-02-25 — Gilfoyle

## Tasks Completed
- Fixed authentication bug in TubeMind API
- Deployed Phase 8 to staging

## Decisions
- Switched from REST to SSE for streaming responses

## Issues
- Rate limit hit on Claude API around 3am, scheduled retry
```

These daily logs are ephemeral context—what happened today. They feed into the nightly summary.

## The Shared Brain: Obsidian

The `~/brain/` directory is an Obsidian vault that all agents can read and write:

```bash
~/brain/
├── agents/daily/          # Compiled agent summaries
├── projects/              # Project documentation
├── research/              # Research findings from Holmes
├── Queue.md               # Shared task queue
└── Todos.md               # Master todo list
```

Why Obsidian?
- **Plain markdown** — agents can read/write with basic file tools
- **Bidirectional links** — `[[Project Name]]` creates navigable connections
- **Graph view** — visualize relationships between notes
- **Local-first** — no cloud dependency, full control
- **Human-readable** — I can browse and edit alongside the agents

## Nightly Summary Cron

A cron job runs at 9pm daily to compile agent activity:

```javascript
// Pseudo-code for the summary job
const agents = ['spark', 'gilfoyle', 'holmes', 'draper', ...];
const today = new Date().toISOString().split('T')[0];

let summary = `# Daily Agent Summary — ${today}\n\n`;

for (const agent of agents) {
  const logPath = `~/.openclaw/agents/${agent}/workspace/memory/${today}.md`;
  if (fileExists(logPath)) {
    const content = readFile(logPath);
    summary += `## ${emoji[agent]} ${capitalize(agent)}\n`;
    summary += summarize(content) + '\n\n';
  }
}

writeFile(`~/brain/agents/daily/${today}.md`, summary);
notify('#logs', 'Daily summary compiled');
```

The actual implementation uses OpenClaw's cron system with an isolated agent session that reads each workspace and compiles the summary.

Result:

```markdown
# Daily Agent Summary — 2026-02-25

## 🦊 Spark
- Set up daily summary cron job
- Updated MEMORY.md with new infrastructure

## 💻 Gilfoyle
- Shipped TubeMind Phase 8 (Web UI)
- Fixed SSE streaming bug

## 🔍 Holmes
- Researched competitor pricing models
- Added findings to ~/brain/research/pricing-analysis.md
```

One file per day, all agent activity in one place, saved to Obsidian for permanence.

## Cross-Agent Knowledge Sharing

The shared vault enables interesting patterns:

### Research → Action

Holmes researches a topic and saves findings:
```markdown
# ~/brain/research/oauth-patterns.md

## Findings
- OAuth 2.1 drops implicit flow
- PKCE required for public clients
- Token rotation best practice...

[[TubeMind]] should implement PKCE for the web client.
```

Gilfoyle picks this up when working on TubeMind authentication.

### Queued Work

A shared queue lets agents hand off tasks:
```markdown
# ~/brain/projects/Queue.md

## Ready for Gilfoyle
- [ ] Implement PKCE auth (see [[oauth-patterns]])
- [ ] Add rate limiting to API

## Ready for Holmes
- [ ] Research vector DB options for embeddings
```

### User Preferences

All agents read shared context about the user:
```markdown
# ~/brain/User.md

## Communication
- Be direct, no fluff
- Primary email: hello@example.com

## Work Context
- Freelancer with multiple clients
- Building a side project
```

Every agent knows how to communicate and what projects matter.

## Implementation Details

### Agent Configuration

Each agent is defined in `openclaw.json`:

```json
{
  "agents": {
    "gilfoyle": {
      "model": "anthropic/claude-sonnet-4",
      "workspace": "~/.openclaw/agents/gilfoyle/workspace"
    }
  }
}
```

The workspace path is injected into the agent's context.

### Memory Injection

OpenClaw automatically injects workspace files into the system prompt:
- `SOUL.md` — always loaded
- `MEMORY.md` — always loaded
- `TOOLS.md` — tool-specific notes

Daily memory files (`memory/*.md`) are accessed on-demand when the agent needs historical context.

### Obsidian Sync

The vault syncs via git:

```bash
# Daily backup cron (2am)
cd ~/brain
git add -A
git commit -m "Daily sync $(date +%Y-%m-%d)"
git push
```

Combined with the OpenClaw workspace backup, everything is version-controlled.

## Results

After running this for a few weeks:

1. **Continuity** — Agents pick up where they left off. "Continue the TubeMind work" just works because context persists.

2. **Accountability** — I can see exactly what each agent did on any day. No more wondering "did that task actually happen?"

3. **Knowledge accumulation** — Research builds up over time. Holmes's findings from last week inform Gilfoyle's work today.

4. **Reduced repetition** — I don't re-explain my preferences or project context. It's in the shared brain.

5. **Human-AI collaboration** — I edit the same Obsidian vault. My notes and agent notes coexist. Graph view shows connections I didn't plan.

## Lessons Learned

**Start with SOUL.md** — Define the agent's personality and rules first. Without clear identity, agents drift.

**Explicit logging instructions** — Agents won't log unless told to. The "Daily Logging" section in SOUL.md is essential.

**Dated files > append logs** — `memory/2026-02-25.md` is easier to manage than appending to one giant file. Clean archival, easy grep.

**Shared vault needs structure** — Without folders and conventions, the shared brain becomes a junk drawer. Define paths upfront.

**Cron for consistency** — Automated nightly summaries catch activity you'd otherwise miss. Set it and forget it.

## What's Next

- **Semantic search** — Using embeddings to let agents query the vault naturally ("what did we decide about auth?")
- **Cross-agent messaging** — Agents directly notifying each other when relevant work completes
- **Memory compaction** — Auto-summarizing old daily logs to keep context windows manageable

## Bootstrap Prompt

Want to set up this system for your own OpenClaw agents? Copy this prompt and send it to your main agent:

```
Set up a shared memory architecture for my OpenClaw agents:

1. **Create shared Obsidian vault structure:**
   - ~/brain/agents/daily/ — for compiled daily summaries
   - ~/brain/projects/ — shared project context
   - ~/brain/research/ — research findings
   - ~/brain/Todos.md — shared task list

2. **For each agent workspace (~/.openclaw/agents/*/workspace/):**
   - Create memory/ directory if it doesn't exist
   - Add "Daily Logging" section to SOUL.md with instructions to log significant activity to memory/YYYY-MM-DD.md

3. **Set up a nightly summary cron job:**
   - Schedule: 9pm daily (adjust timezone)
   - Task: Read each agent's memory/YYYY-MM-DD.md, compile into ~/brain/agents/daily/YYYY-MM-DD.md
   - Skip agents with no activity
   - Notify a channel when complete

4. **Daily logging instructions to add to each SOUL.md:**

---

## Daily Logging

Log significant activity to `memory/YYYY-MM-DD.md` in your workspace. Include:
- Tasks completed
- Key decisions or insights  
- Issues encountered
- Anything noteworthy

This feeds into the nightly agent summary.

---

Show me the agents you find and confirm when setup is complete.
```

The agent will scan your existing agents, create the directory structure, update SOUL files, and set up the cron job. You can customize the shared vault location and summary schedule to fit your workflow.
