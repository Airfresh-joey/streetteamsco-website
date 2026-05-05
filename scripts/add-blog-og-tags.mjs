#!/usr/bin/env node

/**
 * add-blog-og-tags.mjs
 *
 * Adds missing Open Graph and Twitter Card meta tags to all blog post HTML files
 * in /public/blog/. Skips index.html. Skips files that already have og:image.
 *
 * Tags added (if missing):
 *   - og:type, og:site_name, og:title, og:description, og:url, og:image
 *   - twitter:card, twitter:title, twitter:description, twitter:image
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const BLOG_DIR = new URL('../public/blog/', import.meta.url).pathname;
const OG_IMAGE_URL = 'https://streetteamsco.com/images/og-image.jpg';
const SITE_NAME = 'Street Teams Co';
const BASE_URL = 'https://streetteamsco.com/blog/';

async function main() {
  const files = await readdir(BLOG_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html') && f !== 'index.html').sort();

  console.log(`Found ${htmlFiles.length} blog HTML files (excluding index.html)\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const filename of htmlFiles) {
    const filepath = join(BLOG_DIR, filename);
    try {
      let html = await readFile(filepath, 'utf-8');

      // Check if og:image already exists — skip if so
      if (html.includes('og:image')) {
        console.log(`  SKIP (already has og:image): ${filename}`);
        skipped++;
        continue;
      }

      // Extract title from <title> tag
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const fullTitle = titleMatch ? titleMatch[1].trim() : filename.replace('.html', '');
      // Remove " | Street Teams Co" suffix for OG title
      const ogTitle = fullTitle.replace(/\s*\|\s*Street Teams Co\s*$/i, '').trim();

      // Extract description from <meta name="description">
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
      let ogDescription = descMatch ? descMatch[1].trim() : '';
      // Fallback: use first 160 chars of title
      if (!ogDescription) {
        ogDescription = ogTitle.substring(0, 160);
      }
      // Truncate description to 160 chars if longer
      if (ogDescription.length > 160) {
        ogDescription = ogDescription.substring(0, 157) + '...';
      }

      // Build the canonical URL for this post
      const slug = filename.replace('.html', '');
      const ogUrl = `${BASE_URL}${slug}`;

      // Build the tags to insert — only add tags that are missing
      const tagsToAdd = [];

      if (!html.includes('og:type')) {
        tagsToAdd.push(`  <meta property="og:type" content="article">`);
      }
      if (!html.includes('og:site_name')) {
        tagsToAdd.push(`  <meta property="og:site_name" content="${SITE_NAME}">`);
      }
      if (!html.includes('og:title')) {
        tagsToAdd.push(`  <meta property="og:title" content="${escapeAttr(ogTitle)}">`);
      }
      if (!html.includes('og:description')) {
        tagsToAdd.push(`  <meta property="og:description" content="${escapeAttr(ogDescription)}">`);
      }
      if (!html.includes('og:url')) {
        tagsToAdd.push(`  <meta property="og:url" content="${ogUrl}">`);
      }
      // og:image is always missing at this point (checked above)
      tagsToAdd.push(`  <meta property="og:image" content="${OG_IMAGE_URL}">`);

      if (!html.includes('twitter:card')) {
        tagsToAdd.push(`  <meta name="twitter:card" content="summary_large_image">`);
      }
      if (!html.includes('twitter:title')) {
        tagsToAdd.push(`  <meta name="twitter:title" content="${escapeAttr(ogTitle)}">`);
      }
      if (!html.includes('twitter:description')) {
        tagsToAdd.push(`  <meta name="twitter:description" content="${escapeAttr(ogDescription)}">`);
      }
      // twitter:image is always missing (checked above via og:image gate)
      tagsToAdd.push(`  <meta name="twitter:image" content="${OG_IMAGE_URL}">`);

      if (tagsToAdd.length === 0) {
        console.log(`  SKIP (all tags present): ${filename}`);
        skipped++;
        continue;
      }

      const insertBlock = '\n' + tagsToAdd.join('\n');

      // Strategy: Insert after the last <meta> tag in the <head> section, before <script> or <style> or </head>
      // Find the position right before the first <script or <style in the head
      const headEnd = html.indexOf('</head>');
      if (headEnd === -1) {
        console.log(`  ERROR (no </head>): ${filename}`);
        errors++;
        continue;
      }

      // Find the last meta tag or link tag before scripts/style/head-end
      // We'll look for the last occurrence of a line containing <meta or <link before <script> or <style>
      const headContent = html.substring(0, headEnd);

      // Find the best insertion point: after the last <meta ...> tag line, before <script> or <style>
      // Look for the first <script or <style tag in the head
      const scriptIdx = headContent.indexOf('<script');
      const styleIdx = headContent.indexOf('<style');
      let insertBefore;
      if (scriptIdx !== -1 && styleIdx !== -1) {
        insertBefore = Math.min(scriptIdx, styleIdx);
      } else if (scriptIdx !== -1) {
        insertBefore = scriptIdx;
      } else if (styleIdx !== -1) {
        insertBefore = styleIdx;
      } else {
        insertBefore = headEnd;
      }

      // Insert the new meta tags right before the <script>/<style> tag
      html = html.substring(0, insertBefore) + insertBlock + '\n' + html.substring(insertBefore);

      await writeFile(filepath, html, 'utf-8');
      console.log(`  UPDATED (${tagsToAdd.length} tags): ${filename}`);
      updated++;

    } catch (err) {
      console.error(`  ERROR: ${filename} — ${err.message}`);
      errors++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Results:`);
  console.log(`  Updated: ${updated} files`);
  console.log(`  Skipped: ${skipped} files`);
  console.log(`  Errors:  ${errors} files`);
  console.log(`  Total:   ${htmlFiles.length} files processed`);
  console.log(`========================================\n`);
}

/**
 * Escape a string for use in an HTML attribute value (double-quoted).
 */
function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
