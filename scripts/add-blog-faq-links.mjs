#!/usr/bin/env node
/**
 * add-blog-faq-links.mjs
 *
 * Adds FAQPage JSON-LD schema and a "Key Resources" cross-link section
 * to every blog post in public/blog/.  Idempotent: skips files that
 * already contain either element.
 *
 * Usage:  node scripts/add-blog-faq-links.mjs
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BLOG_DIR = join(import.meta.dirname, '..', 'public', 'blog');

// ── Key Resources HTML block ─────────────────────────────────────────
const KEY_RESOURCES_HTML = `
<div style="background:#f0f4ff;border-radius:12px;padding:2rem;margin:2rem 0;">
  <h3 style="margin-top:0;color:#1a1a2e;">Key Resources</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;">
    <a href="/street-team-marketing-agency" style="color:#2563eb;">Street Team Marketing Agency</a>
    <a href="/brand-ambassador-agency" style="color:#2563eb;">Brand Ambassador Agency</a>
    <a href="/guerrilla-marketing-agency" style="color:#2563eb;">Guerrilla Marketing Agency</a>
    <a href="/product-sampling-agency" style="color:#2563eb;">Product Sampling Agency</a>
    <a href="/services" style="color:#2563eb;">All Services</a>
    <a href="/contact" style="color:#E04300;">Get a Free Quote</a>
    <a href="/locations" style="color:#2563eb;">1,000+ City Locations</a>
    <a href="/testimonials" style="color:#2563eb;">Client Testimonials</a>
  </div>
</div>`;

// ── FAQ generation logic ─────────────────────────────────────────────

/** City-name map for city-specific posts */
const CITY_MAP = {
  'los-angeles': 'Los Angeles',
  'new-york-city': 'New York City',
  'chicago': 'Chicago',
  'miami': 'Miami',
  'las-vegas': 'Las Vegas',
  'dallas': 'Dallas',
  'denver': 'Denver',
  'houston': 'Houston',
  'atlanta': 'Atlanta',
  'phoenix': 'Phoenix',
  'san-francisco': 'San Francisco',
  'seattle': 'Seattle',
  'boston': 'Boston',
  'nashville': 'Nashville',
  'austin': 'Austin',
};

/**
 * Return 3 FAQ Q&A pairs based on the blog post filename and title.
 * Each entry is { question, answer }.
 */
function generateFAQs(filename, title) {
  const slug = filename.replace('.html', '');
  const lower = (title + ' ' + slug).toLowerCase();

  // ── City-specific posts ────────────────────────────────────────────
  for (const [key, city] of Object.entries(CITY_MAP)) {
    if (lower.includes(key)) {
      return [
        {
          question: `How much does street team marketing cost in ${city}?`,
          answer: `Street team marketing costs in ${city} typically range from $25 to $75 per hour per brand ambassador, depending on the event type, team size, and campaign duration. Request a free quote from Street Teams Co for custom ${city} pricing.`,
        },
        {
          question: `How do I hire a street team in ${city}?`,
          answer: `To hire a street team in ${city}, contact Street Teams Co with your campaign goals, dates, and location details. We handle recruiting, training, and deploying brand ambassadors across the ${city} metro area within 48 to 72 hours.`,
        },
        {
          question: `What types of street marketing campaigns work best in ${city}?`,
          answer: `The most effective street marketing campaigns in ${city} include product sampling at high-traffic locations, guerrilla activations in popular neighborhoods, event staffing at local festivals and conventions, and flyering in key business districts. Street Teams Co tailors each campaign to ${city}'s unique market dynamics.`,
        },
      ];
    }
  }

  // ── World Cup posts ────────────────────────────────────────────────
  if (lower.includes('world cup') || lower.includes('world-cup')) {
    return [
      {
        question: 'How do I staff a World Cup 2026 marketing activation?',
        answer: 'To staff a World Cup 2026 marketing activation, partner with an experienced event staffing agency like Street Teams Co that provides trained, bilingual brand ambassadors in all 16 host cities. Start planning at least 6 months before the tournament for the best talent availability.',
      },
      {
        question: 'How much does World Cup 2026 event staffing cost?',
        answer: 'World Cup 2026 event staffing typically costs $35 to $85 per hour per staff member, depending on the role, language requirements, and city. Premium bilingual ambassadors and specialized roles like emcees command higher rates. Get a custom quote from Street Teams Co for your specific activation.',
      },
      {
        question: 'Do I need a FIFA sponsorship to market at the World Cup?',
        answer: 'No, you do not need a FIFA sponsorship to market around the World Cup. Ambush marketing strategies such as fan zone activations, street team deployments near venues, and experiential pop-ups in host cities allow non-sponsors to reach World Cup audiences legally and effectively.',
      },
    ];
  }

  // ── Guerrilla marketing posts ──────────────────────────────────────
  if (lower.includes('guerrilla')) {
    return [
      {
        question: 'What is guerrilla marketing and how does it work?',
        answer: 'Guerrilla marketing is an unconventional, low-cost marketing strategy that uses surprise, creativity, and public spaces to promote a brand. It works by creating memorable, shareable experiences that generate word-of-mouth buzz and social media coverage, often delivering outsized ROI compared to traditional advertising.',
      },
      {
        question: 'How much does a guerrilla marketing campaign cost?',
        answer: 'Guerrilla marketing campaigns can range from $2,000 for a simple street team activation to $50,000 or more for elaborate multi-city experiential stunts. The average small-business guerrilla campaign costs between $5,000 and $15,000 including staff, materials, and permits.',
      },
      {
        question: 'Is guerrilla marketing legal?',
        answer: 'Guerrilla marketing is legal when properly executed with the necessary permits and permissions. Key considerations include city permit requirements, private property permissions, trademark compliance, and local noise or signage ordinances. A professional agency like Street Teams Co handles all permitting and compliance.',
      },
    ];
  }

  // ── Cost / pricing / budget posts ──────────────────────────────────
  if (lower.includes('cost') || lower.includes('pricing') || lower.includes('budget')) {
    return [
      {
        question: 'How much does street team marketing cost?',
        answer: 'Street team marketing typically costs between $25 and $75 per hour per brand ambassador, with most campaigns averaging $35 to $50 per hour. Total campaign costs depend on team size, duration, location, and whether product samples or promotional materials are included.',
      },
      {
        question: 'What factors affect street team marketing pricing?',
        answer: 'Key pricing factors include the number of brand ambassadors needed, campaign duration, geographic location (major metros cost more), required skills such as bilingual ability, materials and product samples, permit fees, and the level of reporting and analytics included.',
      },
      {
        question: 'Is street team marketing cost-effective compared to digital advertising?',
        answer: 'Yes, street team marketing often delivers a lower cost per qualified lead than digital advertising, typically $15 to $40 per lead compared to $50 to $150 for digital. In-person interactions also produce higher conversion rates and stronger brand recall than online impressions alone.',
      },
    ];
  }

  // ── ROI / measurement posts ────────────────────────────────────────
  if (lower.includes('roi') || lower.includes('measure') || lower.includes('statistic')) {
    return [
      {
        question: 'How do you measure street team marketing ROI?',
        answer: 'Street team marketing ROI is measured through lead capture counts, coupon redemptions, QR code scans, social media engagement, foot traffic increases, direct sales conversions, and cost-per-acquisition compared to other channels. Professional agencies provide detailed post-campaign analytics reports.',
      },
      {
        question: 'What is the average ROI of street team marketing?',
        answer: 'Street team marketing campaigns typically deliver 3x to 10x return on investment when properly executed. The average cost per face-to-face impression ranges from $0.50 to $3.00, with conversion rates 5 to 10 times higher than digital-only campaigns.',
      },
      {
        question: 'What KPIs should I track for street marketing campaigns?',
        answer: 'Essential KPIs for street marketing include impressions and interactions per hour, leads captured, samples distributed, social media mentions and UGC, conversion rate from lead to customer, cost per lead, cost per acquisition, and overall campaign ROI compared to your target benchmark.',
      },
    ];
  }

  // ── Brand ambassador posts ─────────────────────────────────────────
  if (lower.includes('brand ambassador') || lower.includes('brand-ambassador')) {
    return [
      {
        question: 'What does a brand ambassador do?',
        answer: 'A brand ambassador represents a company at events, promotions, and public activations. They engage consumers through product demonstrations, sampling, lead capture, and brand storytelling. Professional brand ambassadors are trained in sales techniques, product knowledge, and customer engagement to drive measurable marketing results.',
      },
      {
        question: 'How do I hire brand ambassadors for my campaign?',
        answer: 'To hire brand ambassadors, contact a staffing agency like Street Teams Co with your campaign details including dates, locations, team size, and any special requirements. The agency handles recruiting, vetting, training, and managing ambassadors so you can focus on campaign strategy.',
      },
      {
        question: 'How much do brand ambassadors cost to hire?',
        answer: 'Brand ambassadors typically cost $25 to $75 per hour depending on experience, market, and campaign requirements. Specialized roles like bilingual ambassadors, promotional models, or trade show presenters may command higher rates. Most agencies offer volume discounts for larger teams or longer campaigns.',
      },
    ];
  }

  // ── Product sampling posts ─────────────────────────────────────────
  if (lower.includes('sampling') || lower.includes('product sample')) {
    return [
      {
        question: 'How do I plan a product sampling campaign?',
        answer: 'To plan a product sampling campaign, define your target audience, select high-traffic locations where they gather, determine sample quantities, hire trained brand ambassadors, secure necessary permits, and set up lead capture mechanisms. A professional agency like Street Teams Co manages the entire process from planning through execution.',
      },
      {
        question: 'How much does a product sampling campaign cost?',
        answer: 'Product sampling campaigns typically cost between $5,000 and $30,000 depending on the number of samples, locations, team size, and duration. Per-sample distribution costs average $1.50 to $5.00 including staff, permits, and logistics when managed by a professional agency.',
      },
      {
        question: 'What is the ROI of product sampling?',
        answer: 'Product sampling delivers strong ROI with industry data showing 73% of consumers who try a sample are likely to purchase the product. Average conversion rates from sample to sale range from 25% to 45%, making sampling one of the highest-converting marketing tactics available.',
      },
    ];
  }

  // ── Event staffing / trade show posts ──────────────────────────────
  if (lower.includes('event staff') || lower.includes('trade show') || lower.includes('conference') || lower.includes('booth')) {
    return [
      {
        question: 'How do I hire event staff for my next event?',
        answer: 'To hire event staff, contact Street Teams Co with your event details including date, location, team size, and role requirements. We provide trained brand ambassadors, promotional models, product demonstrators, and event coordinators in 50+ cities with as little as 48 hours notice.',
      },
      {
        question: 'How much does event staffing cost?',
        answer: 'Event staffing costs range from $25 to $85 per hour per staff member, depending on the role, location, and event complexity. Trade show booth staff averages $35 to $55 per hour, while specialized roles like emcees or product demonstrators command $60 to $85 per hour.',
      },
      {
        question: 'What makes professional event staff better than hiring on my own?',
        answer: 'Professional event staffing agencies provide vetted, trained, and insured staff who are experienced in consumer engagement, lead capture, and brand representation. They handle recruiting, background checks, training, scheduling, and on-site management, reducing your risk and delivering consistently higher performance.',
      },
    ];
  }

  // ── Flyer / flyering posts ─────────────────────────────────────────
  if (lower.includes('flyer') || lower.includes('flyering') || lower.includes('distribution')) {
    return [
      {
        question: 'Is flyer distribution still effective in 2026?',
        answer: 'Yes, professional flyer distribution remains highly effective in 2026. When executed by trained street teams in targeted high-traffic areas, flyer campaigns achieve response rates of 1% to 5%, significantly outperforming most digital display advertising. Physical materials create stronger brand recall than digital impressions alone.',
      },
      {
        question: 'How much does professional flyer distribution cost?',
        answer: 'Professional flyer distribution costs between $150 and $500 per thousand flyers distributed, depending on the market, targeting precision, and whether brand ambassadors actively engage recipients. This includes staff time, distribution strategy, and real-time reporting.',
      },
      {
        question: 'Do I need a permit to distribute flyers?',
        answer: 'Permit requirements for flyer distribution vary by city and location. Most major cities require permits for commercial distribution on public sidewalks, and private property always requires owner permission. A professional agency like Street Teams Co handles all permitting and compliance for your campaign.',
      },
    ];
  }

  // ── Pop-up / retail posts ──────────────────────────────────────────
  if (lower.includes('pop-up') || lower.includes('popup') || lower.includes('retail') || lower.includes('grand opening')) {
    return [
      {
        question: 'How do street teams help with pop-up events and retail activations?',
        answer: 'Street teams drive foot traffic to pop-up events through pre-event flyering, social media buzz, and on-site engagement. During the event, brand ambassadors greet visitors, demonstrate products, capture leads, and create shareable moments that extend reach beyond the physical location.',
      },
      {
        question: 'How much does it cost to staff a pop-up event?',
        answer: 'Staffing a pop-up event typically costs $1,500 to $8,000 for a single-day activation, depending on team size, market, and event hours. This includes brand ambassadors, a team lead, and pre-event promotional support. Multi-day pop-ups receive discounted daily rates.',
      },
      {
        question: 'What staff roles do I need for a retail activation?',
        answer: 'A successful retail activation typically requires a team lead or event manager, 2 to 6 brand ambassadors for customer engagement, a product demonstrator if applicable, and optionally a photographer for social content. Street Teams Co helps you determine the optimal team composition based on your goals and venue size.',
      },
    ];
  }

  // ── Festival / music / sports posts ────────────────────────────────
  if (lower.includes('festival') || lower.includes('music') || lower.includes('sport') || lower.includes('game day')) {
    return [
      {
        question: 'How do street teams market at music festivals and sporting events?',
        answer: 'Street teams at festivals and sporting events distribute samples, set up interactive brand experiences, capture leads through contests and giveaways, and create social media moments. Teams deploy both inside venues and in surrounding high-traffic areas to maximize brand exposure and consumer engagement.',
      },
      {
        question: 'How far in advance should I book event marketing staff?',
        answer: 'For major festivals and sporting events, book your street team at least 4 to 8 weeks in advance to secure the best talent. Peak seasons like summer festivals and football season fill up quickly. Last-minute staffing is possible in most markets with 48 to 72 hours notice, but advance booking ensures your preferred team composition.',
      },
      {
        question: 'What types of activations work best at festivals?',
        answer: 'The most effective festival activations include product sampling stations, branded photo opportunities, interactive games or challenges, mobile charging stations with branded wraps, and pop-up lounges. These create value for attendees while generating leads, social content, and brand impressions.',
      },
    ];
  }

  // ── Cannabis / dispensary posts ─────────────────────────────────────
  if (lower.includes('cannabis') || lower.includes('dispensar')) {
    return [
      {
        question: 'Can you do street team marketing for cannabis brands?',
        answer: 'Yes, street team marketing is one of the most effective channels for cannabis brands, especially given advertising restrictions on digital and traditional media. Street teams can deploy near dispensaries, at cannabis-friendly events, and in legal consumption areas with compliant messaging and age verification.',
      },
      {
        question: 'What cannabis marketing restrictions affect street teams?',
        answer: 'Cannabis street marketing must comply with state and local regulations including no marketing to minors, no distribution of product samples in most states, required age verification, and distance restrictions from schools. A professional agency ensures full compliance with all applicable cannabis marketing laws.',
      },
      {
        question: 'How much does cannabis dispensary marketing cost?',
        answer: 'Cannabis dispensary street marketing campaigns typically cost $3,000 to $15,000 depending on the market, team size, and campaign duration. Rates may be slightly higher than standard campaigns due to compliance requirements and specialized training. Most dispensaries see 20% to 40% increases in foot traffic during active street team campaigns.',
      },
    ];
  }

  // ── Restaurant / food truck posts ──────────────────────────────────
  if (lower.includes('restaurant') || lower.includes('food truck') || lower.includes('food-truck')) {
    return [
      {
        question: 'How do street teams help restaurants and food businesses?',
        answer: 'Street teams drive foot traffic to restaurants through neighborhood flyering, sample distribution, grand opening promotions, and targeted outreach in nearby business districts. Trained brand ambassadors share menu highlights, distribute coupons, and create buzz that translates directly into dine-in and takeout orders.',
      },
      {
        question: 'How much does restaurant street marketing cost?',
        answer: 'Restaurant street marketing campaigns typically range from $1,500 to $8,000 depending on team size, market, and campaign duration. A typical local restaurant activation with 2 to 4 brand ambassadors for one week costs approximately $3,000 to $5,000 including materials and coordination.',
      },
      {
        question: 'What is the best time to run a street marketing campaign for a restaurant?',
        answer: 'The most effective times for restaurant street marketing are 11 AM to 1 PM for lunch promotions and 4 PM to 7 PM for dinner. Grand opening campaigns should run 3 to 5 consecutive days. Weekday lunch pushes target office workers while weekend campaigns reach residential neighborhoods and foot traffic.',
      },
    ];
  }

  // ── Healthcare / nonprofit / education / political / financial ─────
  if (lower.includes('healthcare') || lower.includes('nonprofit') || lower.includes('education') || lower.includes('political') || lower.includes('financial')) {
    const industry = lower.includes('healthcare') ? 'healthcare'
      : lower.includes('nonprofit') ? 'nonprofit'
      : lower.includes('education') ? 'education'
      : lower.includes('political') ? 'political'
      : 'financial services';
    return [
      {
        question: `How is street team marketing used in the ${industry} sector?`,
        answer: `Street team marketing in the ${industry} sector focuses on community outreach, awareness campaigns, and direct engagement. Brand ambassadors distribute educational materials, facilitate sign-ups, answer questions, and build trust through face-to-face interactions that digital channels cannot replicate.`,
      },
      {
        question: `What compliance considerations apply to ${industry} street marketing?`,
        answer: `${industry.charAt(0).toUpperCase() + industry.slice(1)} street marketing must comply with industry-specific regulations including privacy requirements, messaging accuracy standards, and disclosure obligations. A professional agency ensures all materials and interactions meet regulatory guidelines while maximizing campaign effectiveness.`,
      },
      {
        question: 'How do you measure the success of community outreach campaigns?',
        answer: 'Community outreach campaign success is measured through sign-ups and registrations captured, informational materials distributed, survey responses collected, event attendance driven, social media engagement generated, and follow-up conversion rates. Post-campaign reports provide detailed analytics on all key performance indicators.',
      },
    ];
  }

  // ── Real estate posts ──────────────────────────────────────────────
  if (lower.includes('real estate') || lower.includes('real-estate')) {
    return [
      {
        question: 'How do street teams help with real estate marketing?',
        answer: 'Street teams promote open houses, new developments, and real estate services through neighborhood canvassing, door-to-door outreach, high-traffic flyering, and community event presence. Brand ambassadors distribute property brochures, capture buyer leads, and generate foot traffic to open house events.',
      },
      {
        question: 'What does real estate street marketing cost?',
        answer: 'Real estate street marketing campaigns typically cost $2,000 to $10,000 depending on the scope. A typical open house promotion with a 2-person team for a weekend costs approximately $1,500 to $3,000 including materials and targeted distribution in the surrounding neighborhood.',
      },
      {
        question: 'Is door-to-door marketing effective for real estate?',
        answer: 'Yes, door-to-door marketing is highly effective for real estate because it targets geographically relevant prospects. Street team canvassers in the immediate neighborhood around a listing or development generate qualified leads who already have a connection to the area and are more likely to convert.',
      },
    ];
  }

  // ── B2B / corporate posts ──────────────────────────────────────────
  if (lower.includes('b2b') || lower.includes('corporate')) {
    return [
      {
        question: 'Does street team marketing work for B2B companies?',
        answer: 'Yes, street team marketing is effective for B2B companies, particularly at trade shows, industry conferences, corporate campuses, and business district activations. Brand ambassadors engage decision-makers with product demonstrations, lead capture, and meeting scheduling that accelerates the B2B sales pipeline.',
      },
      {
        question: 'What types of B2B events benefit from street team staffing?',
        answer: 'B2B events that benefit most from street team staffing include trade shows, industry conferences, product launches, corporate hospitality events, and office park activations. Professional brand ambassadors handle booth engagement, lead qualification, meeting scheduling, and post-event follow-up.',
      },
      {
        question: 'How do you qualify leads at B2B events?',
        answer: 'Lead qualification at B2B events involves trained brand ambassadors asking targeted discovery questions about company size, decision-making authority, timeline, and budget. Leads are scored and captured digitally in real time, enabling immediate handoff to your sales team with full context for follow-up.',
      },
    ];
  }

  // ── Experiential marketing posts ───────────────────────────────────
  if (lower.includes('experiential')) {
    return [
      {
        question: 'What is experiential marketing?',
        answer: 'Experiential marketing is a strategy that engages consumers through immersive, interactive brand experiences rather than passive advertising. It includes pop-up events, product demonstrations, interactive installations, and live activations that create emotional connections and memorable moments with your brand.',
      },
      {
        question: 'How much does experiential marketing cost?',
        answer: 'Experiential marketing campaigns range from $5,000 for simple sampling activations to $100,000 or more for large-scale immersive experiences. The average mid-market experiential activation costs $10,000 to $30,000 including concept development, staffing, materials, and post-campaign reporting.',
      },
      {
        question: 'Why is experiential marketing effective?',
        answer: 'Experiential marketing is effective because it creates direct, memorable consumer interactions that drive 70% higher brand recall than traditional advertising. It generates user-created content, builds emotional brand connections, and produces measurable results through lead capture and real-time engagement data.',
      },
    ];
  }

  // ── Mobile tour posts ──────────────────────────────────────────────
  if (lower.includes('mobile') || lower.includes('tour')) {
    return [
      {
        question: 'What is a mobile marketing tour?',
        answer: 'A mobile marketing tour is a multi-city brand activation campaign where a branded vehicle or pop-up travels to multiple markets on a scheduled route. Each stop features product sampling, interactive experiences, and brand engagement staffed by professional brand ambassadors who drive leads and awareness across geographic regions.',
      },
      {
        question: 'How much does a mobile marketing tour cost?',
        answer: 'Mobile marketing tours typically cost $15,000 to $100,000 depending on the number of cities, tour duration, vehicle type, and staffing levels. A 5-city tour with a branded van and 3-person team averages $25,000 to $40,000 including logistics, staff, and materials.',
      },
      {
        question: 'How many cities should a mobile marketing tour cover?',
        answer: 'Most effective mobile marketing tours cover 5 to 15 cities over 2 to 8 weeks, spending 1 to 3 days in each market. The optimal route prioritizes your key target markets, accounts for drive time between stops, and aligns with local events or seasonal opportunities to maximize engagement at each location.',
      },
    ];
  }

  // ── In-house vs agency posts ───────────────────────────────────────
  if (lower.includes('in-house') || lower.includes('agency') || lower.includes('choose') || lower.includes('hire')) {
    return [
      {
        question: 'Should I hire an in-house street team or use an agency?',
        answer: 'An agency is typically more cost-effective and efficient for most brands. Agencies provide trained, vetted staff with event experience, handle all logistics, insurance, and compliance, and can scale teams up or down quickly. In-house teams make sense only for brands running daily activations in a single market.',
      },
      {
        question: 'What should I look for in a street team marketing agency?',
        answer: 'Key factors when choosing a street team agency include geographic coverage, staff vetting and training processes, client references, insurance and compliance handling, real-time reporting capabilities, industry experience, and transparent pricing. Ask for case studies relevant to your industry and campaign type.',
      },
      {
        question: 'How quickly can a street team agency deploy a team?',
        answer: 'Most professional street team agencies can deploy teams within 48 to 72 hours for standard activations. Larger campaigns requiring 10 or more staff, specialized skills, or multiple cities typically need 1 to 3 weeks of lead time. Street Teams Co maintains a roster of pre-vetted ambassadors in 50+ cities for rapid deployment.',
      },
    ];
  }

  // ── Seasonal / holiday posts ───────────────────────────────────────
  if (lower.includes('seasonal') || lower.includes('holiday')) {
    return [
      {
        question: 'What is the best season for street team marketing?',
        answer: 'Street team marketing is effective year-round, but peak seasons include spring product launches (March through May), summer festivals (June through August), back-to-school (August through September), and holiday shopping (November through December). Each season offers unique activation opportunities.',
      },
      {
        question: 'How far ahead should I plan seasonal marketing campaigns?',
        answer: 'Plan seasonal street marketing campaigns 6 to 12 weeks in advance for optimal results. Holiday campaigns should be booked by September, summer festival activations by March, and back-to-school campaigns by June. Early planning ensures venue availability, permit approval, and access to top-tier brand ambassadors.',
      },
      {
        question: 'What seasonal marketing activations generate the best ROI?',
        answer: 'The highest-ROI seasonal activations include holiday gift sampling campaigns, summer festival brand experiences, back-to-school product launches, and New Year health and wellness promotions. Seasonal activations that align with natural consumer purchase intent consistently deliver 2x to 5x higher conversion rates.',
      },
    ];
  }

  // ── Sustainability posts ───────────────────────────────────────────
  if (lower.includes('sustainab') || lower.includes('green') || lower.includes('eco')) {
    return [
      {
        question: 'How can street marketing be sustainable?',
        answer: 'Sustainable street marketing uses eco-friendly materials like recycled paper flyers, biodegradable samples, and reusable branded items. Digital lead capture replaces paper forms, route optimization reduces vehicle emissions, and partnerships with local recycling programs minimize event waste.',
      },
      {
        question: 'Do consumers care about sustainability in marketing?',
        answer: 'Yes, 78% of consumers are more likely to engage with brands that demonstrate environmental responsibility. Sustainable street marketing practices enhance brand perception, increase engagement rates, and generate positive social media coverage that extends campaign reach organically.',
      },
      {
        question: 'What sustainable materials work for street team promotions?',
        answer: 'Effective sustainable promotional materials include seed paper flyers, bamboo-fiber branded apparel, recycled tote bags, compostable sample packaging, digital QR codes instead of printed materials, and reusable branded water bottles. These materials demonstrate brand values while reducing environmental impact.',
      },
    ];
  }

  // ── Automotive posts ───────────────────────────────────────────────
  if (lower.includes('auto') || lower.includes('car') || lower.includes('vehicle') || lower.includes('dealership') || lower.includes('test drive')) {
    return [
      {
        question: 'How do street teams help with automotive marketing?',
        answer: 'Street teams drive attendance to test drive events, dealership grand openings, and auto show activations. Brand ambassadors engage consumers in high-traffic areas, distribute invitations, manage on-site logistics, capture qualified leads, and create memorable experiences that move shoppers from awareness to the showroom.',
      },
      {
        question: 'What staff roles are needed for a test drive event?',
        answer: 'A successful test drive event requires greeters and registration staff, vehicle feature presenters, ride-along ambassadors with clean driving records, lead capture specialists, and a team coordinator. Street Teams Co provides all roles with automotive-trained brand ambassadors.',
      },
      {
        question: 'How effective are test drive events for selling cars?',
        answer: 'Test drive events are extremely effective: consumers who take a test drive are up to 85% more likely to purchase within 30 days. Professional street team-managed events capture 3 to 5 times more qualified leads per hour than unmanned display setups, with lead-to-sale conversion rates of 15% to 25%.',
      },
    ];
  }

  // ── Door-to-door posts ─────────────────────────────────────────────
  if (lower.includes('door-to-door') || lower.includes('door to door') || lower.includes('canvass')) {
    return [
      {
        question: 'Is door-to-door marketing still effective?',
        answer: 'Yes, door-to-door marketing remains one of the highest-converting direct marketing channels in 2026. Professional canvassing teams achieve response rates of 10% to 25%, far exceeding digital marketing benchmarks. The personal, face-to-face interaction builds trust and drives immediate action.',
      },
      {
        question: 'How much does door-to-door marketing cost?',
        answer: 'Door-to-door marketing campaigns typically cost $30 to $60 per hour per canvasser, with most teams covering 50 to 80 doors per hour. A typical neighborhood campaign with 2 to 4 canvassers over a week costs $3,000 to $8,000 including training, materials, and GPS-tracked reporting.',
      },
      {
        question: 'What industries benefit most from door-to-door marketing?',
        answer: 'Industries that benefit most from door-to-door marketing include solar energy, home services, real estate, political campaigns, telecommunications, pest control, and local restaurants. Any business with a geographically defined target audience can leverage door-to-door for high-conversion lead generation.',
      },
    ];
  }

  // ── Nightclub / bar posts ──────────────────────────────────────────
  if (lower.includes('nightclub') || lower.includes('bar') || lower.includes('nightlife')) {
    return [
      {
        question: 'How do street teams promote nightclubs and bars?',
        answer: 'Street teams promote nightclubs and bars by distributing event flyers and VIP passes in target neighborhoods, engaging pedestrians near competing venues, partnering with local businesses for cross-promotion, and building social media buzz through on-the-ground content creation during peak nightlife hours.',
      },
      {
        question: 'When is the best time to deploy nightlife street teams?',
        answer: 'Nightlife street teams are most effective Thursday through Saturday between 8 PM and midnight. Pre-event promotion teams should deploy 3 to 5 days before special events. For weekly recurring nights, consistent Thursday and Friday afternoon deployment builds momentum and fills venues on peak nights.',
      },
      {
        question: 'How much does nightclub street team marketing cost?',
        answer: 'Nightclub and bar street team marketing typically costs $200 to $600 per night for a 2 to 4 person team. Weekly packages for consistent Thursday through Saturday promotion average $1,500 to $3,000 per month. Event-specific promotions for special nights or grand openings range from $500 to $2,000.',
      },
    ];
  }

  // ── Safety / insurance / permits / regulations posts ───────────────
  if (lower.includes('safety') || lower.includes('insurance') || lower.includes('permit') || lower.includes('regulat') || lower.includes('legal')) {
    return [
      {
        question: 'Do street marketing teams need insurance?',
        answer: 'Yes, professional street marketing teams should carry general liability insurance, typically $1 million to $2 million per occurrence. This protects both the brand and the agency from claims related to property damage, bodily injury, or other incidents during activations. Street Teams Co carries full insurance on all campaigns.',
      },
      {
        question: 'What permits are needed for street marketing?',
        answer: 'Required permits vary by city but commonly include sidewalk use permits, special event permits, amplified sound permits, food handling permits for sampling campaigns, and vendor licenses. A professional agency handles all permit research, applications, and compliance for your specific locations.',
      },
      {
        question: 'How do you ensure street team safety?',
        answer: 'Street team safety protocols include site assessment before deployment, buddy system pairing, real-time GPS tracking, safety briefings covering local hazards and emergency procedures, weather monitoring with predetermined cancellation thresholds, and 24/7 team coordinator availability.',
      },
    ];
  }

  // ── Whisper / word-of-mouth posts ──────────────────────────────────
  if (lower.includes('whisper') || lower.includes('word of mouth') || lower.includes('word-of-mouth') || lower.includes('viral')) {
    return [
      {
        question: 'What is a whisper campaign?',
        answer: 'A whisper campaign is a word-of-mouth marketing strategy where brand ambassadors organically introduce products or services into natural conversations without overtly identifying as marketers. It creates authentic buzz and peer-to-peer recommendations that feel genuine rather than promotional.',
      },
      {
        question: 'How effective is word-of-mouth marketing?',
        answer: 'Word-of-mouth marketing is the most trusted form of advertising, with 92% of consumers trusting personal recommendations over any other form of marketing. Word-of-mouth drives 5x more sales than paid media impressions and generates 2x the recall of traditional advertising campaigns.',
      },
      {
        question: 'How much does a word-of-mouth marketing campaign cost?',
        answer: 'Word-of-mouth and whisper campaigns typically cost $5,000 to $25,000 depending on the market size, team size, and campaign duration. The investment covers trained conversationalists, strategic deployment in target venues and neighborhoods, and measurement of buzz generated through social listening and engagement tracking.',
      },
    ];
  }

  // ── Uniform / branding posts ───────────────────────────────────────
  if (lower.includes('uniform') || lower.includes('branding') || lower.includes('apparel')) {
    return [
      {
        question: 'Should my street team wear branded uniforms?',
        answer: 'Yes, branded uniforms significantly increase street team effectiveness. Uniformed teams are perceived as more professional and trustworthy, resulting in 40% higher engagement rates. Branded apparel also provides mobile advertising, generating thousands of additional impressions throughout the activation area.',
      },
      {
        question: 'What should street team uniforms include?',
        answer: 'Effective street team uniforms include a branded t-shirt or polo in brand colors, comfortable weather-appropriate bottoms, branded caps or visors for outdoor events, lanyards with name badges, and optional accessories like branded backpacks or fanny packs for carrying samples and materials.',
      },
      {
        question: 'Who provides the uniforms for street team campaigns?',
        answer: 'Most street team agencies can produce branded uniforms as part of the campaign package. Street Teams Co handles uniform design, production, and distribution to team members before the campaign. Clients can also provide their own branded apparel. Turnaround for custom uniform production is typically 7 to 14 business days.',
      },
    ];
  }

  // ── Data collection / consumer data posts ──────────────────────────
  if (lower.includes('data') || lower.includes('lead capture') || lower.includes('consumer data')) {
    return [
      {
        question: 'How do street teams collect consumer data?',
        answer: 'Street teams collect consumer data through tablet-based registration forms, QR code scans, contest entry forms, mobile app downloads, SMS opt-ins, email sign-ups, and NFC tap interactions. All data capture is permission-based and compliant with privacy regulations including TCPA and state consumer protection laws.',
      },
      {
        question: 'What data should street teams collect?',
        answer: 'Street teams should capture name, email, phone number (with opt-in consent), zip code, product interest, and purchase timeline. Additional fields like social media handles, competitive brand usage, and event feedback provide valuable insights for campaign optimization and CRM segmentation.',
      },
      {
        question: 'How do you ensure data privacy with street team lead capture?',
        answer: 'Data privacy is maintained through secure digital capture platforms, clear consent disclosures, opt-in verification, encrypted data transmission, and compliance with TCPA, CAN-SPAM, and state privacy laws. Street Teams Co uses enterprise-grade lead capture technology with full audit trails.',
      },
    ];
  }

  // ── Beauty / cosmetics posts ───────────────────────────────────────
  if (lower.includes('beauty') || lower.includes('cosmetic') || lower.includes('skincare')) {
    return [
      {
        question: 'How do street teams market beauty and cosmetics brands?',
        answer: 'Street teams market beauty brands through product sampling at high-traffic locations, makeover stations at events, beauty tutorial demonstrations, influencer seeding campaigns, and retail store activations. Brand ambassadors with beauty industry experience provide credible product education that drives trial and purchase.',
      },
      {
        question: 'What types of beauty sampling events work best?',
        answer: 'The most effective beauty sampling events include pop-up makeover stations at malls and shopping districts, festival beauty lounges, gym and wellness center activations, college campus beauty bars, and seasonal launch events. Each format allows hands-on product trial that is essential for beauty brand conversion.',
      },
      {
        question: 'How much does beauty brand sampling cost?',
        answer: 'Beauty brand sampling campaigns typically cost $5,000 to $20,000 per activation, depending on sample value, team size, and location. Per-sample costs including staff range from $3 to $8 for skincare and $5 to $15 for premium cosmetics. Multi-location tours receive volume pricing.',
      },
    ];
  }

  // ── Fitness / wellness posts ───────────────────────────────────────
  if (lower.includes('fitness') || lower.includes('gym') || lower.includes('wellness') || lower.includes('health')) {
    return [
      {
        question: 'How do street teams market fitness brands?',
        answer: 'Street teams market fitness brands through gym and studio activations, marathon and race expos, outdoor workout events, supplement and nutrition sampling, and health fair presence. Brand ambassadors with fitness backgrounds provide authentic product demonstrations and credible endorsements that resonate with health-conscious consumers.',
      },
      {
        question: 'Where are the best locations for fitness product sampling?',
        answer: 'Top locations for fitness product sampling include gym lobbies and parking lots, marathon finish lines and expo areas, yoga and fitness festivals, outdoor running trails, CrossFit competitions, and college recreation centers. These locations concentrate your target audience for maximum sampling efficiency.',
      },
      {
        question: 'What is the ROI of fitness brand sampling campaigns?',
        answer: 'Fitness brand sampling campaigns typically achieve 30% to 50% trial-to-purchase conversion rates, with an average cost per acquisition of $8 to $25. Protein bars, supplements, and beverages see especially high conversion when sampled around workout facilities where consumers are primed for fitness-related purchases.',
      },
    ];
  }

  // ── Interactive / immersive posts ──────────────────────────────────
  if (lower.includes('interactive') || lower.includes('immersive') || lower.includes('experience')) {
    return [
      {
        question: 'What are interactive brand experiences?',
        answer: 'Interactive brand experiences are marketing activations that invite consumers to actively participate rather than passively observe. Examples include AR/VR demonstrations, gamified product trials, custom photo installations, live product customization stations, and sensory experiences that create lasting emotional connections with your brand.',
      },
      {
        question: 'How much do interactive brand activations cost?',
        answer: 'Interactive brand activations range from $5,000 for simple gamified sampling stations to $75,000 or more for technology-driven immersive experiences. The average mid-market interactive activation costs $15,000 to $35,000 including concept development, technology, staffing, and production.',
      },
      {
        question: 'Why are interactive activations more effective than traditional marketing?',
        answer: 'Interactive activations generate 65% higher brand recall and 4x more social sharing than static marketing. Active participation creates stronger neural associations with your brand, while the share-worthy nature of unique experiences amplifies reach far beyond event attendees through organic social media content.',
      },
    ];
  }

  // ── Case study posts ───────────────────────────────────────────────
  if (lower.includes('case stud')) {
    return [
      {
        question: 'What results do street team campaigns typically achieve?',
        answer: 'Professional street team campaigns typically generate 500 to 5,000 consumer interactions per day, capture 100 to 1,000 qualified leads per event, achieve sample-to-sale conversion rates of 25% to 45%, and deliver 3x to 10x return on investment across industries from CPG to technology.',
      },
      {
        question: 'How do you measure street team campaign success?',
        answer: 'Campaign success is measured through quantitative KPIs including interactions per hour, leads captured, samples distributed, social media impressions generated, conversion rates, and cost per acquisition. Qualitative metrics include consumer feedback, ambassador observations, and competitive intelligence gathered on-site.',
      },
      {
        question: 'What industries get the best results from street team marketing?',
        answer: 'Industries with the strongest street team marketing results include consumer packaged goods, beverage, beauty, fitness, technology, entertainment, automotive, cannabis, real estate, and food service. Any brand that benefits from product trial or in-person demonstration sees exceptional ROI from professional street team activations.',
      },
    ];
  }

  // ── App launch / technology posts ──────────────────────────────────
  if (lower.includes('app') || lower.includes('tech') || lower.includes('technology')) {
    return [
      {
        question: 'How do street teams help with app launches?',
        answer: 'Street teams drive app downloads through in-person demonstrations, assisted sign-ups, QR code distribution, and incentivized download campaigns at high-traffic locations. Brand ambassadors show potential users the app in real time, answer questions, and guide them through the download and onboarding process.',
      },
      {
        question: 'What is the cost per app download with street team marketing?',
        answer: 'Street team-driven app downloads typically cost $2 to $8 per install, competitive with digital channels but with significantly higher retention rates. Users acquired through in-person demonstrations show 3x higher Day 30 retention than users acquired through paid digital campaigns.',
      },
      {
        question: 'Where should I deploy street teams for an app launch?',
        answer: 'Deploy street teams for app launches at college campuses, transit hubs, co-working spaces, tech meetups, food festivals, and shopping districts where your target demographic concentrates. Geo-target locations near competitors physical locations for maximum impact on your user acquisition goals.',
      },
    ];
  }

  // ── Hyper-local posts ──────────────────────────────────────────────
  if (lower.includes('hyper-local') || lower.includes('hyperlocal') || lower.includes('local') || lower.includes('neighborhood') || lower.includes('community')) {
    return [
      {
        question: 'What is hyper-local marketing?',
        answer: 'Hyper-local marketing targets consumers within a very specific geographic area, typically a neighborhood or a few-block radius around a business. Street teams excel at hyper-local marketing by physically deploying in target neighborhoods with door-to-door outreach, localized flyering, and community event presence.',
      },
      {
        question: 'How effective is hyper-local street marketing?',
        answer: 'Hyper-local street marketing delivers the highest conversion rates of any street team strategy, with 15% to 30% response rates in well-targeted neighborhoods. The geographic specificity ensures every interaction reaches a relevant consumer, maximizing ROI and minimizing waste compared to broader campaigns.',
      },
      {
        question: 'How much does hyper-local marketing cost?',
        answer: 'Hyper-local street marketing campaigns cost $1,500 to $5,000 per neighborhood depending on team size, duration, and the density of the target area. A typical 3-day hyper-local push with a 2-person team covering a defined neighborhood costs approximately $2,000 to $3,500.',
      },
    ];
  }

  // ── Multicultural / bilingual posts ────────────────────────────────
  if (lower.includes('multicultural') || lower.includes('bilingual') || lower.includes('multilingual') || lower.includes('diversity') || lower.includes('diverse')) {
    return [
      {
        question: 'How do you hire bilingual brand ambassadors?',
        answer: 'Street Teams Co maintains a diverse roster of bilingual and multilingual brand ambassadors in all major markets. We verify language proficiency during onboarding and match ambassadors to campaigns based on the target demographic language needs, including Spanish, Mandarin, Korean, Vietnamese, Tagalog, and French.',
      },
      {
        question: 'Why is multicultural marketing important for street teams?',
        answer: 'Multicultural marketing is essential because 40% of the US population identifies as a minority group. Culturally relevant street marketing with bilingual staff delivers 2x higher engagement rates in diverse communities. Consumers respond more positively to brand ambassadors who share their cultural background and language.',
      },
      {
        question: 'Do bilingual brand ambassadors cost more?',
        answer: 'Bilingual brand ambassadors typically command a 10% to 25% premium over standard rates, averaging $35 to $65 per hour depending on the market and language pair. This premium is justified by significantly higher engagement rates and the ability to reach underserved consumer segments that monolingual campaigns miss entirely.',
      },
    ];
  }

  // ── Promotional models posts ───────────────────────────────────────
  if (lower.includes('promotional model') || lower.includes('promo model')) {
    return [
      {
        question: 'What is the difference between a promotional model and a brand ambassador?',
        answer: 'Promotional models focus primarily on visual brand representation and product presentation, while brand ambassadors engage in deeper consumer interactions including product education, lead qualification, and sales conversion. Both roles are valuable, with brand ambassadors typically providing higher ROI through active consumer engagement.',
      },
      {
        question: 'How much do promotional models cost?',
        answer: 'Promotional models cost $30 to $75 per hour depending on the market, event type, and experience level. Trade show and convention models command premium rates of $50 to $85 per hour. Most agencies require a 4-hour minimum per booking.',
      },
      {
        question: 'When should I hire promotional models vs brand ambassadors?',
        answer: 'Hire promotional models when visual brand representation and crowd attraction are the primary goals, such as auto shows, trade show booths, and product launches. Choose brand ambassadors when consumer education, lead capture, and sales conversion are priorities, such as sampling campaigns, experiential activations, and corporate events.',
      },
    ];
  }

  // ── Warehouse / logistics posts ────────────────────────────────────
  if (lower.includes('warehouse') || lower.includes('logistic') || lower.includes('supply chain')) {
    return [
      {
        question: 'What logistics are involved in street team campaigns?',
        answer: 'Street team campaign logistics include product storage and inventory management, sample kitting and distribution to team members, branded material production and shipping, equipment delivery (tents, tables, displays), vehicle routing for multi-location campaigns, and real-time inventory tracking throughout the activation.',
      },
      {
        question: 'Who handles logistics for sampling campaigns?',
        answer: 'Full-service agencies like Street Teams Co manage all sampling logistics including warehousing, kitting, temperature-controlled storage for perishable products, daily inventory counts, resupply scheduling, and end-of-campaign reconciliation. This turnkey approach ensures product freshness and consistent availability at every activation.',
      },
      {
        question: 'How far in advance should I ship products for a sampling campaign?',
        answer: 'Ship products to the staging warehouse at least 7 to 14 days before the campaign launch to allow for receiving, quality inspection, kitting, and distribution to team members. Perishable products should arrive within 3 to 5 days of activation. Multi-city tours require staggered shipping aligned to the route schedule.',
      },
    ];
  }

  // ── Entertainment / launch posts ───────────────────────────────────
  if (lower.includes('entertainment') || lower.includes('launch') || lower.includes('movie') || lower.includes('album')) {
    return [
      {
        question: 'How do street teams promote entertainment launches?',
        answer: 'Street teams promote entertainment launches through targeted flyering at venues, concert and event activations, social media buzz campaigns, surprise pop-up events, and influencer engagement. For music releases, street teams deploy at record stores, concert venues, and cultural hotspots. Film launches use teams near theaters and entertainment districts.',
      },
      {
        question: 'How much does entertainment street marketing cost?',
        answer: 'Entertainment street marketing campaigns range from $3,000 for a single-city album release push to $50,000 or more for a multi-city film launch promotion. The average entertainment activation costs $5,000 to $15,000 per market including staff, materials, and social media amplification.',
      },
      {
        question: 'What makes street marketing effective for entertainment brands?',
        answer: 'Street marketing is uniquely effective for entertainment because it creates authentic cultural buzz that cannot be manufactured through digital advertising. Word-of-mouth from street team interactions generates 5x more engagement than paid social posts, and the grassroots energy aligns with how fans naturally discover and share entertainment content.',
      },
    ];
  }

  // ── Default FAQs for any other post ────────────────────────────────
  return [
    {
      question: 'What is street team marketing?',
      answer: 'Street team marketing is a face-to-face promotional strategy where trained brand ambassadors engage consumers directly in public spaces, at events, and in targeted neighborhoods. It includes product sampling, flyering, guerrilla activations, event staffing, and experiential marketing campaigns that create personal brand connections.',
    },
    {
      question: 'How much does it cost to hire a street team?',
      answer: 'Hiring a street team typically costs $25 to $75 per hour per brand ambassador, with most campaigns averaging $35 to $50 per hour. Total campaign costs depend on team size, duration, location, and whether product samples or promotional materials are included. Request a free quote from Street Teams Co for custom pricing.',
    },
    {
      question: 'How do I get started with street team marketing?',
      answer: 'To get started with street team marketing, contact Street Teams Co with your campaign goals, target audience, desired locations, and timeline. We handle everything from strategy and staffing to execution and reporting. Most campaigns can be planned and launched within 1 to 3 weeks.',
    },
  ];
}

// ── Build FAQPage JSON-LD ────────────────────────────────────────────
function buildFAQSchema(faqs) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// ── Main processing ──────────────────────────────────────────────────
async function main() {
  const files = (await readdir(BLOG_DIR)).filter(
    (f) => f.endsWith('.html') && f !== 'index.html'
  );

  let faqAdded = 0;
  let faqSkipped = 0;
  let linksAdded = 0;
  let linksSkipped = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = join(BLOG_DIR, file);
    let html;
    try {
      html = await readFile(filePath, 'utf-8');
    } catch (err) {
      console.error(`  ERROR reading ${file}: ${err.message}`);
      errors++;
      continue;
    }

    let modified = false;

    // ── Extract title from <title> tag ─────────────────────────────
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : file;

    // ── 1. Add FAQPage JSON-LD if not present ──────────────────────
    if (!html.includes('"FAQPage"') && !html.includes("'FAQPage'")) {
      const faqs = generateFAQs(file, title);
      const schemaBlock = buildFAQSchema(faqs);

      // Insert before closing </head>
      const headClose = html.indexOf('</head>');
      if (headClose !== -1) {
        html = html.slice(0, headClose) + schemaBlock + '\n' + html.slice(headClose);
        modified = true;
        faqAdded++;
        console.log(`  + FAQ schema  -> ${file}`);
      } else {
        console.warn(`  WARN: No </head> found in ${file}, skipping FAQ schema`);
      }
    } else {
      faqSkipped++;
    }

    // ── 2. Add Key Resources section if not present ────────────────
    if (!html.includes('Key Resources')) {
      // Insert before the CTA section or before </body>
      const ctaIdx = html.indexOf('<section class="cta-section">');
      const insertIdx = ctaIdx !== -1 ? ctaIdx : html.indexOf('</body>');

      if (insertIdx !== -1) {
        html = html.slice(0, insertIdx) + KEY_RESOURCES_HTML + '\n' + html.slice(insertIdx);
        modified = true;
        linksAdded++;
        console.log(`  + Key Resources -> ${file}`);
      } else {
        console.warn(`  WARN: No insertion point for Key Resources in ${file}`);
      }
    } else {
      linksSkipped++;
    }

    // ── Write back if modified ─────────────────────────────────────
    if (modified) {
      await writeFile(filePath, html, 'utf-8');
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total blog files processed: ${files.length}`);
  console.log(`FAQ schema added:   ${faqAdded}`);
  console.log(`FAQ schema skipped: ${faqSkipped} (already existed)`);
  console.log(`Key Resources added:   ${linksAdded}`);
  console.log(`Key Resources skipped: ${linksSkipped} (already existed)`);
  console.log(`Errors: ${errors}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
