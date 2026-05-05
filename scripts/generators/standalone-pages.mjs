// scripts/generators/standalone-pages.mjs
// Generates standalone pages: pricing, our-team, testimonials, locations index, privacy, terms

import path from 'path';
import {
  parseLocations, wrapPage, writePage, breadcrumbSchema, faqSchema,
  statsBar, faqHtml, ctaSection, internalLinksBlock, escHtml, BASE_URL,
} from './shared.mjs';

// ---------------------------------------------------------------------------
// Pricing page
// ---------------------------------------------------------------------------
function generatePricingPage() {
  const canonical = `${BASE_URL}/pricing`;
  const pricingFaqs = [
    { q: 'How much does street team marketing cost?', a: 'Street team marketing costs typically range from $25-$75 per hour per brand ambassador. A full-day team deployment (6-8 hours, 4-8 team members) averages $3,000-$8,000. Monthly retainer programs start at $10,000.' },
    { q: 'How much do brand ambassadors cost per hour?', a: 'Brand ambassador rates start at $25/hour for standard promotional staff and range up to $75+/hour for specialized roles like bilingual staff, licensed bartenders, or technical product demonstrators.' },
    { q: 'How much does event staffing cost?', a: 'Event staffing rates range from $25-$75 per hour per staff member depending on role, location, and event type. Most clients spend $2,000-$15,000 per event.' },
    { q: 'Do you offer volume discounts for large campaigns?', a: 'Yes. We offer 10% off for 10+ staff bookings, 15% off for 20+ staff, and custom enterprise pricing for 50+ staff deployments or monthly retainer programs.' },
    { q: 'Do you require long-term contracts?', a: 'No. We offer single-event booking, weekly campaigns, and monthly retainers. There are no long-term contracts required. Book what you need, when you need it.' },
    { q: 'What is included in campaign pricing?', a: 'All campaigns include campaign strategy, staff recruitment and training, field management, real-time GPS tracking, branded uniforms, daily photo reports, liability insurance, and a comprehensive post-campaign report with ROI analysis.' },
    { q: 'How does pricing compare to hiring in-house?', a: 'Outsourcing to Street Teams Co eliminates recruiting costs, training time, payroll taxes, insurance, and management overhead. Most clients find our all-in cost is 30-50% less than building an equivalent in-house team.' },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Pricing', url: canonical },
    ]),
    faqSchema(pricingFaqs),
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Street Team Marketing Services', provider: { '@type': 'Organization', name: 'Street Teams Co', url: BASE_URL }, serviceType: 'Street Team Marketing', areaServed: { '@type': 'Country', name: 'United States' }, priceRange: '$25-$75/hr' },
  ];

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Pricing</span></nav>
    <h1>Street Team Marketing Pricing | Brand Ambassadors from $25/hr</h1>
    <p>Transparent pricing for brand ambassadors, street teams, event staffing, and guerrilla marketing campaigns. No hidden fees. No long-term contracts.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '$25', label: 'Starting Per Hour' },
    { number: '500+', label: 'Campaigns' },
    { number: '94%', label: 'Client Retention' },
    { number: '4.9/5', label: 'Client Rating' },
  ])}

  <h2>Staff Rate Cards</h2>
  <p>Our pricing is transparent and competitive. Rates include staff sourcing, vetting, and basic campaign management.</p>

  <table class="pricing-table">
    <thead><tr><th>Role</th><th>Hourly Rate</th><th>Full Day (8 hrs)</th><th>Best For</th></tr></thead>
    <tbody>
      <tr><td>Brand Ambassador</td><td>$25 - $45/hr</td><td>$200 - $360</td><td>Sampling, flyering, demos, events</td></tr>
      <tr><td>Senior Ambassador</td><td>$35 - $55/hr</td><td>$280 - $440</td><td>Trade shows, lead gen, VIP events</td></tr>
      <tr><td>Promotional Model</td><td>$35 - $65/hr</td><td>$280 - $520</td><td>Launch events, experiential, nightlife</td></tr>
      <tr><td>Event Staff</td><td>$25 - $55/hr</td><td>$200 - $440</td><td>Registration, crowd management, setup</td></tr>
      <tr><td>Team Lead / Manager</td><td>$40 - $75/hr</td><td>$320 - $600</td><td>On-site management for 5+ staff teams</td></tr>
      <tr><td>Bilingual Staff</td><td>$30 - $55/hr</td><td>$240 - $440</td><td>Multicultural campaigns, diverse markets</td></tr>
    </tbody>
  </table>

  <h2>Campaign Packages</h2>
  <table class="pricing-table">
    <thead><tr><th>Package</th><th>Typical Investment</th><th>Includes</th></tr></thead>
    <tbody>
      <tr><td>Single-Day Activation</td><td>$1,500 - $5,000</td><td>2-4 staff, 6-8 hours, training, reporting</td></tr>
      <tr><td>Weekend Blitz</td><td>$4,000 - $12,000</td><td>4-8 staff, Fri-Sun, full campaign management</td></tr>
      <tr><td>Weekly Campaign</td><td>$5,000 - $20,000</td><td>4-10 staff, 5 days, strategy + reporting</td></tr>
      <tr><td>Monthly Retainer</td><td>$10,000 - $50,000</td><td>Ongoing deployment, account manager, analytics</td></tr>
      <tr><td>Multi-City Tour</td><td>$25,000 - $100,000+</td><td>5+ cities, travel logistics, custom execution</td></tr>
      <tr><td>Guerrilla Campaign</td><td>$2,000 - $50,000+</td><td>Creative concept, production, permits, documentation</td></tr>
    </tbody>
  </table>

  <h2>Volume Discounts</h2>
  <ul>
    <li><strong>10+ staff:</strong> 10% off standard rates</li>
    <li><strong>20+ staff:</strong> 15% off standard rates</li>
    <li><strong>50+ staff:</strong> Custom enterprise pricing</li>
    <li><strong>Monthly retainers:</strong> Up to 20% off standard rates</li>
  </ul>

  <h2>What's Included in Every Campaign</h2>
  <div class="included-grid">
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Campaign Strategy</strong> - Custom planning based on your goals, audience, and market</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Staff Recruitment & Training</strong> - Vetted, background-checked staff with product-specific training</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Field Management</strong> - On-site supervision and quality assurance</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Real-Time GPS Tracking</strong> - Live location tracking and daily field reports</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Branded Uniforms</strong> - Custom-branded attire for your street team (design included)</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Post-Campaign Report</strong> - Comprehensive recap with photos, metrics, and ROI analysis</p></div>
    <div class="included-item"><span class="check">&#10003;</span><p><strong>Liability Insurance</strong> - Full coverage for all on-site activations</p></div>
  </div>

  <h2>Frequently Asked Questions</h2>
${faqHtml(pricingFaqs)}

${ctaSection('Get a Custom Quote', 'Every campaign is unique. Tell us about your goals and we will provide a detailed proposal within 24 hours.', 'Get Free Quote')}

${internalLinksBlock('Explore More', [
    { label: 'All Services', url: '/services' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
    { label: 'Our Team', url: '/our-team' },
  ])}

</div>`;

  return wrapPage({
    title: 'Street Team Pricing 2026 | Brand Ambassadors from $25/hr | Street Teams Co',
    description: 'Street team marketing pricing: brand ambassadors from $25/hr, event staffing from $30/hr. Volume discounts available. No long-term contracts. 500+ campaigns, 94% client retention. Get a free custom quote.',
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Testimonials page
// ---------------------------------------------------------------------------
function generateTestimonialsPage() {
  const canonical = `${BASE_URL}/testimonials`;
  const testimonials = [
    { name: 'Jessica Williams', title: 'Brand Manager', company: 'Spark Energy Drinks', quote: 'Street Teams Co delivered beyond expectations. Our campus sampling campaign reached over 50,000 students and drove a 40% increase in brand awareness among our target demographic.', campaign: 'Campus Sampling', results: ['50K+ students reached', '40% awareness increase', '15K samples distributed'] },
    { name: 'Marcus Johnson', title: 'VP of Marketing', company: 'Urban Apparel Co.', quote: 'The street teams were professional, energetic, and perfectly represented our brand. The guerrilla marketing campaign created massive buzz on social media.', campaign: 'Guerrilla Marketing', results: ['2M+ social impressions', '500% ROI', '10 cities activated'] },
    { name: 'Amanda Chen', title: 'Events Director', company: 'TechStart Conference', quote: 'Finding quality event staff used to be a nightmare. Street Teams Co provided us with 50+ trained brand ambassadors who exceeded every expectation.', campaign: 'Conference Staffing', results: ['50+ staff deployed', '98% satisfaction rate', 'Zero no-shows'] },
    { name: 'David Rodriguez', title: 'Marketing Director', company: 'Fresh Foods Market', quote: 'The in-store product sampling campaign drove immediate results. We saw a 25% sales lift during the activation period and gained thousands of new customers.', campaign: 'Product Sampling', results: ['25% sales lift', '8K+ samples', '3K new customers'] },
    { name: 'Sarah Kim', title: 'Growth Lead', company: 'FinTech Plus', quote: 'The lead generation campaign at SXSW was incredible. Professional teams, seamless execution, and we came home with over 2,000 qualified leads.', campaign: 'Trade Show Lead Gen', results: ['2,000+ leads captured', '35% conversion rate', '$500K pipeline'] },
    { name: 'Michael Torres', title: 'Brand Activation Manager', company: 'Pacific Brewing Co.', quote: 'Street Teams Co handled our entire festival presence across 6 events. Consistent quality, great communication, and measurable results every time.', campaign: 'Festival Activations', results: ['6 festivals', '100K+ samples', '15% market share gain'] },
  ];

  const faqs = [
    { q: 'What results can I expect from a street team campaign?', a: 'Results vary by campaign type. Our clients typically see 25-40% brand awareness increases, 3-5x ROI multiples, and significant social media engagement. Product sampling campaigns often drive 15-25% sales lifts during activation periods.' },
    { q: 'How do you measure street team campaign success?', a: 'We track multiple KPIs including impressions generated, samples distributed, leads captured, social media engagement, and direct sales impact. Every campaign includes GPS tracking, daily photo reports, and a comprehensive post-campaign ROI analysis.' },
    { q: 'Do you have experience in my industry?', a: "Street Teams Co has executed 500+ campaigns across 14+ industries including food & beverage, technology, fitness, cannabis, real estate, entertainment, automotive, healthcare, and more." },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Testimonials', url: canonical },
    ]),
    faqSchema(faqs),
  ];

  const testimonialsHtml = testimonials.map(t => `  <div class="service-box" style="margin-bottom: 1.5rem;">
    <p style="font-style: italic; margin-bottom: 0.75rem;">"${escHtml(t.quote)}"</p>
    <p><strong>${escHtml(t.name)}</strong>, ${escHtml(t.title)} at ${escHtml(t.company)}</p>
    <p style="font-size: 0.9rem; color: #666;">Campaign: ${escHtml(t.campaign)} | Results: ${t.results.join(' | ')}</p>
  </div>`).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Testimonials</span></nav>
    <h1>Street Team Marketing Results &amp; Testimonials | 500+ Campaigns</h1>
    <p>Real results from real campaigns. See why leading brands trust Street Teams Co for street team marketing, brand ambassadors, and event staffing.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '500+', label: 'Campaigns' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '1,000+', label: 'Cities' },
    { number: '10K+', label: 'Brand Ambassadors' },
  ])}

  <h2>Client Success Stories</h2>
  <p>From Fortune 500 brands to fast-growing startups, our clients trust Street Teams Co to deliver measurable results. Here are some of our favorite success stories.</p>

${testimonialsHtml}

  <h2>By the Numbers</h2>
  <p>Across 500+ campaigns and 14+ industries, our clients consistently achieve strong returns on their street marketing investment:</p>
  <ul>
    <li><strong>25-40%</strong> average brand awareness increase per campaign</li>
    <li><strong>3-5x</strong> typical ROI on street team and sampling campaigns</li>
    <li><strong>94%</strong> client retention rate (clients who book again)</li>
    <li><strong>98%</strong> staff show-up rate with backup protocols</li>
    <li><strong>35%</strong> average trial-to-purchase conversion for product sampling</li>
  </ul>

  <h2>Frequently Asked Questions</h2>
${faqHtml(faqs)}

${ctaSection('Ready to Create Your Success Story?', 'Join the brands that trust Street Teams Co to deliver measurable results. Get a free campaign proposal within 24 hours.', 'Get Started Today')}

${internalLinksBlock('Explore More', [
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'All Locations', url: '/locations' },
    { label: 'Our Team', url: '/our-team' },
  ])}

</div>`;

  return wrapPage({
    title: 'Street Team Marketing Reviews & Results | 500+ Campaigns | Street Teams Co',
    description: 'Street team marketing success stories from 500+ campaigns. 94% client retention, 4.9/5 rating. See real ROI results from brand ambassador & event staffing campaigns.',
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Our Team page
// ---------------------------------------------------------------------------
function generateOurTeamPage() {
  const canonical = `${BASE_URL}/our-team`;
  const faqs = [
    { q: 'How many brand ambassadors does Street Teams Co have?', a: 'Street Teams Co has a network of over 10,000 trained brand ambassadors across 50+ markets nationwide. Each ambassador is background-checked, product-trained, and rated on a reliability scoring system.' },
    { q: "What is Street Teams Co's show-up rate?", a: 'Street Teams Co maintains a 98% show-up rate across all campaigns, backed by our reliability scoring system and backup staffing protocols. Our client satisfaction rating is 4.9 out of 5.' },
    { q: 'How does Street Teams Co train brand ambassadors?', a: 'Every brand ambassador goes through brand-specific training that includes product knowledge, talking points, appearance standards, and campaign objectives. We also provide on-site field management to ensure quality execution.' },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Our Team', url: canonical },
    ]),
    faqSchema(faqs),
  ];

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Our Team</span></nav>
    <h1>Street Teams Co Leadership | 10,000+ Brand Ambassadors Nationwide</h1>
    <p>Passionate professionals dedicated to making your brand unforgettable. 15+ years of experiential marketing experience, 10,000+ vetted brand ambassadors, 98% show-up rate.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '50+', label: 'Markets Covered' },
    { number: '10K+', label: 'Trained Ambassadors' },
    { number: '12', label: 'Years in Business' },
    { number: '500+', label: 'Brands Served' },
  ])}

  <h2>Leadership Team</h2>
  <p>Industry veterans with a passion for experiential marketing excellence.</p>

  <div class="service-grid">
    <div class="service-box">
      <h4>Alex Rivera</h4>
      <p><strong>Founder & CEO</strong></p>
      <p>Former VP of Field Marketing at a Fortune 500 company. 15+ years building high-performance street teams and experiential campaigns nationwide.</p>
    </div>
    <div class="service-box">
      <h4>Michelle Park</h4>
      <p><strong>VP of Operations</strong></p>
      <p>Operations expert with a background in logistics and talent management. Ensures flawless execution across all 50+ markets we serve.</p>
    </div>
    <div class="service-box">
      <h4>David Thompson</h4>
      <p><strong>Director of Client Success</strong></p>
      <p>Dedicated to helping brands achieve their marketing goals. Previously led experiential programs for major beverage and tech brands.</p>
    </div>
    <div class="service-box">
      <h4>Sarah Martinez</h4>
      <p><strong>Head of Talent Acquisition</strong></p>
      <p>Recruits and trains our network of 10,000+ brand ambassadors. Expert in building teams that authentically represent brands.</p>
    </div>
  </div>

  <h2>Our Values</h2>
  <div class="service-grid">
    <div class="service-box"><h4>Results-Driven</h4><p>Every campaign is designed with measurable outcomes in mind. We track, report, and optimize for success.</p></div>
    <div class="service-box"><h4>Partnership Mindset</h4><p>We become an extension of your team, understanding your brand as deeply as you do.</p></div>
    <div class="service-box"><h4>Agile Execution</h4><p>From concept to activation in days, not weeks. We move fast without sacrificing quality.</p></div>
    <div class="service-box"><h4>Talent Excellence</h4><p>Our brand ambassadors are carefully vetted, trained, and matched to your brand personality.</p></div>
  </div>

  <h2>Our Ambassador Network</h2>
  <p>Our strength lies in our people. We have built a network of over 10,000 brand ambassadors across 50+ cities nationwide. Each ambassador goes through our rigorous screening and training process to ensure they represent your brand with professionalism and authenticity.</p>

  <h3>Ambassador Standards</h3>
  <ul>
    <li>Background-checked and verified</li>
    <li>Brand-specific training protocols</li>
    <li>Professional appearance standards</li>
    <li>Real-time performance tracking</li>
    <li>Reliability scoring system</li>
    <li>98% show-up rate with backup staffing protocols</li>
  </ul>

  <h2>Frequently Asked Questions</h2>
${faqHtml(faqs)}

${ctaSection('Work With Us', 'Ready to launch your next campaign with a team that delivers? Get a free proposal within 24 hours.', 'Start a Campaign')}

${internalLinksBlock('Explore More', [
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Locations', url: '/locations' },
  ])}

</div>`;

  return wrapPage({
    title: 'Street Teams Co Leadership | 10,000+ Brand Ambassadors Nationwide',
    description: 'Street Teams Co leadership team with 15+ years of experiential marketing experience. 10,000+ vetted brand ambassadors, 98% show-up rate, 4.9/5 client rating.',
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Locations index page
// ---------------------------------------------------------------------------
function generateLocationsIndex(srcDir) {
  const states = parseLocations(srcDir);
  const totalCities = states.reduce((sum, s) => sum + s.cities.length, 0);
  const canonical = `${BASE_URL}/locations`;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Locations', url: canonical },
    ]),
  ];

  const stateCardsHtml = states.map(s => `    <a href="/locations/${s.slug}" class="city-card">
      <h4>${escHtml(s.name)}</h4>
      <span class="pop">${s.cities.length} cities</span>
    </a>`).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Locations</span></nav>
    <h1>Street Team Locations | Brand Ambassadors in ${totalCities.toLocaleString()}+ Cities Nationwide</h1>
    <p>Street team marketing in all 50 states and ${totalCities.toLocaleString()}+ cities. Professional brand ambassadors from $25/hr. 94% client retention. Find local street teams near you.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '50', label: 'States' },
    { number: totalCities.toLocaleString() + '+', label: 'Cities' },
    { number: '$25', label: 'Starting Per Hour' },
    { number: '94%', label: 'Client Retention' },
  ])}

  <h2>All 50 States</h2>
  <p>Select a state to see available cities and services in that market.</p>

  <div class="cities-grid">
${stateCardsHtml}
  </div>

  <h2>Why Nationwide Coverage Matters</h2>
  <p>Whether you are launching in a single city or coordinating a multi-market campaign, Street Teams Co has the local talent and national infrastructure to deliver consistent results. Our staff are recruited from their local communities, bringing authentic knowledge of the neighborhoods, venues, and culture that drive effective street-level marketing.</p>

  <ul>
    <li><strong>${totalCities.toLocaleString()}+ cities</strong> across all 50 states</li>
    <li><strong>Local expertise</strong> with staff recruited from their communities</li>
    <li><strong>Multi-city coordination</strong> with centralized campaign management</li>
    <li><strong>48-hour rush deployment</strong> in major markets</li>
  </ul>

${ctaSection('Find Your Market', 'Tell us where you want to activate and we will build a custom staffing proposal with local pricing and timelines.', 'Get a Free Quote')}

${internalLinksBlock('Explore More', [
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Industries', url: '/industries' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `Street Team Locations | Brand Ambassadors in ${totalCities.toLocaleString()}+ Cities | Street Teams Co`,
    description: `Street team marketing in all 50 states and ${totalCities.toLocaleString()}+ cities. Brand ambassadors from $25/hr. 94% client retention. Find local street teams near you and get a free quote.`,
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Privacy Policy page
// ---------------------------------------------------------------------------
function generatePrivacyPage() {
  const canonical = `${BASE_URL}/privacy`;
  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Privacy Policy</span></nav>
    <h1>Privacy Policy</h1>
    <p>How Street Teams Co collects, uses, and protects your personal information.</p>
  </div>
</section>

<div class="content">
  <p><strong>Last updated:</strong> January 1, 2026</p>

  <h2>Information We Collect</h2>
  <p>When you interact with Street Teams Co, we may collect information you provide directly, such as your name, email address, phone number, company name, and campaign details when you submit a contact form or request a quote. We also automatically collect certain information through cookies and analytics tools, including your IP address, browser type, pages visited, and referring website.</p>

  <h2>How We Use Your Information</h2>
  <p>We use the information we collect to respond to your inquiries, provide campaign proposals, deliver our street team marketing services, send relevant marketing communications (with your consent), and improve our website and services. We do not sell your personal information to third parties.</p>

  <h2>Cookies and Tracking</h2>
  <p>Our website uses cookies and similar technologies to improve user experience, analyze website traffic through Google Analytics, and deliver targeted advertising. You can manage cookie preferences through your browser settings.</p>

  <h2>Data Security</h2>
  <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. This includes SSL encryption, secure data storage, and access controls.</p>

  <h2>Your Rights</h2>
  <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, contact us at <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>.</p>

  <h2>Contact Us</h2>
  <p>If you have questions about this privacy policy or our data practices, contact us at <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>.</p>
</div>`;

  return wrapPage({
    title: 'Privacy Policy | Street Teams Co',
    description: 'Street Teams Co privacy policy. Learn how we collect, use, and protect your personal information.',
    canonical,
    schemas: [breadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Privacy Policy', url: canonical }])],
    body,
  });
}

// ---------------------------------------------------------------------------
// Terms of Service page
// ---------------------------------------------------------------------------
function generateTermsPage() {
  const canonical = `${BASE_URL}/terms`;
  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Terms of Service</span></nav>
    <h1>Terms of Service</h1>
    <p>Terms and conditions for using the Street Teams Co website and services.</p>
  </div>
</section>

<div class="content">
  <p><strong>Last updated:</strong> January 1, 2026</p>

  <h2>Acceptance of Terms</h2>
  <p>By accessing and using the Street Teams Co website and services, you agree to be bound by these terms and conditions. If you do not agree, please do not use our services.</p>

  <h2>Services</h2>
  <p>Street Teams Co provides street team marketing, brand ambassador staffing, event staffing, product sampling, and related promotional services. All services are subject to availability and a signed service agreement or statement of work.</p>

  <h2>Booking and Payment</h2>
  <p>Campaigns are confirmed upon receipt of a signed agreement and deposit payment. Standard payment terms are 50% deposit to confirm, 50% due upon campaign completion. Cancellation policies are outlined in individual service agreements.</p>

  <h2>Intellectual Property</h2>
  <p>All content on this website, including text, graphics, logos, and images, is the property of Street Teams Co and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

  <h2>Limitation of Liability</h2>
  <p>Street Teams Co is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the fees paid for the specific service at issue.</p>

  <h2>Governing Law</h2>
  <p>These terms are governed by the laws of the State of Colorado. Any disputes will be resolved in the courts of Denver, Colorado.</p>

  <h2>Contact Us</h2>
  <p>For questions about these terms, contact us at <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>.</p>
</div>`;

  return wrapPage({
    title: 'Terms of Service | Street Teams Co',
    description: 'Street Teams Co terms of service. Read our terms and conditions for using our website and engaging our street marketing services.',
    canonical,
    schemas: [breadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Terms of Service', url: canonical }])],
    body,
  });
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export function generateStandalonePages(distDir, srcDir) {
  let count = 0;

  writePage(path.join(distDir, 'pricing', 'index.html'), generatePricingPage());
  count++;

  writePage(path.join(distDir, 'testimonials', 'index.html'), generateTestimonialsPage());
  count++;

  writePage(path.join(distDir, 'our-team', 'index.html'), generateOurTeamPage());
  count++;

  writePage(path.join(distDir, 'locations', 'index.html'), generateLocationsIndex(srcDir));
  count++;

  writePage(path.join(distDir, 'privacy', 'index.html'), generatePrivacyPage());
  count++;

  writePage(path.join(distDir, 'terms', 'index.html'), generateTermsPage());
  count++;

  return count;
}
