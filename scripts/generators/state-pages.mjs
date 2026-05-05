// scripts/generators/state-pages.mjs
// Generates 50 state pages with city grids

import path from 'path';
import {
  parseLocations, wrapPage, writePage, breadcrumbSchema, faqSchema,
  statsBar, faqHtml, ctaSection, internalLinksBlock, escHtml, BASE_URL,
} from './shared.mjs';

function generateStateFaqs(state) {
  const topCities = state.cities.slice(0, 3).map(c => c.name).join(', ');
  return [
    {
      q: `How much does a street team cost in ${state.name}?`,
      a: `Street team costs in ${state.name} typically range from $25-$75 per hour per brand ambassador, depending on the city, campaign requirements, and team size. Major markets like ${topCities} may be at the higher end due to demand. Contact us for a free custom quote.`,
    },
    {
      q: `What cities in ${state.name} do you cover?`,
      a: `Street Teams Co operates in ${state.cities.length} cities across ${state.name}, including ${topCities}, and more. We can deploy teams to any location in ${state.abbreviation} with as little as 48 hours notice in major metros.`,
    },
    {
      q: `What services do you offer in ${state.name}?`,
      a: `In ${state.name}, we provide brand ambassadors, street team marketing, event staffing, product sampling, flyer distribution, guerrilla marketing, experiential marketing, and promotional staffing. All services include real-time GPS tracking and comprehensive reporting.`,
    },
  ];
}

function generateStatePage(state, allStates) {
  const canonical = `${BASE_URL}/locations/${state.slug}`;
  const faqs = generateStateFaqs(state);
  const topCities = state.cities.slice(0, 5).map(c => c.name).join(', ');

  // Nearby states (simple: same index +-1, wrapping)
  const idx = allStates.findIndex(s => s.slug === state.slug);
  const nearbyStates = [];
  for (let offset = 1; nearbyStates.length < 6 && offset < allStates.length; offset++) {
    const prev = allStates[(idx - offset + allStates.length) % allStates.length];
    const next = allStates[(idx + offset) % allStates.length];
    if (prev && !nearbyStates.find(s => s.slug === prev.slug)) nearbyStates.push(prev);
    if (next && !nearbyStates.find(s => s.slug === next.slug) && nearbyStates.length < 6) nearbyStates.push(next);
  }

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Locations', url: `${BASE_URL}/locations` },
      { name: state.name, url: canonical },
    ]),
    faqSchema(faqs),
  ];

  const cityCardsHtml = state.cities.map(c => {
    const popHtml = c.population ? `<span class="pop">Pop. ${c.population}</span>` : '';
    return `    <a href="/locations/${state.slug}/${c.slug}" class="city-card">
      <h4>${escHtml(c.name)}</h4>
      ${popHtml}
    </a>`;
  }).join('\n');

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/locations">Locations</a> / <span>${escHtml(state.name)}</span></nav>
    <h1>Street Teams in ${escHtml(state.name)} | ${state.cities.length} Cities | Brand Ambassadors from $25/hr</h1>
    <p>Professional brand ambassadors and street team marketing across ${state.cities.length} cities in ${state.abbreviation}, including ${topCities}. Event staffing, product sampling, and guerrilla marketing from $25/hr.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: String(state.cities.length), label: `${state.abbreviation} Cities` },
    { number: '$25', label: 'Starting Per Hour' },
    { number: '48hr', label: 'Rush Deployment' },
    { number: '94%', label: 'Client Retention' },
  ])}

  <h2>Street Team Marketing in ${escHtml(state.name)}</h2>
  <p>Street Teams Co provides professional brand ambassadors, event staffing, product sampling, and street team marketing services across ${state.cities.length} cities in ${state.name}. Whether you need a 2-person sampling team in ${state.cities[0]?.name || state.name} or a 50-person activation spanning multiple ${state.abbreviation} cities, we have the local talent and logistics expertise to deliver measurable results.</p>
  <p>Our ${state.name} teams are locally recruited, background-checked, and trained to represent your brand with professionalism. Every campaign includes real-time GPS tracking, timestamped photo documentation, and comprehensive post-campaign reporting.</p>

  <h2>Available Cities in ${escHtml(state.name)}</h2>
  <p>Select a city below to learn about our street marketing services and brand ambassador teams available in that market.</p>

  <div class="cities-grid">
${cityCardsHtml}
  </div>

  <h2>Services Available in ${escHtml(state.name)}</h2>
  <div class="service-grid">
    <div class="service-box"><h4><a href="/services/street-teams">Street Team Marketing</a></h4><p>Boots-on-the-ground campaigns deploying trained teams to high-traffic locations across ${state.abbreviation}.</p></div>
    <div class="service-box"><h4><a href="/services/brand-ambassadors">Brand Ambassadors</a></h4><p>Professional brand representatives for trade shows, in-store demos, and events throughout ${state.name}.</p></div>
    <div class="service-box"><h4><a href="/services/event-staffing">Event Staffing</a></h4><p>Experienced event professionals for conferences, festivals, and corporate events in ${state.abbreviation}.</p></div>
    <div class="service-box"><h4><a href="/services/product-sampling">Product Sampling</a></h4><p>Direct-to-consumer product distribution at retail locations, gyms, and events across ${state.name}.</p></div>
  </div>

  <h2>Frequently Asked Questions</h2>
${faqHtml(faqs)}

${ctaSection(
    `Ready to Launch a Campaign in ${state.name}?`,
    `Tell us about your campaign goals and we will build a custom ${state.name} staffing proposal with pricing and timelines.`,
    `Get a Free ${state.abbreviation} Quote`,
  )}

${internalLinksBlock('Other States', nearbyStates.map(s => ({ label: s.name, url: `/locations/${s.slug}` })))}

${internalLinksBlock('Helpful Links', [
    { label: 'All Locations', url: '/locations' },
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
    { label: 'Street Team Marketing Agency', url: '/street-team-marketing-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `Street Teams in ${state.name} | ${state.cities.length} Cities | Brand Ambassadors from $25/hr | Street Teams Co`,
    description: `Street team marketing across ${state.cities.length} ${state.abbreviation} cities including ${topCities}. Brand ambassadors, event staffing & product sampling from $25/hr. 94% client retention. Get a free quote.`,
    canonical,
    keywords: `street teams ${state.name}, brand ambassadors ${state.name}, event staffing ${state.abbreviation}, street team marketing ${state.abbreviation}`,
    schemas,
    body,
  });
}

export function generateStatePages(distDir, srcDir) {
  const states = parseLocations(srcDir);
  let count = 0;

  for (const state of states) {
    const filePath = path.join(distDir, 'locations', state.slug, 'index.html');
    writePage(filePath, generateStatePage(state, states));
    count++;
  }

  return count;
}
