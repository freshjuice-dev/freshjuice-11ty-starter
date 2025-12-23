export default {
  layout: 'layouts/base.njk',
  eleventyComputed: {
    permalink: (data) => {
      // If page has explicit permalink (e.g., paginated pages), use it
      if (data.permalink) {
        return data.permalink;
      }
      // If slug is 'home' or 'homepage', output to root
      if (data.slug === 'home' || data.slug === 'homepage') {
        return '/';
      }
      // If slug is provided, use it (supports nested paths like 'services/consulting')
      if (data.slug) {
        return `/${data.slug}/`;
      }
      // Fallback to file slug
      return `/${data.page.fileSlug}/`;
    }
  }
};
