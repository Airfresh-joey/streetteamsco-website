// scripts/generators/service-pages.mjs
// Generates 9 full HTML pages: 8 individual service pages + 1 services index

import path from 'path';
import {
  parseServices, wrapPage, writePage, breadcrumbSchema, faqSchema, serviceSchema,
  statsBar, faqHtml, ctaSection, internalLinksBlock, escHtml, truncate, BASE_URL,
} from './shared.mjs';

const RELATED_BLOG_POSTS = {
  'street-teams': [
    { title: 'The Ultimate Guide to Street Team Marketing in 2026', url: '/blog/ultimate-guide-street-team-marketing.html' },
    { title: 'Street Team Marketing ROI: Boots on the Ground', url: '/blog/street-team-marketing-roi-boots-on-the-ground.html' },
    { title: 'How to Choose a Street Team Marketing Agency', url: '/blog/street-team-marketing-services-how-to-choose-agency.html' },
  ],
  'brand-ambassadors': [
    { title: 'How to Build a Brand Ambassador Program', url: '/blog/brand-ambassador-program-build-train-launch-guide.html' },
    { title: 'How to Hire Brand Ambassadors', url: '/blog/how-to-hire-brand-ambassadors.html' },
    { title: 'Brand Ambassador vs Street Team: Key Differences', url: '/blog/brand-ambassador-vs-street-team-differences.html' },
  ],
  'event-staffing': [
    { title: 'Event Staffing for Trade Shows Guide', url: '/blog/event-staffing-trade-shows-guide.html' },
    { title: 'Event Staffing for Corporate Events', url: '/blog/event-staffing-for-corporate-events.html' },
    { title: 'Hiring Event Staff Last Minute', url: '/blog/hiring-event-staff-last-minute.html' },
  ],
  'product-sampling': [
    { title: 'How to Run a Product Sampling Campaign', url: '/blog/how-to-run-a-product-sampling-campaign.html' },
    { title: 'Product Sampling Campaigns That Convert', url: '/blog/product-sampling-campaigns-that-convert.html' },
    { title: 'Direct to Consumer Sampling Strategies', url: '/blog/direct-to-consumer-sampling-strategies.html' },
  ],
  'guerrilla-marketing': [
    { title: 'Guerrilla Marketing Campaigns That Drive Results', url: '/blog/guerrilla-marketing-campaigns-that-drive-results.html' },
    { title: 'Guerrilla Marketing Case Studies: What Works', url: '/blog/guerrilla-marketing-case-studies-what-actually-works.html' },
    { title: 'Guerrilla Marketing Agency vs DIY', url: '/blog/guerrilla-marketing-agency-vs-diy.html' },
  ],
  'flyer-distribution': [
    { title: 'Professional Flyering Services Guide', url: '/blog/professional-flyering-services-flyer-distribution-guide.html' },
    { title: 'Flyer Distribution Best Practices', url: '/blog/flyer-distribution-best-practices.html' },
    { title: 'Street Team Promotion Ideas', url: '/blog/street-team-promotion-ideas-that-drive-conversions.html' },
  ],
  'experiential-marketing': [
    { title: 'What Is Experiential Marketing?', url: '/blog/what-is-experiential-marketing.html' },
    { title: 'Experiential Marketing Trends 2026', url: '/blog/experiential-marketing-trends-2026.html' },
    { title: 'Interactive Brand Experiences Guide', url: '/blog/interactive-brand-experiences-guide.html' },
  ],
  'promotional-staffing': [
    { title: 'Promotional Models vs Brand Ambassadors', url: '/blog/promotional-models-vs-brand-ambassadors.html' },
    { title: 'Pop-Up Shop Staffing Guide', url: '/blog/pop-up-shop-staffing-guide.html' },
    { title: 'Brand Ambassador Training Template', url: '/blog/brand-ambassador-training-program-template.html' },
  ],
};

function generateServicePage(service, allServices) {
  const canonical = `${BASE_URL}/services/${service.slug}`;
  const isGuerrilla = service.slug === 'guerrilla-marketing';
  const priceRange = isGuerrilla ? '$2,000-$10,000+/day' : '$25-$75/hr';
  const blogPosts = RELATED_BLOG_POSTS[service.slug] || [];

  const otherServices = allServices.filter(s => s.slug !== service.slug);
  const otherServiceLinks = otherServices.map(s => ({ label: s.name, url: `/services/${s.slug}` }));

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: service.name, url: canonical },
    ]),
    serviceSchema({
      name: service.name,
      description: service.description,
      url: canonical,
      priceLow: isGuerrilla ? '2000' : '25',
      priceHigh: isGuerrilla ? '10000' : '75',
      isPerHour: !isGuerrilla,
    }),
    faqSchema(service.faq),
  ];

  const featuresHtml = service.features.map(f =>
    `    <div class="included-item"><span class="check">&#10003;</span><p>${escHtml(f)}</p></div>`
  ).join('\n');

  const benefitsHtml = service.benefits.map(b =>
    `    <div class="service-box"><p><strong>${escHtml(b)}</strong></p></div>`
  ).join('\n');

  const useCasesHtml = service.useCases.map(u => `      <li>${escHtml(u)}</li>`).join('\n');

  const blogLinksHtml = blogPosts.length > 0
    ? `\n  <h2>Related Resources</h2>\n  <ul>\n${blogPosts.map(p => `    <li><a href="${p.url}">${escHtml(p.title)}</a></li>`).join('\n')}\n  </ul>\n  <p><a href="/pricing">View our pricing</a> | <a href="/testimonials">See client results</a></p>`
    : '';

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/services">Services</a> / <span>${escHtml(service.name)}</span></nav>
    <h1>${escHtml(service.name)} Services | Nationwide from ${priceRange}</h1>
    <p>${escHtml(service.tagline)}</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '10,000+', label: 'Vetted Staff' },
    { number: '1,000+', label: 'Cities' },
    { number: '500+', label: 'Campaigns' },
    { number: '94%', label: 'Client Retention' },
  ])}

  <h2>About ${escHtml(service.name)}</h2>
  <p>${escHtml(service.description)}</p>

  <h2>What's Included</h2>
  <p>Every ${service.name.toLowerCase()} campaign includes the following as standard:</p>
  <div class="included-grid">
${featuresHtml}
  </div>

  <h2>Benefits</h2>
  <div class="service-grid">
${benefitsHtml}
  </div>

  <h2>Common Use Cases</h2>
  <ul>
${useCasesHtml}
  </ul>

  <h2>Frequently Asked Questions</h2>
${faqHtml(service.faq)}
${blogLinksHtml}

${ctaSection(
    `Ready to Get Started with ${service.name}?`,
    `Contact Street Teams Co today for a custom ${service.name.toLowerCase()} campaign proposal. Free quotes with no obligation.`,
    'Get a Free Quote',
  )}

${internalLinksBlock('Other Services', otherServiceLinks)}

${internalLinksBlock('Helpful Links', [
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
    { label: 'All Industries', url: '/industries' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `${service.name} Services | Nationwide from ${priceRange} | Street Teams Co`,
    description: `${service.name} services in 1,000+ US cities. ${truncate(service.description, 120).replace(/\.$/, '')}. 500+ campaigns, 94% client retention. Get a free quote.`,
    canonical,
    keywords: `${service.name.toLowerCase()}, ${service.name.toLowerCase()} services, ${service.name.toLowerCase()} agency, hire ${service.name.toLowerCase()}, ${service.name.toLowerCase()} near me`,
    schemas,
    body,
  });
}

function generateServicesIndex(services) {
  const canonical = `${BASE_URL}/services`;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: canonical },
    ]),
  ];

  const serviceCardsHtml = services.map(s => `    <a href="/services/${s.slug}" class="city-card" style="text-decoration:none;">
      <h4>${escHtml(s.name)}</h4>
      <p class="pop">${escHtml(s.tagline)}</p>
    </a>`).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Services</span></nav>
    <h1>Street Team Marketing Services | Brand Ambassadors &amp; Event Staffing</h1>
    <p>Professional street marketing, brand ambassador, and event staffing services in 1,000+ US cities. 500+ campaigns executed, 94% client retention. From $25/hr.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '8', label: 'Service Lines' },
    { number: '1,000+', label: 'Cities' },
    { number: '500+', label: 'Campaigns' },
    { number: '94%', label: 'Client Retention' },
  ])}

  <h2>Our Services</h2>
  <p>Street Teams Co offers a full suite of street-level marketing services designed to put your brand directly in front of consumers. Select a service to learn more about pricing, features, and use cases.</p>

  <div class="cities-grid">
${serviceCardsHtml}
  </div>

  <h2>Why Street Teams Co?</h2>
  <p>We combine a nationwide network of 10,000+ vetted promotional staff with real-time GPS tracking, custom brand training, and comprehensive campaign reporting. Whether you need a 2-person sampling team for a single afternoon or a 200-person activation across 10 cities, we deliver professional, measurable results.</p>

  <ul>
    <li><strong>Nationwide coverage</strong> in all 50 states and 1,000+ cities</li>
    <li><strong>Vetted, trained staff</strong> with background checks and performance ratings</li>
    <li><strong>Real-time tracking</strong> with GPS, timestamped photos, and live dashboards</li>
    <li><strong>Transparent pricing</strong> starting at $25/hr with no hidden fees</li>
    <li><strong>48-hour rush deployment</strong> available in major markets</li>
  </ul>

${ctaSection(
    'Ready to Launch a Campaign?',
    'Tell us about your goals and we will build a custom proposal with pricing, timelines, and staff recommendations.',
    'Get a Free Quote',
  )}

${internalLinksBlock('Explore More', [
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
    { label: 'All Industries', url: '/industries' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: 'Street Team Marketing Services | Brand Ambassadors & Event Staffing | Street Teams Co',
    description: 'Street team marketing services in 1,000+ cities. Brand ambassadors from $25/hr, event staffing, product sampling, guerrilla marketing. 94% client retention. Get a free quote today.',
    canonical,
    schemas,
    body,
  });
}

export function generateServicePages(distDir, srcDir) {
  const services = parseServices(srcDir);
  let count = 0;

  // Services index
  const indexPath = path.join(distDir, 'services', 'index.html');
  writePage(indexPath, generateServicesIndex(services));
  count++;

  // Individual service pages
  for (const service of services) {
    const filePath = path.join(distDir, 'services', service.slug, 'index.html');
    writePage(filePath, generateServicePage(service, services));
    count++;
  }

  return count;
}
