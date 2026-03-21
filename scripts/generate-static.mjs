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
  { name: 'Street Team Marketing', slug: 'street-team-marketing' },
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
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${description}">`
    )
    .replace(
      /<link rel="canonical".*?>/g,
      ''
    )
    .replace(
      '</head>',
      `<link rel="canonical" href="${canonical}">\n</head>`
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
    'Street Team Locations Nationwide | Street Teams Co',
    'Find professional brand ambassadors and street marketing teams in all 50 states. Street Teams Co provides event staffing and promotional teams in 1,000+ cities.',
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
      `Street Teams in ${state.name} | Brand Ambassadors & Event Staffing | Street Teams Co`,
      `Hire professional brand ambassadors and street marketing teams in ${state.name}. Street Teams Co provides event staffing and promotional teams across ${state.abbr}.`,
      `https://streetteamsco.com/locations/${state.slug}`
    )
  );
  count++;
}

// Generate /services/index.html
const servicesDir = path.join(distDir, 'services');
ensureDir(servicesDir);
fs.writeFileSync(
  path.join(servicesDir, 'index.html'),
  generateHtml(
    'Street Marketing Services | Brand Ambassadors, Event Staffing & More | Street Teams Co',
    'Explore our full range of street marketing services: street teams, brand ambassadors, event staffing, product sampling, flyer distribution, guerrilla and experiential marketing nationwide.',
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
      `${service.name} Services | Street Teams Co`,
      `Professional ${service.name.toLowerCase()} services nationwide. Street Teams Co delivers high-impact ${service.name.toLowerCase()} campaigns in 1,000+ cities.`,
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
    'Industries We Serve | Street Team Marketing by Vertical | Street Teams Co',
    'Street Teams Co provides specialized street marketing, brand ambassadors, and event staffing for cannabis, tech, food, fitness, real estate, retail, entertainment, and more.',
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
      `${industry.name} Street Marketing | Brand Ambassadors & Event Staffing | Street Teams Co`,
      `Specialized street marketing solutions for the ${industry.name.toLowerCase()} industry. Brand ambassadors, event staffing, and activations tailored to ${industry.name.toLowerCase()}.`,
      `https://streetteamsco.com/industries/${industry.slug}`
    )
  );
  count++;
}

console.log(`\n✅ Generated ${count} static pages with unique titles and meta tags!`);
