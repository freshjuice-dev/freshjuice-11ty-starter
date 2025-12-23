---
title: "Legacy Migration: Heritage Trails Foundation Goes JAMstack"
description: "Migrating a 15-year-old WordPress site to a modern static architecture while preserving 50,000+ pages of historical content."
date: 2025-01-05
client: Heritage Trails Foundation
category: Migration
timeline: 3 months
team_size: 2 developers
image: /assets/images/pexels-sonny-vermeer-505472791-17111917.jpg
image_alt: "Historic Basilica de Covadonga representing Heritage Trails"
technologies:
  - Eleventy
  - TailwindCSS
  - CloudCannon CMS
  - Node.js
  - Algolia
  - Netlify
results:
  - value: "50K+"
    label: "Pages Migrated"
  - value: "95%"
    label: "Cost Reduction"
  - value: "0"
    label: "Security Incidents"
  - value: "100"
    label: "Lighthouse Score"
overview: "Heritage Trails Foundation needed to modernize their aging WordPress installation without losing 15 years of carefully curated historical content. We migrated everything to a secure, fast, and maintainable JAMstack architecture."
testimonial: "We thought migrating 15 years of content would be like moving a mountain with a spoon. These folks did it with a bulldozer made of magic. Our site is faster than a cheetah on espresso!"
testimonial_author: "Dusty Tomes"
testimonial_author_title: "Director of Digital Archives"
testimonial_author_image: /assets/images/placeholder-avatar.jpg
slug: heritage-trails-migration
noindex: false
llms_exclude: false
---

## Project Background

Heritage Trails Foundation is a non-profit organization dedicated to preserving and documenting historical sites. Their WordPress site, launched in 2009, had grown to over 50,000 pages of invaluable historical content.

### The Breaking Point

By 2024, the site was struggling:

- **Security vulnerabilities** - Outdated plugins created constant attack vectors
- **Performance issues** - 12+ second load times on content-heavy pages
- **Hosting costs** - $800/month for managed WordPress hosting
- **Editorial friction** - Writers avoided the slow, complex admin interface
- **Maintenance burden** - IT spent 20+ hours monthly on updates and fixes

### Migration Requirements

The foundation had strict requirements:

1. **Zero content loss** - Every article, image, and metadata must be preserved
2. **URL preservation** - Existing URLs must continue to work (SEO critical)
3. **Editorial experience** - Non-technical staff must be able to edit easily
4. **Budget constraints** - Non-profit budget of under $100/month for hosting

## Technical Strategy

### Content Extraction

We built a custom migration pipeline to extract WordPress content:

```javascript
// Simplified migration flow
WordPress DB → JSON Export → Markdown Transform → Eleventy Build
```

**Phase 1: Database Export**
- Custom SQL queries to extract posts, pages, and metadata
- Media library mapping with original URLs
- Taxonomy and category preservation

**Phase 2: Content Transformation**
- HTML to Markdown conversion with custom handlers
- Shortcode parsing and replacement
- Image path rewriting for new structure

**Phase 3: Validation**
- Automated comparison of rendered output
- Link checking for internal references
- SEO metadata verification

### Architecture Design

```
┌─────────────────────────────────────────────────────────┐
│                    CloudCannon CMS                      │
│              (Visual editing for staff)                 │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Git Repository                        │
│              (Markdown + front matter)                  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                      Eleventy                           │
│               (Static site generation)                  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                       Netlify                           │
│              (Hosting + CDN + Functions)                │
└─────────────────────────────────────────────────────────┘
```

### Search Implementation

With 50,000+ pages, search was critical. We implemented Algolia:

- Indexed during build process
- Faceted search by era, location, and content type
- Instant results with highlighting
- Zero-config frontend integration

### URL Preservation

We created a comprehensive redirect strategy:

- 1:1 mapping for all existing URLs
- Pattern-based redirects for category pages
- Custom 404 page with search integration
- Redirect validation in CI pipeline

## Content Structure

We organized content into logical collections:

```
src/
├── articles/           # Historical articles (45,000+)
├── sites/              # Heritage site profiles (3,000+)
├── people/             # Historical figures (2,000+)
├── timelines/          # Interactive timelines (500+)
├── pages/              # Static pages (100+)
└── _data/              # Shared data and metadata
```

### Front Matter Schema

Each article includes structured metadata:

```yaml
---
title: "The Roman Aqueducts of Segovia"
date: 2015-03-12
era: "Ancient Rome"
location:
  country: "Spain"
  region: "Castile and León"
  coordinates: [40.9429, -4.1088]
categories:
  - Architecture
  - Engineering
  - Water Systems
author: heritage-team
image: /assets/images/segovia-aqueduct.jpg
---
```

## Editorial Experience

We configured CloudCannon for non-technical editors:

### Visual Editor
- WYSIWYG editing for content
- Drag-and-drop image uploads
- Real-time preview

### Structured Data
- Form-based front matter editing
- Dropdown selections for categories
- Date pickers for historical dates

### Workflow
- Draft/Published states
- Preview deployments for review
- Git-based version history

## Results

### Performance Comparison

| Metric | WordPress | JAMstack | Improvement |
|--------|-----------|----------|-------------|
| Time to First Byte | 2.4s | 0.05s | 48x faster |
| Full Page Load | 12.3s | 1.2s | 10x faster |
| Lighthouse Score | 34 | 100 | Perfect score |

### Cost Comparison

| Item | WordPress (Monthly) | JAMstack (Monthly) |
|------|--------------------|--------------------|
| Hosting | $800 | $0 (Netlify free tier) |
| CDN | $150 | Included |
| Security | $100 | Not needed |
| Maintenance | 20 hours | 2 hours |
| **Total** | **$1,050+** | **~$50** |

### Security Improvement

- **Zero vulnerabilities** - No dynamic attack surface
- **No database** - Nothing to breach
- **Git history** - Complete audit trail
- **Atomic deploys** - Instant rollback capability

## Lessons Learned

1. **Automate validation** - With 50K pages, manual checking was impossible. Our automated comparison tools caught 200+ edge cases.

2. **Preserve URLs religiously** - We created a redirect for every single old URL. This preserved SEO value and prevented broken links.

3. **CloudCannon bridges the gap** - Non-technical editors actually prefer the CloudCannon interface to WordPress. Training took 30 minutes.

4. **Static doesn't mean limited** - With Algolia search and Netlify Functions, we replicated all WordPress functionality with better performance.
