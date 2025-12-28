#!/usr/bin/env node

/**
 * Accessibility Test
 *
 * Uses axe-core + Puppeteer to test for WCAG violations.
 * Tests both light and dark themes by default.
 * Generates a Markdown report in _reports folder.
 *
 * Usage:
 *   # Local testing (from _site folder)
 *   npm run test:a11y
 *   npm run test:a11y -- --limit=5
 *   npm run test:a11y -- --theme=dark
 *
 *   # Remote testing (from sitemap)
 *   npm run test:a11y -- --sitemap=https://example.com/sitemap.xml
 *   npm run test:a11y -- --sitemap=https://example.com/sitemap.xml --base-url=https://actual-site.com
 *
 * Options:
 *   --sitemap=URL    Fetch pages from sitemap XML instead of local _site
 *   --base-url=URL   Replace sitemap domain with this URL (useful for staging)
 *   --limit=N        Test only first N pages
 *   --theme=light|dark|both  Test specific theme(s)
 *   --standard=wcag21aa  WCAG standard to test against
 *
 * Requirements (optional dependencies):
 *   npm install --no-save puppeteer @axe-core/puppeteer serve-handler
 */

import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

// Check for optional dependencies
let puppeteer, AxePuppeteer, handler;
try {
  puppeteer = (await import('puppeteer')).default;
  AxePuppeteer = (await import('@axe-core/puppeteer')).AxePuppeteer;
  handler = (await import('serve-handler')).default;
} catch {
  console.error('\n❌ Missing optional dependencies for a11y testing.');
  console.error('   Install them with: npm install --no-save puppeteer @axe-core/puppeteer serve-handler\n');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

// Configuration
const CONFIG = {
  siteDir: resolve(ROOT_DIR, '_site'),
  outputDir: resolve(ROOT_DIR, '_reports'),
  port: 8765,
  limit: 0,
  standard: 'wcag21aa',
  timeout: 30000,
  viewport: { width: 1280, height: 800 },
  themes: ['light'], // Light theme only (no dark mode in this theme)
  skipPatterns: [
    /\.xml$/,
    /\.json$/,
    /\.txt$/,
    /\/404\//,
    /\/500\//,
    /\/_component-library\//,
  ],
  // Remote testing options
  sitemapUrl: null,
  baseUrl: null,
};

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg.startsWith('--limit=')) {
      CONFIG.limit = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--standard=')) {
      CONFIG.standard = arg.split('=')[1];
    } else if (arg.startsWith('--theme=')) {
      const theme = arg.split('=')[1];
      if (theme === 'light' || theme === 'dark') {
        CONFIG.themes = [theme];
      } else if (theme === 'both') {
        CONFIG.themes = ['light', 'dark'];
      }
    } else if (arg.startsWith('--sitemap=')) {
      CONFIG.sitemapUrl = arg.split('=')[1];
    } else if (arg.startsWith('--base-url=')) {
      CONFIG.baseUrl = arg.split('=')[1].replace(/\/$/, '');
    }
  }
}

// Fetch and parse sitemap XML
async function fetchSitemapUrls(sitemapUrl, baseUrl) {
  console.log(`   Fetching sitemap: ${sitemapUrl}`);

  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status}`);
  }

  const xml = await response.text();
  const urls = [];

  // Simple regex to extract <loc> URLs from sitemap
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    let url = match[1];

    // Replace domain with baseUrl if provided
    if (baseUrl) {
      const urlObj = new URL(url);
      url = baseUrl + urlObj.pathname;
    }

    // Skip patterns
    const pathname = new URL(url).pathname;
    if (!CONFIG.skipPatterns.some(pattern => pattern.test(pathname))) {
      urls.push(url);
    }
  }

  return urls;
}

// Get all HTML files from _site
function getHtmlFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getHtmlFiles(fullPath, files);
    } else if (item === 'index.html') {
      const rel = relative(CONFIG.siteDir, dir).replace(/\\/g, '/');
      const url = rel ? `/${rel}/` : '/';

      if (!CONFIG.skipPatterns.some(pattern => pattern.test(url))) {
        files.push(url);
      }
    }
  }

  return files;
}

// Map standard to axe-core tags
function getTagsForStandard(standard) {
  const tagMap = {
    'wcag2a': ['wcag2a'],
    'wcag2aa': ['wcag2a', 'wcag2aa'],
    'wcag21aa': ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    'wcag22aa': ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  };
  return tagMap[standard] || ['wcag2a', 'wcag2aa'];
}

// Start local server
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      return handler(req, res, { public: CONFIG.siteDir });
    });

    server.listen(CONFIG.port, () => {
      console.log(`   Server running at http://localhost:${CONFIG.port}`);
      resolve(server);
    });
  });
}

// Run axe-core on a single page with specific theme
async function auditPage(browser, url, theme, index, total, isRemote = false) {
  const page = await browser.newPage();
  const fullUrl = isRemote ? url : `http://localhost:${CONFIG.port}${url}`;
  const displayUrl = isRemote ? new URL(url).pathname : url;
  const themeLabel = theme === 'dark' ? '🌙' : '☀️';

  try {
    await page.setViewport(CONFIG.viewport);
    process.stdout.write(`   [${index + 1}/${total}] ${themeLabel} ${displayUrl} `);

    await page.goto(fullUrl, {
      waitUntil: 'networkidle2',
      timeout: CONFIG.timeout
    });

    // Apply theme by toggling dark class on html element
    if (theme === 'dark') {
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });
      // Wait for any CSS transitions
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
      });
    }

    const tags = getTagsForStandard(CONFIG.standard);
    const results = await new AxePuppeteer(page)
      .withTags(tags)
      .analyze();

    const violationCount = results.violations.reduce((sum, v) => sum + v.nodes.length, 0);

    if (violationCount > 0) {
      console.log(`- ${violationCount} violations`);
    } else {
      console.log('- OK');
    }

    return {
      url: `${displayUrl} [${theme}]`,
      theme,
      violations: results.violations,
      incomplete: results.incomplete,
    };

  } catch (error) {
    console.log(`- Error: ${error.message}`);
    return {
      url: `${displayUrl} [${theme}]`,
      theme,
      error: error.message,
      violations: [],
      incomplete: [],
    };
  } finally {
    await page.close();
  }
}

// Format URL for display
function formatUrl(url) {
  return url === '/' ? '/ (homepage)' : url;
}

// Generate Markdown report
function generateMarkdownReport(results) {
  const timestamp = new Date().toISOString();
  const totalViolations = results.reduce((sum, r) =>
    sum + r.violations.reduce((s, v) => s + v.nodes.length, 0), 0);
  const pagesWithIssues = results.filter(r => r.violations.length > 0).length;

  // Aggregate violations by rule
  const violationsByRule = {};
  for (const result of results) {
    for (const violation of result.violations) {
      if (!violationsByRule[violation.id]) {
        violationsByRule[violation.id] = {
          ...violation,
          pages: [],
          totalNodes: 0,
        };
      }
      violationsByRule[violation.id].pages.push({
        url: result.url,
        nodes: violation.nodes,
      });
      violationsByRule[violation.id].totalNodes += violation.nodes.length;
    }
  }

  const sortedViolations = Object.values(violationsByRule)
    .sort((a, b) => {
      const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
      return (impactOrder[a.impact] || 4) - (impactOrder[b.impact] || 4);
    });

  const impactEmoji = {
    critical: '🔴',
    serious: '🟠',
    moderate: '🟡',
    minor: '🔵',
  };

  const uniquePages = results.length / CONFIG.themes.length;

  let md = `# Accessibility Test Report

**Generated:** ${timestamp}
**Standard:** ${CONFIG.standard.toUpperCase()}
**Themes tested:** ${CONFIG.themes.map(t => t === 'dark' ? '🌙 Dark' : '☀️ Light').join(', ')}
**Pages tested:** ${uniquePages} pages × ${CONFIG.themes.length} themes = ${results.length} total

## Summary

| Metric | Count |
|--------|-------|
| Total violations | ${totalViolations} |
| Pages with issues | ${pagesWithIssues} |
| Unique rules violated | ${sortedViolations.length} |
| Clean pages | ${results.length - pagesWithIssues} |

`;

  if (totalViolations === 0) {
    md += `## Result\n\nNo accessibility violations found.\n`;
    return md;
  }

  md += `## Violations by Rule\n\n`;

  for (const v of sortedViolations) {
    md += `### ${impactEmoji[v.impact] || '⚪'} ${v.id}\n\n`;
    md += `**Impact:** ${v.impact} | **Instances:** ${v.totalNodes}\n\n`;
    md += `${v.help}\n\n`;
    md += `${v.description}\n\n`;
    md += `**WCAG:** ${v.tags.filter(t => t.startsWith('wcag')).join(', ')}\n\n`;
    md += `**How to fix:** [${v.helpUrl}](${v.helpUrl})\n\n`;

    md += `<details>\n<summary>Affected pages (${v.pages.length})</summary>\n\n`;
    for (const page of v.pages) {
      md += `- \`${formatUrl(page.url)}\` (${page.nodes.length} instances)\n`;
    }
    md += `\n</details>\n\n---\n\n`;
  }

  md += `## Pages Summary\n\n`;
  md += `| Page | Violations |\n|------|------------|\n`;

  for (const r of results) {
    const count = r.violations.reduce((s, v) => s + v.nodes.length, 0);
    const status = r.error ? 'Error' : count > 0 ? count : 'OK';
    md += `| \`${formatUrl(r.url)}\` | ${status} |\n`;
  }

  return md;
}

// Main execution
async function main() {
  parseArgs();

  console.log('\n🔍 Accessibility Test');
  console.log('=====================\n');
  console.log(`   Standard: ${CONFIG.standard.toUpperCase()}`);

  let urls = [];
  let isRemote = false;
  let server = null;

  // Remote mode: fetch from sitemap
  if (CONFIG.sitemapUrl) {
    isRemote = true;
    const baseUrl = CONFIG.baseUrl || null;
    urls = await fetchSitemapUrls(CONFIG.sitemapUrl, baseUrl);
    console.log(`   Mode: Remote (sitemap)`);
    if (baseUrl) {
      console.log(`   Base URL: ${baseUrl}`);
    }
  } else {
    // Local mode: scan _site folder
    if (!existsSync(CONFIG.siteDir)) {
      console.error('\n❌ Error: _site folder not found. Run "npm run build" first.\n');
      process.exit(1);
    }
    urls = getHtmlFiles(CONFIG.siteDir);
    console.log(`   Mode: Local (_site folder)`);
  }

  console.log(`   Found ${urls.length} pages to test`);
  console.log(`   Themes: ${CONFIG.themes.join(', ')}`);

  if (CONFIG.limit > 0) {
    urls = urls.slice(0, CONFIG.limit);
    console.log(`   Limited to ${CONFIG.limit} pages`);
  }

  const totalTests = urls.length * CONFIG.themes.length;
  console.log(`   Total tests: ${totalTests} (${urls.length} pages × ${CONFIG.themes.length} themes)`);

  // Start local server only for local mode
  if (!isRemote) {
    console.log('\n📡 Starting local server...');
    server = await startServer();
  }

  // Launch browser
  console.log('\n🚀 Running tests...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Audit each page in each theme
  const results = [];
  let testIndex = 0;
  for (const theme of CONFIG.themes) {
    console.log(`\n   ${theme === 'dark' ? '🌙 Dark' : '☀️ Light'} theme:\n`);
    for (const url of urls) {
      const result = await auditPage(browser, url, theme, testIndex, totalTests, isRemote);
      results.push(result);
      testIndex++;
    }
  }

  await browser.close();
  if (server) server.close();

  // Ensure output directory exists
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Generate report
  const report = generateMarkdownReport(results);
  const reportPath = resolve(CONFIG.outputDir, 'a11y-report.md');
  writeFileSync(reportPath, report);

  // Summary
  const totalViolations = results.reduce((sum, r) =>
    sum + r.violations.reduce((s, v) => s + v.nodes.length, 0), 0);

  console.log('\n📊 Results');
  console.log('==========');
  console.log(`   Pages tested:     ${results.length}`);
  console.log(`   Total violations: ${totalViolations}`);
  console.log(`   Report: ${reportPath}\n`);

  // Exit with error code if violations found
  if (totalViolations > 0) {
    console.log('❌ Test failed: accessibility violations found\n');
    process.exit(1);
  } else {
    console.log('✅ Test passed: no accessibility violations\n');
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
