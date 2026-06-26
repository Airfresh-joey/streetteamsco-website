// generate-venue-pages.cjs
// Generates venue event-staffing pages for major stadiums (World Cup 2026 host venues).
// Output: public/[slug]-event-staffing.html
// SoFi, MetLife, Mercedes-Benz are hand-built separately and NOT in this list (to avoid overwrite).

const fs = require('fs');

const venues = [
  { slug: 'att-stadium', venue: 'AT&T Stadium', city: 'Arlington', metro: 'Dallas-Fort Worth', state: 'Texas', abbr: 'TX', cap: '80,000+', wcCity: 'dallas', citySvc: 'texas/dallas',
    district: 'the Arlington Entertainment District alongside Globe Life Field and Texas Live!', anchors: 'Globe Life Field and Texas Live!', langs: 'Spanish, with Vietnamese and other languages available' },
  { slug: 'hard-rock-stadium', venue: 'Hard Rock Stadium', city: 'Miami Gardens', metro: 'Miami', state: 'Florida', abbr: 'FL', cap: '65,000+', wcCity: 'miami', citySvc: 'florida/miami',
    district: 'the Miami Gardens campus that also hosts the Miami Open and F1 Miami Grand Prix', anchors: 'the Miami Open and F1 Grand Prix grounds', langs: 'Spanish and Portuguese, with Haitian Creole and other languages available' },
  { slug: 'nrg-stadium', venue: 'NRG Stadium', city: 'Houston', metro: 'Houston', state: 'Texas', abbr: 'TX', cap: '72,000+', wcCity: 'houston', citySvc: 'texas/houston',
    district: 'NRG Park, one of the largest sports and convention complexes in the country', anchors: 'NRG Park and the NRG Center convention halls', langs: 'Spanish and Vietnamese, with other languages available' },
  { slug: 'lincoln-financial-field', venue: 'Lincoln Financial Field', city: 'Philadelphia', metro: 'Philadelphia', state: 'Pennsylvania', abbr: 'PA', cap: '69,000+', wcCity: 'philadelphia', citySvc: 'pennsylvania/philadelphia',
    district: 'the South Philadelphia Sports Complex alongside Citizens Bank Park and the Wells Fargo Center', anchors: 'Citizens Bank Park and the Wells Fargo Center', langs: 'Spanish, with other languages available' },
  { slug: 'levis-stadium', venue: "Levi's Stadium", city: 'Santa Clara', metro: 'San Francisco Bay Area', state: 'California', abbr: 'CA', cap: '68,500+', wcCity: 'san-francisco', citySvc: 'california/san-francisco',
    district: 'the heart of Silicon Valley near Great America and the Santa Clara Convention Center', anchors: 'the Santa Clara Convention Center and Great America', langs: 'Spanish, Mandarin, and other languages available' },
  { slug: 'lumen-field', venue: 'Lumen Field', city: 'Seattle', metro: 'Seattle', state: 'Washington', abbr: 'WA', cap: '69,000+', wcCity: 'seattle', citySvc: 'washington/seattle',
    district: "Seattle's SoDo district alongside T-Mobile Park and the stadium transit hub", anchors: 'T-Mobile Park and the SoDo entertainment district', langs: 'Spanish, with other languages available' },
  { slug: 'arrowhead-stadium', venue: 'Arrowhead Stadium', city: 'Kansas City', metro: 'Kansas City', state: 'Missouri', abbr: 'MO', cap: '76,000+', wcCity: 'kansas-city', citySvc: null,
    district: 'the Truman Sports Complex alongside Kauffman Stadium', anchors: 'Kauffman Stadium and the Truman Sports Complex', langs: 'Spanish, with other languages available' },
  { slug: 'gillette-stadium', venue: 'Gillette Stadium', city: 'Foxborough', metro: 'Boston', state: 'Massachusetts', abbr: 'MA', cap: '65,000+', wcCity: 'boston', citySvc: 'massachusetts/boston',
    district: 'Patriot Place, a shopping, dining, and entertainment complex around the stadium', anchors: 'the Patriot Place shopping and dining complex', langs: 'Spanish and Portuguese, with other languages available' },

  // Non-World-Cup marquee venues (wc:false → generic event framing, no WC claims)
  { slug: 'crypto-com-arena', venue: 'Crypto.com Arena', city: 'Los Angeles', metro: 'Los Angeles', state: 'California', abbr: 'CA', cap: '20,000', wc: false, citySvc: 'california/los-angeles',
    district: 'the L.A. Live entertainment complex in Downtown LA alongside the Convention Center', anchors: 'L.A. Live and the Los Angeles Convention Center', langs: 'Spanish, Korean, and other languages available' },
  { slug: 'madison-square-garden', venue: 'Madison Square Garden', city: 'New York', metro: 'New York City', state: 'New York', abbr: 'NY', cap: '20,000', wc: false, citySvc: 'new-york/new-york-city',
    district: 'the heart of Midtown Manhattan above Penn Station', anchors: 'Penn Station and the Midtown Manhattan corridor', langs: 'Spanish, with many other languages available' },
  { slug: 'allegiant-stadium', venue: 'Allegiant Stadium', city: 'Las Vegas', metro: 'Las Vegas', state: 'Nevada', abbr: 'NV', cap: '65,000', wc: false, citySvc: 'nevada/las-vegas',
    district: 'just off the Las Vegas Strip near Mandalay Bay and the resort corridor', anchors: 'the Las Vegas Strip and resort corridor', langs: 'Spanish, with other languages available' },
  { slug: 'united-center', venue: 'United Center', city: 'Chicago', metro: 'Chicago', state: 'Illinois', abbr: 'IL', cap: '23,000', wc: false, citySvc: 'illinois/chicago',
    district: "Chicago's Near West Side, minutes from the Loop and West Loop dining district", anchors: 'the Loop and West Loop entertainment districts', langs: 'Spanish and Polish, with other languages available' },
  { slug: 'caesars-superdome', venue: 'Caesars Superdome', city: 'New Orleans', metro: 'New Orleans', state: 'Louisiana', abbr: 'LA', cap: '73,000', wc: false, citySvc: null,
    district: 'the Downtown New Orleans sports district near the Smoothie King Center and the French Quarter', anchors: 'the Smoothie King Center and the French Quarter', langs: 'Spanish and French, with other languages available' },
  { slug: 'soldier-field', venue: 'Soldier Field', city: 'Chicago', metro: 'Chicago', state: 'Illinois', abbr: 'IL', cap: '61,500', wc: false, citySvc: 'illinois/chicago',
    district: "the Museum Campus on Chicago's lakefront near Downtown and Grant Park", anchors: 'the Museum Campus and Downtown Chicago', langs: 'Spanish and Polish, with other languages available' },
  { slug: 't-mobile-arena', venue: 'T-Mobile Arena', city: 'Las Vegas', metro: 'Las Vegas', state: 'Nevada', abbr: 'NV', cap: '20,000', wc: false, citySvc: 'nevada/las-vegas',
    district: 'the heart of the Las Vegas Strip between New York-New York and Park MGM', anchors: 'the Las Vegas Strip and the Park MGM corridor', langs: 'Spanish, with other languages available' },
  { slug: 'state-farm-stadium', venue: 'State Farm Stadium', city: 'Glendale', metro: 'Phoenix', state: 'Arizona', abbr: 'AZ', cap: '63,400', wc: false, citySvc: 'arizona/phoenix',
    district: 'the Glendale sports and entertainment district near the Westgate complex and Desert Diamond Arena', anchors: 'the Westgate Entertainment District and Desert Diamond Arena', langs: 'Spanish, with other languages available' },

  // Convention centers (conv:true → trade-show / exhibitor framing, no stadium wording)
  { slug: 'las-vegas-convention-center', venue: 'Las Vegas Convention Center', city: 'Las Vegas', metro: 'Las Vegas', state: 'Nevada', abbr: 'NV', cap: '4.6M sq ft', wc: false, conv: true, citySvc: 'nevada/las-vegas',
    district: 'the Las Vegas Convention Center District just off the Strip, linked by the LVCC Loop', anchors: 'the Las Vegas Strip and Resorts World', langs: 'Spanish, with other languages available' },
  { slug: 'mccormick-place', venue: 'McCormick Place', city: 'Chicago', metro: 'Chicago', state: 'Illinois', abbr: 'IL', cap: '2.6M sq ft', wc: false, conv: true, citySvc: 'illinois/chicago',
    district: "Chicago's Near South Side on the lakefront just south of the Loop", anchors: 'the Loop and the Museum Campus', langs: 'Spanish and Polish, with other languages available' },
  { slug: 'orange-county-convention-center', venue: 'Orange County Convention Center', city: 'Orlando', metro: 'Orlando', state: 'Florida', abbr: 'FL', cap: '2.1M sq ft', wc: false, conv: true, citySvc: 'florida/orlando',
    district: 'the International Drive tourism corridor in Orlando', anchors: 'International Drive and the Orlando resort district', langs: 'Spanish and Portuguese, with Haitian Creole and other languages available' },
  { slug: 'javits-center', venue: 'Jacob K. Javits Center', city: 'New York', metro: 'New York City', state: 'New York', abbr: 'NY', cap: '840K sq ft', wc: false, conv: true, citySvc: 'new-york/new-york-city',
    district: "Manhattan's Hudson Yards and Hell's Kitchen on the Far West Side", anchors: 'Hudson Yards and the High Line', langs: 'Spanish, with many other languages available' },
  { slug: 'georgia-world-congress-center', venue: 'Georgia World Congress Center', city: 'Atlanta', metro: 'Atlanta', state: 'Georgia', abbr: 'GA', cap: '1.5M sq ft', wc: false, conv: true, citySvc: 'georgia/atlanta',
    district: 'downtown Atlanta alongside Mercedes-Benz Stadium and Centennial Olympic Park', anchors: 'Mercedes-Benz Stadium and Centennial Olympic Park', langs: 'Spanish, with other languages available' },
  { slug: 'moscone-center', venue: 'Moscone Center', city: 'San Francisco', metro: 'San Francisco', state: 'California', abbr: 'CA', cap: '700K sq ft', wc: false, conv: true, citySvc: 'california/san-francisco',
    district: "the SoMa and Yerba Buena district in downtown San Francisco", anchors: 'Union Square and Yerba Buena Gardens', langs: 'Spanish, Mandarin, and other languages available' },
  { slug: 'anaheim-convention-center', venue: 'Anaheim Convention Center', city: 'Anaheim', metro: 'Anaheim', state: 'California', abbr: 'CA', cap: '1.8M sq ft', wc: false, conv: true, citySvc: null,
    district: 'the Anaheim Resort district directly across from the Disneyland Resort', anchors: 'the Disneyland Resort and Angel Stadium', langs: 'Spanish, Vietnamese, and other languages available' },
  { slug: 'walter-e-washington-convention-center', venue: 'Walter E. Washington Convention Center', city: 'Washington', metro: 'Washington, D.C.', state: 'District of Columbia', abbr: 'DC', cap: '2.3M sq ft', wc: false, conv: true, citySvc: null,
    district: 'the Mount Vernon Square district in downtown Washington, D.C.', anchors: 'Mount Vernon Square and the Penn Quarter', langs: 'Spanish, with Amharic and other languages available' },
  { slug: 'kay-bailey-hutchison-convention-center', venue: 'Kay Bailey Hutchison Convention Center', city: 'Dallas', metro: 'Dallas-Fort Worth', state: 'Texas', abbr: 'TX', cap: '1M sq ft', wc: false, conv: true, citySvc: 'texas/dallas',
    district: 'downtown Dallas in the Convention Center District near the Cedars', anchors: 'downtown Dallas and the Cedars district', langs: 'Spanish, with Vietnamese and other languages available' },
  { slug: 'boston-convention-exhibition-center', venue: 'Boston Convention & Exhibition Center', city: 'Boston', metro: 'Boston', state: 'Massachusetts', abbr: 'MA', cap: '516K sq ft', wc: false, conv: true, citySvc: 'massachusetts/boston',
    district: 'the South Boston Seaport and Innovation District on the waterfront', anchors: 'the Seaport District and the Boston waterfront', langs: 'Spanish and Portuguese, with other languages available' },
  { slug: 'music-city-center', venue: 'Music City Center', city: 'Nashville', metro: 'Nashville', state: 'Tennessee', abbr: 'TN', cap: '1.2M sq ft', wc: false, conv: true, citySvc: 'tennessee/nashville',
    district: 'the SoBro district in downtown Nashville near Lower Broadway', anchors: 'Lower Broadway and the SoBro district', langs: 'Spanish, with Kurdish and other languages available' },
  { slug: 'colorado-convention-center', venue: 'Colorado Convention Center', city: 'Denver', metro: 'Denver', state: 'Colorado', abbr: 'CO', cap: '584K sq ft', wc: false, conv: true, citySvc: 'colorado/denver',
    district: 'downtown Denver near the 16th Street Mall and the Theatre District', anchors: 'the 16th Street Mall and the Denver Theatre District', langs: 'Spanish, with other languages available' },

  // Marquee arenas (wc:false → generic arena/event framing)
  { slug: 'chase-center', venue: 'Chase Center', city: 'San Francisco', metro: 'San Francisco', state: 'California', abbr: 'CA', cap: '18,000', wc: false, citySvc: 'california/san-francisco',
    district: "the Mission Bay waterfront neighborhood near Oracle Park", anchors: 'Oracle Park and the Mission Bay waterfront', langs: 'Spanish, Mandarin, and other languages available' },
  { slug: 'barclays-center', venue: 'Barclays Center', city: 'Brooklyn', metro: 'New York City', state: 'New York', abbr: 'NY', cap: '19,000', wc: false, citySvc: 'new-york/new-york-city',
    district: 'the Pacific Park district in Downtown Brooklyn atop the Atlantic Terminal transit hub', anchors: 'the Atlantic Terminal transit hub and Downtown Brooklyn', langs: 'Spanish, with many other languages available' },
  { slug: 'td-garden', venue: 'TD Garden', city: 'Boston', metro: 'Boston', state: 'Massachusetts', abbr: 'MA', cap: '19,000', wc: false, citySvc: 'massachusetts/boston',
    district: "Boston's West End above North Station", anchors: 'North Station and the Bulfinch Triangle', langs: 'Spanish and Portuguese, with other languages available' },

  // NBA/NHL arenas (wc:false → concerts, conventions, corporate & brand-activation events)
  { slug: 'ball-arena', venue: 'Ball Arena', city: 'Denver', metro: 'Denver', state: 'Colorado', abbr: 'CO', cap: '20,000', wc: false, citySvc: 'colorado/denver',
    district: 'the Auraria/Elitch Gardens district just west of Downtown Denver', anchors: 'Elitch Gardens and the Downtown Denver core', langs: 'Spanish, with other languages available' },
  { slug: 'american-airlines-center', venue: 'American Airlines Center', city: 'Dallas', metro: 'Dallas-Fort Worth', state: 'Texas', abbr: 'TX', cap: '20,000', wc: false, citySvc: 'texas/dallas',
    district: 'the Victory Park entertainment district just north of Downtown Dallas', anchors: 'Victory Park and the Dallas Arts District', langs: 'Spanish, with Vietnamese and other languages available' },
  { slug: 'kaseya-center', venue: 'Kaseya Center', city: 'Miami', metro: 'Miami', state: 'Florida', abbr: 'FL', cap: '19,600', wc: false, citySvc: 'florida/miami',
    district: 'the Downtown Miami waterfront along Biscayne Bay near Bayside Marketplace', anchors: 'Bayside Marketplace and the Downtown Miami waterfront', langs: 'Spanish and Portuguese, with Haitian Creole and other languages available' },
  { slug: 'capital-one-arena', venue: 'Capital One Arena', city: 'Washington', metro: 'Washington, D.C.', state: 'District of Columbia', abbr: 'DC', cap: '20,000', wc: false, citySvc: null,
    district: "the Penn Quarter/Chinatown district in Downtown D.C.", anchors: 'Penn Quarter, Chinatown, and the National Mall corridor', langs: 'Spanish, with Amharic and other languages available' },
  { slug: 'wells-fargo-center', venue: 'Wells Fargo Center', city: 'Philadelphia', metro: 'Philadelphia', state: 'Pennsylvania', abbr: 'PA', cap: '21,000', wc: false, citySvc: 'pennsylvania/philadelphia',
    district: 'the South Philadelphia Sports Complex alongside Citizens Bank Park and Lincoln Financial Field', anchors: 'Citizens Bank Park and Lincoln Financial Field', langs: 'Spanish, with other languages available' },
  { slug: 'footprint-center', venue: 'Footprint Center', city: 'Phoenix', metro: 'Phoenix', state: 'Arizona', abbr: 'AZ', cap: '17,000', wc: false, citySvc: 'arizona/phoenix',
    district: 'the heart of Downtown Phoenix near Chase Field and the Convention Center', anchors: 'Chase Field and the Phoenix Convention Center', langs: 'Spanish, with other languages available' },

  // MLB ballparks (wc:false → concerts, festivals, corporate & brand-activation events, not just games)
  { slug: 'dodger-stadium', venue: 'Dodger Stadium', city: 'Los Angeles', metro: 'Los Angeles', state: 'California', abbr: 'CA', cap: '56,000', wc: false, citySvc: 'california/los-angeles',
    district: 'Chavez Ravine in Elysian Park, just north of Downtown LA', anchors: 'Downtown LA and Elysian Park', langs: 'Spanish, Korean, and other languages available' },
  { slug: 'yankee-stadium', venue: 'Yankee Stadium', city: 'New York', metro: 'New York City', state: 'New York', abbr: 'NY', cap: '47,000', wc: false, citySvc: 'new-york/new-york-city',
    district: 'the South Bronx near the Grand Concourse and the 161st Street transit hub', anchors: 'the Grand Concourse and the 161st Street transit hub', langs: 'Spanish, with many other languages available' },
  { slug: 'fenway-park', venue: 'Fenway Park', city: 'Boston', metro: 'Boston', state: 'Massachusetts', abbr: 'MA', cap: '37,700', wc: false, citySvc: 'massachusetts/boston',
    district: 'the Fenway-Kenmore district near Lansdowne Street and the Back Bay', anchors: 'Kenmore Square and Lansdowne Street', langs: 'Spanish and Portuguese, with other languages available' },
  { slug: 'wrigley-field', venue: 'Wrigley Field', city: 'Chicago', metro: 'Chicago', state: 'Illinois', abbr: 'IL', cap: '41,600', wc: false, citySvc: 'illinois/chicago',
    district: 'Wrigleyville in the Lakeview neighborhood around the Gallagher Way plaza', anchors: 'Gallagher Way and the Wrigleyville district', langs: 'Spanish and Polish, with other languages available' },
  { slug: 'oracle-park', venue: 'Oracle Park', city: 'San Francisco', metro: 'San Francisco', state: 'California', abbr: 'CA', cap: '41,900', wc: false, citySvc: 'california/san-francisco',
    district: 'the China Basin waterfront in Mission Bay near Chase Center', anchors: 'the Embarcadero waterfront and Chase Center', langs: 'Spanish, Mandarin, and other languages available' },
  { slug: 'toyota-center', venue: 'Toyota Center', city: 'Houston', metro: 'Houston', state: 'Texas', abbr: 'TX', cap: '18,000', wc: false, citySvc: 'texas/houston',
    district: 'Downtown Houston near the George R. Brown Convention Center and Discovery Green', anchors: 'the George R. Brown Convention Center and Discovery Green', langs: 'Spanish and Vietnamese, with other languages available' },
  { slug: 'little-caesars-arena', venue: 'Little Caesars Arena', city: 'Detroit', metro: 'Detroit', state: 'Michigan', abbr: 'MI', cap: '20,000', wc: false, citySvc: null,
    district: 'The District Detroit entertainment corridor between Downtown and Midtown', anchors: 'Comerica Park, Ford Field, and the Fox Theatre', langs: 'Spanish and Arabic, with other languages available' },
  { slug: 'golden-1-center', venue: 'Golden 1 Center', city: 'Sacramento', metro: 'Sacramento', state: 'California', abbr: 'CA', cap: '17,600', wc: false, citySvc: null,
    district: 'the Downtown Commons (DOCO) district in the heart of Sacramento', anchors: 'Downtown Commons and the K Street corridor', langs: 'Spanish, with other languages available' },
  { slug: 'spectrum-center', venue: 'Spectrum Center', city: 'Charlotte', metro: 'Charlotte', state: 'North Carolina', abbr: 'NC', cap: '19,000', wc: false, citySvc: 'north-carolina/charlotte',
    district: 'Uptown Charlotte in the city’s central business district', anchors: 'the Uptown business district and Truist Field', langs: 'Spanish, with other languages available' },
  { slug: 'fiserv-forum', venue: 'Fiserv Forum', city: 'Milwaukee', metro: 'Milwaukee', state: 'Wisconsin', abbr: 'WI', cap: '17,500', wc: false, citySvc: null,
    district: 'the Deer District entertainment plaza in Downtown Milwaukee', anchors: 'the Deer District plaza and the Wisconsin Center', langs: 'Spanish, with other languages available' },
  { slug: 'paycom-center', venue: 'Paycom Center', city: 'Oklahoma City', metro: 'Oklahoma City', state: 'Oklahoma', abbr: 'OK', cap: '18,000', wc: false, citySvc: null,
    district: 'Downtown Oklahoma City next to the Bricktown entertainment district', anchors: 'Bricktown and the downtown core', langs: 'Spanish, with other languages available' },
];

function esc(s){return s.replace(/&/g,'&amp;');}
function escAttr(s){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');}

// Venues hand-built in separate files (not regenerated here) — used as cross-link targets only.
const externalVenues = [
  { slug: 'sofi-stadium', venue: 'SoFi Stadium', metro: 'Los Angeles' },
  { slug: 'metlife-stadium', venue: 'MetLife Stadium', metro: 'New York City' },
  { slug: 'mercedes-benz-stadium', venue: 'Mercedes-Benz Stadium', metro: 'Atlanta' },
];
// Group venues into metro clusters for sibling cross-linking. Normalizes the two SF
// metro strings into one cluster WITHOUT altering any venue's displayed metro/title/meta.
function clusterKey(metro){
  if (metro === 'San Francisco' || metro === 'San Francisco Bay Area') return 'San Francisco Bay Area';
  return metro;
}
const clusterDisplay = { 'San Francisco Bay Area': 'the San Francisco Bay Area' };
const venuesByCluster = {};
for (const v of [...venues, ...externalVenues]) {
  const k = clusterKey(v.metro);
  (venuesByCluster[k] = venuesByCluster[k] || []).push({ slug: v.slug, venue: v.venue });
}

function page(v){
  const venueEsc = esc(v.venue);
  const url = `https://streetteamsco.com/${v.slug}-event-staffing`;
  const isWC = v.wc !== false;
  const isConv = v.conv === true;
  const capLabel = isConv ? 'Exhibit Space' : 'Stadium Capacity';
  const perimeterWord = isConv ? 'convention center perimeter and surrounding concourses' : 'stadium perimeter';
  const venueWord = isConv ? 'convention center' : 'stadium';
  const gatesWord = isConv ? 'exhibit halls' : 'stadium gates';
  const activationWord = isConv ? 'convention' : 'stadium';
  const affilWord = isConv ? 'show organizer or venue operator' : 'team';
  const insideWord = isConv ? 'in-venue' : 'in-stadium';
  const metaWC = isWC ? ', a 2026 World Cup host venue' : '';
  const banner = isWC
    ? `${venueEsc} hosts 2026 World Cup matches in ${esc(v.metro)}. Activation staff book early. <a href="/contact">Get a free quote</a>.`
    : `Planning a brand activation at ${venueEsc} in ${esc(v.metro)}? Street Teams Co staffs the venue district. <a href="/contact">Get a free quote</a>.`;
  const statNum = isWC ? 'World Cup' : isConv ? 'Trade Show' : 'Marquee';
  const statLabel = isWC ? 'Host Venue' : isConv ? 'Expo Venue' : 'Event Venue';
  const hostLine = isWC
    ? `a confirmed host site for the <a href="/fifa-world-cup-2026-staffing/${v.wcCity}">2026 World Cup</a>`
    : isConv
    ? `one of the largest convention and trade-show venues in ${esc(v.metro)}`
    : `one of the marquee event, sports, and concert venues in ${esc(v.metro)}`;
  const bigCrowd = isWC ? ' — and the World Cup will bring some of the most international audiences the venue has ever seen' : '';
  const eventsList = isWC ? 'concerts, games, conventions, and the 2026 World Cup' : isConv ? 'trade shows, conventions, and major expos' : 'concerts, games, and major events';
  const wcCrossLink = isWC ? `\n      <a href="/fifa-world-cup-2026-staffing/${v.wcCity}">${esc(v.metro)} World Cup 2026 Staffing</a>` : '';
  const fifaDisc = isWC ? ', or FIFA or any official World Cup organizing body' : '';
  const langTail = isWC ? ' for the international crowds the World Cup draws' : ' for the diverse, international crowds these events draw';
  const bilingualWC = isWC ? 'the global crowds drawn to the 2026 World Cup make bilingual staffing valuable' : isConv ? 'the international audiences at major trade shows and conventions make bilingual staffing valuable' : 'the international audiences at major events make bilingual staffing valuable';
  const citySvcLinks = v.citySvc ? `
      <a href="/locations/${v.citySvc}/brand-ambassadors">${esc(v.metro)} Brand Ambassadors</a>
      <a href="/locations/${v.citySvc}/event-staffing">${esc(v.metro)} Event Staffing</a>
      <a href="/locations/${v.citySvc}/brand-activation">${esc(v.metro)} Brand Activation</a>` : '';
  const ck = clusterKey(v.metro);
  const siblings = (venuesByCluster[ck] || []).filter(s => s.slug !== v.slug);
  const regionLabel = clusterDisplay[ck] || esc(v.metro);
  const siblingBlock = siblings.length ? `
  <hr class="section-divider">

  <div class="internal-links">
    <h3>More Venues We Staff in ${regionLabel}</h3>
    <div class="link-grid">
${siblings.map(s => `      <a href="/${s.slug}-event-staffing">${esc(s.venue)} Event Staffing</a>`).join('\n')}
    </div>
  </div>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${venueEsc} Event Staffing &amp; Brand Ambassadors | ${esc(v.metro)} | Street Teams Co</title>
  <meta name="description" content="${escAttr(v.venue)} event staffing and brand ambassadors — sampling crews, street teams, and bilingual promotional staff for activations at and around ${escAttr(v.venue)} in ${escAttr(v.metro)}${metaWC}. Get a free quote.">
  <meta name="author" content="Street Teams Co">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${escAttr(v.venue)} Event Staffing &amp; Brand Ambassadors">
  <meta property="og:description" content="Sampling crews, street teams, and bilingual brand ambassadors for activations at and around ${escAttr(v.venue)} in ${escAttr(v.metro)}${isWC?' — a 2026 World Cup host venue':''}.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Street Teams Co">
  <meta property="og:image" content="https://streetteamsco.com/images/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escAttr(v.venue)} Event Staffing &amp; Brand Ambassadors">
  <meta name="twitter:description" content="Event staffing and brand ambassadors for ${escAttr(v.venue)} activations. Get a free quote.">

  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","name":${JSON.stringify(v.venue+' Event Staffing & Brand Ambassadors')},"provider":{"@type":"MarketingAgency","name":"Street Teams Co","url":"https://streetteamsco.com","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127","bestRating":"5"}},"description":${JSON.stringify('Professional event staffing, brand ambassadors, sampling crews, and street teams for brand activations at and around '+v.venue+' in '+v.metro+(isWC?', a 2026 World Cup host venue':isConv?', a leading convention and trade-show venue':', a marquee event and sports venue')+'.')},"areaServed":{"@type":"City","name":${JSON.stringify(v.city)},"containedInPlace":{"@type":"State","name":${JSON.stringify(v.state)}}},"serviceType":"Event Staffing","url":"${url}"}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://streetteamsco.com"},{"@type":"ListItem","position":2,"name":${JSON.stringify(v.venue+' Event Staffing')},"item":"${url}"}]}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
  {"@type":"Question","name":${JSON.stringify('Can you provide brand ambassadors and event staff at '+v.venue+'?')},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify('Yes. Street Teams Co staffs brand activations, sampling, street teams, and promotional teams at and around '+v.venue+' and '+v.district+' in '+v.metro+'. We deploy on the '+perimeterWord+', in the parking and transit zones, and across the pedestrian corridors that fill before and after every event — for '+eventsList+'.')}}},
  {"@type":"Question","name":${JSON.stringify('Do you provide bilingual staff for '+v.metro+' '+activationWord+' activations?')},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify('Yes. The '+v.metro+' area is diverse and '+bilingualWC+'. The majority of our available staff are bilingual in English and '+v.langs+'.')}}},
  {"@type":"Question","name":${JSON.stringify('How much does '+v.venue+' event staffing cost?')},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify('Every '+v.venue+' activation is custom-quoted based on your goals, team size, roles, hours, and language needs. There are no published rate cards because no two activations are alike. Tell us your event and goals and we will return a detailed staffing plan and a free quote.')}}},
  {"@type":"Question","name":"Can you staff activations near the ${venueWord} without official sponsorship?","acceptedAnswer":{"@type":"Answer","text":${JSON.stringify('Yes. While '+insideWord+' activations require venue or event rights, the public approaches, plazas, parking areas, transit hubs, and the surrounding '+v.metro+' districts offer significant opportunity for street teams, sampling, and brand ambassadors to reach attendees without official sponsorship.')}}}]}
  </script>

  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #121110; background: #F7F5EF; }
    .urgency-banner { background: linear-gradient(90deg, #FF4D00, #E04300); color: #0f172a; padding: 0.85rem 2rem; text-align: center; font-weight: 700; font-size: 0.95rem; }
    .urgency-banner a { color: #0f172a; text-decoration: underline; font-weight: 800; }
    header { background: #0f172a; padding: 1rem 0; position: sticky; top: 0; z-index: 100; }
    .header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
    .logo { color: #fff; font-weight: 800; font-size: 1.25rem; text-decoration: none; letter-spacing: 1.5px; }
    .nav-links a { color: rgba(255,255,255,0.75); text-decoration: none; margin-left: 1.5rem; font-size: 0.9rem; font-weight: 500; }
    .nav-links a:hover { color: #FF4D00; }
    .page-hero { background: linear-gradient(135deg, rgba(15,23,42,0.92), rgba(13,148,136,0.75)), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80') center/cover; padding: 5rem 2rem 4.5rem; color: #fff; }
    .page-hero-inner { max-width: 1000px; margin: 0 auto; }
    .breadcrumb { font-size: 0.85rem; margin-bottom: 1.5rem; opacity: 0.7; }
    .breadcrumb a { color: #fff; text-decoration: none; }
    .event-badge { display: inline-block; background: #FF4D00; color: #0f172a; padding: 0.4rem 1.25rem; border-radius: 24px; font-size: 0.8rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase; }
    .page-hero h1 { font-size: 2.6rem; line-height: 1.15; margin-bottom: 1.25rem; font-weight: 900; max-width: 850px; }
    .page-hero .hero-sub { font-size: 1.2rem; opacity: 0.92; max-width: 750px; }
    .hero-cta-row { margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; }
    .stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin: -2.5rem auto 3rem; max-width: 1000px; padding: 0 2rem; position: relative; z-index: 10; }
    .stat-box { background: #0f172a; color: #fff; padding: 1.5rem 1rem; border-radius: 14px; text-align: center; }
    .stat-box .number { font-size: 1.6rem; font-weight: 900; color: #FF4D00; }
    .stat-box .label { font-size: 0.78rem; opacity: 0.7; margin-top: 0.25rem; text-transform: uppercase; }
    .content { max-width: 1000px; margin: 0 auto; padding: 1rem 2rem 4rem; }
    .content h2 { font-size: 1.8rem; margin: 3rem 0 1rem; color: #0f172a; font-weight: 800; }
    .content p { margin-bottom: 1.25rem; font-size: 1.05rem; color: #374151; }
    .content ul { margin: 1rem 0 1.5rem 1.5rem; }
    .content li { margin-bottom: 0.6rem; font-size: 1.05rem; color: #374151; }
    .content a { color: #E04300; text-decoration: none; font-weight: 500; }
    .content a:hover { text-decoration: underline; }
    .content strong { color: #0f172a; }
    .section-divider { height: 3px; background: linear-gradient(90deg, transparent, #FF4D00, #0d9488, transparent); margin: 3rem 0; border: none; }
    .cta-section { background: linear-gradient(135deg, #0f172a 0%, #0d9488 100%); color: #fff; padding: 3rem; border-radius: 20px; text-align: center; margin: 3rem 0; }
    .cta-section h2 { color: #fff; margin-bottom: 1rem; font-size: 1.8rem; }
    .cta-section p { color: rgba(255,255,255,0.9); margin-bottom: 1.5rem; max-width: 650px; margin: 0 auto 1.5rem; }
    .cta-btn { display: inline-block; background: #FF4D00; color: #0f172a; padding: 1rem 2.5rem; border-radius: 10px; text-decoration: none; font-weight: 800; }
    .cta-btn:hover { background: #fbbf24; }
    .cta-secondary { display: inline-block; border: 2px solid rgba(255,255,255,0.4); color: #fff; padding: 0.95rem 2.25rem; border-radius: 10px; text-decoration: none; font-weight: 700; margin-left: 1rem; }
    .faq-item { border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.5rem 1.75rem; margin-bottom: 1rem; background: #fff; }
    .faq-item h4 { font-size: 1.1rem; color: #0f172a; margin-bottom: 0.75rem; font-weight: 700; }
    .faq-item p { color: #4b5563; margin: 0; font-size: 0.98rem; }
    .internal-links { background: linear-gradient(135deg, #FFF3EE, #f0fdfa); border-radius: 14px; padding: 2rem 2.25rem; margin: 2rem 0; border: 1px solid #e0e7ff; }
    .internal-links h3 { margin-top: 0; color: #0f172a; font-size: 1.15rem; margin-bottom: 1rem; }
    .link-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem; }
    .link-grid a { display: block; padding: 0.4rem 0; color: #E04300; font-size: 0.95rem; font-weight: 500; }
    .disclaimer { max-width: 1000px; margin: 0 auto 2rem; padding: 1.25rem 1.5rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; color: #64748b; font-style: italic; }
    footer { background: #0f172a; color: rgba(255,255,255,0.6); padding: 3rem 2rem; text-align: center; font-size: 0.85rem; border-top: 3px solid #FF4D00; }
    footer a { color: rgba(255,255,255,0.85); text-decoration: none; }
    @media (max-width: 768px) { .page-hero h1 { font-size: 1.85rem; } .stats-bar { grid-template-columns: repeat(2, 1fr); } .nav-links { display: none; } .cta-secondary { margin-left: 0; display: block; margin-top: 1rem; } }
  </style>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WL8QZB3S96"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-WL8QZB3S96');</script>
</head>
<body>

<div class="urgency-banner">
  ${banner}
</div>

<header>
  <div class="header-inner">
    <a href="/" class="logo">STREET TEAMS CO</a>
    <div class="nav-links">
      <a href="/services">Services</a>
      <a href="/contact">Get a free quote</a>
      <a href="/case-studies/">Case Studies</a>
      <a href="/locations">Locations</a>
      <a href="/blog/">Blog</a>
    </div>
  </div>
</header>

<section class="page-hero">
  <div class="page-hero-inner">
    <nav class="breadcrumb"><a href="/">Home</a> / <span>${venueEsc} Event Staffing</span></nav>
    <div class="event-badge">${esc(v.metro)}</div>
    <h1>${venueEsc} Event Staffing &amp; Brand Ambassadors</h1>
    <p class="hero-sub">Street Teams Co staffs brand activations, sampling crews, street teams, and bilingual brand ambassadors at and around ${venueEsc} in ${esc(v.metro)}${isWC?' — a 2026 World Cup host venue':isConv?', a leading convention and trade-show venue':', a marquee event and concert venue'}.</p>
    <div class="hero-cta-row">
      <a href="/contact" class="cta-btn">Get Your ${esc(v.metro)} Staffing Quote</a>
      <a href="/contact" class="cta-secondary">Get a free quote</a>
    </div>
  </div>
</section>

<div class="stats-bar">
  <div class="stat-box"><div class="number">${esc(v.cap)}</div><div class="label">${capLabel}</div></div>
  <div class="stat-box"><div class="number">${statNum}</div><div class="label">${statLabel}</div></div>
  <div class="stat-box"><div class="number">Bilingual</div><div class="label">Teams Available</div></div>
  <div class="stat-box"><div class="number">Free</div><div class="label">Custom Quotes</div></div>
</div>

<div class="content">

  <h2>Event Staffing at ${venueEsc} &amp; ${esc(v.metro)}</h2>

  <p><strong>${venueEsc}</strong> is one of the marquee event venues in ${esc(v.metro)} and ${hostLine}. Set within ${esc(v.district)}, it draws huge, energetic crowds before, during, and after every event${bigCrowd}.</p>

  <p>That concentration makes the ${venueEsc} district a high-value activation footprint. Crowds funnel through a defined set of plazas, parking areas, transit hubs, and pedestrian corridors — captive audiences moving on predictable paths, ideal for street teams, sampling crews, and high-visibility brand ambassadors. The surrounding area around ${esc(v.anchors)} extends the activation window well beyond the ${gatesWord}.</p>

  <p>Street Teams Co maintains an established, active staff network throughout the ${esc(v.metro)} area. Our local teams know the venue's foot-traffic patterns, the best intercept points, and how crowds flow between the ${venueWord} and the surrounding districts.</p>

  <div class="cta-section">
    <h2>Get Your ${venueEsc} Staffing Quote</h2>
    <p>Tell us your event, goals, and dates, and we'll build a custom ${esc(v.metro)} activation staffing plan and a free quote.</p>
    <a href="/contact" class="cta-btn">Request a Free Quote</a>
  </div>

  <hr class="section-divider">

  <h2>Activation Roles We Staff at ${venueEsc}</h2>
  <ul>
    <li><strong>Brand ambassadors</strong> — Trained, bilingual reps for product education, lead capture, and consumer engagement across the ${perimeterWord} and surrounding district.</li>
    <li><strong>Street teams</strong> — High-energy crews working the parking areas, transit hubs, and pedestrian corridors on event days.</li>
    <li><strong>Product sampling</strong> — Fan-targeted sampling of beverages, snacks, and promotional items, with cold-chain logistics for summer events.</li>
    <li><strong>Event &amp; hospitality staff</strong> — Registration, hospitality, crowd flow, and sponsor lounge support.</li>
    <li><strong>Guerrilla &amp; experiential</strong> — Attention-grabbing street-level activations and installations around the venue district.</li>
    <li><strong>Bilingual staff</strong> — English plus ${esc(v.langs)}${langTail}.</li>
  </ul>

  <hr class="section-divider">

  <h2>Frequently Asked Questions: ${venueEsc} Staffing</h2>
  <div class="faq-item">
    <h4>Can you provide brand ambassadors and event staff at ${venueEsc}?</h4>
    <p>Yes. Street Teams Co staffs brand activations, sampling, street teams, and promotional teams at and around ${venueEsc} and ${esc(v.district)} in ${esc(v.metro)}. We deploy on the ${perimeterWord}, in the parking and transit zones, and across the pedestrian corridors that fill before and after every event — for ${eventsList}.</p>
  </div>
  <div class="faq-item">
    <h4>Do you provide bilingual staff for ${esc(v.metro)} ${activationWord} activations?</h4>
    <p>Yes. The ${esc(v.metro)} area is diverse and ${bilingualWC}. The majority of our available staff are bilingual in English and ${esc(v.langs)}.</p>
  </div>
  <div class="faq-item">
    <h4>How much does ${venueEsc} event staffing cost?</h4>
    <p>Every ${venueEsc} activation is custom-quoted based on your goals, team size, roles, hours, and language needs. There are no published rate cards because no two activations are alike. Tell us your event and goals and we will return a detailed staffing plan and a <a href="/contact">free quote</a>.</p>
  </div>
  <div class="faq-item">
    <h4>Can you staff activations near the ${venueWord} without official sponsorship?</h4>
    <p>Yes. While ${insideWord} activations require venue or event rights, the public approaches, plazas, parking areas, transit hubs, and the surrounding ${esc(v.metro)} districts offer significant opportunity for street teams, sampling, and brand ambassadors to reach attendees without official sponsorship.</p>
  </div>

  <div class="cta-section">
    <h2>Ready to Activate at ${venueEsc}?</h2>
    <p>The best bilingual brand ambassadors and field staff in ${esc(v.metro)} book early. Start the conversation today.</p>
    <a href="/contact" class="cta-btn">Get Your ${esc(v.metro)} Staffing Quote</a>
  </div>

  <hr class="section-divider">

  <div class="internal-links">
    <h3>Related ${esc(v.metro)} Resources</h3>
    <div class="link-grid">
${wcCrossLink}${citySvcLinks}
      <a href="/services/event-staffing">Event Staffing Services</a>
      <a href="/services/brand-ambassadors">Brand Ambassadors</a>
      <a href="/services/product-sampling">Product Sampling</a>
      ${isWC?'<a href="/fifa-world-cup-2026-staffing">World Cup 2026 Hub</a>':'<a href="/services">All Services</a>'}
      <a href="/contact">Get a free quote</a>
    </div>
  </div>${siblingBlock}

</div>

<div class="disclaimer">
  Street Teams Co is an independent event staffing agency and is not affiliated with, endorsed by, or sponsored by ${venueEsc}, any ${affilWord}${fifaDisc}. References to the venue and major events are descriptive and used solely to indicate the location and timing of brand activation opportunities.
</div>

<footer>
  <p>&copy; 2026 <a href="/">Street Teams Co</a>. All rights reserved. | <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a> | <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></p>
  <p style="margin-top: 0.5rem;"><a href="/services">Services</a> | <a href="/contact">Get a free quote</a> | <a href="/case-studies/">Case Studies</a> | <a href="/locations">Locations</a> | <a href="/blog/">Blog</a></p>
</footer>

<div style="position:fixed;bottom:0;left:0;right:0;background:#121110;border-top:2px solid #FF4D00;padding:.75rem 1rem;display:flex;justify-content:center;align-items:center;gap:1rem;z-index:200">
  <p style="color:#fff;font-size:.9rem;margin:0" class="sticky-msg">Activating at ${venueEsc}? Get a free quote.</p>
  <a href="/contact" style="display:inline-block;background:#FF4D00;color:#121110;padding:.6rem 1.5rem;border-radius:6px;text-decoration:none;font-weight:700;font-size:.9rem;white-space:nowrap">Get Free Quote</a>
</div>
<style>.sticky-msg{display:block}@media(max-width:768px){.sticky-msg{display:none!important}}</style></body>
</html>`;
}

let n = 0;
for (const v of venues) {
  fs.writeFileSync(`public/${v.slug}-event-staffing.html`, page(v), 'utf8');
  n++;
}
console.log(`Generated ${n} venue event-staffing pages.`);
console.log('Slugs: ' + venues.map(v => v.slug + '-event-staffing').join(', '));
