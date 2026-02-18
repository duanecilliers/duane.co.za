---
title: Sharing Localhost With the World Using Tailscale Funnel
description: How I stopped wrestling with ngrok and started using Tailscale to share local dev servers with clients.
date: 2026-02-05
published: true
tags:
  - devtools
  - networking
  - tailscale
---

You're building something locally. A client wants to see it. You could deploy to a staging environment, wait for CI, hope nothing breaks. Or you could just... share your localhost.

I've been using Tailscale Funnel for this lately, and it's become one of those tools I wish I'd found earlier.

## The Problem With Sharing Local Work

We've all been there. You're iterating on a feature, the client wants a preview, and you've got three options:

1. **Deploy to staging** — Slow. Requires pushing, waiting for CI, and hoping your half-finished branch doesn't break something.
2. **Screen share** — Works, but the client can't poke around themselves. And timezones are a thing.
3. **ngrok/localtunnel** — Fine, but ngrok's free tier is slow, URLs change constantly, and there's something unsettling about routing traffic through infrastructure you don't control.

Tailscale Funnel is option four: expose your local server to the public internet through your own Tailscale network, with automatic HTTPS, stable URLs, and a single command to turn it on or off.

## What's Tailscale?

Quick primer if you haven't used it: Tailscale is a mesh VPN built on WireGuard. Every device gets a stable IP address that works regardless of NAT, firewalls, or network changes. No port forwarding. No exposed services. End-to-end encryption.

I use it primarily to SSH into my Mac from anywhere without exposing port 22 to the internet. But the Funnel feature is what makes it useful for sharing work.

## Serve vs Funnel

Tailscale has two related features:

**Serve** exposes a local port to your Tailnet (your private network of devices). Only you and your devices can access it.

**Funnel** takes that a step further — it makes the service publicly accessible on the internet. Anyone with the link can access it.

| | Serve | Funnel |
|---|-------|--------|
| Audience | Your devices only | Public internet |
| Auth | Handled by Tailscale | None (or your app's auth) |
| Use case | Internal access | Client demos |

## Setting It Up

Install Tailscale if you haven't:

```bash
brew install tailscale
```

Or grab the Mac app from [tailscale.com](https://tailscale.com) — it includes a menu bar UI.

Before using Funnel, enable MagicDNS in your [Tailscale Admin Console](https://login.tailscale.com/admin/dns). Funnel should auto-enable, but check Access Controls if it doesn't.

## Basic Usage

Say you're running a Next.js dev server on port 3000:

```bash
# Start your dev server (bind to 0.0.0.0, not localhost)
pnpm dev --hostname 0.0.0.0

# Expose it publicly
tailscale funnel 3000
```

You'll get a URL like `https://duanes-macbook.tailnet-abc123.ts.net/`. Send that to your client. They open it. Done.

To stop:

```bash
tailscale funnel off
```

### The 0.0.0.0 Thing

This trips people up. Dev servers typically bind to `127.0.0.1` by default, which rejects non-localhost connections. You need to bind to `0.0.0.0`:

```bash
# Next.js
next dev -H 0.0.0.0

# Vite
vite --host 0.0.0.0
```

## Multiple Apps, One Machine

If you're running multiple services, you can expose them on different ports:

```bash
tailscale serve --https=443 http://localhost:3000
tailscale serve --https=8443 http://localhost:3001

tailscale funnel 443 on
tailscale funnel 8443 on
```

This gives you:
- `https://your-machine.tailnet.ts.net/`
- `https://your-machine.tailnet.ts.net:8443/`

Path-based routing is also possible, but it tends to break apps that assume they're at root.

## Security Notes

Funnel handles the transport layer well:
- Automatic TLS with valid certificates
- No exposed ports on your router  
- DDoS protection at Tailscale's edge
- One command to turn it off

But it doesn't protect your application. If your app has vulnerabilities, they're exposed. And there's no built-in auth gate — anyone with the URL can access it.

My rules:
- Don't leave Funnel running when you're not actively demoing
- Don't expose anything with real user data
- Kill it when the demo's done

For ongoing internal access, use Serve instead — it stays within your Tailnet.

## Compared to Alternatives

| | Funnel | ngrok | Cloudflare Tunnel |
|---|--------|-------|-------------------|
| Speed | Fast | Slow on free tier | Fast |
| URL stability | Stable | Changes constantly | Stable |
| Trust model | Your Tailnet | ngrok's infra | Cloudflare's infra |

Funnel wins for me because I already use Tailscale for other things, and I prefer keeping traffic within infrastructure I control.

## The Workflow

When I'm building something and need to share it:

```bash
cd ~/projects/client-demo
pnpm dev --host 0.0.0.0 --port 3000
tailscale funnel 3000
```

Copy the URL, send it to the client, get feedback in real-time. No deploys. No waiting.

When we're done: `tailscale funnel off`.

It's one of those small workflow improvements that adds up over time. Less friction between "it works on my machine" and "here, take a look."
