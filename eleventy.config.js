import collections from './config/collections.js';
import filters from './config/filters.js';
import shortcodes from './config/shortcodes.js';
import transforms from './config/transforms.js';
import plugins from './config/plugins.js';
import pluginBookshop from '@bookshop/eleventy-bookshop';

/**
 * Eleventy configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 * @returns {object} Eleventy config object
 */
export default function(eleventyConfig) {
  // Load configuration modules
  collections(eleventyConfig);
  filters(eleventyConfig);
  shortcodes(eleventyConfig);
  transforms(eleventyConfig);
  plugins(eleventyConfig);

  // Bookshop component library for landing pages
  eleventyConfig.addPlugin(pluginBookshop({
    bookshopLocations: ['src/_component-library'],
    pathPrefix: ''
  }));

  // Pass through static assets (images, fonts)
  // CSS and JS are built separately by postcss and esbuild
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });

  // Static files copied to root (favicon.ico, etc.)
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html', 'liquid']
  };
}
