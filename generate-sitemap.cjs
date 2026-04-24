// Generate sitemap.xml for streetteamsco.com
const fs = require('fs');
const path = require('path');

// Parse locations from TypeScript file
const locationsFile = fs.readFileSync('./src/data/locations.ts', 'utf8');

// Extract state slugs and city slugs
const stateBlockRegex = /name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*abbreviation:\s*'[^']+',\s*cities:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
const cityNameRegex = /city\('([^']+)'/g;

const states = [];
let stateMatch;
while ((stateMatch = stateBlockRegex.exec(locationsFile)) !== null) {
  const stateName = stateMatch[1];
  const stateSlug = stateMatch[2];
  const citiesBlock = stateMatch[3];

  const cities = [];
  let cityMatch;
  while ((cityMatch = cityNameRegex.exec(citiesBlock)) !== null) {
    const cityName = cityMatch[1];
    const citySlug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    cities.push({ name: cityName, slug: citySlug });
  }

  states.push({ name: stateName, slug: stateSlug, cities });
}

// Get blog post files
const blogDir = './public/blog';
const blogFiles = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => f.replace('.html', ''));

const baseUrl = 'https://streetteamsco.com';
const today = new Date().toISOString().split('T')[0];

const urls = [];

function addUrl(loc, priority, changefreq = 'monthly') {
  urls.push({ loc, priority, changefreq });
}

// Core pages
addUrl('/', 1.0, 'weekly');
addUrl('/services', 0.9, 'weekly');
addUrl('/pricing', 0.9, 'weekly');
addUrl('/locations', 0.9, 'weekly');
addUrl('/industries', 0.8, 'weekly');
addUrl('/testimonials', 0.8, 'monthly');
addUrl('/our-team', 0.7, 'monthly');
addUrl('/privacy', 0.3, 'yearly');
addUrl('/terms', 0.3, 'yearly');

// Service pages
const services = [
  'street-teams', 'brand-ambassadors', 'event-staffing',
  'product-sampling', 'flyer-distribution', 'guerrilla-marketing',
  'experiential-marketing', 'promotional-staffing',
];
services.forEach(s => addUrl(`/services/${s}`, 0.8, 'monthly'));

// Industry pages
const industries = [
  'cannabis', 'technology', 'food-beverage', 'fitness-wellness',
  'real-estate', 'retail', 'entertainment', 'automotive',
  'healthcare', 'financial-services', 'hospitality', 'education',
  'sports', 'beauty-cosmetics',
];
industries.forEach(i => addUrl(`/industries/${i}`, 0.7, 'monthly'));

// State pages
states.forEach(state => {
  addUrl(`/locations/${state.slug}`, 0.7, 'monthly');
  // City pages
  state.cities.forEach(city => {
    addUrl(`/locations/${state.slug}/${city.slug}`, 0.6, 'monthly');
  });
});

// Blog index
addUrl('/blog/', 0.8, 'daily');

// Blog posts
blogFiles.forEach(slug => {
  addUrl(`/blog/${slug}.html`, 0.6, 'monthly');
});

// Build XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

urls.forEach(({ loc, priority, changefreq }) => {
  sitemap += `  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);

const totalCities = states.reduce((sum, s) => sum + s.cities.length, 0);
console.log(`Generated sitemap.xml:`);
console.log(`  ${states.length} states, ${totalCities} cities`);
console.log(`  ${services.length} services, ${industries.length} industries`);
console.log(`  ${blogFiles.length} blog posts`);
console.log(`  ${urls.length} total URLs`);
