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

// City + Service pages (generated static HTML in /public/locations/[state]/[city]/[service].html)
const cityServiceDir = './public/locations';
const coreServices = ['brand-ambassadors', 'event-staffing', 'street-teams', 'product-sampling', 'guerrilla-marketing'];
if (fs.existsSync(cityServiceDir)) {
  const stateDirs = fs.readdirSync(cityServiceDir).filter(f => {
    const full = path.join(cityServiceDir, f);
    return fs.statSync(full).isDirectory();
  });
  stateDirs.forEach(stateDir => {
    const statePath = path.join(cityServiceDir, stateDir);
    const cityDirs = fs.readdirSync(statePath).filter(f => {
      const full = path.join(statePath, f);
      return fs.statSync(full).isDirectory();
    });
    cityDirs.forEach(cityDir => {
      const cityPath = path.join(statePath, cityDir);
      const serviceFiles = fs.readdirSync(cityPath).filter(f => f.endsWith('.html'));
      serviceFiles.forEach(serviceFile => {
        const serviceSlug = serviceFile.replace('.html', '');
        addUrl(`/locations/${stateDir}/${cityDir}/${serviceSlug}`, 0.7, 'monthly');
      });
    });
  });
}

// Pillar pages (static HTML in /public/)
const pillarPages = [
  'street-team-marketing-agency',
  'brand-ambassador-agency',
  'guerrilla-marketing-agency',
  'product-sampling-agency',
];
pillarPages.forEach(p => addUrl(`/${p}`, 0.95, 'weekly'));

// Event / time-sensitive landing pages
addUrl('/fifa-world-cup-2026-staffing', 0.95, 'weekly');

// FIFA World Cup city sub-pages (static HTML in /public/fifa-world-cup-2026-staffing/)
const fifaCityDir = './public/fifa-world-cup-2026-staffing';
if (fs.existsSync(fifaCityDir)) {
  const fifaCityFiles = fs.readdirSync(fifaCityDir)
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''));
  fifaCityFiles.forEach(slug => {
    addUrl(`/fifa-world-cup-2026-staffing/${slug}`, 0.9, 'weekly');
  });
}

// Comparison pages (static HTML in /public/compare/)
const compareDir = './public/compare';
if (fs.existsSync(compareDir)) {
  const compareFiles = fs.readdirSync(compareDir)
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''));
  compareFiles.forEach(slug => {
    addUrl(`/compare/${slug}.html`, 0.7, 'monthly');
  });
}

// Blog index
addUrl('/blog/', 0.8, 'daily');

// Blog posts (World Cup posts get higher priority)
const worldCupBlogSlugs = [
  'world-cup-2026-staffing-timeline',
  'world-cup-2026-experiential-marketing-guide',
  'world-cup-2026-event-staffing-cost',
  'bilingual-multilingual-staff-world-cup-2026',
  'world-cup-2026-fan-zone-staffing-guide',
  'world-cup-2026-staffing-agency-comparison',
  'how-to-activate-world-cup-2026-without-fifa-sponsorship',
];
blogFiles.forEach(slug => {
  const isWorldCup = worldCupBlogSlugs.includes(slug);
  addUrl(`/blog/${slug}.html`, isWorldCup ? 0.8 : 0.6, isWorldCup ? 'weekly' : 'monthly');
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
