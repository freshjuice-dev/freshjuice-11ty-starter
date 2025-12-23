---
title: "Customization"
description: "Learn how to customize colors, fonts, and styles."
category: "Getting Started"
order: 2
last_updated: 2025-01-20
slug: customization
---

## Theme Colors

The primary brand color is orange, which can be customized in the TailwindCSS configuration.

### Changing the Primary Color

Edit `src/assets/css/main.css` and update the CSS variables:

```css
:root {
  --color-primary-500: #ea580c;
  --color-primary-600: #c2410c;
}
```

## Typography

The starter uses system fonts by default for optimal performance. You can customize fonts in the CSS variables:

```css
:root {
  --font-body: system-ui, sans-serif;
  --font-heading: system-ui, sans-serif;
}
```

## Adding Custom Styles

Create new CSS files in `src/assets/css/` and import them in `main.css`:

```css
@import "_custom.css";
```

## Component Variants

Button variants can be customized in `src/assets/css/_buttons.css`. Available variants:

- `.btn` - Primary (default)
- `.btn--secondary` - Light background
- `.btn--outline` - Transparent with border
- `.btn--ghost` - No background or border