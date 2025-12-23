/**
 * Eleventy collections configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function(eleventyConfig) {
  // Blog posts collection
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('src/blog/*.md')
      .sort((a, b) => b.date - a.date);
  });

  // Authors collection
  eleventyConfig.addCollection('authors', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/authors/*.md');
  });

  // Pages collection
  eleventyConfig.addCollection('pages', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('src/pages/*.{njk,md}')
      .filter((item) => !item.data.excludeFromCollections);
  });

  // Docs collection
  eleventyConfig.addCollection('docs', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('src/docs/*.md')
      .sort((a, b) => {
        // Sort by order if defined, otherwise alphabetically by title
        const orderA = a.data.order ?? 999;
        const orderB = b.data.order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return (a.data.title || '').localeCompare(b.data.title || '');
      });
  });

  // Customer stories collection
  eleventyConfig.addCollection('stories', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('src/stories/*.md')
      .sort((a, b) => b.date - a.date);
  });

  // Case studies collection
  eleventyConfig.addCollection('cases', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('src/cases/*.md')
      .sort((a, b) => b.date - a.date);
  });

  // All content for sitemap
  eleventyConfig.addCollection('sitemap', (collectionApi) => {
    return collectionApi.getAll().filter((item) => {
      return item.url && !item.data.noindex && !item.data.eleventyExcludeFromCollections;
    });
  });
}
