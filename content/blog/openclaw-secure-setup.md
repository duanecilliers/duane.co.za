---
title: "Securing Your OpenClaw Setup: Git Backups Without Leaking Secrets"
description: How I set up automatic secret redaction for git commits and a seamless restore workflow using macOS Keychain and 1Password.
date: 2026-02-18
published: true
tags:
  - openclaw
  - security
  - devops
---

# Securing Your OpenClaw Setup: Git Backups Without Leaking Secrets

I run [OpenClaw](https://openclaw.ai) with 14 Discord bots, a Telegram bot, and various API integrations. That's a lot of tokens floating around in config files and session transcripts. I wanted to back up my entire `~/.openclaw` directory to GitHub—but obviously couldn't push raw API keys to a repo, even a private one.

Here's how I set up automatic secret redaction for git commits and a seamless restore workflow using macOS Keychain and 1Password.

## The Problem

OpenClaw stores everything in `~/.openclaw`:
- `openclaw.json` — main config with bot tokens, API keys
- `agents/*/sessions/*.jsonl` — conversation history (which often contains tokens when discussing setup)
- Agent workspaces, skills, scripts

I want all of this version-controlled and backed up. But a single `git push` with raw tokens is a security nightmare.

## Solution: Git Clean Filters

Git has a feature called [clean/smudge filters](https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes). A **clean filter** transforms content when you stage files. A **smudge filter** transforms content when you checkout.

I use a clean filter to redact secrets on commit, while keeping working files intact.

### The Redaction Script

```bash
#!/bin/bash
# ~/.openclaw/scripts/redact-secrets.sh
# Redacts secrets when staging files for commit

sed -E \
  -e 's/MTQ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{3,}/REDACTED_DISCORD_TOKEN/g' \
  -e 's/[0-9]{9,10}:AA[A-Za-z0-9_-]{33,}/REDACTED_TELEGRAM_TOKEN/g' \
  -e 's/AIzaSy[A-Za-z0-9_-]{33}/REDACTED_GOOGLE_API_KEY/g' \
  -e 's/sk-ant-[A-Za-z0-9_-]{50,}/REDACTED_ANTHROPIC_KEY/g' \
  -e 's/ghp_[A-Za-z0-9]{30,}/REDACTED_GITHUB_TOKEN/g' \
  -e 's/sk-[A-Za-z0-9]{40,}/REDACTED_OPENAI_KEY/g' \
  -e 's/xox[baprs]-[A-Za-z0-9-]{10,}/REDACTED_SLACK_TOKEN/g'
```

### Git Configuration

```bash
# Set up the filter
git config filter.redact-secrets.clean "$HOME/.openclaw/scripts/redact-secrets.sh"
git config filter.redact-secrets.smudge cat  # No transformation on checkout
```

### .gitattributes

```
# Apply filter to sensitive files
*.jsonl filter=redact-secrets
openclaw.json filter=redact-secrets
```

Now when I run `git add`, the filter automatically replaces tokens with `REDACTED_*` placeholders. The committed content is safe. My working files stay intact.

## Environment Variables

Instead of hardcoding tokens in `openclaw.json`, I use environment variable references:

```json
{
  "discord": {
    "accounts": {
      "default": {
        "token": "${DISCORD_TOKEN_SPARK}"
      },
      "gilfoyle": {
        "token": "${DISCORD_TOKEN_GILFOYLE}"
      }
    }
  }
}
```

OpenClaw resolves `${VAR_NAME}` at runtime. The config file is safe to commit.

## Keychain-Based Secret Storage

Environment variables need to come from somewhere persistent. I use macOS Keychain:

### Storing Secrets

```bash
#!/bin/bash
# store-secrets.sh — run once to populate Keychain

store() {
    security add-generic-password -a "$USER" -s "openclaw.$1" -w "$2" -U
}

store "discord.spark" "MTQ2NzAy..."
store "discord.gilfoyle" "MTQ2NzA0..."
store "telegram.bot" "8207756544:AAHY..."
# ... etc
```

### Loading Secrets

```bash
#!/bin/bash
# load-secrets.sh — add to ~/.zshrc

get() {
    security find-generic-password -a "$USER" -s "openclaw.$1" -w 2>/dev/null
}

export DISCORD_TOKEN_SPARK=$(get "discord.spark")
export DISCORD_TOKEN_GILFOYLE=$(get "discord.gilfoyle")
export TELEGRAM_BOT_TOKEN=$(get "telegram.bot")
# ... etc
```

Add to your shell profile:
```bash
echo 'source ~/.openclaw/scripts/load-secrets.sh' >> ~/.zshrc
```

Now secrets are encrypted in Keychain, loaded into env vars on shell startup, and picked up by OpenClaw.

## 1Password Backup

The Keychain store script contains all your raw tokens. Save it to 1Password:

1. Generate the script with current tokens:
   ```bash
   ~/.openclaw/scripts/export-secrets-for-1password.sh
   ```

2. Copy to clipboard:
   ```bash
   cat /tmp/openclaw-store-secrets.sh | pbcopy
   ```

3. Create a **Secure Note** in 1Password named **OpenClaw Secrets**

4. Delete the temp file:
   ```bash
   rm /tmp/openclaw-store-secrets.sh
   ```

## Restoring on a New Machine

```bash
# 1. Clone backup
git clone https://github.com/username/openclaw-workspace.git ~/.openclaw

# 2. Get secrets from 1Password ("OpenClaw Secrets")
#    Copy content, then:
pbpaste > /tmp/secrets.sh && bash /tmp/secrets.sh && rm /tmp/secrets.sh

# 3. Add to shell
echo 'source ~/.openclaw/scripts/load-secrets.sh' >> ~/.zshrc
source ~/.zshrc

# 4. Start OpenClaw
openclaw gateway start
```

## Daily Backups

I have a cron job that runs at 2am:

```bash
# In crontab
0 2 * * * ~/.openclaw/scripts/daily-backup.sh
```

The backup script stages all changes (triggering the redaction filter), commits, and pushes. Fully automated, fully safe.

## Summary

| Layer | Purpose |
|-------|---------|
| Git clean filter | Redacts secrets on commit |
| Env var syntax | Keeps config files token-free |
| macOS Keychain | Encrypted local secret storage |
| 1Password | Backup of secrets for disaster recovery |
| Daily cron | Automated backups |

The result: my entire OpenClaw setup is version-controlled and backed up to GitHub, with zero risk of token exposure. Restoring on a new machine takes about 2 minutes.

---

*Running OpenClaw with multiple agents? This setup scales to any number of bots and API keys. The patterns work for any project with sensitive config.*
