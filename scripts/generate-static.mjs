#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

// Read the base index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// All states with metadata
const states = [
  { name: 'Alabama', slug: 'alabama', abbr: 'AL' },
  { name: 'Alaska', slug: 'alaska', abbr: 'AK' },
  { name: 'Arizona', slug: 'arizona', abbr: 'AZ' },
  { name: 'Arkansas', slug: 'arkansas', abbr: 'AR' },
  { name: 'California', slug: 'california', abbr: 'CA' },
  { name: 'Colorado', slug: 'colorado', abbr: 'CO' },
  { name: 'Connecticut', slug: 'connecticut', abbr: 'CT' },
  { name: 'Delaware', slug: 'delaware', abbr: 'DE' },
  { name: 'Florida', slug: 'florida', abbr: 'FL' },
  { name: 'Georgia', slug: 'georgia', abbr: 'GA' },
  { name: 'Hawaii', slug: 'hawaii', abbr: 'HI' },
  { name: 'Idaho', slug: 'idaho', abbr: 'ID' },
  { name: 'Illinois', slug: 'illinois', abbr: 'IL' },
  { name: 'Indiana', slug: 'indiana', abbr: 'IN' },
  { name: 'Iowa', slug: 'iowa', abbr: 'IA' },
  { name: 'Kansas', slug: 'kansas', abbr: 'KS' },
  { name: 'Kentucky', slug: 'kentucky', abbr: 'KY' },
  { name: 'Louisiana', slug: 'louisiana', abbr: 'LA' },
  { name: 'Maine', slug: 'maine', abbr: 'ME' },
  { name: 'Maryland', slug: 'maryland', abbr: 'MD' },
  { name: 'Massachusetts', slug: 'massachusetts', abbr: 'MA' },
  { name: 'Michigan', slug: 'michigan', abbr: 'MI' },
  { name: 'Minnesota', slug: 'minnesota', abbr: 'MN' },
  { name: 'Mississippi', slug: 'mississippi', abbr: 'MS' },
  { name: 'Missouri', slug: 'missouri', abbr: 'MO' },
  { name: 'Montana', slug: 'montana', abbr: 'MT' },
  { name: 'Nebraska', slug: 'nebraska', abbr: 'NE' },
  { name: 'Nevada', slug: 'nevada', abbr: 'NV' },
  { name: 'New Hampshire', slug: 'new-hampshire', abbr: 'NH' },
  { name: 'New Jersey', slug: 'new-jersey', abbr: 'NJ' },
  { name: 'New Mexico', slug: 'new-mexico', abbr: 'NM' },
  { name: 'New York', slug: 'new-york', abbr: 'NY' },
  { name: 'North Carolina', slug: 'north-carolina', abbr: 'NC' },
  { name: 'North Dakota', slug: 'north-dakota', abbr: 'ND' },
  { name: 'Ohio', slug: 'ohio', abbr: 'OH' },
  { name: 'Oklahoma', slug: 'oklahoma', abbr: 'OK' },
  { name: 'Oregon', slug: 'oregon', abbr: 'OR' },
  { name: 'Pennsylvania', slug: 'pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', slug: 'rhode-island', abbr: 'RI' },
  { name: 'South Carolina', slug: 'south-carolina', abbr: 'SC' },
  { name: 'South Dakota', slug: 'south-dakota', abbr: 'SD' },
  { name: 'Tennessee', slug: 'tennessee', abbr: 'TN' },
  { name: 'Texas', slug: 'texas', abbr: 'TX' },
  { name: 'Utah', slug: 'utah', abbr: 'UT' },
  { name: 'Vermont', slug: 'vermont', abbr: 'VT' },
  { name: 'Virginia', slug: 'virginia', abbr: 'VA' },
  { name: 'Washington', slug: 'washington', abbr: 'WA' },
  { name: 'West Virginia', slug: 'west-virginia', abbr: 'WV' },
  { name: 'Wisconsin', slug: 'wisconsin', abbr: 'WI' },
  { name: 'Wyoming', slug: 'wyoming', abbr: 'WY' },
];

// Services
const services = [
  { name: 'Street Team Marketing', slug: 'street-teams' },
  { name: 'Brand Ambassadors', slug: 'brand-ambassadors' },
  { name: 'Event Staffing', slug: 'event-staffing' },
  { name: 'Product Sampling', slug: 'product-sampling' },
  { name: 'Flyer Distribution', slug: 'flyer-distribution' },
  { name: 'Guerrilla Marketing', slug: 'guerrilla-marketing' },
  { name: 'Experiential Marketing', slug: 'experiential-marketing' },
  { name: 'Promotional Staffing', slug: 'promotional-staffing' },
];

// Industries
const industries = [
  { name: 'Cannabis & CBD', slug: 'cannabis' },
  { name: 'Technology & SaaS', slug: 'technology' },
  { name: 'Food & Beverage', slug: 'food-beverage' },
  { name: 'Fitness & Wellness', slug: 'fitness-wellness' },
  { name: 'Real Estate', slug: 'real-estate' },
  { name: 'Retail', slug: 'retail' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Automotive', slug: 'automotive' },
  { name: 'Healthcare', slug: 'healthcare' },
  { name: 'Financial Services', slug: 'financial-services' },
  { name: 'Hospitality', slug: 'hospitality' },
  { name: 'Education', slug: 'education' },
  { name: 'Sports & Athletics', slug: 'sports' },
  { name: 'Beauty & Cosmetics', slug: 'beauty-cosmetics' },
];

function generateHtml(title, description, canonical) {
  return indexHtml
    .replace(
      /<title>.*?<\/title>/,
      `<title>${title}</title>`
    )
    .replace(
      /<meta name="description" content=".*?"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?"\s*\/?>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta name="twitter:title" content=".*?"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:description" content=".*?"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical".*?\/?>/g,
      ''
    )
    .replace(
      '</head>',
      `<link rel="canonical" href="${canonical}" />\n</head>`
    );
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

let count = 0;

// Generate /locations/index.html
const locationsDir = path.join(distDir, 'locations');
ensureDir(locationsDir);
fs.writeFileSync(
  path.join(locationsDir, 'index.html'),
  generateHtml(
    'Street Team Locations | Brand Ambassadors in 1,000+ Cities | Street Teams Co',
    'Street team marketing in all 50 states and 1,000+ cities. Brand ambassadors from $25/hr. 94% client retention. Find local street teams near you and get a free quote.',
    'https://streetteamsco.com/locations'
  )
);
count++;

// Generate state pages
for (const state of states) {
  const stateDir = path.join(locationsDir, state.slug);
  ensureDir(stateDir);

  fs.writeFileSync(
    path.join(stateDir, 'index.html'),
    generateHtml(
      `Street Teams in ${state.name} | Brand Ambassadors from $25/hr | Street Teams Co`,
      `Street team marketing across ${state.abbr}. Brand ambassadors, event staffing & product sampling from $25/hr. 94% client retention. Get a free quote today.`,
      `https://streetteamsco.com/locations/${state.slug}`
    )
  );
  count++;
}

// Generate city pages by parsing locations.ts
const locationsTs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'locations.ts'), 'utf8');
const stateBlockRegex = /name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*abbreviation:\s*'([^']+)',\s*cities:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
const cityNameRegex = /city\('([^']+)'/g;

let stateMatch;
while ((stateMatch = stateBlockRegex.exec(locationsTs)) !== null) {
  const stateName = stateMatch[1];
  const stateSlug = stateMatch[2];
  const stateAbbr = stateMatch[3];
  const citiesBlock = stateMatch[4];

  let cityMatch;
  while ((cityMatch = cityNameRegex.exec(citiesBlock)) !== null) {
    const cityName = cityMatch[1];
    const citySlug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cityDir = path.join(locationsDir, stateSlug, citySlug);
    ensureDir(cityDir);

    fs.writeFileSync(
      path.join(cityDir, 'index.html'),
      generateHtml(
        `Street Teams ${cityName}, ${stateAbbr} | Brand Ambassadors from $25/hr | Free Quote`,
        `Street team marketing in ${cityName}, ${stateAbbr}. Brand ambassadors, event staffing & product sampling from $25/hr. 94% client retention, 500+ campaigns. Get a free quote today.`,
        `https://streetteamsco.com/locations/${stateSlug}/${citySlug}`
      )
    );
    count++;
  }
}

// Generate /services/index.html
const servicesDir = path.join(distDir, 'services');
ensureDir(servicesDir);
fs.writeFileSync(
  path.join(servicesDir, 'index.html'),
  generateHtml(
    'Street Team Marketing Services | Brand Ambassadors & Event Staffing | Street Teams Co',
    'Street team marketing services in 1,000+ cities. Brand ambassadors from $25/hr, event staffing, product sampling, guerrilla marketing. 94% client retention. Get a free quote today.',
    'https://streetteamsco.com/services'
  )
);
count++;

// Generate individual service pages
for (const service of services) {
  const serviceDir = path.join(servicesDir, service.slug);
  ensureDir(serviceDir);

  fs.writeFileSync(
    path.join(serviceDir, 'index.html'),
    generateHtml(
      `${service.name} Services | Nationwide from $25/hr | Street Teams Co`,
      `${service.name} services in 1,000+ US cities. 500+ campaigns, 94% client retention. Get a free quote for your ${service.name.toLowerCase()} campaign today.`,
      `https://streetteamsco.com/services/${service.slug}`
    )
  );
  count++;
}

// Generate /industries/index.html
const industriesDir = path.join(distDir, 'industries');
ensureDir(industriesDir);
fs.writeFileSync(
  path.join(industriesDir, 'index.html'),
  generateHtml(
    'Street Team Marketing by Industry | 14 Verticals | Street Teams Co',
    'Street team marketing for cannabis, tech, food & beverage, fitness, real estate, retail & more. Industry-specific brand ambassadors in 1,000+ cities. Get a free quote.',
    'https://streetteamsco.com/industries'
  )
);
count++;

// Generate individual industry pages
for (const industry of industries) {
  const industryDir = path.join(industriesDir, industry.slug);
  ensureDir(industryDir);

  fs.writeFileSync(
    path.join(industryDir, 'index.html'),
    generateHtml(
      `${industry.name} Street Team Marketing | Brand Ambassadors & Activations | Street Teams Co`,
      `${industry.name} street team marketing in 1,000+ cities. Industry-specific brand ambassadors, event staffing & activations. Get a free quote.`,
      `https://streetteamsco.com/industries/${industry.slug}`
    )
  );
  count++;
}

// Generate standalone pages
const standalonePages = [
  { slug: 'pricing', title: 'Street Team Pricing 2026 | Brand Ambassadors from $25/hr | Street Teams Co', description: 'Street team marketing pricing: brand ambassadors from $25/hr, event staffing from $30/hr. No long-term contracts. 500+ campaigns. Get a free custom quote.' },
  { slug: 'privacy', title: 'Privacy Policy | Street Teams Co', description: 'Street Teams Co privacy policy. Learn how we collect, use, and protect your personal information.' },
  { slug: 'terms', title: 'Terms of Service | Street Teams Co', description: 'Street Teams Co terms of service. Read our terms and conditions for using our website and engaging our street marketing services.' },
  { slug: 'our-team', title: 'Street Teams Co Leadership | 10,000+ Brand Ambassadors Nationwide', description: 'Street Teams Co leadership team with 15+ years of experiential marketing experience. 10,000+ vetted brand ambassadors, 98% show-up rate, 4.9/5 client rating.' },
  { slug: 'testimonials', title: 'Street Team Marketing Reviews & Results | 500+ Campaigns | Street Teams Co', description: 'Street team marketing success stories from 500+ campaigns. 94% client retention, 4.9/5 rating. See real ROI results from brand ambassador campaigns.' },
];

for (const page of standalonePages) {
  const pageDir = path.join(distDir, page.slug);
  ensureDir(pageDir);
  fs.writeFileSync(
    path.join(pageDir, 'index.html'),
    generateHtml(page.title, page.description, `https://streetteamsco.com/${page.slug}`)
  );
  count++;
}

console.log(`\n✅ Generated ${count} static pages with unique titles and meta tags!`);
