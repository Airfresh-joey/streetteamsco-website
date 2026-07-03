// scripts/generators/standalone-pages.mjs
// Generates standalone pages: pricing, our-team, testimonials, locations index,
// privacy, terms, contact, portfolio, book

import path from 'path';
import fs from 'fs';
import {
  parseLocations, wrapPage, writePage, breadcrumbSchema, faqSchema,
  statsBar, faqHtml, ctaSection, internalLinksBlock, escHtml, BASE_URL,
} from './shared.mjs';

// Parse src/data/portfolioCaseStudies.ts (machine-generated JSON inside TS)
function parsePortfolio(srcDir) {
  const raw = fs.readFileSync(path.join(srcDir, 'data', 'portfolioCaseStudies.ts'), 'utf8');
  const start = raw.indexOf('= [') + 2;
  const end = raw.lastIndexOf('];') + 1;
  return JSON.parse(raw.slice(start, end));
}

// ---------------------------------------------------------------------------
// Pricing page
// ---------------------------------------------------------------------------
function generatePricingPage() {
  const canonical = `${BASE_URL}/pricing`;
  const pricingFaqs = [
    { q: 'How much does street team marketing cost?', a: 'Street team marketing costs depend on team size, campaign duration, and market. A typical full-day team deployment runs 6-8 hours with 4-8 team members. Contact us for a custom quote, including monthly retainer options.' },
    { q: 'How much do brand ambassadors cost per hour?', a: 'Brand ambassador rates vary by role and market. Specialized roles like bilingual staff, licensed bartenders, or technical product demonstrators are priced accordingly. Contact us for a custom quote.' },
    { q: 'How much does event staffing cost?', a: 'Event staffing rates depend on role, location, and event type. Contact us for a custom quote tailored to your event.' },
    { q: 'Do you offer volume discounts for large campaigns?', a: 'Yes. We offer volume discounts for larger staff bookings and custom enterprise pricing for large deployments or monthly retainer programs. Contact us for details.' },
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
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Street Team Marketing Services', provider: { '@type': 'Organization', name: 'Street Teams Co', url: BASE_URL }, serviceType: 'Street Team Marketing', areaServed: { '@type': 'Country', name: 'United States' } },
  ];

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Pricing</span></nav>
    <h1>Street Team Marketing Pricing | Custom Quotes for Every Campaign</h1>
    <p>Transparent pricing for brand ambassadors, street teams, event staffing, and guerrilla marketing campaigns. No hidden fees. No long-term contracts.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: 'Free', label: 'Custom Quotes' },
    { number: '500+', label: 'Campaigns' },
    { number: '94%', label: 'Client Retention' },
    { number: '4.9/5', label: 'Client Rating' },
  ])}

  <h2>How Our Pricing Works</h2>
  <p>Every campaign is scoped and quoted individually. Your rate depends on the roles you need, team size, campaign duration, market, and any specialized skills (bilingual staff, licensed bartenders, technical demonstrators). Quotes include staff sourcing, vetting, and basic campaign management with no hidden fees.</p>

  <h2>Campaign Types We Quote</h2>
  <ul>
    <li><strong>Single-Day Activations</strong> — brand ambassadors and event staff for a focused push</li>
    <li><strong>Weekend Blitzes</strong> — multi-day teams with full campaign management</li>
    <li><strong>Weekly Campaigns</strong> — sustained street presence with strategy and reporting</li>
    <li><strong>Monthly Retainers</strong> — ongoing deployment with a dedicated account manager and analytics</li>
    <li><strong>Multi-City Tours</strong> — coordinated activations across 5+ markets with travel logistics</li>
    <li><strong>Guerrilla Campaigns</strong> — custom creative, production, permits, and documentation</li>
  </ul>

  <h2>Volume Discounts</h2>
  <p>Larger and longer engagements earn better rates. We offer volume discounts for bigger teams, custom enterprise pricing for large deployments, and reduced rates on monthly retainers. Tell us your scope and we will build a quote that fits your budget.</p>

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
    title: 'Street Team Pricing 2026 | Custom Quotes for Every Campaign | Street Teams Co',
    description: 'Street team marketing pricing explained: custom quotes based on roles, team size, and campaign scope. Volume discounts available. No long-term contracts. 500+ campaigns, 94% client retention. Get a free custom quote.',
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
    <p>Street team marketing in all 50 states and ${totalCities.toLocaleString()}+ cities. Professional brand ambassadors with custom pricing. 94% client retention. Find local street teams near you.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '50', label: 'States' },
    { number: totalCities.toLocaleString() + '+', label: 'Cities' },
    { number: 'Free', label: 'Custom Quotes' },
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
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'All Industries', url: '/industries' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `Street Team Locations | Brand Ambassadors in ${totalCities.toLocaleString()}+ Cities | Street Teams Co`,
    description: `Street team marketing in all 50 states and ${totalCities.toLocaleString()}+ cities. Brand ambassadors with custom pricing. 94% client retention. Find local street teams near you and get a free quote.`,
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Contact page — static prerender with a working Formspree form (crawlable;
// the SPA route only exists after JS, which crawlers never see)
// ---------------------------------------------------------------------------
function generateContactPage() {
  const canonical = `${BASE_URL}/contact`;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Contact', url: canonical },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Street Teams Co',
      url: canonical,
      mainEntity: {
        '@type': 'Organization',
        name: 'Street Teams Co',
        email: 'hello@streetteamsco.com',
        areaServed: 'United States',
      },
    },
  ];

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Contact</span></nav>
    <h1>Get a Free Street Team Marketing Quote</h1>
    <p>Tell us about your campaign and we will respond with a custom proposal. 500+ campaigns executed across 1,000+ US cities.</p>
  </div>
</section>

<div class="content">

<style>
.contact-form { max-width: 720px; }
.contact-form .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 640px) { .contact-form .form-row { grid-template-columns: 1fr; } }
.contact-form label { display: block; font-weight: 700; margin: 1rem 0 0.35rem; }
.contact-form input, .contact-form select, .contact-form textarea {
  width: 100%; padding: 0.75rem; border: 2px solid #1a1a1a; border-radius: 4px;
  font: inherit; background: #fff; box-sizing: border-box;
}
.contact-form textarea { min-height: 140px; resize: vertical; }
.contact-form button {
  margin-top: 1.5rem; padding: 1rem 2.5rem; background: #ff5a1f; color: #fff;
  border: none; border-radius: 4px; font-size: 1.05rem; font-weight: 800;
  cursor: pointer; text-transform: uppercase; letter-spacing: 0.03em;
}
.contact-form button:hover { background: #e04d15; }
.form-status { margin-top: 1rem; padding: 1rem; border-radius: 4px; display: none; font-weight: 700; }
.form-status.success { display: block; background: #e7f7ec; color: #1b7a3d; }
.form-status.error { display: block; background: #fdecea; color: #b3261e; }
</style>

  <h2>Request Your Custom Quote</h2>
  <p>Every campaign is scoped and quoted individually — team size, market, duration, and specialized roles all shape your quote. Fill out the form and our team will follow up with next steps and a tailored proposal.</p>

  <form class="contact-form" id="contact-form" action="https://formspree.io/p/3037394180927126767/f/contact" method="POST">
    <div class="form-row">
      <div>
        <label for="name">Your Name *</label>
        <input type="text" id="name" name="name" required placeholder="John Smith">
      </div>
      <div>
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" required placeholder="john@company.com">
      </div>
    </div>
    <div class="form-row">
      <div>
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
      </div>
      <div>
        <label for="company">Company Name</label>
        <input type="text" id="company" name="company" placeholder="Your Company">
      </div>
    </div>
    <label for="campaign_type">Campaign Type</label>
    <select id="campaign_type" name="campaign_type">
      <option value="">Select a campaign type...</option>
      <option value="street_activation">Street Activation</option>
      <option value="brand_ambassadors">Brand Ambassadors</option>
      <option value="event_staffing">Event Staffing</option>
      <option value="product_sampling">Product Sampling</option>
      <option value="flyering">Flyer Distribution</option>
      <option value="multi_city">Multi-City Campaign</option>
      <option value="long_term">Long-Term Program</option>
      <option value="other">Other</option>
    </select>
    <div class="form-row">
      <div>
        <label for="budget_range">Budget Range</label>
        <select id="budget_range" name="budget_range">
          <option value="">Select budget range...</option>
          <option value="under_5k">Under $5K</option>
          <option value="5k_10k">$5K-$10K</option>
          <option value="10k_25k">$10K-$25K</option>
          <option value="25k_50k">$25K-$50K</option>
          <option value="50k_plus">$50K+</option>
        </select>
      </div>
      <div>
        <label for="timeline">Timeline</label>
        <select id="timeline" name="timeline">
          <option value="">Select timeline...</option>
          <option value="this_week">This week</option>
          <option value="within_2_weeks">Within 2 weeks</option>
          <option value="within_a_month">Within a month</option>
          <option value="1_3_months">1-3 months</option>
          <option value="flexible">Flexible / just researching</option>
        </select>
      </div>
    </div>
    <label for="message">Tell Us About Your Campaign *</label>
    <textarea id="message" name="message" required placeholder="What are you promoting? Which cities? How many staff do you think you need?"></textarea>
    <button type="submit" id="contact-submit">Get My Free Quote</button>
    <div class="form-status" id="form-status" role="status"></div>
  </form>

  <script>
  (function () {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');
    var btn = document.getElementById('contact-submit');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = 'Sending...';
      try {
        var copy = {};
        new FormData(form).forEach(function (v, k) { copy[k] = v; });
        copy.source = 'streetteamsco';
        fetch('https://proposal-dashboard-blond.vercel.app/api/leads/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(copy),
        }).catch(function () {});
      } catch (err) {}
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          status.className = 'form-status success';
          status.textContent = 'Thanks! Your request is in — our team will follow up with a custom proposal.';
          if (window.gtag) gtag('event', 'form_submit', { form_name: 'contact_form_static', page_location: window.location.href });
        } else { throw new Error('bad response'); }
      }).catch(function () {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please email us directly at hello@streetteamsco.com.';
      }).finally(function () {
        btn.disabled = false;
        btn.textContent = 'Get My Free Quote';
      });
    });
  })();
  </script>

${statsBar([
    { number: '500+', label: 'Campaigns Executed' },
    { number: '1,000+', label: 'Cities Covered' },
    { number: '94%', label: 'Client Retention' },
    { number: '50', label: 'States Served' },
  ])}

  <h2>Prefer Email?</h2>
  <p>Reach out directly at <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a> — every inquiry gets a response from a real strategist, not an autoresponder.</p>

  <p>Want to see results first? <a href="/case-studies/">Browse our case studies</a> or explore <a href="/services">our services</a>.</p>

</div>`;

  return wrapPage({
    title: 'Contact Street Teams Co | Get a Free Street Team Marketing Quote',
    description: 'Contact Street Teams Co for a free street team marketing quote. Brand ambassadors, event staffing, and product sampling in 1,000+ US cities.',
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Portfolio page — static gallery so crawlers see the 50 real campaigns
// (the SPA route previously masqueraded as the homepage in raw HTML)
// ---------------------------------------------------------------------------
function generatePortfolioPage(srcDir) {
  const canonical = `${BASE_URL}/portfolio`;
  const studies = parsePortfolio(srcDir);

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Portfolio', url: canonical },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Street Teams Co Portfolio — Real Campaign Results',
      url: canonical,
      description: 'Real street team and event staffing campaigns for brands including Netflix, Microsoft, Adidas, Starbucks, MrBeast, Cirque du Soleil, and more.',
      hasPart: studies.slice(0, 20).map(s => ({
        '@type': 'CreativeWork',
        name: s.name,
        url: `${BASE_URL}/case-studies/${s.id}`,
      })),
    },
  ];

  const cards = studies.map(s => {
    const stats = Object.entries(s.stats || {}).slice(0, 2)
      .map(([k, v]) => `<span class="pf-stat"><strong>${escHtml(String(v))}</strong> ${escHtml(k)}</span>`)
      .join(' ');
    return `    <a class="pf-card" href="/case-studies/${s.id}">
      <img src="${escHtml(s.heroImage)}" alt="${escHtml(s.name)} — campaign staffed by Street Teams Co" loading="lazy" width="640" height="360">
      <div class="pf-card-body">
        <span class="pf-cat">${escHtml(s.category || '')}</span>
        <h3>${escHtml(s.name)}</h3>
        <p class="pf-stats">${stats}</p>
      </div>
    </a>`;
  }).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Portfolio</span></nav>
    <h1>Street Team Marketing Portfolio — Real Campaign Results</h1>
    <p>Real campaigns for real brands — Netflix, Microsoft, Adidas, Starbucks, MrBeast, Cirque du Soleil, Williams Racing, and ${studies.length - 7}+ more. Actual photos, actual results.</p>
  </div>
</section>

<div class="content">

<style>
.pf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin: 2rem 0; }
.pf-card { display: block; border: 3px solid #1a1a1a; border-radius: 6px; overflow: hidden; text-decoration: none; color: #1a1a1a; background: #fff; }
.pf-card img { width: 100%; height: 180px; object-fit: cover; display: block; }
.pf-card-body { padding: 12px 14px; }
.pf-card h3 { margin: 4px 0 8px; font-size: 1rem; line-height: 1.3; }
.pf-cat { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #E04300; }
.pf-stats { margin: 0; font-size: 0.85rem; color: #444; }
.pf-stat { margin-right: 12px; }
</style>

  <div class="pf-grid">
${cards}
  </div>

${ctaSection('Want results like these?', 'Tell us about your campaign and we will build a custom plan with a free quote.', 'Get a Free Quote', '/contact')}

  <p>Prefer the written version? <a href="/case-studies/">Browse all case studies</a> or explore <a href="/services">our services</a>.</p>

</div>`;

  return wrapPage({
    title: 'Portfolio | Real Campaign Results | Street Teams Co',
    description: 'Real street team campaigns for real brands. Wagamama, Cirque du Soleil, Williams Racing F1, Netflix, Microsoft, 1800 Tequila and more. See actual photos and results.',
    canonical,
    schemas,
    body,
  });
}

// ---------------------------------------------------------------------------
// Book page — static Calendly embed with real noindex meta (the SPA sets
// noindex via JS, which crawlers hitting the fallback never saw)
// ---------------------------------------------------------------------------
function generateBookPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book a Discovery Call | Street Teams Co</title>
  <meta name="description" content="Schedule a discovery call with Street Teams Co. Tell us about your brand activation goals and we will put together a custom plan.">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${BASE_URL}/book">
  <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WL8QZB3S96"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-WL8QZB3S96');</script>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #fff; }
    .hero { padding: 100px 24px 50px; text-align: center; }
    .eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #ff6b35; margin-bottom: 16px; }
    h1 { font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 800; margin: 0 0 20px; line-height: 1.2; }
    .sub { font-size: 1.15rem; color: rgba(255,255,255,0.65); max-width: 560px; margin: 0 auto; }
    .widget-wrap { max-width: 900px; margin: 0 auto; padding: 0 24px; }
    .afm { text-align: center; margin: 16px 0 40px; }
    .afm a { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
    .afm span { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.35); }
    .back { text-align: center; padding: 20px 24px 60px; }
    .back a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="hero">
    <p class="eyebrow">Discovery Call</p>
    <h1>Schedule Your Discovery Call</h1>
    <p class="sub">Tell us about your brand activation goals and we will put together a custom plan for you.</p>
  </div>
  <div class="widget-wrap">
    <div class="calendly-inline-widget" data-url="https://calendly.com/joeykercher/street-teams-co-discovery-call" style="min-width:320px;height:700px;width:100%"></div>
    <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
    <div class="afm">
      <a href="https://airfreshmarketing.com" target="_blank" rel="noopener noreferrer">
        <span>Powered by</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.27 124.49" style="height:24px;width:auto" aria-label="Air Fresh Marketing"><path fill="white" d="M170.35,32.1h14L206.74,85H191.13l-3.82-9.38H167.05L163.3,85H148Zm12.76,32.19-5.85-14.93-5.93,14.93Z"/><path fill="white" d="M208.1,30.23H223v10.5H208.1Zm.29,14.18h14.26V85H208.39Z"/><path fill="white" d="M227.75,44.41H242v8.18c2.33-5.55,6.08-9.16,12.83-8.86v15h-1.2C246.2,58.74,242,63,242,72.4V85H227.75Z"/><path fill="white" d="M258.29,32.48h42V45.23H272.84v8.94h24.83V66.25H272.84V85H258.29Z"/><path fill="white" d="M303.83,44.41h14.25v8.18c2.32-5.55,6.07-9.16,12.83-8.86v15h-1.2c-7.43,0-11.63,4.28-11.63,13.66V85H303.83Z"/><path fill="white" d="M332.64,64.89v-.15c0-11.85,8.47-21.23,20.47-21.23,14,0,20.48,10.28,20.48,22.21,0,.9,0,2-.07,2.93H346.36c1.13,4.42,4.35,6.67,8.78,6.67,3.38,0,6.08-1.27,9-4.12L372,77.73c-3.9,5-9.53,8.25-17.63,8.25C341.64,86,332.64,77.5,332.64,64.89Zm27.6-3.52c-.52-4.5-3.15-7.36-7.05-7.36s-6.3,2.93-7.05,7.36Z"/><path fill="white" d="M374.65,79.9,380,71.27a26.34,26.34,0,0,0,13.95,4.66c2.47,0,3.6-.75,3.6-2.18V73.6c0-1.58-2.25-2.25-6.53-3.45-8-2.1-14.4-4.8-14.4-13V57c0-8.63,6.9-13.44,16.28-13.44a31.77,31.77,0,0,1,16.73,4.73l-4.88,9c-4.2-2.33-8.78-3.76-12-3.76-2.18,0-3.3.83-3.3,2v.14c0,1.58,2.32,2.33,6.6,3.61,8,2.25,14.4,5,14.4,12.9v.15c0,8.93-6.67,13.59-16.58,13.59A32.76,32.76,0,0,1,374.65,79.9Z"/><path fill="white" d="M413.06,30.23h14.25V50c2.63-3.37,6.38-6.45,12.16-6.45,8.62,0,13.8,5.7,13.8,14.93V85H439V63c0-4.43-2.33-6.83-5.7-6.83s-6,2.4-6,6.83V85H413.06Z"/><path fill="white" d="M62.25,0a62.25,62.25,0,1,0,62.24,62.25A62.31,62.31,0,0,0,62.25,0Zm0,109.51a47.27,47.27,0,1,1,47.26-47.26A47.32,47.32,0,0,1,62.25,109.51Z"/><polygon fill="white" points="54.36 32.05 75.56 85.08 91.29 85.08 70.09 32.05 54.36 32.05"/><polygon fill="white" points="33.21 85.08 48.94 85.08 58.73 60.59 42.99 60.59 33.21 85.08"/></svg>
      </a>
    </div>
  </div>
  <div class="back"><a href="/">← Back to streetteamsco.com</a> &nbsp;·&nbsp; <a href="/portfolio">View our portfolio</a></div>
</body>
</html>`;
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

  writePage(path.join(distDir, 'contact', 'index.html'), generateContactPage());
  count++;

  writePage(path.join(distDir, 'portfolio', 'index.html'), generatePortfolioPage(srcDir));
  count++;

  writePage(path.join(distDir, 'book', 'index.html'), generateBookPage());
  count++;

  writePage(path.join(distDir, 'privacy', 'index.html'), generatePrivacyPage());
  count++;

  writePage(path.join(distDir, 'terms', 'index.html'), generateTermsPage());
  count++;

  return count;
}
