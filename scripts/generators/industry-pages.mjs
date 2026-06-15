// scripts/generators/industry-pages.mjs
// Generates 15 full HTML pages: 14 individual industry pages + 1 industries index

import path from 'path';
import {
  parseIndustries, wrapPage, writePage, breadcrumbSchema, faqSchema,
  statsBar, faqHtml, ctaSection, internalLinksBlock, escHtml, BASE_URL,
} from './shared.mjs';

// Service slug mapping
const SERVICE_SLUG_MAP = {
  'Brand Ambassadors': 'brand-ambassadors',
  'Street Team Marketing': 'street-teams',
  'Event Staffing': 'event-staffing',
  'Product Sampling': 'product-sampling',
  'Flyer Distribution': 'flyer-distribution',
  'Guerrilla Marketing': 'guerrilla-marketing',
  'Experiential Marketing': 'experiential-marketing',
  'Promotional Staffing': 'promotional-staffing',
};

function generateIndustryFaqs(industry) {
  return [
    {
      q: `How does street team marketing work for ${industry.name} brands?`,
      a: `Street team marketing for ${industry.name} brands involves deploying trained brand ambassadors and promotional staff to engage consumers directly at relevant locations and events. ${industry.solutions[0] || 'We tailor campaigns to your industry needs.'} Our teams handle everything from staffing and training to logistics and post-campaign reporting.`,
    },
    {
      q: `What services does Street Teams Co offer for the ${industry.name} industry?`,
      a: `For ${industry.name} clients, we provide ${industry.services.join(', ')}. Each service is tailored to address the specific marketing challenges and opportunities in the ${industry.name.toLowerCase()} sector.`,
    },
    {
      q: `How much does ${industry.name.toLowerCase()} street marketing cost?`,
      a: `Pricing for ${industry.name.toLowerCase()} campaigns is custom-quoted based on team size, campaign duration, and scope. Contact us for a free quote tailored to your ${industry.name.toLowerCase()} campaign.`,
    },
  ];
}

function generateIndustryPage(industry, allIndustries) {
  const canonical = `${BASE_URL}/industries/${industry.slug}`;
  const faqs = generateIndustryFaqs(industry);

  const otherIndustries = allIndustries.filter(i => i.slug !== industry.slug).slice(0, 8);
  const otherIndustryLinks = otherIndustries.map(i => ({ label: i.name, url: `/industries/${i.slug}` }));

  const serviceLinks = industry.services.map(s => {
    const slug = SERVICE_SLUG_MAP[s];
    return slug ? { label: s, url: `/services/${slug}` } : null;
  }).filter(Boolean);

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Industries', url: `${BASE_URL}/industries` },
      { name: industry.name, url: canonical },
    ]),
    faqSchema(faqs),
  ];

  const challengesHtml = industry.challenges.map(c => `      <li>${escHtml(c)}</li>`).join('\n');
  const solutionsHtml = industry.solutions.map(s => `      <li>${escHtml(s)}</li>`).join('\n');
  const servicesGridHtml = serviceLinks.map(s =>
    `    <a href="${s.url}" class="city-card" style="text-decoration:none;"><h4>${escHtml(s.label)}</h4></a>`
  ).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/industries">Industries</a> / <span>${escHtml(industry.name)}</span></nav>
    <h1>${escHtml(industry.name)} Street Team Marketing | Brand Ambassadors &amp; Activations</h1>
    <p>${escHtml(industry.tagline)}</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '1,000+', label: 'Cities' },
    { number: '500+', label: 'Campaigns' },
    { number: '94%', label: 'Client Retention' },
    { number: '4.9/5', label: 'Client Rating' },
  ])}

  <h2>${escHtml(industry.name)} Marketing Challenges</h2>
  <p>${escHtml(industry.description)}</p>

  <h3>Common Challenges</h3>
  <ul>
${challengesHtml}
  </ul>

  <h2>Street Teams Co Solutions for ${escHtml(industry.name)}</h2>
  <p>Our team has deep experience executing campaigns in the ${industry.name.toLowerCase()} space. Here are proven approaches we deploy for ${industry.name.toLowerCase()} clients:</p>
  <ul>
${solutionsHtml}
  </ul>

  <h2>Services for ${escHtml(industry.name)} Brands</h2>
  <div class="cities-grid">
${servicesGridHtml}
  </div>

  <h2>Case Study: ${escHtml(industry.caseStudy.title)}</h2>
  <div class="service-box" style="margin-bottom: 2rem;">
    <h4>${escHtml(industry.caseStudy.title)}</h4>
    <p><strong>Result:</strong> ${escHtml(industry.caseStudy.result)}</p>
  </div>

  <h2>Frequently Asked Questions</h2>
${faqHtml(faqs)}

${ctaSection(
    `Ready to Launch a ${industry.name} Campaign?`,
    `Tell us about your ${industry.name.toLowerCase()} marketing goals and we will build a custom proposal with staffing recommendations, pricing, and timelines.`,
    'Get a Free Quote',
  )}

${internalLinksBlock('Other Industries', otherIndustryLinks)}

${internalLinksBlock('Helpful Links', [
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `${industry.name} Street Team Marketing | Brand Ambassadors & Activations | Street Teams Co`,
    description: `${industry.name} street team marketing in 1,000+ cities. ${industry.tagline} 500+ campaigns, 94% client retention. Get a free quote.`,
    canonical,
    keywords: `${industry.name.toLowerCase()} street team, ${industry.name.toLowerCase()} brand ambassadors, ${industry.name.toLowerCase()} marketing agency, ${industry.name.toLowerCase()} event staffing`,
    schemas,
    body,
  });
}

function generateIndustriesIndex(industries) {
  const canonical = `${BASE_URL}/industries`;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Industries', url: canonical },
    ]),
  ];

  const cardsHtml = industries.map(i => `    <a href="/industries/${i.slug}" class="city-card" style="text-decoration:none;">
      <h4>${escHtml(i.name)}</h4>
      <p class="pop">${escHtml(i.tagline)}</p>
    </a>`).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Industries</span></nav>
    <h1>Street Team Marketing by Industry | 14 Verticals Served</h1>
    <p>Industry-specific street team marketing, brand ambassador, and experiential marketing solutions. 500+ campaigns across cannabis, tech, food & beverage, fitness, retail, and more.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '14', label: 'Industries Served' },
    { number: '1,000+', label: 'Cities' },
    { number: '500+', label: 'Campaigns' },
    { number: '94%', label: 'Client Retention' },
  ])}

  <h2>Industries We Serve</h2>
  <p>Every industry has unique marketing challenges and consumer dynamics. Our team has executed campaigns across 14 verticals, developing specialized expertise and proven playbooks for each. Select an industry to see how Street Teams Co can drive results in your market.</p>

  <div class="cities-grid">
${cardsHtml}
  </div>

  <h2>Why Industry Expertise Matters</h2>
  <p>A cannabis dispensary launch requires a fundamentally different approach than a tech app download campaign or a food and beverage sampling program. Our industry-specialized teams understand the regulations, consumer psychology, venue landscape, and messaging strategies that drive results in your specific market.</p>

  <ul>
    <li><strong>Compliance expertise</strong> for regulated industries like cannabis, healthcare, and financial services</li>
    <li><strong>Consumer psychology</strong> training specific to your industry vertical</li>
    <li><strong>Venue and location knowledge</strong> for where your target audience congregates</li>
    <li><strong>Proven campaign playbooks</strong> developed from 500+ industry-specific activations</li>
  </ul>

${ctaSection(
    'Find Your Industry Solution',
    'Tell us about your industry and campaign goals. We will match you with a team that has proven experience in your vertical.',
    'Get a Free Quote',
  )}

${internalLinksBlock('Explore More', [
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
  ])}

</div>`;

  return wrapPage({
    title: 'Street Team Marketing by Industry | 14 Verticals | Street Teams Co',
    description: 'Street team marketing for cannabis, tech, food & beverage, fitness, real estate, retail & more. Industry-specific brand ambassadors in 1,000+ cities. Get a free quote.',
    canonical,
    schemas,
    body,
  });
}

export function generateIndustryPages(distDir, srcDir) {
  const industries = parseIndustries(srcDir);
  let count = 0;

  // Industries index
  const indexPath = path.join(distDir, 'industries', 'index.html');
  writePage(indexPath, generateIndustriesIndex(industries));
  count++;

  // Individual industry pages
  for (const industry of industries) {
    const filePath = path.join(distDir, 'industries', industry.slug, 'index.html');
    writePage(filePath, generateIndustryPage(industry, industries));
    count++;
  }

  return count;
}
