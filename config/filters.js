/**
 * Eleventy filters configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function(eleventyConfig) {
  // Convert date to ISO string
  eleventyConfig.addFilter('dateToISOString', (date) => {
    return new Date(date).toISOString();
  });

  // Format date for display
  eleventyConfig.addFilter('readableDate', (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Short date format
  eleventyConfig.addFilter('shortDate', (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  // Strip HTML tags
  eleventyConfig.addFilter('striptags', (content) => {
    return content?.replace(/<[^>]*>/g, '') || '';
  });

  // Collapse whitespace
  eleventyConfig.addFilter('collapseWhitespace', (content) => {
    return content?.replace(/\s+/g, ' ').trim() || '';
  });

  // Truncate text
  eleventyConfig.addFilter('truncate', (content, length = 100) => {
    if (!content || content.length <= length) return content;
    return content.substring(0, length).trim() + '...';
  });

  // Limit array items
  eleventyConfig.addFilter('limit', (array, limit) => {
    return array?.slice(0, limit) || [];
  });

  // Get author data by slug
  eleventyConfig.addFilter('getAuthor', (authors, slug) => {
    if (!authors || !slug) return null;
    return authors.find((author) =>
      author.data?.slug === slug || author.page?.fileSlug === slug
    );
  });

  // Get posts by author slug
  eleventyConfig.addFilter('getPostsByAuthor', (posts, authorSlug) => {
    return posts?.filter((post) => post.data.author === authorSlug) || [];
  });

  // Slugify text
  eleventyConfig.addFilter('slugify', (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  });

  // JSON stringify for safe output in templates
  eleventyConfig.addFilter('jsonify', (content) => {
    return JSON.stringify(content);
  });

  // Get current year
  eleventyConfig.addFilter('year', () => {
    return new Date().getFullYear();
  });
}
