---
title: "Typography Test: A Complete Showcase"
description: "A comprehensive test of all typography elements including headings, lists, quotes, code, and more."
date: 2024-12-20
author: jane-smith
image: "/assets/images/pexels-wendyaffieplaas-1178610.jpg"
image_alt: "Red cherries in a stainless steel bowl"
tags:
  - typography
  - design
  - test
---

This post serves as a comprehensive typography test, showcasing all the different text elements and styles available in our design system.

# Heading Level 1

The largest heading, typically used for main page titles. It should be bold and commanding, drawing the reader's attention immediately.

## Heading Level 2

Second-level headings are used for major sections within a page. They provide clear visual hierarchy while remaining subordinate to H1.

### Heading Level 3

Third-level headings break down sections into smaller, more digestible parts. They are commonly used for subsections.

#### Heading Level 4

Fourth-level headings provide additional granularity. Use them sparingly to avoid overly complex hierarchies.

##### Heading Level 5

Fifth-level headings are rarely needed but available for deeply nested content structures.

###### Heading Level 6

The smallest heading level. If you need this, consider restructuring your content.

---

## Text Formatting

Regular paragraph text forms the backbone of any content. It should be readable, with appropriate line height and comfortable letter spacing.

**Bold text** is used for strong emphasis. It draws the eye and highlights important information.

*Italic text* provides a softer emphasis, often used for titles of works, foreign words, or to add nuance.

***Bold and italic combined*** offers the strongest textual emphasis without resorting to other formatting.

~~Strikethrough text~~ indicates deleted or outdated information.

This sentence contains `inline code` for technical terms or short code snippets.

Here is some text with a [hyperlink to an example](https://example.com) embedded within it.

---

## Superscript and Subscript

Mathematical expressions often require superscript: E = mc<sup>2</sup>

Chemical formulas use subscript: H<sub>2</sub>O, CO<sub>2</sub>, C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>

Footnote references typically use superscript<sup>1</sup> to indicate additional information.

The 1<sup>st</sup>, 2<sup>nd</sup>, and 3<sup>rd</sup> place winners received medals.

---

## Lists

### Unordered Lists

- First item in the list
- Second item with more detail
  - Nested item one
  - Nested item two
    - Deeply nested item
- Third item back at the root level
- Fourth item to show list rhythm

### Ordered Lists

1. First step in the process
2. Second step follows logically
   1. Sub-step A
   2. Sub-step B
3. Third step continues the sequence
4. Final step completes the process

### Mixed Lists

1. **Planning Phase**
   - Define requirements
   - Create wireframes
   - Review with stakeholders
2. **Development Phase**
   - Set up environment
   - Write code
   - Test thoroughly
3. **Deployment Phase**
   - Stage for review
   - Deploy to production

### Task Lists

- [x] Completed task
- [x] Another finished item
- [ ] Pending task
- [ ] Future work item

---

## Blockquotes

> A single paragraph blockquote. This is commonly used for testimonials, citations, or to highlight important information from external sources.

> Multiple paragraph blockquotes are also supported.
>
> The second paragraph continues the quoted content, maintaining visual consistency.
>
> *Source attribution often appears in italics*

### Nested Blockquotes

> First level of quoting.
>
> > Nested quote provides additional context or a response to the original quote.
>
> Back to the first level.

---

## Code Blocks

### JavaScript

```javascript
// Example JavaScript function
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

const cart = [
  { name: 'Apple', price: 1.50, quantity: 4 },
  { name: 'Banana', price: 0.75, quantity: 6 }
];

console.log(`Total: $${calculateTotal(cart).toFixed(2)}`);
```

### CSS

```css
/* Modern CSS with custom properties */
:root {
  --color-primary: #f97316;
  --spacing-unit: 1rem;
}

.card {
  padding: calc(var(--spacing-unit) * 2);
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### HTML

```html
<article class="post">
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-12-20">December 20, 2024</time>
  </header>
  <div class="content">
    <p>Article content goes here...</p>
  </div>
</article>
```

### Bash

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Tables

### Simple Table

| Feature | Status | Priority |
|---------|--------|----------|
| Dark Mode | Complete | High |
| Search | In Progress | Medium |
| Analytics | Planned | Low |

### Detailed Table

| Technology | Description | Use Case | Learning Curve |
|------------|-------------|----------|----------------|
| Eleventy | Static site generator | Blogs, docs | Easy |
| TailwindCSS | Utility-first CSS | Rapid UI development | Medium |
| Alpine.js | Lightweight JS framework | Interactivity | Easy |
| CloudCannon | Git-based CMS | Content management | Easy |

### Alignment Table

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Text | Text | Text |
| More text | More text | More text |
| Even more | Even more | Even more |

---

## Images and Figures

<figure>
  <img src="/assets/images/pexels-psco-27269.jpg" alt="Two pineapple fruits near body of water" eleventy:widths="600,900" />
  <figcaption>Tropical vibes: Fresh pineapples by the water</figcaption>
</figure>

---

## Horizontal Rules

Content above the rule.

---

Content below the rule.

***

Another style of rule.

___

And another variation.

---

## Abbreviations and Definitions

The <abbr title="HyperText Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.

<dfn>Static Site Generation</dfn> is the process of compiling templates and content into static HTML files at build time.

---

## Keyboard and Sample Output

To save a file, press <kbd>Ctrl</kbd> + <kbd>S</kbd> (or <kbd>Cmd</kbd> + <kbd>S</kbd> on Mac).

The command produced the following output:
<samp>Build completed successfully in 2.3 seconds</samp>

---

## Small Text and Fine Print

<small>This is small text, often used for legal disclaimers, copyright notices, or other fine print that should be present but not prominent.</small>

---

## Address Element

<address>
  Written by Jane Smith<br>
  Contact: hello@example.com<br>
  123 Main Street, City, Country
</address>

---

## Summary

This typography test demonstrates the full range of text formatting options available. Proper typography enhances readability, establishes visual hierarchy, and creates a professional appearance for any website or application.

Remember: Good typography is invisible. When done well, readers focus on the content, not the styling.
