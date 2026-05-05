// scripts/generators/shared.mjs
// Shared CSS, header, footer, HTML wrapper, data parsers, JSON-LD helpers

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Data parsers — read TypeScript data files at build time with regex
// ---------------------------------------------------------------------------

export function parseLocations(srcDir) {
  const raw = fs.readFileSync(path.join(srcDir, 'data', 'locations.ts'), 'utf8');
  const stateBlockRegex = /name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*abbreviation:\s*'([^']+)',\s*cities:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
  const cityRegex = /city\('([^']+)'(?:,\s*'([^']*)')?\)/g;

  const states = [];
  let m;
  while ((m = stateBlockRegex.exec(raw)) !== null) {
    const cities = [];
    let cm;
    while ((cm = cityRegex.exec(m[4])) !== null) {
      const name = cm[1];
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      cities.push({ name, slug, population: cm[2] || '' });
    }
    states.push({ name: m[1], slug: m[2], abbreviation: m[3], cities });
  }
  return states;
}

export function parseServices(srcDir) {
  const raw = fs.readFileSync(path.join(srcDir, 'data', 'services.ts'), 'utf8');
  const services = [];

  // Match each service object block
  const serviceBlockRegex = /\{\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*tagline:\s*'([^']+)',\s*description:\s*'([^']+)',\s*features:\s*\[([\s\S]*?)\],\s*benefits:\s*\[([\s\S]*?)\],\s*useCases:\s*\[([\s\S]*?)\],\s*faq:\s*\[([\s\S]*?)\],?\s*\}/g;
  const stringArrayRegex = /'([^']+)'/g;

  let m;
  while ((m = serviceBlockRegex.exec(raw)) !== null) {
    const features = [];
    let s;
    while ((s = stringArrayRegex.exec(m[5])) !== null) features.push(s[1]);

    const benefits = [];
    stringArrayRegex.lastIndex = 0;
    while ((s = stringArrayRegex.exec(m[6])) !== null) benefits.push(s[1]);

    const useCases = [];
    stringArrayRegex.lastIndex = 0;
    while ((s = stringArrayRegex.exec(m[7])) !== null) useCases.push(s[1]);

    // Parse FAQ array
    const faq = [];
    const faqRegex = /\{\s*q:\s*'([^']+)',\s*a:\s*'([^']+)'\s*\}/g;
    let fq;
    while ((fq = faqRegex.exec(m[8])) !== null) {
      faq.push({ q: fq[1], a: fq[2] });
    }

    services.push({
      name: m[1], slug: m[2], tagline: m[3], description: m[4],
      features, benefits, useCases, faq,
    });
  }
  return services;
}

export function parseIndustries(srcDir) {
  const raw = fs.readFileSync(path.join(srcDir, 'data', 'industries.ts'), 'utf8');
  const industries = [];

  // Match each industry block
  const industryBlockRegex = /\{\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*tagline:\s*'([^']+)',\s*description:\s*'([\s\S]*?)',\s*challenges:\s*\[([\s\S]*?)\],\s*solutions:\s*\[([\s\S]*?)\],\s*services:\s*\[([\s\S]*?)\],\s*caseStudy:\s*\{\s*title:\s*'([^']+)',\s*result:\s*'([^']+)'\s*\}/g;
  const stringArrayRegex = /'([^']+)'/g;

  let m;
  while ((m = industryBlockRegex.exec(raw)) !== null) {
    const challenges = [];
    let s;
    while ((s = stringArrayRegex.exec(m[5])) !== null) challenges.push(s[1]);

    const solutions = [];
    stringArrayRegex.lastIndex = 0;
    while ((s = stringArrayRegex.exec(m[6])) !== null) solutions.push(s[1]);

    const services = [];
    stringArrayRegex.lastIndex = 0;
    while ((s = stringArrayRegex.exec(m[7])) !== null) services.push(s[1]);

    industries.push({
      name: m[1], slug: m[2], tagline: m[3], description: m[4],
      challenges, solutions, services,
      caseStudy: { title: m[8], result: m[9] },
    });
  }
  return industries;
}

// ---------------------------------------------------------------------------
// Inline CSS (extracted from pillar page / city-service page pattern)
// ---------------------------------------------------------------------------

export const INLINE_CSS = `    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.7; color: #1a1a2e; background: #fafafa; }
    header { background: #1a1a2e; padding: 1rem 0; position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { color: #fff; font-weight: 800; font-size: 1.2rem; text-decoration: none; letter-spacing: 1px; }
    .nav-links a { color: rgba(255,255,255,0.8); text-decoration: none; margin-left: 1.5rem; font-size: 0.9rem; }
    .nav-links a:hover { color: #fff; }
    .page-hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 5rem 2rem 4rem; color: #fff; }
    .page-hero-inner { max-width: 900px; margin: 0 auto; }
    .breadcrumb { font-size: 0.85rem; margin-bottom: 1.5rem; opacity: 0.7; }
    .breadcrumb a { color: #fff; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .page-hero h1 { font-size: 2.5rem; line-height: 1.2; margin-bottom: 1rem; font-weight: 800; }
    .page-hero p { font-size: 1.15rem; opacity: 0.9; max-width: 700px; }
    .content { max-width: 900px; margin: 0 auto; padding: 3rem 2rem 4rem; }
    .content h2 { font-size: 1.75rem; margin: 2.5rem 0 1rem; color: #1a1a2e; font-weight: 700; }
    .content h3 { font-size: 1.3rem; margin: 2rem 0 0.75rem; color: #16213e; font-weight: 600; }
    .content p { margin-bottom: 1.25rem; font-size: 1.05rem; color: #333; }
    .content ul, .content ol { margin: 1rem 0 1.5rem 1.5rem; }
    .content li { margin-bottom: 0.5rem; font-size: 1.05rem; color: #333; }
    .content a { color: #2563eb; text-decoration: none; }
    .content a:hover { text-decoration: underline; }
    .content strong { color: #1a1a2e; }
    .stats-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin: 2rem 0; }
    .stat-box { background: #1a1a2e; color: #fff; padding: 1.5rem; border-radius: 12px; text-align: center; }
    .stat-box .number { font-size: 2rem; font-weight: 800; color: #f59e0b; }
    .stat-box .label { font-size: 0.85rem; opacity: 0.8; margin-top: 0.25rem; }
    .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0 2rem; }
    .service-box { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.5rem; }
    .service-box h4 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #1a1a2e; }
    .service-box p { font-size: 0.95rem; color: #555; margin: 0; }
    .pricing-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0 2rem; }
    .pricing-table th, .pricing-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .pricing-table th { background: #1a1a2e; color: #fff; font-weight: 600; }
    .pricing-table tr:hover { background: #f0f4ff; }
    .cta-section { background: linear-gradient(135deg, #1a1a2e, #16213e); color: #fff; padding: 3rem; border-radius: 16px; text-align: center; margin: 3rem 0; }
    .cta-section h2 { color: #fff; margin-bottom: 1rem; }
    .cta-section p { color: rgba(255,255,255,0.9); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
    .cta-btn { display: inline-block; background: #f59e0b; color: #1a1a2e; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; }
    .cta-btn:hover { background: #d97706; text-decoration: none; }
    .faq-section { margin: 2.5rem 0; }
    .faq-item { border-bottom: 1px solid #e5e7eb; padding: 1.25rem 0; }
    .faq-item h4 { font-size: 1.1rem; color: #1a1a2e; margin-bottom: 0.5rem; }
    .faq-item p { color: #555; margin: 0; font-size: 1rem; }
    .internal-links { background: #f0f4ff; border-radius: 12px; padding: 2rem; margin: 2rem 0; }
    .internal-links h3 { margin-top: 0; }
    .link-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; }
    .link-grid a { display: block; padding: 0.35rem 0; color: #2563eb; font-size: 0.95rem; }
    .included-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
    .included-item { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.25rem; display: flex; align-items: flex-start; gap: 0.75rem; }
    .included-item .check { color: #f59e0b; font-weight: 700; font-size: 1.25rem; flex-shrink: 0; line-height: 1.4; }
    .included-item p { margin: 0; font-size: 0.95rem; color: #333; }
    .cities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
    .city-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1rem 1.25rem; text-decoration: none; color: #1a1a2e; transition: border-color 0.2s, box-shadow 0.2s; }
    .city-card:hover { border-color: #2563eb; box-shadow: 0 2px 8px rgba(37,99,235,0.1); text-decoration: none; }
    .city-card h4 { font-size: 1rem; margin-bottom: 0.25rem; }
    .city-card .pop { font-size: 0.85rem; color: #666; }
    footer { background: #1a1a2e; color: rgba(255,255,255,0.7); padding: 2rem; text-align: center; font-size: 0.85rem; }
    footer a { color: rgba(255,255,255,0.9); text-decoration: none; }
    @media (max-width: 768px) { .page-hero h1 { font-size: 1.8rem; } .content { padding: 2rem 1.5rem; } .nav-links { display: none; } .stats-bar { grid-template-columns: repeat(2, 1fr); } }`;

// ---------------------------------------------------------------------------
// HTML building blocks
// ---------------------------------------------------------------------------

export function header() {
  return `<header>
  <div class="header-inner">
    <a href="/" class="logo">STREET TEAMS CO</a>
    <div class="nav-links">
      <a href="/services">Services</a>
      <a href="/pricing">Pricing</a>
      <a href="/industries">Industries</a>
      <a href="/locations">Locations</a>
      <a href="/blog/">Blog</a>
      <a href="/#contact">Get Quote</a>
    </div>
  </div>
</header>`;
}

export function footer() {
  return `<footer>
  <p>&copy; 2026 <a href="/">Street Teams Co</a>. All rights reserved. | <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a> | <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></p>
  <p style="margin-top: 0.5rem;"><a href="/locations">Locations</a> | <a href="/services">Services</a> | <a href="/pricing">Pricing</a> | <a href="/industries">Industries</a> | <a href="/blog/">Blog</a></p>
</footer>`;
}

export function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function escJsonLd(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// ---------------------------------------------------------------------------
// Full page wrapper
// ---------------------------------------------------------------------------

export function wrapPage({ title, description, canonical, ogImage, keywords, schemas, body }) {
  const og = ogImage || 'https://streetteamsco.com/images/og-image.jpg';
  const kw = keywords ? `\n  <meta name="keywords" content="${escHtml(keywords)}">` : '';
  const schemaBlocks = (schemas || []).map(s =>
    `  <script type="application/ld+json">\n  ${JSON.stringify(s, null, 2).split('\n').join('\n  ')}\n  </script>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escHtml(description)}">
  <meta name="author" content="Street Teams Co">${kw}
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
  <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">

  <meta property="og:title" content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Street Teams Co">
  <meta property="og:image" content="${og}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(description)}">
  <meta name="twitter:image" content="${og}">

${schemaBlocks}

  <style>
${INLINE_CSS}
  </style>
</head>
<body>

${header()}

${body}

${footer()}

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Common JSON-LD schema builders
// ---------------------------------------------------------------------------

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema({ name, description, url, priceLow, priceHigh, isPerHour }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: {
      '@type': 'MarketingAgency',
      name: 'Street Teams Co',
      url: 'https://streetteamsco.com',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
    },
    description,
    areaServed: 'United States',
    url,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: priceLow,
      highPrice: priceHigh,
      priceCurrency: 'USD',
      ...(isPerHour ? { unitText: 'per hour' } : {}),
    },
  };
}

export function localBusinessSchema({ name, description, url, city, stateAbbr }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: stateAbbr,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: city },
    priceRange: '$25 - $75',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Street Teams Co',
      url: 'https://streetteamsco.com',
    },
  };
}

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function writePage(filePath, html) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, html, 'utf8');
}

// ---------------------------------------------------------------------------
// CTA and internal links helpers
// ---------------------------------------------------------------------------

export function ctaSection(heading, text, buttonText, buttonHref) {
  return `  <div class="cta-section">
    <h2>${heading}</h2>
    <p>${text}</p>
    <a href="${buttonHref || '/#contact'}" class="cta-btn">${buttonText || 'Get a Free Quote'}</a>
  </div>`;
}

export function internalLinksBlock(heading, links) {
  const grid = links.map(l => `      <a href="${l.url}">${escHtml(l.label)}</a>`).join('\n');
  return `  <div class="internal-links">
    <h3>${heading}</h3>
    <div class="link-grid">
${grid}
    </div>
  </div>`;
}

export function statsBar(stats) {
  const boxes = stats.map(s =>
    `    <div class="stat-box"><div class="number">${s.number}</div><div class="label">${s.label}</div></div>`
  ).join('\n');
  return `  <div class="stats-bar">\n${boxes}\n  </div>`;
}

export function faqHtml(faqs) {
  const items = faqs.map(f =>
    `    <div class="faq-item">\n      <h4>${escHtml(f.q)}</h4>\n      <p>${escHtml(f.a)}</p>\n    </div>`
  ).join('\n');
  return `  <div class="faq-section">\n${items}\n  </div>`;
}

export const BASE_URL = 'https://streetteamsco.com';
