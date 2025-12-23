---
title: "Getting Started with Eleventy"
description: "Learn how to set up your first Eleventy project and understand the basics of static site generation."
date: 2025-01-16
author: john-doe
image: "/assets/images/pexels-jsalamanca-61127.jpg"
image_alt: "Ripe yellow banana on a dark background"
tags:
  - tutorial
  - eleventy
slug: post-1
---

## Introduction to Eleventy

Eleventy (11ty) is a simpler static site generator that transforms templates into HTML. Unlike many other tools, it does not require a specific framework and gives you the flexibility to choose your templating language.

### Why Choose Eleventy?

There are several reasons why Eleventy has become a popular choice among developers:

1. **Zero client-side JavaScript** by default
2. **Flexible templating** with support for multiple languages
3. **Fast build times** even with large sites
4. **Simple configuration** that just works

## Setting Up Your First Project

Getting started with Eleventy is straightforward. First, you need to have Node.js installed on your machine.

### Installation

Create a new directory for your project and initialize it:

```bash
mkdir my-eleventy-site
cd my-eleventy-site
npm init -y
npm install @11ty/eleventy
```

### Project Structure

A typical Eleventy project might look like this:

- `src/` - Source files
- `src/_includes/` - Layouts and partials
- `src/_data/` - Global data files
- `_site/` - Generated output

#### Understanding the Directories

Each directory serves a specific purpose in the build process. The `_includes` folder holds reusable templates, while `_data` contains JSON or JavaScript files that provide global data to your templates.

### Running the Development Server

To start the development server, run:

```bash
npx eleventy --serve
```

This will start a local server with hot reloading enabled.

## Working with Templates

Eleventy supports multiple templating languages out of the box:

- Nunjucks
- Liquid
- Markdown
- JavaScript

### Creating Your First Template

Here is a simple example using Nunjucks:

```nunjucks
---
title: My Page
---
<h1>{{ title }}</h1>
<p>Welcome to my site!</p>
```

## Next Steps

Now that you have a basic understanding of Eleventy, you can:

1. Explore the official documentation
2. Try different templating languages
3. Add plugins for additional functionality
4. Deploy your site to a hosting platform

### Useful Resources

Here are some resources to help you learn more:

- Official Eleventy documentation
- Community Discord server
- Starter projects on GitHub

Happy building!
