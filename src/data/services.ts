export interface Service {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    name: 'Street Team Marketing',
    slug: 'street-teams',
    tagline: 'Boots-on-the-ground campaigns that put your brand directly in front of consumers',
    description: 'Street team marketing is the backbone of grassroots brand promotion. Our trained street teams deploy to high-traffic locations across the country, engaging consumers face-to-face with your product or message. From handing out samples to creating interactive brand moments, our teams drive real awareness and measurable conversions in the neighborhoods that matter most to your business.',
    features: [
      'Targeted deployment to high-traffic zones, transit hubs, and event perimeters',
      'Customized uniforms, signage, and branded collateral for every activation',
      'Real-time GPS tracking and photo documentation of team activity',
      'Post-campaign analytics with impressions, engagements, and conversion data',
      'Multilingual teams available in major metro areas',
      'Permitting and compliance handled end-to-end',
    ],
    benefits: [
      'Generate thousands of face-to-face impressions per campaign day',
      'Build authentic brand awareness that digital ads cannot replicate',
      'Drive foot traffic to retail locations, pop-ups, or events',
      'Collect consumer data and feedback in real time',
      'Flexible team sizes from 2 to 200+ for any market',
    ],
    useCases: [
      'New product launches and brand introductions',
      'Grand opening promotions for retail and restaurants',
      'Festival and concert perimeter marketing',
      'Political and cause-based awareness campaigns',
      'App download and sign-up drives',
    ],
    faq: [
      { q: 'How far in advance should I book a street team?', a: 'We recommend at least 2 weeks for local campaigns and 4 weeks for multi-city activations, though we can accommodate rush requests.' },
      { q: 'What areas do your street teams cover?', a: 'We operate in all 50 states with established teams in over 1,000 cities. Our strongest presence is in major metros like NYC, LA, Chicago, Miami, and Dallas.' },
      { q: 'How do you measure street team campaign results?', a: 'Every campaign includes GPS tracking, timestamped photos, engagement counts, and a comprehensive post-campaign report with impressions and conversion data.' },
    ],
  },
  {
    name: 'Brand Ambassadors',
    slug: 'brand-ambassadors',
    tagline: 'Professional brand representatives who embody your values and engage your audience',
    description: 'Our brand ambassadors are more than spokespeople — they are trained professionals who understand your product, connect with your target audience, and create memorable interactions. Whether staffing a trade show booth, running an in-store demo, or representing your brand at a community event, our ambassadors deliver polished, on-message engagement that builds trust and drives action.',
    features: [
      'Rigorous selection process with background checks and brand-fit screening',
      'Custom training programs tailored to your brand voice and product knowledge',
      'Professional appearance standards with branded attire and accessories',
      'Bilingual and multilingual ambassadors available nationwide',
      'Shift-based or campaign-based scheduling with dedicated account management',
      'Performance reviews and quality assurance after every activation',
    ],
    benefits: [
      'Humanize your brand with authentic face-to-face interactions',
      'Increase product trial, demo, and purchase rates',
      'Gather real-time consumer feedback and market intelligence',
      'Strengthen brand recall with memorable personal experiences',
      'Scale from a single ambassador to a nationwide team on demand',
    ],
    useCases: [
      'Trade show and conference booth staffing',
      'In-store product demonstrations and sampling',
      'Launch parties and VIP brand events',
      'Campus and university marketing programs',
      'Loyalty and referral program promotion',
    ],
    faq: [
      { q: 'How do you train brand ambassadors for my specific product?', a: 'We create a custom training deck based on your brand guidelines, key messaging, and product specs. Ambassadors complete training and a knowledge check before deployment.' },
      { q: 'Can I approve the ambassadors before they represent my brand?', a: 'Absolutely. We provide profiles with photos, experience, and qualifications so you can select the team that best fits your brand.' },
      { q: 'What is the minimum booking for brand ambassadors?', a: 'Our minimum is typically a 4-hour shift for a single ambassador, though most campaigns run full-day or multi-day activations.' },
    ],
  },
  {
    name: 'Event Staffing',
    slug: 'event-staffing',
    tagline: 'Experienced event professionals for trade shows, festivals, and corporate events',
    description: 'From massive music festivals to intimate corporate events, Street Teams Co provides reliable, experienced event staff who keep your activation running smoothly. Our event staffing solutions cover everything from registration and crowd management to interactive booth experiences and VIP hosting. We handle logistics so you can focus on delivering an unforgettable event.',
    features: [
      'Experienced staff for events ranging from 50 to 50,000+ attendees',
      'Roles include registration, crowd management, brand activation, and hospitality',
      'On-site team leads and shift supervisors for seamless coordination',
      'Branded uniforms, radios, and equipment provided',
      'Day-of logistics support including load-in, setup, and teardown',
      'Nationwide coverage with local market expertise in every major city',
    ],
    benefits: [
      'Reduce your operational burden with turnkey staffing solutions',
      'Ensure consistent, professional guest experiences',
      'Scale staff up or down based on attendance and event phases',
      'Minimize no-shows with backup staffing and confirmation protocols',
      'Access staff with specialized event industry experience',
    ],
    useCases: [
      'Trade shows and industry conferences',
      'Music festivals and outdoor events',
      'Corporate retreats and team-building events',
      'Sporting events and stadium activations',
      'Award shows, galas, and black-tie events',
    ],
    faq: [
      { q: 'How quickly can you staff an event?', a: 'For most markets, we can assemble a team within 5-7 business days. Rush staffing in major metros is available with as little as 48 hours notice.' },
      { q: 'Do you provide event staff for multi-day events?', a: 'Yes. We regularly staff multi-day festivals, conferences, and tours. We manage shift rotations and ensure fresh, energized teams throughout your event.' },
      { q: 'What happens if a staff member does not show up?', a: 'We maintain a backup roster for every event. If a team member is unavailable, a qualified replacement is deployed immediately.' },
    ],
  },
  {
    name: 'Product Sampling',
    slug: 'product-sampling',
    tagline: 'Put your product directly into the hands of your target consumer',
    description: 'Product sampling remains one of the highest-converting marketing tactics available. Our sampling campaigns place your product into the hands of real consumers in high-traffic locations where they live, work, and play. We manage every detail — from permitting and inventory logistics to trained sampling staff and real-time reporting — so you get measurable trial and conversion with zero hassle.',
    features: [
      'Targeted sampling in grocery stores, gyms, transit hubs, offices, and events',
      'Cold-chain and temperature-controlled distribution for food and beverage brands',
      'Inventory management with chain-of-custody tracking',
      'Consumer survey integration for real-time feedback collection',
      'Compliance with local health codes and sampling regulations',
      'Photo and video documentation of every sampling shift',
    ],
    benefits: [
      'Drive immediate product trial with zero barrier to entry',
      'Convert samplers into purchasers with a proven 35% average conversion rate',
      'Collect direct consumer feedback on taste, packaging, and price perception',
      'Build word-of-mouth buzz as samplers share their experience',
      'Reach consumers at the point of purchase for maximum impact',
    ],
    useCases: [
      'CPG product launches in grocery and retail',
      'Food and beverage sampling at events and festivals',
      'Health and wellness product demos at gyms and studios',
      'Beauty and skincare sampling at malls and lifestyle events',
      'Tech product hands-on demos at conferences',
    ],
    faq: [
      { q: 'How do you handle product storage and transport?', a: 'We manage inventory logistics including warehousing, cold storage, and insured transport to sampling locations. You ship product to our local depot and we handle the rest.' },
      { q: 'Can you sample inside retail stores?', a: 'Yes. We have established relationships with major retailers and can secure in-store sampling slots. We also handle demo table setup and teardown.' },
      { q: 'How many samples can a team distribute per day?', a: 'A 2-person team in a high-traffic location typically distributes 500-1,500 samples per day depending on the product and engagement level.' },
    ],
  },
  {
    name: 'Flyer Distribution',
    slug: 'flyer-distribution',
    tagline: 'Strategic flyer and print distribution that reaches your audience where they are',
    description: 'Professional flyer distribution is still one of the most cost-effective ways to reach a local audience. Our distribution teams deploy to targeted neighborhoods, business districts, and event areas to hand-deliver your marketing materials directly to consumers. We combine strategic route planning with trained distributors who engage passersby — turning a simple handout into a brand touchpoint.',
    features: [
      'Hand-to-hand distribution in high-foot-traffic areas',
      'Door-to-door residential and business distribution',
      'Windshield and vehicle placement campaigns',
      'Venue and establishment leave-behind distribution',
      'GPS-tracked routes with timestamped photo verification',
      'Material design consultation and print-ready file review',
    ],
    benefits: [
      'Reach thousands of local consumers at a fraction of digital ad costs',
      'Tangible marketing materials create lasting brand impressions',
      'Target specific neighborhoods, demographics, and events',
      'Drive traffic to local businesses, events, and promotions',
      'Combine with street team activations for amplified impact',
    ],
    useCases: [
      'Restaurant and retail grand opening promotions',
      'Local event promotion and ticket sales',
      'Political campaign literature distribution',
      'Real estate open house marketing',
      'Nightlife and entertainment venue promotion',
    ],
    faq: [
      { q: 'How many flyers can a team distribute per day?', a: 'A 2-person hand-to-hand team typically distributes 2,000-5,000 flyers per day. Door-to-door teams cover 1,000-2,000 addresses per team per day.' },
      { q: 'Do you handle flyer printing?', a: 'We can coordinate printing through our partner network or work with your existing printer. We also offer design review to ensure your flyer is optimized for street distribution.' },
      { q: 'Is flyer distribution legal in all cities?', a: 'Laws vary by municipality. We research local ordinances before every campaign and secure any necessary permits to ensure full compliance.' },
    ],
  },
  {
    name: 'Guerrilla Marketing',
    slug: 'guerrilla-marketing',
    tagline: 'Unconventional, attention-grabbing campaigns that stop people in their tracks',
    description: 'Guerrilla marketing is about creating unexpected, memorable brand experiences that generate buzz both on the street and online. Our guerrilla campaigns use creativity, surprise, and strategic placement to cut through the noise and make your brand impossible to ignore. From large-scale installations to interactive street performances, we design and execute activations that go viral.',
    features: [
      'Creative concept development and campaign strategy',
      'Large-scale street installations, murals, and projections',
      'Flash mobs, street performances, and interactive experiences',
      'Sticker, stencil, and wheat-paste campaigns',
      'Social media integration with shareable moments and hashtag campaigns',
      'Permitting, risk assessment, and compliance management',
    ],
    benefits: [
      'Generate massive earned media and social sharing',
      'Create cultural moments that become part of the conversation',
      'Reach audiences who actively avoid traditional advertising',
      'Build brand personality and authenticity through creative storytelling',
      'Achieve outsized impact with budgets smaller than traditional media buys',
    ],
    useCases: [
      'Movie, TV, and entertainment launch campaigns',
      'Fashion and lifestyle brand pop-ups',
      'Tech product reveals and teasers',
      'Non-profit awareness and cause marketing',
      'Music album and tour promotion',
    ],
    faq: [
      { q: 'How do you come up with guerrilla marketing concepts?', a: 'Our creative team works with you to understand your brand, audience, and objectives. We then develop 2-3 activation concepts with mood boards, budgets, and projected reach for your selection.' },
      { q: 'Is guerrilla marketing legal?', a: 'We design every campaign to comply with local laws and regulations. For activations that push boundaries, we secure necessary permits and carry full liability insurance.' },
      { q: 'How do you measure the success of a guerrilla campaign?', a: 'We track foot traffic, social media mentions, hashtag usage, earned media coverage, and engagement metrics. We provide a comprehensive post-campaign report with ROI analysis.' },
    ],
  },
  {
    name: 'Experiential Marketing',
    slug: 'experiential-marketing',
    tagline: 'Immersive brand experiences that create lasting emotional connections',
    description: 'Experiential marketing creates immersive, interactive brand experiences that forge deep emotional connections with consumers. Our team designs and executes end-to-end experiential campaigns — from pop-up shops and immersive installations to mobile tours and branded activations. We combine creative storytelling, technology, and trained staff to deliver experiences that consumers remember and share.',
    features: [
      'Full-service concept design, fabrication, and production',
      'Pop-up shops, branded lounges, and immersive environments',
      'AR, VR, and interactive technology integration',
      'Mobile marketing tour logistics and route planning',
      'Consumer data capture through gamification and registration',
      'Professional photography and videography for content creation',
    ],
    benefits: [
      'Create deep emotional connections between consumers and your brand',
      'Generate high-quality user-generated content and social sharing',
      'Collect first-party consumer data through interactive experiences',
      'Drive immediate sales through on-site purchase opportunities',
      'Build brand loyalty that extends far beyond the activation',
    ],
    useCases: [
      'Product launch experiences and immersive reveals',
      'Brand pop-up shops and retail activations',
      'Multi-city mobile marketing tours',
      'Festival and event brand lounges',
      'Corporate experiential activations and employee engagement',
    ],
    faq: [
      { q: 'What is the typical budget for an experiential campaign?', a: 'Experiential campaigns range from $10,000 for a simple pop-up to $500,000+ for multi-city tours with custom fabrication. We design experiences that fit your budget and goals.' },
      { q: 'How long does it take to plan an experiential activation?', a: 'Most experiential campaigns require 6-12 weeks from concept to execution, depending on complexity. Simple activations can be turned around in 3-4 weeks.' },
      { q: 'Do you handle venue sourcing and permitting?', a: 'Yes. We manage all logistics including venue sourcing, permitting, insurance, and on-site operations so you can focus on your brand experience.' },
    ],
  },
  {
    name: 'Promotional Staffing',
    slug: 'promotional-staffing',
    tagline: 'On-demand promotional talent for any campaign, anywhere in the country',
    description: 'Need promotional models, demo specialists, or field marketers on short notice? Street Teams Co provides a nationwide network of vetted promotional staff ready to represent your brand at retail locations, events, and activations. Our promotional staffing solutions give you access to skilled talent without the overhead of building an in-house team.',
    features: [
      'Nationwide roster of 10,000+ vetted promotional staff',
      'Promotional models, product demonstrators, and field marketers',
      'Quick-turn staffing with 48-hour deployment in major markets',
      'Custom talent matching based on demographics, skills, and brand fit',
      'Branded attire sourcing and distribution',
      'Real-time check-in and performance monitoring',
    ],
    benefits: [
      'Access top promotional talent without recruiter fees or long-term contracts',
      'Scale your promotional workforce up or down as campaigns demand',
      'Reduce no-show risk with our confirmation and backup protocols',
      'Ensure brand consistency with trained, professional staff',
      'Simplify payroll, scheduling, and compliance with our managed staffing solution',
    ],
    useCases: [
      'Retail product demonstrations and in-store promotions',
      'Tradeshow and convention booth staffing',
      'Promotional model staffing for brand activations',
      'Door-to-door and canvassing campaigns',
      'Seasonal and holiday promotional campaigns',
    ],
    faq: [
      { q: 'What is the difference between brand ambassadors and promotional staff?', a: 'Brand ambassadors undergo extended training and represent your brand over longer campaigns. Promotional staff are skilled talent deployed for specific shifts or short-term activations.' },
      { q: 'Can I request specific staff for repeat campaigns?', a: 'Yes. Many clients build preferred teams over time. We track performance and availability so your favorite staff can be requested for future activations.' },
      { q: 'How do you vet your promotional staff?', a: 'All staff undergo background checks, reference verification, and a skills assessment. We also maintain performance ratings from previous clients and campaigns.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
