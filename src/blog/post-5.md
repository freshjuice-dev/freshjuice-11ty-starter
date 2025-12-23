---
title: "Web Performance Optimization"
description: "Learn essential techniques to improve your website's loading speed and overall performance."
date: 2024-12-15
author: john-doe
image: "/assets/images/pexels-psco-27269.jpg"
image_alt: "Two pineapple fruits near body of water"
tags:
  - performance
  - optimization
  - tutorial
slug: post-5
---

Website performance directly impacts user experience, SEO rankings, and conversion rates. A fast website keeps visitors engaged while a slow one drives them away.

## Why Performance Matters

Studies show that:

- 53% of mobile users abandon sites that take over 3 seconds to load
- A 1-second delay in page load time can result in 7% fewer conversions
- Google uses page speed as a ranking factor for search results

## Core Web Vitals

Google's Core Web Vitals measure real-world user experience:

### Largest Contentful Paint (LCP)

LCP measures how long it takes for the largest content element to become visible. Aim for under 2.5 seconds.

```javascript
// Monitor LCP with the Performance API
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP:', entry.startTime);
  }
}).observe({ entryTypes: ['largest-contentful-paint'] });
```

### First Input Delay (FID)

FID measures the time from when a user first interacts with your page to when the browser responds. Target under 100 milliseconds.

### Cumulative Layout Shift (CLS)

CLS measures visual stability. Unexpected layout shifts frustrate users. Keep CLS under 0.1.

## Image Optimization

Images often account for the majority of page weight.

### Modern Formats

Use next-gen formats like WebP and AVIF:

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Responsive Images

Serve appropriately sized images:

```html
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Description"
>
```

### Lazy Loading

Defer loading of off-screen images:

```html
<img src="image.jpg" alt="Description" loading="lazy">
```

## Code Optimization

### Minification

Minify HTML, CSS, and JavaScript to reduce file sizes:

| File Type | Original | Minified | Savings |
|-----------|----------|----------|---------|
| CSS | 150 KB | 95 KB | 37% |
| JavaScript | 200 KB | 120 KB | 40% |
| HTML | 50 KB | 40 KB | 20% |

### Code Splitting

Load only the code needed for the current page:

```javascript
// Dynamic import for code splitting
const module = await import('./heavy-module.js');
module.doSomething();
```

### Tree Shaking

Remove unused code from your bundles by using ES modules and a modern bundler.

## Caching Strategies

### Browser Caching

Set appropriate cache headers:

```
Cache-Control: public, max-age=31536000, immutable
```

### Service Workers

Cache assets for offline access and faster repeat visits:

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## Resource Hints

Help the browser prioritize resources:

```html
<!-- Preconnect to important origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Prefetch resources for the next page -->
<link rel="prefetch" href="/next-page.html">

<!-- Preload critical resources -->
<link rel="preload" href="/critical.css" as="style">
```

## Testing Tools

Regularly test your performance with:

1. **Lighthouse** - Built into Chrome DevTools
2. **WebPageTest** - Detailed waterfall analysis
3. **PageSpeed Insights** - Real-world performance data
4. **GTmetrix** - Performance monitoring

## Conclusion

Performance optimization is an ongoing process. Start with the biggest wins, measure your progress, and continuously iterate. Your users will thank you with higher engagement and better conversion rates.
