/**
 * Main JavaScript file
 * Initializes Alpine.js and custom functionality
 */

import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import 'lite-youtube-embed';

// Register Alpine plugins
Alpine.plugin(collapse);

// Initialize Alpine.js
window.Alpine = Alpine;

// Add loaded class to body when page is ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  Alpine.start();

  // FreshJuice console branding
  console.log(
    '%c FreshJuice %c Starter Theme ',
    'background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: white; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 8px 0 0 8px;',
    'background: #1c1917; color: #ea580c; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 0 8px 8px 0;'
  );
  console.log(
    '%c Made with love by FreshJuice Team %c https://freshjuice.dev',
    'color: #78716c; font-size: 12px;',
    'color: #ea580c; font-size: 12px;'
  );
}, { once: true });
