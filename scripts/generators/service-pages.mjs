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

const SERVICE_PHOTOS = {
  'brand-ambassadors': [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop', alt: 'Brand ambassador engaging consumers at a live event' },
    { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=900&auto=format&fit=crop', alt: 'Brand ambassadors at a product pop-up activation' },
    { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop', alt: 'Professional brand ambassador team briefing before deployment' },
  ],
  'street-teams': [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop', alt: 'Street team engaging pedestrians in a high-traffic urban area' },
    { src: 'https://images.unsplash.com/photo-1461180011046-0d3f86e2892f?q=80&w=900&auto=format&fit=crop', alt: 'Street marketing team distributing branded materials downtown' },
    { src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=900&auto=format&fit=crop', alt: 'Street team coordinator managing campaign logistics in the field' },
  ],
  'event-staffing': [
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop', alt: 'Professional event staff managing registration at a conference' },
    { src: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=900&auto=format&fit=crop', alt: 'Event staffing team at a large brand activation' },
    { src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=900&auto=format&fit=crop', alt: 'Experienced event professionals at a seamless product launch' },
  ],
  'product-sampling': [
    { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop', alt: 'Product sampling staff at a busy market event' },
    { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop', alt: 'Consumer sampling campaign at a high-foot-traffic location' },
    { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop', alt: 'Brand ambassador running a product trial and sampling program' },
  ],
  'guerrilla-marketing': [
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop', alt: 'Guerrilla marketing activation drawing a crowd in an urban setting' },
    { src: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=900&auto=format&fit=crop', alt: 'Street-level guerrilla marketing campaign creating brand buzz' },
    { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop', alt: 'Brand activation event generating consumer engagement' },
  ],
  'flyer-distribution': [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop', alt: 'Street team distributing flyers in a high-traffic pedestrian zone' },
    { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop', alt: 'Campaign coordinator tracking flyer distribution routes' },
    { src: 'https://images.unsplash.com/photo-1461180011046-0d3f86e2892f?q=80&w=900&auto=format&fit=crop', alt: 'Professional flyering team covering city blocks for a brand launch' },
  ],
  'experiential-marketing': [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop', alt: 'Experiential marketing activation with immersive brand experience' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop', alt: 'Live brand experience drawing crowds and creating social moments' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop', alt: 'Experiential event staff delivering an on-brand consumer activation' },
  ],
  'promotional-staffing': [
    { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=900&auto=format&fit=crop', alt: 'Promotional staffing team representing a brand at an activation' },
    { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop', alt: 'On-demand promo staff briefed and ready for a brand event' },
    { src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=900&auto=format&fit=crop', alt: 'Promotional models and brand ambassadors at a trade show booth' },
  ],
};

function photoGridHtml(slug) {
  const photos = SERVICE_PHOTOS[slug] || SERVICE_PHOTOS['brand-ambassadors'];
  const items = photos.map((p, i) =>
    `<div style="aspect-ratio:4/3;overflow:hidden;background:#1e293b;border-radius:8px;">` +
    `<img src="${p.src}" alt="${p.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" ` +
    `style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s;" /></div>`
  ).join('\n');
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:2rem 0 2.5rem;border-radius:12px;overflow:hidden;">
${items}
</div>`;
}

function generateServicePage(service, allServices) {
  const canonical = `${BASE_URL}/services/${service.slug}`;
  const isGuerrilla = service.slug === 'guerrilla-marketing';
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
    ? `\n  <h2>Related Resources</h2>\n  <ul>\n${blogPosts.map(p => `    <li><a href="${p.url}">${escHtml(p.title)}</a></li>`).join('\n')}\n  </ul>\n  <p><a href="/testimonials">See client results</a> | <a href="/contact">Get a free quote</a></p>`
    : '';

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/services">Services</a> / <span>${escHtml(service.name)}</span></nav>
    <h1>${escHtml(service.name)} Services | Nationwide Coverage</h1>
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

${photoGridHtml(service.slug)}

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
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
    { label: 'All Industries', url: '/industries' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `${service.name} Services | Nationwide | Street Teams Co`,
    description: `${service.name} services in 1,000+ US cities. ${truncate(service.description, 120).replace(/\.$/, '')}. 500+ campaigns, 94% client retention. Get a free quote.`,
    canonical,
    keywords: `${service.name.toLowerCase()}, ${service.name.toLowerCase()} services, ${service.name.toLowerCase()} agency, hire ${service.name.toLowerCase()}, ${service.name.toLowerCase()} near me`,
    schemas,
    body,
  });
}

function generateServicesIndex(services) {
  const canonical = `${BASE_URL}/services`;

  const indexFaq = [
    { q: 'How much does street team marketing cost?', a: 'Street team marketing services are custom-quoted based on the roles you need, team size, campaign duration, and scope — from basic distribution staff to specialized promotional talent and multi-city tours. Contact us for a free quote.' },
    { q: 'What is the difference between a brand ambassador and a street team member?', a: 'Brand ambassadors undergo extended product training and represent your brand over longer campaigns with deeper consumer engagement. Street team members are deployed for high-volume outreach like flyer distribution, sampling, and event perimeter marketing. Both roles are professional and vetted.' },
    { q: 'How quickly can you staff a campaign?', a: 'We can deploy teams in as few as 48 hours in major metro areas. For multi-city campaigns, we recommend 2-4 weeks lead time to ensure optimal talent matching and custom training. Rush staffing is available at standard rates in most top-20 markets.' },
    { q: 'Do you operate nationwide?', a: 'Yes. Street Teams Co operates in all 50 US states with established teams in over 1,000 cities. Our strongest markets include New York, Los Angeles, Chicago, Miami, Dallas, Atlanta, and Denver, but we staff campaigns in cities of all sizes.' },
    { q: 'What industries do you work with?', a: 'We serve all major industries including food and beverage, technology, cannabis, fitness, healthcare, automotive, entertainment, retail, real estate, and financial services. Each campaign is customized to your industry requirements and compliance standards.' },
    { q: 'What reporting do I get after a campaign?', a: 'Every campaign includes a comprehensive post-campaign report with GPS-verified coverage maps, timestamped photos, engagement metrics, consumer survey data (if applicable), and ROI analysis. Reports are delivered within 48 hours of campaign completion.' },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: canonical },
    ]),
    faqSchema(indexFaq),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Street Teams Co Marketing Services',
      'description': 'Full-service street team marketing, brand ambassador, and event staffing services available in 1,000+ US cities.',
      'numberOfItems': services.length,
      'itemListElement': services.map((s, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': s.name,
        'url': `${BASE_URL}/services/${s.slug}`,
      })),
    },
  ];

  const serviceCardsHtml = services.map(s => `    <a href="/services/${s.slug}" class="city-card" style="text-decoration:none;">
      <h4>${escHtml(s.name)}</h4>
      <p class="pop">${escHtml(s.tagline)}</p>
    </a>`).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Services</span></nav>
    <h1>Street Team Marketing Services | Brand Ambassadors &amp; Event Staffing</h1>
    <p>Professional street marketing, brand ambassador, and event staffing services in 1,000+ US cities. 500+ campaigns executed, 94% client retention.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '8', label: 'Core Services' },
    { number: '1,000+', label: 'Cities Covered' },
    { number: '500+', label: 'Campaigns Executed' },
    { number: '94%', label: 'Client Retention' },
  ])}

  <h2>Street Team Marketing Services Overview</h2>
  <p>Street Teams Co offers a full suite of street-level marketing services designed to put your brand directly in front of consumers. Our nationwide network of 10,000+ vetted promotional staff delivers boots-on-the-ground marketing that drives measurable results — from product sampling and event staffing to guerrilla marketing and experiential activations.</p>
  <p>Every service includes dedicated account management, custom brand training, GPS-verified activity tracking, and comprehensive post-campaign reporting. Select a service below to learn more about pricing, features, and use cases.</p>

  <div class="cities-grid">
${serviceCardsHtml}
  </div>

  <h2>Our Services at a Glance</h2>
  <p>Every engagement includes staff management, training, branded uniforms, GPS tracking, photo documentation, and post-campaign reporting. No hidden fees — pricing is custom-quoted to your campaign.</p>
  <table class="pricing-table">
    <thead><tr><th>Service</th><th>Best For</th></tr></thead>
    <tbody>
      <tr><td><a href="/services/street-teams">Street Team Marketing</a></td><td>Flyer distribution, brand awareness, event perimeters</td></tr>
      <tr><td><a href="/services/brand-ambassadors">Brand Ambassadors</a></td><td>Trade shows, retail demos, product launches</td></tr>
      <tr><td><a href="/services/event-staffing">Event Staffing</a></td><td>Festivals, conferences, corporate events</td></tr>
      <tr><td><a href="/services/product-sampling">Product Sampling</a></td><td>In-store demos, event sampling, direct-to-consumer</td></tr>
      <tr><td><a href="/services/flyer-distribution">Flyer Distribution</a></td><td>Local promotion, door-to-door, hand-to-hand</td></tr>
      <tr><td><a href="/services/guerrilla-marketing">Guerrilla Marketing</a></td><td>Viral activations, installations, flash mobs</td></tr>
      <tr><td><a href="/services/experiential-marketing">Experiential Marketing</a></td><td>Pop-ups, mobile tours, immersive experiences</td></tr>
      <tr><td><a href="/services/promotional-staffing">Promotional Staffing</a></td><td>Models, demo specialists, field marketers</td></tr>
    </tbody>
  </table>
  <p><a href="/contact">Request a custom quote for your campaign &rarr;</a></p>

  <h2>Specialized Services</h2>
  <p>Beyond our core services, we offer specialized staffing and marketing solutions for specific industries, events, and campaign types:</p>
  <div class="service-grid">
    <div class="service-box"><h4><a href="/conference-staffing-agency">Conference Staffing</a></h4><p>Registration staff, badge scanners, session moderators for conferences of all sizes.</p></div>
    <div class="service-box"><h4><a href="/in-store-demo-staffing">In-Store Demo Staffing</a></h4><p>Trained product demonstrators for Costco, Walmart, Target, and retail stores.</p></div>
    <div class="service-box"><h4><a href="/promotional-models">Promotional Models</a></h4><p>Professional promotional models for trade shows, launches, and brand activations.</p></div>
    <div class="service-box"><h4><a href="/b2b-experiential-marketing">B2B Experiential Marketing</a></h4><p>Immersive B2B brand experiences for corporate events and trade shows.</p></div>
    <div class="service-box"><h4><a href="/trade-show-staffing-agency">Trade Show Staffing</a></h4><p>Booth staff, product demonstrators, and lead generators for trade shows.</p></div>
    <div class="service-box"><h4><a href="/corporate-event-staffing">Corporate Event Staffing</a></h4><p>Professional staff for corporate events, retreats, and team-building activations.</p></div>
  </div>

  <h2>Why Choose Street Teams Co?</h2>
  <p>We combine a nationwide network of 10,000+ vetted promotional staff with real-time GPS tracking, custom brand training, and comprehensive campaign reporting. Whether you need a 2-person sampling team for a single afternoon or a 200-person activation across 10 cities, we deliver professional, measurable results.</p>

  <div class="included-grid">
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Nationwide coverage</strong> in all 50 states and 1,000+ cities</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Vetted, trained staff</strong> with background checks and performance ratings</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Real-time tracking</strong> with GPS, timestamped photos, and live dashboards</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Transparent, custom pricing</strong> with no hidden fees</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>48-hour rush deployment</strong> available in major markets</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Dedicated account managers</strong> assigned to every campaign</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Post-campaign analytics</strong> with ROI tracking and engagement data</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Custom training programs</strong> tailored to your brand voice and messaging</p></div>
  </div>

  <h2>How It Works</h2>
  <p>Getting started with Street Teams Co is simple. Our streamlined process gets your campaign from concept to execution in as little as one week:</p>
  <ol>
    <li><strong>Request a Quote</strong> — Tell us about your campaign goals, target locations, dates, and budget. We respond within 24 hours.</li>
    <li><strong>Campaign Strategy</strong> — Our team builds a custom proposal with staff recommendations, deployment plans, and pricing.</li>
    <li><strong>Staff Training &amp; Deployment</strong> — We recruit, vet, and train your team on brand messaging before deploying to your target locations.</li>
    <li><strong>Real-Time Monitoring</strong> — Track your campaign in real time with GPS, photos, and engagement metrics via our client dashboard.</li>
    <li><strong>Reporting &amp; Optimization</strong> — Receive a comprehensive post-campaign report with ROI analysis and recommendations for future campaigns.</li>
  </ol>
  <p><a href="/how-it-works">Learn more about our process &rarr;</a></p>

  <h2>Frequently Asked Questions</h2>
${faqHtml(indexFaq)}

${ctaSection(
    'Ready to Launch a Campaign?',
    'Tell us about your goals and we will build a custom proposal with pricing, timelines, and staff recommendations. Free quotes within 24 hours.',
    'Get a Free Quote',
  )}

${internalLinksBlock('Explore More', [
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
    { label: 'All Industries', url: '/industries' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
    { label: 'Experiential Marketing Agency', url: '/experiential-marketing-agency' },
    { label: 'Case Studies', url: '/case-studies/' },
    { label: 'Compare Agencies', url: '/compare/event-staffing-companies' },
    { label: 'World Cup 2026 Staffing', url: '/fifa-world-cup-2026-staffing' },
    { label: 'Los Angeles 2028 Staffing', url: '/los-angeles-2028-staffing' },
  ])}

</div>`;

  return wrapPage({
    title: 'Street Team Marketing Services | Brand Ambassadors & Event Staffing | Street Teams Co',
    description: 'Street team marketing services in 1,000+ cities. Brand ambassadors, event staffing, product sampling, guerrilla marketing. 94% client retention. Get a free quote today.',
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
