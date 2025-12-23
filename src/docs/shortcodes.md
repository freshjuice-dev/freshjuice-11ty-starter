---
title: "Shortcodes & Filters"
description: "Available shortcodes and filters for your templates."
category: "Reference"
order: 11
last_updated: 2025-01-20
slug: shortcodes
---

## Shortcodes

Shortcodes are custom tags you can use in your content.

### Image

Optimized responsive images using eleventy-img:

```text
{%raw%}{% image "path/to/image.jpg", "Alt text", "100vw" %}{%endraw%}
```

Parameters:
1. Image path (relative to src or absolute)
2. Alt text (required for accessibility)
3. Sizes attribute (optional, defaults to 100vw)

### YouTube

Embed YouTube videos with lite-youtube-embed for performance:

```text
{%raw%}{% youTube "VIDEO_ID", "Video Title" %}{%endraw%}
{%raw%}{% youTube "https://youtube.com/watch?v=VIDEO_ID", "Video Title" %}{%endraw%}
```

### Phosphor Icons

Add icons from the Phosphor icon library:

```text
{%raw%}{% phosphor "icon-name", "weight", { size: 24 } %}{%endraw%}
{%raw%}{% phosphor "arrow-right", "bold", { size: 16 } %}{%endraw%}
```

Weights: `thin`, `light`, `regular`, `bold`, `fill`, `duotone`

Browse icons at [phosphoricons.com](https://phosphoricons.com)

## Filters

Filters transform data in your templates.

### Date Filters

| Filter | Output |
|--------|--------|
| `dateToISOString` | `2025-01-20T00:00:00.000Z` |
| `readableDate` | `January 20, 2025` |
| `shortDate` | `Jan 20, 2025` |

```text
{%raw%}{{ post.date | readableDate }}{%endraw%}
```

### Text Filters

| Filter | Description |
|--------|-------------|
| `striptags` | Remove HTML tags |
| `collapseWhitespace` | Normalize whitespace |
| `truncate(n)` | Truncate to n characters |
| `slugify` | Convert to URL slug |

### Array Filters

| Filter | Description |
|--------|-------------|
| `limit(n)` | Limit array to n items |
| `getAuthor(slug)` | Get author data by slug |
| `getPostsByAuthor(slug)` | Get posts by author |

### Utility Filters

| Filter | Description |
|--------|-------------|
| `jsonify` | JSON stringify |
| `year` | Current year |
