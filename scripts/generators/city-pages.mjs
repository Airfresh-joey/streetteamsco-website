// scripts/generators/city-pages.mjs
// Generates ~1,000 city pages with 3 content tiers:
// - Top 20: 800+ words with neighborhoods, landmarks, use cases
// - Mid (pop > 100k): 600+ words with services and FAQ
// - Small: 500+ words with services and FAQ

import path from 'path';
import {
  parseLocations, wrapPage, writePage, breadcrumbSchema, faqSchema,
  localBusinessSchema, statsBar, faqHtml, ctaSection, internalLinksBlock,
  escHtml, BASE_URL,
} from './shared.mjs';

// ---------------------------------------------------------------------------
// Rich city data for top 20 cities (from generate-city-service-pages.cjs)
// ---------------------------------------------------------------------------
const RICH_CITIES = {
  'new-york-city': { landmarks: ['Times Square', 'Central Park', 'Madison Square Garden', 'Grand Central Terminal'], neighborhoods: ['Manhattan', 'Brooklyn', 'SoHo', 'Williamsburg', 'Midtown'] },
  'los-angeles': { landmarks: ['Hollywood Boulevard', 'Santa Monica Pier', 'Staples Center', 'Venice Beach'], neighborhoods: ['Hollywood', 'Downtown LA', 'West Hollywood', 'Silver Lake', 'Santa Monica'] },
  'chicago': { landmarks: ['Millennium Park', 'Navy Pier', 'Wrigley Field', 'The Magnificent Mile'], neighborhoods: ['The Loop', 'Wicker Park', 'Lincoln Park', 'River North', 'Lakeview'] },
  'houston': { landmarks: ['NRG Stadium', 'Discovery Green', 'The Galleria', 'Hermann Park'], neighborhoods: ['Midtown', 'Montrose', 'The Heights', 'Downtown Houston', 'River Oaks'] },
  'phoenix': { landmarks: ['Chase Field', 'Desert Botanical Garden', 'Camelback Mountain', 'Scottsdale Fashion Square'], neighborhoods: ['Downtown Phoenix', 'Scottsdale', 'Tempe', 'Old Town Scottsdale', 'Arcadia'] },
  'philadelphia': { landmarks: ['Independence Hall', 'Liberty Bell', 'Citizens Bank Park', 'Reading Terminal Market'], neighborhoods: ['Center City', 'Fishtown', 'Old City', 'University City', 'Rittenhouse Square'] },
  'san-antonio': { landmarks: ['The Alamo', 'River Walk', 'AT&T Center', 'Pearl District'], neighborhoods: ['Downtown', 'The Pearl', 'Southtown', 'Alamo Heights', 'Stone Oak'] },
  'san-diego': { landmarks: ['San Diego Zoo', 'Balboa Park', 'Petco Park', 'Gaslamp Quarter'], neighborhoods: ['Gaslamp Quarter', 'Pacific Beach', 'La Jolla', 'North Park', 'Hillcrest'] },
  'dallas': { landmarks: ['AT&T Stadium', 'Reunion Tower', 'Dallas Arts District', 'NorthPark Center'], neighborhoods: ['Deep Ellum', 'Uptown', 'Bishop Arts District', 'Downtown Dallas', 'Knox-Henderson'] },
  'austin': { landmarks: ['6th Street', 'Zilker Park', 'South Congress', 'Austin Convention Center'], neighborhoods: ['South Congress', 'East Austin', 'The Domain', 'Downtown', 'Rainey Street'] },
  'miami': { landmarks: ['South Beach', 'Wynwood Walls', 'Bayside Marketplace', 'American Airlines Arena'], neighborhoods: ['Wynwood', 'Brickell', 'South Beach', 'Little Havana', 'Design District'] },
  'atlanta': { landmarks: ['Centennial Olympic Park', 'Mercedes-Benz Stadium', 'Ponce City Market', 'The BeltLine'], neighborhoods: ['Midtown', 'Buckhead', 'Old Fourth Ward', 'Virginia-Highland', 'West Midtown'] },
  'denver': { landmarks: ['Union Station', 'Red Rocks Amphitheatre', 'Coors Field', '16th Street Mall'], neighborhoods: ['LoDo', 'RiNo', 'Capitol Hill', 'Cherry Creek', 'Highlands'] },
  'seattle': { landmarks: ['Pike Place Market', 'Space Needle', 'T-Mobile Park', 'Seattle Center'], neighborhoods: ['Capitol Hill', 'Fremont', 'Ballard', 'South Lake Union', 'Pioneer Square'] },
  'boston': { landmarks: ['Fenway Park', 'Faneuil Hall', 'Boston Common', 'Newbury Street'], neighborhoods: ['Back Bay', 'Seaport District', 'North End', 'Cambridge', 'Beacon Hill'] },
  'nashville': { landmarks: ['Broadway', 'Bridgestone Arena', 'Ryman Auditorium', 'The Gulch'], neighborhoods: ['Broadway', 'East Nashville', 'The Gulch', 'Germantown', '12 South'] },
  'las-vegas': { landmarks: ['The Las Vegas Strip', 'Fremont Street Experience', 'Las Vegas Convention Center', 'T-Mobile Arena'], neighborhoods: ['The Strip', 'Downtown', 'Fremont East', 'Summerlin', 'Arts District'] },
  'san-francisco': { landmarks: ["Fisherman's Wharf", 'Union Square', 'Oracle Park', 'Ferry Building'], neighborhoods: ['SoMa', 'Mission District', 'Hayes Valley', 'Marina District', 'Financial District'] },
  'portland': { landmarks: ['Pioneer Courthouse Square', 'Portland Saturday Market', 'Moda Center', "Powell's City of Books"], neighborhoods: ['Pearl District', 'Alberta Arts District', 'Hawthorne', 'Division Street', 'Mississippi'] },
  'charlotte': { landmarks: ['Bank of America Stadium', 'NASCAR Hall of Fame', 'Carowinds', 'SouthPark Mall'], neighborhoods: ['Uptown', 'South End', 'NoDa', 'Plaza Midwood', 'Dilworth'] },
};

function getCityTier(city) {
  if (RICH_CITIES[city.slug]) return 'top';
  // Parse population number
  const pop = parseInt((city.population || '0').replace(/,/g, ''));
  if (pop >= 100000) return 'mid';
  return 'small';
}

function generateCityFaqs(city, state) {
  return [
    {
      q: `How much does a street team cost in ${city.name}?`,
      a: `Street team costs in ${city.name} typically range from $25-$75 per hour per brand ambassador, depending on campaign requirements and team size. Contact us for a custom quote for your ${city.name} campaign.`,
    },
    {
      q: `How quickly can you deploy a street team in ${city.name}?`,
      a: `We can typically deploy a professional street team in ${city.name} within 5-7 business days. For rush campaigns, we offer expedited timelines in ${city.name}, ${state.abbreviation} with as little as 48 hours notice.`,
    },
    {
      q: `What types of campaigns do you run in ${city.name}?`,
      a: `In ${city.name}, we run brand activations, product sampling, event staffing, guerrilla marketing, flyer distribution, and promotional events. Our ${city.name} team is experienced across all campaign types.`,
    },
  ];
}

function generateTopCityBody(city, state, richData) {
  const neighborhoods = richData.neighborhoods;
  const landmarks = richData.landmarks;
  const neighborhoodsList = neighborhoods.join(', ');

  return `
  <h2>Street Marketing Services in ${escHtml(city.name)}, ${state.abbreviation}</h2>
  <p>Street Teams Co is one of ${city.name}'s leading street team marketing and brand activation agencies. With a population of ${city.population || 'hundreds of thousands'}, ${city.name} is a premier market for face-to-face consumer engagement. Our professional brand ambassadors are local to the ${city.name} area and deliver high-impact, measurable results across ${state.name}.</p>
  <p>Our ${city.name} teams deploy to high-traffic zones including ${landmarks[0]}, ${landmarks[1]}, ${landmarks[2]}, and ${landmarks[3]}, as well as neighborhoods like ${neighborhoodsList}. Whether you are launching a new product, promoting an event, or building brand awareness, our local team knows where to reach your target audience.</p>

  <h2>Top ${escHtml(city.name)} Neighborhoods for Street Marketing</h2>
  <div class="service-grid">
${neighborhoods.map(n => `    <div class="service-box"><h4>${escHtml(n)}</h4><p>High-traffic street team deployment zone in ${city.name}. Our ambassadors engage consumers at peak foot-traffic hours with GPS-tracked campaigns.</p></div>`).join('\n')}
  </div>

  <h2>Our Services in ${escHtml(city.name)}</h2>
  <div class="service-grid">
    <div class="service-box"><h4><a href="/services/street-teams">Street Team Marketing</a></h4><p>High-traffic activations in ${city.name}'s busiest areas including ${landmarks[0]} and ${neighborhoods[0]}. From $25/hr.</p></div>
    <div class="service-box"><h4><a href="/services/brand-ambassadors">Brand Ambassadors</a></h4><p>Professional, trained brand representatives for trade shows, demos, and events in ${city.name}. From $25/hr.</p></div>
    <div class="service-box"><h4><a href="/services/event-staffing">Event Staffing</a></h4><p>Experienced event staff for conferences, festivals, and corporate events in ${city.name}, ${state.abbreviation}. From $25/hr.</p></div>
    <div class="service-box"><h4><a href="/services/product-sampling">Product Sampling</a></h4><p>Direct-to-consumer product sampling at retail locations, gyms, and events throughout ${city.name}. 35% avg conversion.</p></div>
    <div class="service-box"><h4><a href="/services/guerrilla-marketing">Guerrilla Marketing</a></h4><p>Unconventional activations at ${landmarks[1]} and other iconic ${city.name} locations. From $2,000/campaign.</p></div>
    <div class="service-box"><h4><a href="/services/flyer-distribution">Flyer Distribution</a></h4><p>GPS-tracked flyer distribution across ${city.name} neighborhoods. 2,000-5,000 flyers per team per day.</p></div>
  </div>

  <h2>Popular Campaign Types in ${escHtml(city.name)}</h2>
  <ul>
    <li>In-store product demonstrations at retail locations across ${city.name}</li>
    <li>Trade show and conference staffing at ${city.name} convention venues</li>
    <li>Festival and concert activations near ${landmarks[0]} and ${landmarks[1]}</li>
    <li>Neighborhood canvassing in ${neighborhoods[0]}, ${neighborhoods[1]}, and ${neighborhoods[2]}</li>
    <li>Campus marketing at ${city.name} area universities and colleges</li>
    <li>Grand opening promotions for new ${city.name} businesses</li>
  </ul>

  <h2>Why Choose Street Teams Co in ${escHtml(city.name)}?</h2>
  <p>Our ${city.name} team offers local expertise combined with national infrastructure. We know ${neighborhoods[0]}, ${neighborhoods[1]}, and ${neighborhoods[2]} like the back of our hand, and we bring the same professional standards, real-time tracking, and reporting that our clients expect in every market.</p>
  <ul>
    <li><strong>Local expertise</strong> in ${neighborhoodsList}</li>
    <li><strong>Fast deployment</strong> with 48-hour rush availability in ${city.name}</li>
    <li><strong>Transparent pricing</strong> starting at $25/hr with no hidden fees</li>
    <li><strong>Real-time tracking</strong> via GPS, photos, and live dashboards</li>
    <li><strong>500+ campaigns</strong> executed nationwide with a 4.9/5 client rating</li>
  </ul>`;
}

function generateMidCityBody(city, state) {
  return `
  <h2>Street Marketing Services in ${escHtml(city.name)}, ${state.abbreviation}</h2>
  <p>Street Teams Co provides professional brand ambassadors, event staffing, product sampling, and street team marketing services in ${city.name}, ${state.name}. With a population of ${city.population || 'over 100,000'}, ${city.name} offers strong opportunities for face-to-face consumer engagement campaigns.</p>
  <p>Our ${city.name} teams are locally recruited, background-checked, and trained to represent your brand with professionalism. Every campaign includes real-time GPS tracking, timestamped photo documentation, and comprehensive post-campaign reporting.</p>

  <h2>Our Services in ${escHtml(city.name)}</h2>
  <div class="service-grid">
    <div class="service-box"><h4><a href="/services/street-teams">Street Team Marketing</a></h4><p>High-traffic activations in ${city.name}'s busiest areas. Trained teams generating 500-1,500 interactions per day.</p></div>
    <div class="service-box"><h4><a href="/services/brand-ambassadors">Brand Ambassadors</a></h4><p>Professional brand representatives for trade shows, demos, and events in ${city.name}, ${state.abbreviation}.</p></div>
    <div class="service-box"><h4><a href="/services/event-staffing">Event Staffing</a></h4><p>Experienced event staff for conferences, festivals, and corporate events in ${city.name}.</p></div>
    <div class="service-box"><h4><a href="/services/product-sampling">Product Sampling</a></h4><p>Direct-to-consumer product sampling at retail locations, gyms, and events throughout ${city.name}.</p></div>
  </div>

  <h2>Why ${escHtml(city.name)} Is a Strong Market</h2>
  <p>${city.name} combines a growing population with active consumer culture, making it an effective market for street-level marketing campaigns. Our local ${city.name} staff understand the community, the high-traffic areas, and the venues that drive the best engagement for our clients.</p>
  <ul>
    <li><strong>Local ${city.name} staff</strong> recruited from the community</li>
    <li><strong>48-hour rush deployment</strong> available for urgent campaigns</li>
    <li><strong>Transparent pricing</strong> starting at $25/hr</li>
    <li><strong>Real-time GPS tracking</strong> and photo documentation</li>
    <li><strong>Comprehensive reporting</strong> with engagement metrics and ROI data</li>
  </ul>`;
}

function generateSmallCityBody(city, state) {
  return `
  <h2>Street Marketing Services in ${escHtml(city.name)}, ${state.abbreviation}</h2>
  <p>Street Teams Co provides professional brand ambassadors and street team marketing services in ${city.name}, ${state.name}. Our ${city.name} teams are locally recruited and trained to represent your brand with professionalism across the ${city.name} market.</p>
  <p>Every campaign in ${city.name} includes GPS tracking, photo documentation, and post-campaign reporting. Whether you need a sampling team, event staff, or a full street team activation, we have the local talent to deliver results.</p>

  <h2>Our Services in ${escHtml(city.name)}</h2>
  <div class="service-grid">
    <div class="service-box"><h4><a href="/services/street-teams">Street Team Marketing</a></h4><p>Grassroots campaigns in ${city.name}'s high-traffic areas. From $25/hr.</p></div>
    <div class="service-box"><h4><a href="/services/brand-ambassadors">Brand Ambassadors</a></h4><p>Professional brand reps for events and demos in ${city.name}, ${state.abbreviation}. From $25/hr.</p></div>
    <div class="service-box"><h4><a href="/services/event-staffing">Event Staffing</a></h4><p>Reliable event staff for ${city.name} conferences and events. From $25/hr.</p></div>
    <div class="service-box"><h4><a href="/services/product-sampling">Product Sampling</a></h4><p>Product distribution at retail and events in ${city.name}. 35% avg conversion.</p></div>
  </div>

  <ul>
    <li><strong>Local ${city.name} staff</strong> with community knowledge</li>
    <li><strong>Background-checked</strong> and professionally trained</li>
    <li><strong>Starting at $25/hr</strong> with no hidden fees</li>
    <li><strong>GPS tracking</strong> and real-time reporting on every campaign</li>
  </ul>`;
}

function generateCityPage(city, state, allStates) {
  const canonical = `${BASE_URL}/locations/${state.slug}/${city.slug}`;
  const faqs = generateCityFaqs(city, state);
  const tier = getCityTier(city);
  const richData = RICH_CITIES[city.slug];

  // Find other cities in same state for cross-links
  const otherCities = state.cities.filter(c => c.slug !== city.slug).slice(0, 6);
  const otherCityLinks = otherCities.map(c => ({
    label: c.name,
    url: `/locations/${state.slug}/${c.slug}`,
  }));

  // Check for city-service pages in top 20
  const cityServiceLinks = [];
  if (richData) {
    const serviceSlugs = ['brand-ambassadors', 'event-staffing', 'street-teams', 'product-sampling', 'guerrilla-marketing'];
    for (const ss of serviceSlugs) {
      cityServiceLinks.push({
        label: `${ss.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} in ${city.name}`,
        url: `/locations/${state.slug}/${city.slug}/${ss}`,
      });
    }
  }

  const schemas = [
    localBusinessSchema({
      name: `Street Teams Co - ${city.name}`,
      description: `Professional street team marketing and brand ambassador services in ${city.name}, ${state.name}.`,
      url: canonical,
      city: city.name,
      stateAbbr: state.abbreviation,
    }),
    breadcrumbSchema([
      { name: 'Home', url: BASE_URL },
      { name: 'Locations', url: `${BASE_URL}/locations` },
      { name: state.name, url: `${BASE_URL}/locations/${state.slug}` },
      { name: city.name, url: canonical },
    ]),
    faqSchema(faqs),
  ];

  let contentBody;
  if (tier === 'top') {
    contentBody = generateTopCityBody(city, state, richData);
  } else if (tier === 'mid') {
    contentBody = generateMidCityBody(city, state);
  } else {
    contentBody = generateSmallCityBody(city, state);
  }

  const cityServiceLinksBlock = cityServiceLinks.length > 0
    ? `\n${internalLinksBlock(`${city.name} Service Pages`, cityServiceLinks)}\n`
    : '';

  const body = `<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/locations">Locations</a> / <a href="/locations/${state.slug}">${escHtml(state.name)}</a> / <span>${escHtml(city.name)}</span></nav>
    <h1>Street Teams in ${escHtml(city.name)}, ${state.abbreviation} | Brand Ambassadors from $25/hr</h1>
    <p>Professional street team marketing and brand ambassador services in ${city.name}, ${state.abbreviation}.${city.population ? ' Population: ' + city.population + '.' : ''} Event staffing, product sampling, and guerrilla marketing from $25/hr.</p>
  </div>
</section>

<div class="content">

${statsBar([
    { number: '$25', label: 'Starting Per Hour' },
    { number: '48hr', label: 'Rush Deployment' },
    { number: '94%', label: 'Client Retention' },
    { number: '4.9/5', label: 'Client Rating' },
  ])}

${contentBody}

  <h2>Frequently Asked Questions About Street Teams in ${escHtml(city.name)}</h2>
${faqHtml(faqs)}

${ctaSection(
    `Ready to Launch a Campaign in ${city.name}?`,
    `Contact us today to discuss how Street Teams Co can amplify your brand in ${city.name}, ${state.name}. Free quotes, no obligation.`,
    `Get a Quote for ${city.name}`,
  )}
${cityServiceLinksBlock}
${internalLinksBlock(`Other Cities in ${state.name}`, otherCityLinks)}

${internalLinksBlock('Helpful Links', [
    { label: `All ${state.name} Cities`, url: `/locations/${state.slug}` },
    { label: 'All Locations', url: '/locations' },
    { label: 'All Services', url: '/services' },
    { label: 'Pricing & Rate Cards', url: '/pricing' },
    { label: 'Client Testimonials', url: '/testimonials' },
    { label: 'Brand Ambassador Agency', url: '/brand-ambassador-agency' },
  ])}

</div>`;

  return wrapPage({
    title: `Street Teams ${city.name}, ${state.abbreviation} | Brand Ambassadors from $25/hr | Free Quote`,
    description: `Street team marketing in ${city.name}, ${state.abbreviation}. Brand ambassadors, event staffing & product sampling from $25/hr. 94% client retention, 500+ campaigns. Get a free quote today.`,
    canonical,
    keywords: `street teams ${city.name}, brand ambassadors ${city.name}, event staffing ${city.name} ${state.abbreviation}, street team marketing ${city.name}`,
    schemas,
    body,
  });
}

export function generateCityPages(distDir, srcDir) {
  const states = parseLocations(srcDir);
  let count = 0;

  for (const state of states) {
    for (const city of state.cities) {
      const filePath = path.join(distDir, 'locations', state.slug, city.slug, 'index.html');
      writePage(filePath, generateCityPage(city, state, states));
      count++;
    }
  }

  return count;
}
