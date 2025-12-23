---
title: "CloudCannon CMS"
description: "Configure and use CloudCannon for content management."
category: "CMS"
order: 20
last_updated: 2025-01-20
slug: cloudcannon
---

## Overview

This starter is pre-configured for CloudCannon CMS with visual editing, schemas, and structured data.

## Collections

The following collections are available:

| Collection | Path | Description |
|------------|------|-------------|
| Blog | `src/blog/` | Blog posts |
| Documentation | `src/docs/` | Knowledge base articles |
| Pages | `src/pages/` | Static pages |
| Legal | `src/legal/` | Legal pages (privacy, terms) |
| Authors | `src/authors/` | Author profiles |

## Schemas

Schemas define the structure of your content. They're located in `.cloudcannon/schemas/`:

- `post.md` - Blog post schema
- `docs.md` - Documentation schema
- `page.yaml` - Standard page schema
- `landing.yaml` - Landing page schema
- `legal.md` - Legal page schema
- `author.md` - Author profile schema

## Visual Editing

Pages and landing pages support visual editing. Use the Visual Editor to:

- Edit content inline
- Add and reorder blocks
- Preview changes in real-time

## Data Files

Global settings are managed in `src/_data/`:

- `metadata.yaml` - Site name, description, URL
- `header.yaml` - Navigation and CTA button
- `footer.yaml` - Footer links and content
- `socials.yaml` - Social media profiles
- `tracking.yaml` - Analytics and tracking codes

## Advanced Settings

Power users can configure:

- `consent.yaml` - Cookie consent (OneTrust, CookieBot)
- `mida.yaml` - A/B testing configuration
- `robots.yaml` - Search engine directives
- `redirects.yaml` - URL redirects
