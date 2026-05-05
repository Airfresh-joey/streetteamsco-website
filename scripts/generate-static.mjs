#!/usr/bin/env node
// scripts/generate-static.mjs
// Coordinator: generates ALL full-content static HTML pages for the site
// Replaces the old meta-tag-swapping approach with complete, standalone HTML pages

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const srcDir = path.join(__dirname, '..', 'src');

// Import all generators
import { generateServicePages } from './generators/service-pages.mjs';
import { generateIndustryPages } from './generators/industry-pages.mjs';
import { generateStatePages } from './generators/state-pages.mjs';
import { generateCityPages } from './generators/city-pages.mjs';
import { generateStandalonePages } from './generators/standalone-pages.mjs';

console.log('\n📄 Generating full-content static HTML pages...\n');

let total = 0;

// 1. Service pages (8 individual + 1 index = 9)
const serviceCount = generateServicePages(distDir, srcDir);
console.log(`  ✅ Services:    ${serviceCount} pages`);
total += serviceCount;

// 2. Industry pages (14 individual + 1 index = 15)
const industryCount = generateIndustryPages(distDir, srcDir);
console.log(`  ✅ Industries:  ${industryCount} pages`);
total += industryCount;

// 3. State pages (50)
const stateCount = generateStatePages(distDir, srcDir);
console.log(`  ✅ States:      ${stateCount} pages`);
total += stateCount;

// 4. City pages (~1,050)
const cityCount = generateCityPages(distDir, srcDir);
console.log(`  ✅ Cities:      ${cityCount} pages`);
total += cityCount;

// 5. Standalone pages (pricing, testimonials, our-team, locations index, privacy, terms = 6)
const standaloneCount = generateStandalonePages(distDir, srcDir);
console.log(`  ✅ Standalone:  ${standaloneCount} pages`);
total += standaloneCount;

console.log(`\n🎉 Generated ${total} full-content static HTML pages!\n`);
