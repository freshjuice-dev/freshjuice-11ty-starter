---
layout: layouts/base.njk
title: "Typography"
description: "Typography showcase demonstrating all text styles and elements."
permalink: /typography/
eleventyExcludeFromCollections: true
noindex: true
---

<article class="container mx-auto px-4 py-12">
<div class="prose prose-lg max-w-3xl mx-auto">

# Typography Showcase

This page demonstrates all typography styles available in this theme. Use it as a reference when creating content.

## Headings

All HTML headings, `<h1>` through `<h6>`, are available.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Paragraphs

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Inline Text Elements

You can use the mark tag to <mark>highlight</mark> text.

<del>This line of text is meant to be treated as deleted text.</del>

<s>This line of text is meant to be treated as no longer accurate.</s>

<ins>This line of text is meant to be treated as an addition to the document.</ins>

<u>This line of text will render as underlined.</u>

<small>This line of text is meant to be treated as fine print.</small>

**This line rendered as bold text.**

*This line rendered as italicized text.*

<abbr title="HyperText Markup Language">HTML</abbr> is the best thing since sliced bread.

This is some <sub>subscript</sub> and <sup>superscript</sup> text.

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

## Links

This is a [regular link](#) and this is an [external link](https://example.com).

## Blockquotes

> A well-known quote, contained in a blockquote element.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
>
> <footer>Someone famous in <cite>Source Title</cite></footer>

## Lists

### Unordered List

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa
  - Nested list item one
  - Nested list item two
  - Nested list item three
- Facilisis in pretium nisl aliquet

### Ordered List

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
   1. Nested list item one
   2. Nested list item two
   3. Nested list item three
4. Facilisis in pretium nisl aliquet

### Definition List

<dl>
  <dt>Term 1</dt>
  <dd>Definition for term 1.</dd>
  <dt>Term 2</dt>
  <dd>Definition for term 2.</dd>
  <dt>Term 3</dt>
  <dd>Definition for term 3.</dd>
</dl>

## Code

### Inline Code

Use `inline code` for short code snippets like `const foo = 'bar';`

### Code Blocks

```javascript
// JavaScript example
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

```css
/* CSS example */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
```

```html
<!-- HTML example -->
<div class="container">
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</div>
```

```bash
# Bash example
npm install
npm run dev
```

```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "dev": "eleventy --serve"
  }
}
```

## Tables

| Name | Role | Status |
|------|------|--------|
| John Doe | Developer | Active |
| Jane Smith | Designer | Active |
| Bob Johnson | Manager | Inactive |

## Horizontal Rule

Content above the rule.

---

Content below the rule.

## Images

<figure>
  <img src="https://picsum.photos/800/400" alt="Random placeholder image">
  <figcaption>This is a figure caption describing the image above.</figcaption>
</figure>

## Details / Summary

<details>
  <summary>Click to expand</summary>
  <p>This is the hidden content that appears when you click the summary. It can contain any HTML elements.</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
  </ul>
</details>

## Address

<address>
  <strong>Company Name</strong><br>
  123 Street Address<br>
  City, State 12345<br>
  <a href="mailto:info@example.com">info@example.com</a>
</address>

</div>
</article>
