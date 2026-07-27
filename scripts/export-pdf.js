#!/usr/bin/env node
/**
 * Export HTML visual guides to print-ready PDF via Puppeteer.
 * Usage: node scripts/export-pdf.js [chapter-file.html]
 *        node scripts/export-pdf.js --all
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const CHAPTERS_DIR = path.join(ROOT, 'chapters');
const OUTPUT_DIR = path.join(ROOT, 'output');

const SYSTEM_CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  path.join(process.env.HOME || '', 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
];

function resolveChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  for (const candidate of SYSTEM_CHROME_PATHS) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function launchBrowser() {
  const launchOptions = { headless: 'new' };

  try {
    return await puppeteer.launch(launchOptions);
  } catch (err) {
    const systemChrome = resolveChromePath();
    if (!systemChrome) {
      console.error('\nNo Chrome found. Fix one of:\n');
      console.error('  1. npm run install:browser');
      console.error('  2. Install Google Chrome');
      console.error('  3. Set PUPPETEER_EXECUTABLE_PATH=/path/to/chrome\n');
      throw err;
    }
    console.log(`Using system Chrome: ${systemChrome}`);
    return puppeteer.launch({ ...launchOptions, executablePath: systemChrome });
  }
}

async function exportPdf(htmlPath) {
  const basename = path.basename(htmlPath, '.html');
  const outputPath = path.join(OUTPUT_DIR, `${basename}.pdf`);

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', right: '0.6in', bottom: '0.6in', left: '0.6in' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%;font-size:8px;text-align:center;color:#888;padding:0 0.6in;">
        DDIA Visual Guide · ${basename.replace(/-/g, ' ')} · Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>`,
  });

  await browser.close();
  console.log(`✓ ${outputPath}`);
  return outputPath;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const arg = process.argv[2];
  let files;

  if (arg === '--all') {
    files = fs.readdirSync(CHAPTERS_DIR)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(CHAPTERS_DIR, f))
      .sort();
  } else if (arg) {
    files = [path.resolve(arg)];
  } else {
    files = fs.readdirSync(CHAPTERS_DIR)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(CHAPTERS_DIR, f))
      .sort();
  }

  if (files.length === 0) {
    console.error('No HTML files found in chapters/');
    process.exit(1);
  }

  for (const file of files) {
    await exportPdf(file);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
