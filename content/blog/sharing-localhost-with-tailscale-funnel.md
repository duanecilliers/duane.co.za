# Sharing Localhost with Tailscale Funnel

> Expose local dev servers with secure, public HTTPS URLs — no ngrok, no port forwarding.

## The Problem

You're running a dev server locally and need to:
- Show a client a quick preview
- Test on your phone
- Share with a teammate

Traditional options suck: ngrok tokens, Cloudflare tunnel configs, or punching holes in your router.

## The Solution: Tailscale Funnel

Tailscale Funnel gives you a public HTTPS URL that proxies to your local port. One command.

---

## Setup (macOS)

### 1. Install the Mac App

Download from [tailscale.com](https://tailscale.com/download/mac) or the App Store.

⚠️ **Use ONLY the Mac app** — don't also install via Homebrew. They use different sockets and won't talk to each other.

### 2. Open and Sign In

```bash
open -a Tailscale
```

Click the menu bar icon → **Log in**. Authenticate with Google/GitHub/etc.

### 3. Set Up the CLI Alias

The Mac app bundles its own CLI, but it's buried at `/Applications/Tailscale.app/Contents/MacOS/Tailscale`. Add an alias to your shell config:

```bash
# Add to your aliases file (adjust path to your setup)
echo 'alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"' >> ~/.config/zsh/.aliases
source ~/.config/zsh/.aliases
```

Without this alias, you'd need the full path every time:
```bash
/Applications/Tailscale.app/Contents/MacOS/Tailscale funnel 3000
```

### 4. Authenticate the CLI

Even with the app signed in, the CLI may need separate auth:

```bash
tailscale up
```

Opens browser to sign in. After this, both app and CLI are connected.

### 5. Verify Connection

```bash
tailscale status
```

Should show your machine with a `100.x.x.x` IP:
```
100.x.x.x  your-machine-name  you@domain.com  macOS  -
```

### 6. Enable MagicDNS (Admin Console)

1. Go to [login.tailscale.com/admin/dns](https://login.tailscale.com/admin/dns)
2. Enable **MagicDNS** if not already on
3. Funnel should auto-enable under Access Controls

---

## Usage

### Expose a Port

```bash
# Start your dev server (must bind to 0.0.0.0!)
next dev -H 0.0.0.0 -p 3000

# In another terminal, expose it
tailscale funnel 3000
```

You'll get a URL like:
```
https://your-machine-name.tailnet-xxxx.ts.net/
```

Send that to anyone. Works from anywhere.

### Stop Funnel

```bash
tailscale funnel off
```

### Check Status

```bash
tailscale serve status
```

---

## Important: Bind to 0.0.0.0

Dev servers default to `127.0.0.1`, which rejects non-localhost connections. You must bind to all interfaces:

```bash
# Next.js
next dev -H 0.0.0.0

# Vite
vite --host 0.0.0.0

# Generic npm scripts
pnpm dev --host 0.0.0.0
```

---

## Multiple Apps

### Port-Based (Recommended)

```bash
tailscale serve --https=443 http://localhost:3000
tailscale serve --https=8443 http://localhost:3001

tailscale funnel 443 on
tailscale funnel 8443 on
```

URLs:
- `https://your-machine.tailnet.ts.net/`
- `https://your-machine.tailnet.ts.net:8443/`

### Path-Based

```bash
tailscale serve --set-path=/app1 http://localhost:3000
tailscale serve --set-path=/app2 http://localhost:3001
tailscale funnel 443 on
```

Note: Path-based can break apps that assume they're at root.

---

## Troubleshooting

### "failed to connect to local Tailscale service"

The CLI can't reach the daemon. Causes:

1. **Tailscale app not running:**
   ```bash
   open -a Tailscale
   ```

2. **Using wrong CLI** — If you previously installed via Homebrew, that CLI won't work with the Mac app. Remove it:
   ```bash
   brew uninstall tailscale
   brew services stop tailscale
   ```
   Then use the Mac app's bundled CLI (via alias or full path).

### "logged out"

The CLI needs authentication even if the app is signed in:
```bash
tailscale up
```

Opens browser to sign in.

### Funnel returns nothing / connection refused

- Check something's actually running on that port: `lsof -i :3000`
- Ensure it's bound to `0.0.0.0`, not `127.0.0.1`

### App hanging on login

Force quit and retry:
```bash
pkill -9 Tailscale
open -a Tailscale
```

---

## Performance Notes

Funnel routes through Tailscale's DERP relay servers. Expect some latency compared to localhost.

- Nearest DERP relay: ~30-50ms baseline typical
- Real-world page loads: noticeably slower than local, but usable for demos
- For local-network-only testing, use `tailscale serve 3000` instead (Tailnet only, faster)

Check your nearest relay:
```bash
tailscale netcheck
```

If experiencing extreme slowness (30s+), debug with:
```bash
curl -w "DNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" -o /dev/null -s https://YOUR-FUNNEL-URL
```

---

## Security Notes

- **Funnel = public** — anyone with the URL can access
- TLS is automatic and valid
- Don't expose sensitive data or leave it running
- Kill it when done: `tailscale funnel off`

---

## Quick Reference

```bash
# Expose port
tailscale funnel 3000

# Stop
tailscale funnel off

# Check what's exposed
tailscale serve status

# Reset everything
tailscale serve reset

# Connection status
tailscale status

# Network diagnostics
tailscale netcheck
```

---

*Tested on macOS with the Tailscale Mac app — 2026-02-05*
