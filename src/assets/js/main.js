/**
 * Main JavaScript file
 * Initializes Alpine.js and custom functionality
 */

import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import intersect from '@alpinejs/intersect';
import 'lite-youtube-embed';
import '@zachleat/table-saw';

// Register Alpine plugins
Alpine.plugin(collapse);
Alpine.plugin(intersect);

// Initialize Alpine.js
window.Alpine = Alpine;

// Range input progress fill (Chrome/Safari only - Firefox has native CSS support)
function initRangeInputs() {
  // Skip Firefox - it has native ::-moz-range-progress support
  if (navigator.userAgent.includes('Firefox')) return;

  const updateProgress = (input) => {
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const percent = ((parseFloat(input.value) - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #ea580c ${percent}%, #e7e5e4 ${percent}%)`;
  };

  document.querySelectorAll('input[type="range"]').forEach(input => {
    updateProgress(input);
    input.addEventListener('input', () => updateProgress(input));
  });
}

// Add loaded class to body when page is ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  Alpine.start();
  initRangeInputs();

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
