---
title: "Building a Real-Time Analytics Platform for Citrus Systems"
description: "How we architected a scalable analytics solution processing 10M+ events daily with sub-second query response times."
date: 2025-01-20
client: Citrus Systems Inc.
category: Platform Development
timeline: 4 months
team_size: 3 developers, 1 designer
image: /assets/images/pexels-pixabay-51958.jpg
image_alt: "Fresh orange representing Citrus Systems"
technologies:
  - Eleventy
  - TailwindCSS
  - Alpine.js
  - Node.js
  - PostgreSQL
  - Redis
  - CloudFlare Workers
results:
  - value: "10M+"
    label: "Daily Events"
  - value: "<100ms"
    label: "Query Response"
  - value: "99.99%"
    label: "Uptime"
  - value: "60%"
    label: "Cost Reduction"
overview: "Citrus Systems needed a modern analytics platform to replace their aging infrastructure. We built a solution that handles millions of events while maintaining blazing-fast query performance."
testimonial: "The new platform changed everything. We went from waiting minutes for reports to getting instant insights. It's like going from a tricycle to a rocket ship!"
testimonial_author: "Clementine Zest"
testimonial_author_title: "VP of Engineering"
testimonial_author_image: /assets/images/placeholder-avatar.jpg
slug: citrus-systems-platform
noindex: false
llms_exclude: false
---

## Project Background

Citrus Systems, a rapidly growing SaaS company, was struggling with their legacy analytics infrastructure. Their existing solution was built on a monolithic architecture that couldn't scale with their growth.

### Key Challenges

1. **Performance degradation** - Query times had grown to 30+ seconds
2. **Scaling limitations** - The system couldn't handle traffic spikes
3. **High operational costs** - Running on oversized dedicated servers
4. **Limited flexibility** - Adding new metrics required weeks of development

## Technical Approach

We designed a modern, event-driven architecture using the JAMstack philosophy extended to backend services.

### Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Events    │────▶│   Workers   │────▶│   Storage   │
│   (Edge)    │     │  (Process)  │     │  (Query)    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Phase 1: Event Ingestion

We implemented CloudFlare Workers at the edge to capture and validate events before they hit our core infrastructure. This approach:

- Reduced latency to <10ms for event capture
- Filtered invalid events before storage
- Provided geographic distribution automatically

### Phase 2: Processing Pipeline

Events flow through a lightweight processing pipeline built on Node.js:

- Real-time aggregation for dashboards
- Batch processing for historical analysis
- Anomaly detection for alerting

### Phase 3: Query Layer

We built a query layer optimized for analytics workloads:

- PostgreSQL with TimescaleDB for time-series data
- Redis for caching frequently accessed aggregates
- Pre-computed rollups for common queries

## Implementation Details

### Event Schema Design

We designed a flexible event schema that balances performance with extensibility:

- Core fields indexed for fast filtering
- JSONB columns for custom properties
- Partitioning by time for efficient pruning

### Caching Strategy

Our multi-layer caching strategy ensures consistent sub-100ms responses:

1. **Edge cache** - Static aggregates at CDN level
2. **Application cache** - Redis for dynamic queries
3. **Database cache** - PostgreSQL query plan caching

### Monitoring & Observability

We implemented comprehensive monitoring:

- Real-time dashboards for system health
- Automated alerting for anomalies
- Detailed logging for debugging

## Results & Impact

The new platform exceeded all performance targets:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Query Time | 30s | <100ms | 300x faster |
| Daily Capacity | 500K | 10M+ | 20x increase |
| Monthly Cost | $15,000 | $6,000 | 60% reduction |
| Uptime | 99.5% | 99.99% | 10x fewer incidents |

## Lessons Learned

1. **Start with the query patterns** - Understanding how data would be queried informed our entire architecture
2. **Edge processing is powerful** - Moving validation to the edge dramatically improved reliability
3. **Pre-compute aggressively** - Most analytics queries follow predictable patterns

## Technologies Used

- **Frontend**: Eleventy, TailwindCSS, Alpine.js
- **Backend**: Node.js, CloudFlare Workers
- **Database**: PostgreSQL + TimescaleDB, Redis
- **Infrastructure**: CloudFlare, Docker, GitHub Actions
