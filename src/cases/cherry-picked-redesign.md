---
title: "E-commerce Redesign: Tripling Conversions for Cherry Picked"
description: "A complete UX overhaul that transformed a struggling online store into a conversion machine through data-driven design."
date: 2025-01-12
client: Cherry Picked Goods
category: E-commerce
timeline: 6 weeks
team_size: 2 developers, 1 designer
image: /assets/images/pexels-wendyaffieplaas-1178610.jpg
image_alt: "Fresh cherries representing Cherry Picked brand"
technologies:
  - Eleventy
  - TailwindCSS
  - Alpine.js
  - Shopify Storefront API
  - Cloudinary
results:
  - value: "312%"
    label: "Conversion Lift"
  - value: "2.1s"
    label: "Load Time"
  - value: "45%"
    label: "Cart Abandonment Drop"
  - value: "89"
    label: "Lighthouse Score"
overview: "Cherry Picked Goods was losing customers to slow page loads and a confusing checkout flow. We rebuilt their storefront from scratch, focusing on speed and user experience."
testimonial: "Our old site was like trying to sell cherries through a brick wall. Now customers glide through checkout like it's a slip-n-slide. Best investment we ever made!"
testimonial_author: "Pit Stone"
testimonial_author_title: "Founder & CEO"
testimonial_author_image: /assets/images/placeholder-avatar.jpg
slug: cherry-picked-redesign
noindex: false
llms_exclude: false
---

## The Challenge

Cherry Picked Goods, a boutique online retailer specializing in artisanal food products, was experiencing declining sales despite growing traffic. Their analytics revealed a troubling pattern:

- **67% bounce rate** on mobile devices
- **78% cart abandonment** at checkout
- **8+ second** average page load time
- **2.1%** conversion rate (industry average: 3.5%)

### Root Cause Analysis

We conducted a thorough audit and identified critical issues:

1. **Performance** - Unoptimized images and bloated JavaScript
2. **UX friction** - 7-step checkout process with required account creation
3. **Mobile experience** - Desktop-first design that broke on small screens
4. **Trust signals** - Missing reviews, unclear shipping information

## Our Approach

We proposed a complete rebuild using a headless architecture that would give us full control over the frontend experience while leveraging Shopify's robust backend.

### Design Philosophy

Our design principles for the project:

- **Speed is a feature** - Every interaction should feel instant
- **Mobile-first** - Design for thumbs, adapt for mice
- **Reduce friction** - Remove every unnecessary step
- **Build trust** - Show social proof at decision points

## Technical Implementation

### Headless Architecture

We decoupled the frontend from Shopify, using their Storefront API:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Eleventy   │────▶│  Storefront  │────▶│   Shopify    │
│   Frontend   │     │     API      │     │   Backend    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Performance Optimizations

We implemented aggressive performance optimizations:

**Image Pipeline**
- Automatic WebP/AVIF conversion via Cloudinary
- Responsive images with art direction
- Lazy loading with blur-up placeholders

**JavaScript Strategy**
- Alpine.js for interactivity (14KB vs 200KB+ React)
- Code splitting for route-based loading
- Service worker for offline cart persistence

**Build Optimizations**
- Static generation for product pages
- Edge caching with stale-while-revalidate
- Critical CSS inlining

### Checkout Redesign

We reduced checkout from 7 steps to 2:

**Before:**
1. Cart review → 2. Account creation → 3. Shipping address → 4. Shipping method → 5. Billing address → 6. Payment → 7. Confirmation

**After:**
1. Cart + Shipping → 2. Payment + Confirmation

Key changes:
- Guest checkout as default
- Address autocomplete via Google Places API
- Real-time shipping calculation
- Express payment options (Apple Pay, Google Pay)

### Trust Building

We strategically placed trust signals:

- Product reviews pulled from Shopify
- "Customers also bought" recommendations
- Clear shipping costs upfront
- Security badges near payment forms
- Live chat widget for support

## Results

The redesign launched after 6 weeks of development:

### Week 1 Results
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Page Load | 8.2s | 2.1s | -74% |
| Bounce Rate | 67% | 31% | -54% |
| Mobile Traffic | 45% | 62% | +38% |

### Month 1 Results
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Conversion Rate | 2.1% | 6.6% | +312% |
| Cart Abandonment | 78% | 43% | -45% |
| Average Order Value | $52 | $68 | +31% |
| Revenue | $45K | $142K | +215% |

## Key Takeaways

1. **Performance directly impacts revenue** - Every 100ms improvement in load time correlated with 1% conversion increase

2. **Headless isn't always complex** - With the right tools (Eleventy + Alpine.js), headless can be simpler than traditional solutions

3. **Small UX changes compound** - Removing account creation requirement alone increased conversions by 23%

4. **Mobile-first pays dividends** - Our mobile conversion rate actually exceeded desktop after launch
