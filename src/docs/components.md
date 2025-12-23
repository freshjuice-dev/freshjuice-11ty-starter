---
title: "Components"
description: "Learn how to use the built-in Nunjucks components."
category: "Reference"
order: 10
last_updated: 2025-01-20
slug: components
---

## Overview

Components are reusable Nunjucks macros that help you build consistent UI elements. Import them from `_components/index.njk`.

```text
{%raw%}{% from "_components/index.njk" import button, card, badge, authorCard %}{%endraw%}
```

## Button

Create styled buttons with various variants and sizes.

```text
{%raw%}{{ button({ text: "Click Me", url: "/contact", variant: "primary" }) }}
{{ button({ text: "Learn More", variant: "secondary" }) }}
{{ button({ text: "Cancel", variant: "outline" }) }}
{{ button({ text: "Menu", variant: "ghost" }) }}{%endraw%}
```

### Button Variants

| Variant | Description |
|---------|-------------|
| `primary` | Orange background (default) |
| `secondary` | Light background |
| `outline` | Transparent with border |
| `ghost` | No background or border |
| `white` | White outline (for dark backgrounds) |
| `danger` | Black/dark variant |

### Button Sizes

Add size classes: `xs`, `sm`, `md`, `lg`, `full`

## Card

Display content in a card format, perfect for blog posts or features.

```text
{%raw%}{{ card({
  title: "Post Title",
  description: "Description text",
  image: "/path/to/image.jpg",
  url: "/post-url/",
  date: post.date,
  author: "John Doe"
}) }}{%endraw%}
```

## Badge

Display small labels or tags.

```text
{%raw%}{{ badge({ text: "Featured", variant: "primary" }) }}
{{ badge({ text: "New", variant: "secondary" }) }}{%endraw%}
```

## Author Card

Display author information with avatar and bio.

```text
{%raw%}{{ authorCard({
  name: "John Doe",
  bio: "Author bio text",
  avatar: "/path/to/avatar.jpg",
  url: "/authors/john-doe/"
}) }}{%endraw%}
```
