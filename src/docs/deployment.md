---
title: "Deployment"
description: "Deploy your site to Netlify, Vercel, or Cloudflare Pages."
category: "Deployment"
order: 30
last_updated: 2025-01-20
slug: deployment
---

## Supported Platforms

This starter includes configuration files for:

- **Netlify** - `netlify.toml`
- **Vercel** - `vercel.json`
- **Cloudflare Pages** - `wrangler.toml`

All platforms use Node 24 and run `npm run build`.

## Netlify

### Quick Deploy

1. Push your code to GitHub/GitLab
2. Connect to Netlify
3. Build settings are auto-detected from `netlify.toml`

### Environment Variables

Set these in Netlify dashboard if needed:

```
NODE_VERSION=24
```

## Vercel

### Quick Deploy

1. Push your code to GitHub/GitLab
2. Import project in Vercel
3. Settings are auto-detected from `vercel.json`

### Build Command

```bash
npm run build
```

### Output Directory

```
_site
```

## Cloudflare Pages

### Quick Deploy

1. Push your code to GitHub
2. Connect to Cloudflare Pages
3. Use these settings:
   - Build command: `npm run build`
   - Output directory: `_site`
   - Node version: 24

## CloudCannon

For CloudCannon hosting:

1. Connect your repository
2. Build settings are auto-detected
3. Enable visual editing for real-time previews

## Custom Domain

All platforms support custom domains:

1. Add your domain in platform settings
2. Update DNS records (CNAME or A record)
3. Enable HTTPS (usually automatic)
