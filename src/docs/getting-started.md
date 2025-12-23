---
title: "Getting Started"
description: "Learn how to set up and run the FreshJuice 11ty starter."
category: "Getting Started"
order: 1
last_updated: 2025-01-20
slug: getting-started
---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** version 24 or higher
- **npm** (comes with Node.js)
- A code editor (we recommend VS Code)

## Installation

1. Clone the repository or use the template:

```bash
git clone https://github.com/freshjuice-dev/freshjuice-11ty-starter.git my-site
cd my-site
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Your site should now be running at `http://localhost:8080`.

## Project Structure

```
src/
├── _data/          # Global data files
├── _includes/      # Layouts and partials
├── assets/         # CSS, JS, images
├── blog/           # Blog posts
├── docs/           # Documentation
├── pages/          # Site pages
└── static/         # Static files (copied as-is)
```

## Next Steps

- Customize your site metadata in `src/_data/metadata.yaml`
- Add your logo to `src/assets/images/`
- Create your first blog post in `src/blog/`
- Deploy to Netlify, Vercel, or Cloudflare Pages