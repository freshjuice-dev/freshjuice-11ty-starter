#!/usr/bin/env node

/**
 * Accessibility Test
 *
 * Uses axe-core + Puppeteer to test local _site folder for WCAG violations.
 * Generates a Markdown report in _reports folder.
 *
 * Usage:
 *   npm run test:a11y
 *   npm run test:a11y -- --limit=5
 *
 * Requirements (optional dependencies):
 *   npm install puppeteer @axe-core/puppeteer serve-handler
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
  console.error('   Install them with: npm install puppeteer @axe-core/puppeteer serve-handler\n');
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
  skipPatterns: [
    /\.xml$/,
    /\.json$/,
    /\.txt$/,
    /\/404\//,
    /\/500\//,
  ],
};

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg.startsWith('--limit=')) {
      CONFIG.limit = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--standard=')) {
      CONFIG.standard = arg.split('=')[1];
    }
  }
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

// Run axe-core on a single page
async function auditPage(browser, url, index, total) {
  const page = await browser.newPage();
  const fullUrl = `http://localhost:${CONFIG.port}${url}`;

  try {
    await page.setViewport(CONFIG.viewport);
    process.stdout.write(`   [${index + 1}/${total}] ${url} `);

    await page.goto(fullUrl, {
      waitUntil: 'networkidle2',
      timeout: CONFIG.timeout
    });

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
      url,
      violations: results.violations,
      incomplete: results.incomplete,
    };

  } catch (error) {
    console.log(`- Error: ${error.message}`);
    return {
      url,
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

  let md = `# Accessibility Test Report

**Generated:** ${timestamp}
**Standard:** ${CONFIG.standard.toUpperCase()}
**Pages tested:** ${results.length}

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

  // Check if _site exists
  if (!existsSync(CONFIG.siteDir)) {
    console.error('\n❌ Error: _site folder not found. Run "npm run build" first.\n');
    process.exit(1);
  }

  // Get HTML files
  let urls = getHtmlFiles(CONFIG.siteDir);
  console.log(`   Found ${urls.length} pages to test`);

  if (CONFIG.limit > 0) {
    urls = urls.slice(0, CONFIG.limit);
    console.log(`   Limited to ${CONFIG.limit} pages`);
  }

  // Start server
  console.log('\n📡 Starting local server...');
  const server = await startServer();

  // Launch browser
  console.log('\n🚀 Running tests...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Audit each page
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const result = await auditPage(browser, urls[i], i, urls.length);
    results.push(result);
  }

  await browser.close();
  server.close();

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
