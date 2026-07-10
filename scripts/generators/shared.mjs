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
  const cityRegex = /city\('((?:\\.|[^'\\])+)'(?:,\s*'((?:\\.|[^'\\])*)')?\)/g;

  const states = [];
  let m;
  while ((m = stateBlockRegex.exec(raw)) !== null) {
    const cities = [];
    let cm;
    while ((cm = cityRegex.exec(m[4])) !== null) {
      const name = cm[1].replace(/\\(.)/g, '$1');
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const population = (cm[2] || '').replace(/\\(.)/g, '$1');
      cities.push({ name, slug, population });
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

export const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap';

export const INLINE_CSS = `    :root { --ink:#121110; --orange:#FF4D00; --orange-deep:#E04300; --paper:#F7F5EF; --curb:#FFD23F; --display:'Anton','Arial Narrow',Impact,sans-serif; --body:'Archivo',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif; --mono:'Space Mono',ui-monospace,Menlo,monospace; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--body); line-height: 1.65; color: var(--ink); background: var(--paper); }
    ::selection { background: var(--ink); color: var(--orange); }
    header { background: var(--paper); padding: 1rem 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 0 var(--ink); }
    .header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { color: var(--ink); font-family: var(--display); font-weight: 400; font-size: 1.4rem; text-decoration: none; letter-spacing: 0.03em; text-transform: uppercase; }
    .nav-links a { color: var(--ink); text-decoration: none; margin-left: 1.4rem; font-family: var(--mono); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; }
    .nav-links a:hover { color: var(--orange); }
    .page-hero { background: var(--ink); padding: 5rem 2rem 4rem; color: var(--paper); }
    .page-hero-inner { max-width: 1000px; margin: 0 auto; }
    .breadcrumb { font-family: var(--mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.5rem; color: var(--curb); }
    .breadcrumb a { color: var(--curb); text-decoration: none; }
    .breadcrumb a:hover { color: var(--orange); text-decoration: underline; }
    .page-hero h1 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(2.4rem, 6vw, 4.5rem); line-height: 0.95; margin-bottom: 1rem; letter-spacing: 0.005em; }
    .page-hero p { font-size: 1.15rem; opacity: 0.92; max-width: 720px; }
    .content { max-width: 900px; margin: 0 auto; padding: 3rem 2rem 4rem; }
    .content h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: 2rem; line-height: 1; margin: 2.6rem 0 1rem; color: var(--ink); letter-spacing: 0.01em; }
    .content h3 { font-size: 1.3rem; margin: 2rem 0 0.75rem; color: var(--ink); font-weight: 800; }
    .content p { margin-bottom: 1.25rem; font-size: 1.05rem; color: #2a2826; }
    .content ul, .content ol { margin: 1rem 0 1.5rem 1.5rem; }
    .content li { margin-bottom: 0.5rem; font-size: 1.05rem; color: #2a2826; }
    .content a { color: var(--orange-deep); text-decoration: none; font-weight: 600; }
    .content a:hover { text-decoration: underline; }
    .content strong { color: var(--ink); }
    .stats-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0; }
    .stat-box { background: var(--ink); color: var(--paper); padding: 1.5rem; border: 2px solid var(--ink); text-align: center; }
    .stat-box .number { font-family: var(--display); font-weight: 400; font-size: 2.2rem; color: var(--orange); line-height: 1; }
    .stat-box .label { font-family: var(--mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.85; margin-top: 0.4rem; }
    .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0 2rem; }
    .service-box { background: #fff; border: 2px solid var(--ink); padding: 1.5rem; }
    .service-box h4 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--ink); }
    .service-box p { font-size: 0.95rem; color: #555; margin: 0; }
    .service-box a { color: var(--orange-deep); font-weight: 600; }
    .pricing-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0 2rem; border: 2px solid var(--ink); }
    .pricing-table th, .pricing-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #d8d4cc; }
    .pricing-table th { background: var(--ink); color: var(--paper); font-family: var(--mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
    .pricing-table tr:hover { background: #efe9dd; }
    .cta-section { background: var(--orange); color: var(--ink); padding: 3rem; text-align: center; margin: 3rem 0; border: 2px solid var(--ink); box-shadow: 8px 8px 0 var(--ink); }
    .cta-section h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; color: var(--ink); margin-bottom: 1rem; font-size: 2rem; }
    .cta-section p { color: var(--ink); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
    .cta-btn { display: inline-block; background: var(--ink); color: var(--orange); padding: 0.9rem 2rem; text-decoration: none; font-family: var(--mono); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 5px 5px 0 rgba(18,17,16,0.3); }
    .cta-btn:hover { background: #000; }
    .faq-section { margin: 2.5rem 0; }
    .faq-item { border-bottom: 2px solid var(--ink); padding: 1.25rem 0; }
    .faq-item h4 { font-size: 1.1rem; color: var(--ink); margin-bottom: 0.5rem; }
    .faq-item p { color: #555; margin: 0; font-size: 1rem; }
    .internal-links { background: #fff; border: 2px solid var(--ink); padding: 2rem; margin: 2rem 0; }
    .internal-links h3 { margin-top: 0; color: var(--ink); }
    .link-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; }
    .link-grid a { display: block; padding: 0.35rem 0; color: var(--orange-deep); font-size: 0.95rem; font-weight: 600; }
    .included-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
    .included-item { background: #fff; border: 2px solid var(--ink); padding: 1.25rem; display: flex; align-items: flex-start; gap: 0.75rem; }
    .included-item .check { color: var(--orange); font-weight: 700; font-size: 1.25rem; flex-shrink: 0; line-height: 1.4; }
    .included-item p { margin: 0; font-size: 0.95rem; color: #333; }
    .cities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
    .city-card { background: #fff; border: 2px solid var(--ink); padding: 1rem 1.25rem; text-decoration: none; color: var(--ink); transition: transform 0.15s, box-shadow 0.15s; }
    .city-card:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink); text-decoration: none; }
    .city-card h4 { font-size: 1rem; margin-bottom: 0.25rem; }
    .city-card .pop { font-size: 0.85rem; color: #666; font-family: var(--mono); }
    footer { background: var(--ink); color: #b9b5ae; padding: 2.5rem 2rem 5rem; text-align: center; font-size: 0.85rem; }
    footer a { color: #e8e4dc; text-decoration: none; }
    footer a:hover { color: var(--orange); }
    .sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; background: var(--ink); border-top: 3px solid var(--orange); padding: 0.75rem 1rem; display: flex; justify-content: center; align-items: center; gap: 1rem; z-index: 200; }
    .sticky-cta p { color: var(--paper); font-size: 0.9rem; margin: 0; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.04em; }
    .sticky-cta a { display: inline-block; background: var(--orange); color: var(--ink); padding: 0.6rem 1.5rem; text-decoration: none; font-family: var(--mono); font-weight: 700; text-transform: uppercase; font-size: 0.85rem; white-space: nowrap; }
    .sticky-cta a:hover { background: var(--curb); }
    @media (max-width: 768px) { .page-hero h1 { font-size: 2rem; } .content { padding: 2rem 1.5rem; } .nav-links { display: none; } .stats-bar { grid-template-columns: repeat(2, 1fr); } .sticky-cta p { display: none; } .cta-section { box-shadow: 5px 5px 0 var(--ink); } }`;

// ---------------------------------------------------------------------------
// HTML building blocks
// ---------------------------------------------------------------------------

export function header() {
  return `<header>
  <div class="header-inner">
    <a href="/" class="logo">STREET TEAMS CO</a>
    <div class="nav-links">
      <a href="/services">Services</a>
      <a href="/playbook" style="color:#FF4D00;font-weight:600;">Free Playbook</a>
      <a href="/case-studies/">Case Studies</a>
      <a href="/locations">Locations</a>
      <a href="/blog/">Blog</a>
      <a href="tel:3037206060" style="font-weight:600;">(303) 720-6060</a>
      <a href="/contact">Get Quote</a>
    </div>
  </div>
</header>`;
}

export function footer() {
  return `<footer>
  <p>&copy; 2026 <a href="/">Street Teams Co</a>. All rights reserved. | 1580 N Logan St Suite 660, Denver, CO 80203 | <a href="tel:3037206060">(303) 720-6060</a> | <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a> | <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></p>
  <p style="margin-top: 0.5rem;"><a href="/services">Services</a> | <a href="/how-it-works">How It Works</a> | <a href="/case-studies/">Case Studies</a> | <a href="/locations">Locations</a> | <a href="/blog/">Blog</a></p>
  <p style="margin-top: 0.5rem;"><a href="/street-team-marketing-agency">Street Team Marketing</a> | <a href="/brand-ambassador-agency">Brand Ambassadors</a> | <a href="/experiential-marketing-agency">Experiential Marketing</a> | <a href="/trade-show-staffing-agency">Trade Show Staffing</a> | <a href="/what-is-street-team-marketing">Guide</a> | <a href="/statistics">Marketing Statistics</a></p>
  <p style="margin-top: 0.5rem;"><strong style="color:#FF4D00;">Industries:</strong> <a href="/cpg-brand-ambassadors">CPG</a> | <a href="/beauty-brand-sampling">Beauty</a> | <a href="/app-launch-street-teams">App Launches</a> | <a href="/dispensary-marketing-agency">Dispensaries</a> | <a href="/college-nil-marketing">College NIL</a> | <a href="/cannabis-marketing-agency">Cannabis Brands</a> | <a href="/alcohol-brand-promotions">Alcohol</a></p>
  <p style="margin-top: 0.5rem;"><strong style="color:#FF4D00;">Major Events:</strong> <a href="/fifa-world-cup-2026-staffing">World Cup 2026 Staffing</a> | <a href="/los-angeles-2028-staffing">Los Angeles 2028 Staffing</a> | <a href="/major-event-staffing">Major Event &amp; Venue Staffing</a> | <a href="/super-bowl-event-staffing">Super Bowl Staffing</a></p>
  <p style="margin-top: 0.5rem;"><strong style="color:#FF4D00;">Free:</strong> <a href="/playbook" style="color:#FF4D00;font-weight:600;">Download the Street Team Activation Playbook (PDF)</a> | <a href="/resources">All Resources</a> | <a href="/faq">FAQ</a></p>
</footer>
<div class="sticky-cta">
  <p>Ready to launch your campaign? Get a free custom quote.</p>
  <a href="/contact">Get Free Quote</a>
  <a href="mailto:hello@streetteamsco.com" style="background:transparent;border:1px solid #FF4D00;color:#FF4D00;">Email Us</a>
</div>`;
}

export function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function escJsonLd(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

/** Truncate a string at sentence boundary (preferred) or word boundary, max `len` characters. */
export function truncate(str, len = 120) {
  if (str.length <= len) return str;
  const cut = str.slice(0, len);
  // Prefer sentence boundary
  const lastPeriod = cut.lastIndexOf('. ');
  if (lastPeriod > len * 0.4) return cut.slice(0, lastPeriod + 1);
  // Fall back to word boundary
  const lastSpace = cut.lastIndexOf(' ');
  return lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="${FONTS_URL}" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link href="${FONTS_URL}" rel="stylesheet"></noscript>

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WL8QZB3S96"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WL8QZB3S96');
  </script>

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

// NOTE: priceLow/priceHigh/isPerHour params are intentionally accepted-but-unused.
// Street Teams Co policy (Joey, confirmed) is NO published rate cards anywhere —
// every engagement is custom-quoted. An earlier version of this function baked
// priceLow/priceHigh into an AggregateOffer, which put live $/hr numbers into
// JSON-LD on all 8 /services/* pages even though the visible page copy says
// "custom quote." Fixed Jul 9 2026 — do not reintroduce an `offers` block here.
export function serviceSchema({ name, description, url }) {
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
  };
}

export function localBusinessSchema({ name, description, url, city, stateAbbr }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    telephone: '+1-303-720-6060',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: stateAbbr,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: city },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Street Teams Co',
      url: 'https://streetteamsco.com',
      telephone: '+1-303-720-6060',
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
    <a href="${buttonHref || '/contact'}" class="cta-btn">${buttonText || 'Get a Free Quote'}</a>
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

// States with ~zero real search presence and no case-study/campaign history
// (per Joey, Jul 2026: keep DC — real presence there). Pages stay live and
// fully functional; copy is honest ("deployed nationwide on request" instead
// of "locally recruited"), and their city pages are excluded from the
// sitemap so Google stops treating them as priority-crawl. Nothing deleted.
export const LOW_PRESENCE_STATES = new Set([
  'alaska', 'hawaii', 'new-mexico', 'rhode-island', 'vermont', 'delaware',
  'wyoming', 'north-dakota', 'idaho', 'kansas', 'montana',
  // Second tier, added Jul 4 2026 per Joey's go-ahead — borderline but
  // still thin (no case-study/campaign history, low June search presence).
  'new-hampshire', 'south-dakota', 'missouri', 'south-carolina',
  'west-virginia', 'minnesota',
]);
