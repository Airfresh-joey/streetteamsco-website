// generate-city-service-pages.cjs
// Generates 100 static HTML pages for top 20 US cities x 5 core services
// Output: public/locations/[state-slug]/[city-slug]/[service-slug].html

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Data: Top 20 cities (highest search volume)
// ---------------------------------------------------------------------------
const cities = [
  { city: 'New York City', citySlug: 'new-york-city', state: 'New York', stateSlug: 'new-york', abbr: 'NY', pop: '8.3M', landmarks: ['Times Square', 'Central Park', 'Madison Square Garden', 'Grand Central Terminal'], neighborhoods: ['Manhattan', 'Brooklyn', 'SoHo', 'Williamsburg', 'Midtown'] },
  { city: 'Los Angeles', citySlug: 'los-angeles', state: 'California', stateSlug: 'california', abbr: 'CA', pop: '3.9M', landmarks: ['Hollywood Boulevard', 'Santa Monica Pier', 'Staples Center', 'Venice Beach'], neighborhoods: ['Hollywood', 'Downtown LA', 'West Hollywood', 'Silver Lake', 'Santa Monica'] },
  { city: 'Chicago', citySlug: 'chicago', state: 'Illinois', stateSlug: 'illinois', abbr: 'IL', pop: '2.7M', landmarks: ['Millennium Park', 'Navy Pier', 'Wrigley Field', 'The Magnificent Mile'], neighborhoods: ['The Loop', 'Wicker Park', 'Lincoln Park', 'River North', 'Lakeview'] },
  { city: 'Houston', citySlug: 'houston', state: 'Texas', stateSlug: 'texas', abbr: 'TX', pop: '2.3M', landmarks: ['NRG Stadium', 'Discovery Green', 'The Galleria', 'Hermann Park'], neighborhoods: ['Midtown', 'Montrose', 'The Heights', 'Downtown Houston', 'River Oaks'] },
  { city: 'Phoenix', citySlug: 'phoenix', state: 'Arizona', stateSlug: 'arizona', abbr: 'AZ', pop: '1.6M', landmarks: ['Chase Field', 'Desert Botanical Garden', 'Camelback Mountain', 'Scottsdale Fashion Square'], neighborhoods: ['Downtown Phoenix', 'Scottsdale', 'Tempe', 'Old Town Scottsdale', 'Arcadia'] },
  { city: 'Philadelphia', citySlug: 'philadelphia', state: 'Pennsylvania', stateSlug: 'pennsylvania', abbr: 'PA', pop: '1.6M', landmarks: ['Independence Hall', 'Liberty Bell', 'Citizens Bank Park', 'Reading Terminal Market'], neighborhoods: ['Center City', 'Fishtown', 'Old City', 'University City', 'Rittenhouse Square'] },
  { city: 'San Antonio', citySlug: 'san-antonio', state: 'Texas', stateSlug: 'texas', abbr: 'TX', pop: '1.5M', landmarks: ['The Alamo', 'River Walk', 'AT&T Center', 'Pearl District'], neighborhoods: ['Downtown', 'The Pearl', 'Southtown', 'Alamo Heights', 'Stone Oak'] },
  { city: 'San Diego', citySlug: 'san-diego', state: 'California', stateSlug: 'california', abbr: 'CA', pop: '1.4M', landmarks: ['San Diego Zoo', 'Balboa Park', 'Petco Park', 'Gaslamp Quarter'], neighborhoods: ['Gaslamp Quarter', 'Pacific Beach', 'La Jolla', 'North Park', 'Hillcrest'] },
  { city: 'Dallas', citySlug: 'dallas', state: 'Texas', stateSlug: 'texas', abbr: 'TX', pop: '1.3M', landmarks: ['AT&T Stadium', 'Reunion Tower', 'Dallas Arts District', 'NorthPark Center'], neighborhoods: ['Deep Ellum', 'Uptown', 'Bishop Arts District', 'Downtown Dallas', 'Knox-Henderson'] },
  { city: 'Austin', citySlug: 'austin', state: 'Texas', stateSlug: 'texas', abbr: 'TX', pop: '979K', landmarks: ['6th Street', 'Zilker Park', 'South Congress', 'Austin Convention Center'], neighborhoods: ['South Congress', 'East Austin', 'The Domain', 'Downtown', 'Rainey Street'] },
  { city: 'Miami', citySlug: 'miami', state: 'Florida', stateSlug: 'florida', abbr: 'FL', pop: '442K', landmarks: ['South Beach', 'Wynwood Walls', 'Bayside Marketplace', 'American Airlines Arena'], neighborhoods: ['Wynwood', 'Brickell', 'South Beach', 'Little Havana', 'Design District'] },
  { city: 'Atlanta', citySlug: 'atlanta', state: 'Georgia', stateSlug: 'georgia', abbr: 'GA', pop: '499K', landmarks: ['Centennial Olympic Park', 'Mercedes-Benz Stadium', 'Ponce City Market', 'The BeltLine'], neighborhoods: ['Midtown', 'Buckhead', 'Old Fourth Ward', 'Virginia-Highland', 'West Midtown'] },
  { city: 'Denver', citySlug: 'denver', state: 'Colorado', stateSlug: 'colorado', abbr: 'CO', pop: '716K', landmarks: ['Union Station', 'Red Rocks Amphitheatre', 'Coors Field', '16th Street Mall'], neighborhoods: ['LoDo', 'RiNo', 'Capitol Hill', 'Cherry Creek', 'Highlands'] },
  { city: 'Seattle', citySlug: 'seattle', state: 'Washington', stateSlug: 'washington', abbr: 'WA', pop: '737K', landmarks: ['Pike Place Market', 'Space Needle', 'T-Mobile Park', 'Seattle Center'], neighborhoods: ['Capitol Hill', 'Fremont', 'Ballard', 'South Lake Union', 'Pioneer Square'] },
  { city: 'Boston', citySlug: 'boston', state: 'Massachusetts', stateSlug: 'massachusetts', abbr: 'MA', pop: '676K', landmarks: ['Fenway Park', 'Faneuil Hall', 'Boston Common', 'Newbury Street'], neighborhoods: ['Back Bay', 'Seaport District', 'North End', 'Cambridge', 'Beacon Hill'] },
  { city: 'Nashville', citySlug: 'nashville', state: 'Tennessee', stateSlug: 'tennessee', abbr: 'TN', pop: '689K', landmarks: ['Broadway', 'Bridgestone Arena', 'Ryman Auditorium', 'The Gulch'], neighborhoods: ['Broadway', 'East Nashville', 'The Gulch', 'Germantown', '12 South'] },
  { city: 'Las Vegas', citySlug: 'las-vegas', state: 'Nevada', stateSlug: 'nevada', abbr: 'NV', pop: '642K', landmarks: ['The Las Vegas Strip', 'Fremont Street Experience', 'Las Vegas Convention Center', 'T-Mobile Arena'], neighborhoods: ['The Strip', 'Downtown', 'Fremont East', 'Summerlin', 'Arts District'] },
  { city: 'San Francisco', citySlug: 'san-francisco', state: 'California', stateSlug: 'california', abbr: 'CA', pop: '874K', landmarks: ['Fisherman\'s Wharf', 'Union Square', 'Oracle Park', 'Ferry Building'], neighborhoods: ['SoMa', 'Mission District', 'Hayes Valley', 'Marina District', 'Financial District'] },
  { city: 'Portland', citySlug: 'portland', state: 'Oregon', stateSlug: 'oregon', abbr: 'OR', pop: '653K', landmarks: ['Pioneer Courthouse Square', 'Portland Saturday Market', 'Moda Center', 'Powell\'s City of Books'], neighborhoods: ['Pearl District', 'Alberta Arts District', 'Hawthorne', 'Division Street', 'Mississippi'] },
  { city: 'Charlotte', citySlug: 'charlotte', state: 'North Carolina', stateSlug: 'north-carolina', abbr: 'NC', pop: '875K', landmarks: ['Bank of America Stadium', 'NASCAR Hall of Fame', 'Carowinds', 'SouthPark Mall'], neighborhoods: ['Uptown', 'South End', 'NoDa', 'Plaza Midwood', 'Dilworth'] },
];

// ---------------------------------------------------------------------------
// Data: 5 core services
// ---------------------------------------------------------------------------
const services = [
  {
    slug: 'brand-ambassadors',
    name: 'Brand Ambassadors',
    shortName: 'Brand Ambassador',
    description: 'Professional brand ambassador staffing',
    priceRange: '$25-$45/hr',
    priceLow: '25',
    priceHigh: '45',
    servicePageUrl: '/services/brand-ambassadors',
    included: [
      'Trained, vetted brand ambassadors matched to your brand',
      'Custom training on your products, messaging, and voice',
      'Branded uniforms and professional appearance standards',
      'Real-time GPS tracking and timestamped photo reporting',
      'Post-campaign analytics with engagement metrics',
      'Dedicated account manager for your campaign',
    ],
  },
  {
    slug: 'event-staffing',
    name: 'Event Staffing',
    shortName: 'Event Staff',
    description: 'Professional event staffing services',
    priceRange: '$25-$55/hr',
    priceLow: '25',
    priceHigh: '55',
    servicePageUrl: '/services/event-staffing',
    included: [
      'Experienced event professionals for any venue type',
      'Registration, check-in, and guest management staff',
      'Crowd management and VIP hosting personnel',
      'Brand activation and booth staffing',
      'Setup and breakdown crews available',
      'On-site team lead for seamless coordination',
    ],
  },
  {
    slug: 'street-teams',
    name: 'Street Teams',
    shortName: 'Street Team',
    description: 'High-impact street team activations',
    priceRange: '$25-$50/hr',
    priceLow: '25',
    priceHigh: '50',
    servicePageUrl: '/services/street-teams',
    included: [
      'Trained street team members deployed to high-traffic locations',
      'Flyer distribution, canvassing, and direct engagement',
      'GPS-tracked routes with timestamped photo verification',
      'Branded uniforms and collateral management',
      '500-1,500 face-to-face interactions per team per day',
      'Comprehensive post-campaign engagement reports',
    ],
  },
  {
    slug: 'product-sampling',
    name: 'Product Sampling',
    shortName: 'Product Sampling',
    description: 'Direct-to-consumer product sampling campaigns',
    priceRange: '$25-$45/hr',
    priceLow: '25',
    priceHigh: '45',
    servicePageUrl: '/services/product-sampling',
    included: [
      'Professional sampling staff trained on your product',
      'Cold-chain logistics and inventory management',
      'High-traffic location scouting and permit coordination',
      'Consumer survey data collection and feedback forms',
      'Compliance with health codes and local regulations',
      'Trial-to-purchase conversion tracking',
    ],
  },
  {
    slug: 'guerrilla-marketing',
    name: 'Guerrilla Marketing',
    shortName: 'Guerrilla Marketing',
    description: 'Unconventional guerrilla marketing campaigns',
    priceRange: '$2,000-$10,000+/day',
    priceLow: '2000',
    priceHigh: '10000',
    servicePageUrl: '/services/guerrilla-marketing',
    included: [
      'Creative concept development tailored to your brand',
      'Street installations, flash mobs, and wild posting',
      'Projection mapping and interactive experiences',
      'Permit acquisition and compliance management',
      'Social media integration for viral amplification',
      'Photo and video documentation of the activation',
    ],
  },
];

// ---------------------------------------------------------------------------
// Content generators - unique for each service+city combo
// ---------------------------------------------------------------------------

function generateIntro(city, service) {
  const c = city.city;
  const st = city.abbr;
  const sn = service.name.toLowerCase();
  const neighborhoods = city.neighborhoods.slice(0, 3).join(', ');

  const intros = {
    'brand-ambassadors': `Looking for professional brand ambassadors in ${c}, ${st}? Street Teams Co provides vetted, trained brand ambassador staff who represent your brand with authenticity and professionalism across the ${c} metro area. Whether you need ambassadors for an in-store demo in ${neighborhoods}, or a multi-day activation at one of ${c}'s premier venues, our local team delivers measurable results. With ${city.pop} residents and millions of annual visitors, ${c} is one of the highest-impact markets in the country for face-to-face brand engagement. Our ${c}-based brand ambassadors know the local culture, the busiest foot traffic corridors, and the venues that drive the best ROI for our clients.`,

    'event-staffing': `Need reliable event staffing in ${c}, ${st}? Street Teams Co supplies experienced event professionals for conferences, festivals, corporate events, trade shows, and private functions throughout the ${c} metro area. Our local staff are available in ${neighborhoods} and surrounding areas, providing everything from registration management and guest services to brand activation and VIP hosting. ${c} hosts hundreds of major events each year, and having a trusted local staffing partner makes the difference between a seamless event and a logistical headache. Our ${c} event staff are background-checked, professionally trained, and ready to deploy with as little as 48 hours notice.`,

    'street-teams': `Deploy a professional street team in ${c}, ${st} with Street Teams Co. Our trained street team members engage consumers face-to-face at high-traffic locations throughout ${c}, including ${neighborhoods} and beyond. From flyer distribution and brand canvassing to interactive activations, our ${c} street teams deliver 500-1,500 meaningful consumer interactions per team per day. With a population of ${city.pop} and some of the busiest pedestrian corridors in the country, ${c} offers exceptional opportunities for grassroots marketing campaigns. Our locally-based teams understand the neighborhoods, the permit requirements, and the locations that generate the highest engagement rates.`,

    'product-sampling': `Launch a product sampling campaign in ${c}, ${st} with Street Teams Co. Our professional sampling staff distribute your products directly to consumers at high-traffic retail locations, events, gyms, transit hubs, and office buildings across ${c}. Operating in neighborhoods like ${neighborhoods}, our teams achieve an average 35% trial-to-purchase conversion rate. ${c}'s diverse population of ${city.pop} makes it an ideal market for getting your product into the hands of your target demographic. We handle every detail from cold-chain logistics and inventory management to health code compliance and permit coordination, so you can focus on your brand strategy.`,

    'guerrilla-marketing': `Create an unforgettable guerrilla marketing campaign in ${c}, ${st} with Street Teams Co. Our creative team designs and executes unconventional activations that capture attention, generate social media buzz, and create lasting brand impressions across the ${c} metro area. From street installations and wild posting in ${neighborhoods} to flash mobs and projection mapping at iconic ${c} locations, we turn public spaces into immersive brand experiences. ${c}'s vibrant street culture and population of ${city.pop} make it one of the most exciting markets in the US for guerrilla marketing. Our ${c} team handles creative concepting, permitting, production, execution, and comprehensive photo and video documentation.`,
  };

  return intros[service.slug] || '';
}

function generateUseCases(city, service) {
  const c = city.city;
  const landmark1 = city.landmarks[0];
  const landmark2 = city.landmarks[1];
  const landmark3 = city.landmarks[2] || city.landmarks[0];
  const neighborhood1 = city.neighborhoods[0];
  const neighborhood2 = city.neighborhoods[1];

  const cases = {
    'brand-ambassadors': [
      `In-store product demonstrations at retail locations across ${c}, driving trial and purchase`,
      `Trade show and conference representation at ${landmark3} and ${c} convention venues`,
      `Brand launch events in ${neighborhood1} and ${neighborhood2} with trained spokespeople`,
      `Ongoing retail presence programs at malls and shopping centers throughout ${c}`,
      `Festival and outdoor event brand representation during ${c}'s busy event season`,
    ],
    'event-staffing': [
      `Corporate conferences and trade shows at ${c}'s top convention centers and hotels`,
      `Festival and concert staffing near ${landmark1} and ${landmark2}`,
      `Sporting event activations at ${landmark3} and surrounding tailgate areas`,
      `Private corporate events and product launches in ${neighborhood1} venues`,
      `Grand opening and ribbon-cutting event support for new ${c} businesses`,
    ],
    'street-teams': [
      `Flyer and sample distribution at high-traffic intersections near ${landmark1}`,
      `Neighborhood canvassing campaigns in ${neighborhood1}, ${neighborhood2}, and surrounding areas`,
      `Event perimeter activations at ${landmark3} on game days and event nights`,
      `Campus marketing campaigns at universities and colleges across ${c}`,
      `Transit hub activations reaching commuters during peak hours in ${c}`,
    ],
    'product-sampling': [
      `Grocery store and retail sampling programs at major ${c} shopping locations`,
      `Gym and fitness center sampling campaigns targeting health-conscious ${c} consumers`,
      `Office building sampling reaching professionals in ${neighborhood1} business districts`,
      `Outdoor event and festival sampling near ${landmark1} and ${landmark2}`,
      `Transit hub sampling programs reaching thousands of daily commuters in ${c}`,
    ],
    'guerrilla-marketing': [
      `Street installations and interactive displays in high-traffic areas near ${landmark1}`,
      `Wild posting campaigns across ${neighborhood1} and ${neighborhood2} neighborhoods`,
      `Flash mob activations in ${c}'s busiest pedestrian zones and plazas`,
      `Projection mapping on buildings and landmarks during ${c} nightlife hours`,
      `Pop-up experiences and branded installations near ${landmark2}`,
    ],
  };

  return cases[service.slug] || [];
}

function generatePricingSection(city, service) {
  const c = city.city;

  if (service.slug === 'guerrilla-marketing') {
    return `
  <h2>Guerrilla Marketing Pricing in ${c}</h2>
  <p>Guerrilla marketing campaigns in ${c} are custom-priced based on creative complexity, production requirements, duration, and permitting needs. Here are typical investment ranges for ${c} guerrilla activations:</p>
  <table class="pricing-table">
    <thead><tr><th>Campaign Type</th><th>Typical Investment</th><th>Includes</th></tr></thead>
    <tbody>
      <tr><td>Wild Posting Campaign</td><td>$2,000 - $5,000</td><td>Design, printing, posting, location scouting</td></tr>
      <tr><td>Street Installation (1 day)</td><td>$3,000 - $8,000</td><td>Creative, fabrication, staffing, permits</td></tr>
      <tr><td>Flash Mob Activation</td><td>$5,000 - $15,000</td><td>Choreography, performers, documentation</td></tr>
      <tr><td>Projection Mapping (1 night)</td><td>$5,000 - $12,000</td><td>Equipment, content creation, permits</td></tr>
      <tr><td>Multi-Day Immersive Experience</td><td>$10,000 - $50,000+</td><td>Full production, staffing, marketing</td></tr>
    </tbody>
  </table>
  <p>All guerrilla marketing campaigns include creative concept development, permit coordination, professional documentation, and post-campaign reporting. <a href="/pricing">View our full pricing page</a> or <a href="/#contact">request a custom quote</a> for your ${c} campaign.</p>`;
  }

  return `
  <h2>${service.name} Pricing in ${c}</h2>
  <p>${service.name} rates in ${c} start at competitive market pricing. Here is what you can expect to invest for professional ${service.name.toLowerCase()} services in the ${c} market:</p>
  <table class="pricing-table">
    <thead><tr><th>Staff Level</th><th>Hourly Rate</th><th>Full Day (8 hrs)</th></tr></thead>
    <tbody>
      <tr><td>Standard ${service.shortName}</td><td>$${service.priceLow} - $${Math.round((parseInt(service.priceLow) + parseInt(service.priceHigh)) / 2)}/hr</td><td>$${parseInt(service.priceLow) * 8} - $${Math.round((parseInt(service.priceLow) + parseInt(service.priceHigh)) / 2) * 8}</td></tr>
      <tr><td>Senior / Specialist</td><td>$${Math.round((parseInt(service.priceLow) + parseInt(service.priceHigh)) / 2)} - $${service.priceHigh}/hr</td><td>$${Math.round((parseInt(service.priceLow) + parseInt(service.priceHigh)) / 2) * 8} - $${parseInt(service.priceHigh) * 8}</td></tr>
      <tr><td>Team Lead / Manager</td><td>$${parseInt(service.priceHigh)} - $${parseInt(service.priceHigh) + 20}/hr</td><td>$${parseInt(service.priceHigh) * 8} - $${(parseInt(service.priceHigh) + 20) * 8}</td></tr>
    </tbody>
  </table>
  <p>Pricing includes staff sourcing, vetting, training, and basic campaign reporting. Management fees (15-20%) and material costs are quoted separately. <a href="/pricing">View our full pricing page</a> or <a href="/#contact">request a custom quote</a> for your ${c} campaign.</p>`;
}

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------
function generatePage(city, service) {
  const c = city.city;
  const st = city.state;
  const abbr = city.abbr;
  const sn = service.name;
  const canonicalPath = `/locations/${city.stateSlug}/${city.citySlug}/${service.slug}`;
  const canonicalUrl = `https://streetteamsco.com${canonicalPath}`;
  const cityPageUrl = `/locations/${city.stateSlug}/${city.citySlug}`;
  const statePageUrl = `/locations/${city.stateSlug}`;

  const isGuerrilla = service.slug === 'guerrilla-marketing';
  const priceLabel = isGuerrilla ? `$${Number(service.priceLow).toLocaleString()}+/campaign` : `$${service.priceLow}/hr`;
  const title = `${sn} in ${c}, ${abbr} | From ${priceLabel} | Street Teams Co`;
  const metaDesc = isGuerrilla
    ? `Hire professional ${sn.toLowerCase()} in ${c}, ${abbr}. Creative activations from $${Number(service.priceLow).toLocaleString()}. GPS tracking, real-time reporting. 500+ campaigns nationwide. Get a free quote.`
    : `Hire professional ${sn.toLowerCase()} in ${c}, ${abbr}. Vetted local staff from $${service.priceLow}/hr. GPS tracking, real-time reporting, 48-hr deployment. 500+ campaigns nationwide. Get a free quote.`;

  const intro = generateIntro(city, service);
  const useCases = generateUseCases(city, service);
  const pricingHtml = generatePricingSection(city, service);

  const useCasesList = useCases.map(uc => `      <li>${uc}</li>`).join('\n');
  const includedList = service.included.map(item => `      <li>${item}</li>`).join('\n');

  // Build links to other services for this city
  const otherServices = services.filter(s => s.slug !== service.slug);
  const otherServiceLinks = otherServices.map(s =>
    `      <a href="/locations/${city.stateSlug}/${city.citySlug}/${s.slug}">${s.name} in ${c}</a>`
  ).join('\n');

  // Build links to same service in nearby cities
  const otherCities = cities.filter(ci => ci.citySlug !== city.citySlug).slice(0, 6);
  const otherCityLinks = otherCities.map(ci =>
    `      <a href="/locations/${ci.stateSlug}/${ci.citySlug}/${service.slug}">${sn} in ${ci.city}</a>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="keywords" content="${sn.toLowerCase()} ${c}, ${sn.toLowerCase()} ${c} ${abbr}, hire ${sn.toLowerCase()} ${c}, ${sn.toLowerCase()} agency ${c}, ${sn.toLowerCase()} near me">
  <meta name="author" content="Street Teams Co">
  <link rel="canonical" href="${canonicalUrl}">

  <meta property="og:title" content="${sn} in ${c}, ${abbr} | Street Teams Co">
  <meta property="og:description" content="Hire professional ${sn.toLowerCase()} in ${c}, ${abbr}. ${isGuerrilla ? 'Creative activations from $' + Number(service.priceLow).toLocaleString() : 'Vetted local staff from $' + service.priceLow + '/hr'}. Get a free quote today.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Street Teams Co">
  <meta property="og:image" content="https://streetteamsco.com/images/og-image.jpg">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${sn} in ${c}, ${abbr} | Street Teams Co">
  <meta name="twitter:description" content="Hire professional ${sn.toLowerCase()} in ${c}, ${abbr}. ${isGuerrilla ? 'Creative activations from $' + Number(service.priceLow).toLocaleString() : 'Vetted local staff from $' + service.priceLow + '/hr'}.">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "${sn} in ${c}, ${abbr}",
    "provider": {
      "@type": "MarketingAgency",
      "name": "Street Teams Co",
      "url": "https://streetteamsco.com",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5"
      }
    },
    "description": "${service.description} in ${c}, ${st}. Vetted local staff, real-time tracking, and comprehensive reporting.",
    "areaServed": {
      "@type": "City",
      "name": "${c}",
      "containedInPlace": {
        "@type": "State",
        "name": "${st}"
      }
    },
    "url": "${canonicalUrl}",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "${service.priceLow}",
      "highPrice": "${service.priceHigh}",
      "priceCurrency": "USD"${service.slug !== 'guerrilla-marketing' ? ',\n      "unitText": "per hour"' : ''}
    }
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Street Teams Co - ${c}",
    "description": "${service.description} in ${c}, ${st}. Professional ${sn.toLowerCase()} from ${priceLabel}.",
    "url": "${canonicalUrl}",
    "telephone": "+1-800-STREETS",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${c}",
      "addressRegion": "${abbr}",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "${c}"
    },
    "priceRange": "$${service.priceLow} - $${service.priceHigh}"
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://streetteamsco.com"},
      {"@type": "ListItem", "position": 2, "name": "Locations", "item": "https://streetteamsco.com/locations"},
      {"@type": "ListItem", "position": 3, "name": "${st}", "item": "https://streetteamsco.com${statePageUrl}"},
      {"@type": "ListItem", "position": 4, "name": "${c}", "item": "https://streetteamsco.com${cityPageUrl}"},
      {"@type": "ListItem", "position": 5, "name": "${sn}", "item": "${canonicalUrl}"}
    ]
  }
  </script>

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.7; color: #1a1a2e; background: #fafafa; }
    header { background: #0f172a; padding: 1rem 0; position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { color: #fff; font-weight: 800; font-size: 1.2rem; text-decoration: none; letter-spacing: 1px; }
    .nav-links a { color: rgba(255,255,255,0.8); text-decoration: none; margin-left: 1.5rem; font-size: 0.9rem; transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }
    .page-hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 5rem 2rem 4rem; color: #fff; }
    .page-hero-inner { max-width: 900px; margin: 0 auto; }
    .breadcrumb { font-size: 0.85rem; margin-bottom: 1.5rem; opacity: 0.7; }
    .breadcrumb a { color: #fff; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .page-hero h1 { font-size: 2.5rem; line-height: 1.2; margin-bottom: 1rem; font-weight: 800; }
    .page-hero p { font-size: 1.15rem; opacity: 0.9; max-width: 700px; }
    .content { max-width: 900px; margin: 0 auto; padding: 3rem 2rem 4rem; }
    .content h2 { font-size: 1.75rem; margin: 2.5rem 0 1rem; color: #0f172a; font-weight: 700; }
    .content h3 { font-size: 1.3rem; margin: 2rem 0 0.75rem; color: #1e293b; font-weight: 600; }
    .content p { margin-bottom: 1.25rem; font-size: 1.05rem; color: #333; }
    .content ul, .content ol { margin: 1rem 0 1.5rem 1.5rem; }
    .content li { margin-bottom: 0.5rem; font-size: 1.05rem; color: #333; }
    .content a { color: #2563eb; text-decoration: none; }
    .content a:hover { text-decoration: underline; }
    .content strong { color: #0f172a; }
    .pricing-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0 2rem; }
    .pricing-table th, .pricing-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 1rem; }
    .pricing-table th { background: #0f172a; color: #fff; font-weight: 600; }
    .pricing-table tr:hover { background: #f0f4ff; }
    .stats-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin: 2rem 0; }
    .stat-box { background: #0f172a; color: #fff; padding: 1.5rem; border-radius: 12px; text-align: center; }
    .stat-box .number { font-size: 2rem; font-weight: 800; color: #f59e0b; }
    .stat-box .label { font-size: 0.85rem; opacity: 0.8; margin-top: 0.25rem; }
    .cta-section { background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff; padding: 3rem; border-radius: 16px; text-align: center; margin: 3rem 0; }
    .cta-section h2 { color: #fff; margin-bottom: 1rem; }
    .cta-section p { color: rgba(255,255,255,0.9); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }
    .cta-btn { display: inline-block; background: #f59e0b; color: #0f172a; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: background 0.2s; }
    .cta-btn:hover { background: #d97706; text-decoration: none; }
    .internal-links { background: #f0f4ff; border-radius: 12px; padding: 2rem; margin: 2rem 0; }
    .internal-links h3 { margin-top: 0; }
    .link-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; }
    .link-grid a { display: block; padding: 0.35rem 0; color: #2563eb; font-size: 0.95rem; }
    .included-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
    .included-item { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.25rem; display: flex; align-items: flex-start; gap: 0.75rem; }
    .included-item .check { color: #f59e0b; font-weight: 700; font-size: 1.25rem; flex-shrink: 0; line-height: 1.4; }
    .included-item p { margin: 0; font-size: 0.95rem; color: #333; }
    footer { background: #0f172a; color: rgba(255,255,255,0.7); padding: 2rem; text-align: center; font-size: 0.85rem; }
    footer a { color: rgba(255,255,255,0.9); text-decoration: none; }
    @media (max-width: 768px) {
      .page-hero h1 { font-size: 1.8rem; }
      .page-hero { padding: 3rem 1.5rem 2.5rem; }
      .content { padding: 2rem 1.5rem; }
      .stats-bar { grid-template-columns: repeat(2, 1fr); }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

<header>
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
</header>

<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a> / <a href="/locations">Locations</a> / <a href="${statePageUrl}">${st}</a> / <a href="${cityPageUrl}">${c}</a> / <span>${sn}</span>
    </nav>
    <h1>${sn} in ${c}, ${abbr}</h1>
    <p>${service.description} in ${c}, ${st}. Vetted local staff, real-time GPS tracking, and comprehensive reporting. Starting from ${priceLabel}.</p>
  </div>
</section>

<div class="content">

  <div class="stats-bar">
    <div class="stat-box"><div class="number">${isGuerrilla ? '$' + Number(service.priceLow).toLocaleString() + '+' : '$' + service.priceLow}</div><div class="label">${isGuerrilla ? 'Starting Per Campaign' : 'Starting Per Hour'}</div></div>
    <div class="stat-box"><div class="number">48hr</div><div class="label">Rush Deployment</div></div>
    <div class="stat-box"><div class="number">94%</div><div class="label">Client Retention</div></div>
    <div class="stat-box"><div class="number">4.9/5</div><div class="label">Client Rating</div></div>
  </div>

  <h2>${sn} Services in ${c}, ${abbr}</h2>

  <p>${intro}</p>

  <h2>What Is Included with ${sn} in ${c}</h2>

  <p>Every ${sn.toLowerCase()} campaign we execute in ${c} includes the following as standard. No hidden fees, no surprise charges.</p>

  <div class="included-grid">
${service.included.map(item => `    <div class="included-item"><span class="check">&#10003;</span><p>${item}</p></div>`).join('\n')}
  </div>

  <h2>Common Use Cases for ${sn} in ${c}</h2>

  <p>${c} offers diverse opportunities for ${sn.toLowerCase()} campaigns across its neighborhoods, venues, and event spaces. Here are the most popular ways our clients use ${sn.toLowerCase()} in the ${c} market:</p>

  <ul>
${useCasesList}
  </ul>

${pricingHtml}

  <h2>Why Choose Street Teams Co for ${sn} in ${c}?</h2>

  <p>Street Teams Co is not just another staffing agency. We are a full-service marketing partner with deep roots in the ${c} market. Our local ${c} team members are recruited from the community, trained to represent your brand authentically, and equipped with technology that gives you real-time visibility into every campaign.</p>

  <p>With over 500 campaigns executed nationwide and a 94% client retention rate, we have proven our ability to deliver measurable results. Our ${c} clients benefit from:</p>

  <ul>
    <li><strong>Local expertise</strong> - Our ${c} staff know ${city.neighborhoods[0]}, ${city.neighborhoods[1]}, and ${city.neighborhoods[2]} like the back of their hand</li>
    <li><strong>Fast deployment</strong> - Rush campaigns in ${c} can be live within 48 hours</li>
    <li><strong>Transparent pricing</strong> - No hidden fees, itemized quotes, starting from ${priceLabel}</li>
    <li><strong>Real-time tracking</strong> - GPS tracking, timestamped photos, and live dashboards for every ${c} campaign</li>
    <li><strong>Proven results</strong> - 4.9/5 client rating with 127+ verified reviews</li>
  </ul>

  <div class="cta-section">
    <h2>Ready to Launch ${sn} in ${c}?</h2>
    <p>Tell us about your campaign goals and we will build a custom ${sn.toLowerCase()} plan for the ${c} market. Free quotes with no obligation.</p>
    <a href="/#contact" class="cta-btn">Get a Free ${c} Quote</a>
  </div>

  <div class="internal-links">
    <h3>Other Services in ${c}</h3>
    <div class="link-grid">
${otherServiceLinks}
      <a href="${cityPageUrl}">All Services in ${c}</a>
    </div>
  </div>

  <div class="internal-links">
    <h3>${sn} in Other Cities</h3>
    <div class="link-grid">
${otherCityLinks}
      <a href="${service.servicePageUrl}">${sn} Overview</a>
    </div>
  </div>

  <div class="internal-links">
    <h3>Helpful Links</h3>
    <div class="link-grid">
      <a href="/pricing">Pricing & Rate Cards</a>
      <a href="/#contact">Contact Us</a>
      <a href="/services">All Services</a>
      <a href="/locations">All Locations</a>
      <a href="/street-team-marketing-agency">About Our Agency</a>
      <a href="/testimonials">Client Testimonials</a>
    </div>
  </div>

</div>

<footer>
  <p>&copy; 2026 <a href="/">Street Teams Co</a>. All rights reserved. | <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a> | <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></p>
  <p style="margin-top: 0.5rem;"><a href="/locations">Locations</a> | <a href="/services">Services</a> | <a href="/pricing">Pricing</a> | <a href="/industries">Industries</a> | <a href="/blog/">Blog</a></p>
</footer>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main: generate all pages
// ---------------------------------------------------------------------------
const publicDir = path.resolve(__dirname, '..', 'public');
let generated = 0;

for (const city of cities) {
  for (const service of services) {
    const dir = path.join(publicDir, 'locations', city.stateSlug, city.citySlug);
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${service.slug}.html`);
    const html = generatePage(city, service);
    fs.writeFileSync(filePath, html, 'utf8');
    generated++;
  }
}

console.log(`Generated ${generated} city+service pages across ${cities.length} cities x ${services.length} services.`);
console.log('Output directory: public/locations/[state]/[city]/[service].html');
