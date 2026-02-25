---
title: Securing OpenClaw Secrets with macOS Keychain
description: How I moved 21 plaintext tokens out of my config file and into the system keychain.
date: 2026-02-07
published: true
tags:
  - openclaw
  - security
  - macos
---

# Securing OpenClaw Secrets with macOS Keychain

*How I moved 21 plaintext tokens out of my config file and into the system keychain.*

---

## The Problem

I run [OpenClaw](https://openclaw.ai) with 13 AI agents, each with their own Discord bot. That's 14 Discord tokens, a Telegram token, API keys for Brave Search, Google Places, Gemini — 21 secrets total. All sitting in `~/.openclaw/openclaw.json` in plaintext.

```json
{
  "channels": {
    "discord": {
      "accounts": {
        "default": {
          "token": "MTQ2NzAyMDMxNDE5NzEwMjc1NQ.GyBpYi.actualtoken..."
        }
      }
    }
  }
}
```

One leaked config file = complete compromise. Not ideal.

## Why Not 1Password?

My first thought was 1Password CLI. It works, but:

1. **Session timeouts** — CLI needs the desktop app unlocked
2. **Theft risk** — If my Mac is stolen unlocked with 1Password open, *everything* is exposed
3. **Daemon-unfriendly** — OpenClaw runs via pm2; can't prompt for auth

I wanted secrets accessible to the running gateway but locked when I'm not around.

## macOS Keychain: The Sweet Spot

macOS Keychain hits the right balance:

- **Locked when Mac is locked** — Secrets inaccessible if stolen while sleeping
- **No extra app required** — Built into the OS
- **Daemon-friendly** — Can allow access without prompts using `-A` flag
- **FileVault protected** — Encrypted at rest

The tradeoff: if someone grabs your Mac while you're logged in, they can access the keychain. But at that point, they can also access your terminal, so you're already compromised.

## The Implementation

### 1. Store Secrets in Keychain

```bash
# Add a secret
security add-generic-password \
  -a "openclaw" \
  -s "discord-token-spark" \
  -w "MTQ2NzAyMDMxNDE5NzEwMjc1NQ.GyBpYi.xxx" \
  -A \
  ~/Library/Keychains/login.keychain-db
```

The `-A` flag allows access without prompting. Use `-T ""` instead if you want Touch ID prompts.

### 2. Create a Startup Script

```bash
#!/bin/bash
# gateway-start.sh

get_secret() {
    security find-generic-password -a "openclaw" -s "$1" -w 2>/dev/null
}

# Load all secrets as env vars
export DISCORD_TOKEN_SPARK=$(get_secret "discord-token-spark")
export DISCORD_TOKEN_GILFOYLE=$(get_secret "discord-token-gilfoyle")
# ... 19 more

# Start gateway in foreground (for pm2)
exec openclaw gateway
```

### 3. Update Config to Use Variables

OpenClaw supports `${VAR_NAME}` substitution:

```json
{
  "channels": {
    "discord": {
      "accounts": {
        "default": {
          "token": "${DISCORD_TOKEN_SPARK}"
        }
      }
    }
  }
}
```

### 4. Point pm2 at the Script

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'openclaw-gateway',
    script: '/Users/me/.openclaw/scripts/gateway-start.sh',
    interpreter: '/bin/bash',
    // ...
  }]
};
```

## The Result

**Before:**
```
~/.openclaw/openclaw.json — 21 plaintext secrets
~/.openclaw/openclaw.json.bak — more plaintext secrets
~/.openclaw/openclaw.json.bak.1 — even more
```

**After:**
```
~/.openclaw/openclaw.json — only ${VAR} references, safe to share
macOS Keychain — 21 secrets, locked when Mac is locked
```

Config file went from a liability to something I could commit to git.

## Gotchas

### pm2 Needs Foreground Mode

`openclaw gateway start` tries to daemonize. pm2 needs `openclaw gateway` (no `start`) to run in foreground.

### Keychain Access Prompts

First run after reboot might prompt for keychain access. Use Keychain Access.app to set "Always Allow" if needed.

### Backup Your Keychain

Secrets are now *only* in the keychain. Make sure your keychain is backed up (Time Machine covers this).

## Commands Reference

```bash
# View a secret
security find-generic-password -a openclaw -s discord-token-spark -w

# Update a secret
security delete-generic-password -a openclaw -s discord-token-spark
security add-generic-password -a openclaw -s discord-token-spark \
  -w "NEW_TOKEN" -A ~/Library/Keychains/login.keychain-db

# List all openclaw secrets
security dump-keychain ~/Library/Keychains/login.keychain-db 2>/dev/null | \
  grep -A3 "openclaw"
```

## Was It Worth It?

Absolutely. 30 minutes of work for:

- Config file I can share without redacting
- Secrets locked when I step away
- No dependency on 1Password being open
- Clean separation of config vs. credentials

The remaining security gaps (agent isolation, tool policies) need upstream OpenClaw features. But secrets management? Solved.

---

*Written while my 13 AI agents watched silently from their Discord channels, tokens safely tucked away in the keychain.*
