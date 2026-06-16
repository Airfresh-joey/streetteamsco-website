export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  description: string;
  industry?: string;
  services: string[];
  markets?: string[];
  date?: string;
  googleDriveUrl?: string;
  stats: Record<string, string>;
  category: string;
  featured?: boolean;
  heroImage?: string;
  heroVideo?: string;
  heroPosition?: string;
  images?: string[];
  videoUrl?: string;
}

export const portfolioCaseStudies: CaseStudy[] = [
  {
    "id": "wagamama-launch",
    "name": "Wagamama - Multi-City Street Team Blitz",
    "tagline": "Guerrilla Marketing Meets Asian Soul Food",
    "description": "Street Teams Co deployed guerrilla street teams across four major U.S. cities to drive foot traffic for Wagamama's restaurant expansion. Our brand ambassadors hit sidewalks, transit hubs, and college campuses distributing promotional offers and food samples — creating direct, face-to-face interactions that converted passersby into diners. The campaign generated massive local buzz through strategic flyering, sidewalk chalk art, and costumed street performers.",
    "industry": "Food & Beverage",
    "services": [
      "Guerrilla Street Marketing",
      "Coupon Distribution",
      "Food Sampling",
      "Sidewalk Activations"
    ],
    "markets": [
      "Tampa",
      "Atlanta",
      "New York City",
      "Boston"
    ],
    "date": "June 2023",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1UJPN2dD94SUdHDsUgICfUfDqUBzOhhRS?usp=share_link",
    "stats": {
      "Cities": "4 Major Markets",
      "Flyers Distributed": "50,000+",
      "Direct Interactions": "12,000+",
      "Foot Traffic Increase": "+38%"
    },
    "category": "Food & Beverage",
    "featured": true,
    "heroImage": "/images/case-studies/wagamama-hero.jpg"
  },
  {
    "id": "cirque-du-soleil",
    "name": "Cirque du Soleil - Dallas Street Team Takeover",
    "tagline": "Guerrilla Tactics at the State Fair of Texas",
    "description": "Street Teams Co unleashed a high-energy guerrilla street team at the Great State Fair of Texas to promote Cirque du Soleil's Dallas show. Our brand ambassadors used bold signage, costume activations, and live performance teasers to stop foot traffic and create Instagram-worthy moments. The team covered high-density fair zones, parking lots, and surrounding neighborhoods to maximize reach far beyond the fairgrounds.",
    "industry": "Entertainment",
    "services": [
      "Guerrilla Street Marketing",
      "Costume Activations",
      "Flyering",
      "Street Performance"
    ],
    "markets": [
      "Dallas"
    ],
    "date": "October 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1iGpR3Ked9i9r9P5aoj0LA2DyyMozbCfF?usp=sharing",
    "stats": {
      "Event Duration": "4 Days",
      "Direct Interactions": "8,000+",
      "Ticket Inquiries": "+45%",
      "Social Shares": "2,500+"
    },
    "category": "Entertainment",
    "featured": true,
    "heroImage": "/images/case-studies/cirque-du-soleil-hero.jpg",
    "images": [
      "/images/case-studies/gallery/cirque/cirque-1.jpg",
      "/images/case-studies/gallery/cirque/cirque-2.jpg",
      "/images/case-studies/gallery/cirque/cirque-3.jpg",
      "/images/case-studies/gallery/cirque/cirque-4.jpg",
      "/images/case-studies/gallery/cirque/cirque-5.jpg",
      "/images/case-studies/gallery/cirque/cirque-6.jpg",
      "/images/case-studies/gallery/cirque/cirque-7.jpg",
      "/images/case-studies/gallery/cirque/cirque-8.jpg"
    ]
  },
  {
    "id": "buffalo-wild-wings",
    "name": "Buffalo Wild Wings GO! - East Village Street Takeover",
    "tagline": "Urban Brand Ambassador Blitz",
    "description": "Street Teams Co mobilized a high-energy urban brand ambassador squad to blanket NYC's East Village for the Buffalo Wild Wings GO! launch. Our street teams hit every block — distributing menus, offering exclusive opening-day deals, and creating pop-up engagement stations at busy intersections. The campaign combined classic guerrilla flyering with modern QR-code-driven digital engagement to drive immediate foot traffic.",
    "industry": "Food & Beverage",
    "services": [
      "Urban Brand Ambassadors",
      "Guerrilla Flyering",
      "QR Code Activations",
      "Street Team Promotion"
    ],
    "markets": [
      "New York City"
    ],
    "date": "September 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1vJCWTW2O6eaVkpkBjGX1vWJkFOLyrnyq?usp=sharing",
    "stats": {
      "Street Team Size": "12 Ambassadors",
      "Flyers Distributed": "25,000+",
      "Opening Week Traffic": "+62%",
      "QR Code Scans": "3,400+"
    },
    "category": "Food & Beverage",
    "featured": true,
    "heroImage": "/images/case-studies/buffalo-wild-wings-hero.jpg",
    "images": [
      "/images/case-studies/gallery/bww/bww-1.jpg",
      "/images/case-studies/gallery/bww/bww-2.jpg",
      "/images/case-studies/gallery/bww/bww-3.jpg",
      "/images/case-studies/gallery/bww/bww-4.jpg",
      "/images/case-studies/gallery/bww/bww-5.jpg",
      "/images/case-studies/gallery/bww/bww-6.jpg",
      "/images/case-studies/gallery/bww/bww-7.jpg",
      "/images/case-studies/gallery/bww/bww-8.jpg"
    ]
  },
  {
    "id": "1800-tequila",
    "name": "1800 Tequila - NBA All Star Weekend",
    "tagline": "Elevate Your Night",
    "description": "1800 Tequila partnered with Street Teams Co to execute an engaging brand activation during the NBA All Star Weekend in Los Angeles. Our team provided comprehensive event staffing, experiential event support, and sampling activation at Terra Gallery to enhance brand visibility and create memorable experiences for attendees.",
    "industry": "Beverage",
    "services": [
      "Brand Activation",
      "Event Staffing",
      "Sampling Activation"
    ],
    "markets": [
      "Los Angeles"
    ],
    "date": "February 2020",
    "stats": {
      "Event": "NBA All Star Weekend",
      "Location": "Terra Gallery, Los Angeles",
      "Services": "Experiential Event Staffing"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/1800-tequila.jpg",
    "images": [
      "/images/case-studies/gallery/1800-tequila/1800-tequila-1.jpg",
      "/images/case-studies/gallery/1800-tequila/1800-tequila-2.jpg"
    ]
  },
  {
    "id": "beer-samplings-national",
    "name": "Baja Brewing - Beer Sampling",
    "tagline": "Taste the Craft",
    "description": "Street Teams Co partnered with Baja Brewing to execute a beer sampling activation in Las Vegas and San Diego at Northgate Market locations. Our team provided brand ambassadors and event staffing to drive engagement and enhance brand awareness, ensuring a memorable experience for attendees.",
    "industry": "Beverage",
    "services": [
      "Brand Activation",
      "Event Staffing",
      "Sampling Activation"
    ],
    "markets": [
      "Las Vegas",
      "San Diego"
    ],
    "date": "January 2023 - Ongoing",
    "googleDriveUrl": "https://drive.google.com/drive/folders/12S5545-sD78eDYSxcC438kra_vTnG7xI?usp=share_link",
    "stats": {
      "Retailer": "Northgate Market",
      "Markets": "Las Vegas, San Diego",
      "Services": "Beer Sampling"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/beer-samplings.jpg",
    "images": [
      "/images/case-studies/gallery/northgate-beer/northgate-beer-1.jpg",
      "/images/case-studies/gallery/northgate-beer/northgate-beer-2.jpg",
      "/images/case-studies/gallery/northgate-beer/northgate-beer-3.jpg",
      "/images/case-studies/gallery/northgate-beer/northgate-beer-4.jpg"
    ]
  },
  {
    "id": "meijer-retail",
    "name": "Meijer Brand Activations",
    "tagline": "Midwest Retail Excellence",
    "description": "Street Teams Co partnered with Meijer to execute brand activations across the Midwest including OSU Football Tailgates, University of Michigan Beach Day, Milwaukee Zoo events, and Illini Frenzy. Our team provided strategic marketing services to enhance customer engagement and awareness.",
    "industry": "Retail",
    "services": [
      "Brand Activation",
      "Event Marketing",
      "Customer Engagement"
    ],
    "markets": [
      "Ohio",
      "Michigan",
      "Milwaukee",
      "Illinois"
    ],
    "date": "2021-2022",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1pnMMxwibwuQvjngy0kbQ-AIwVPexB-uM?usp=share_link",
    "stats": {
      "Events": "Multiple College & Community Events",
      "Markets": "Midwest Region",
      "Services": "Brand Activation"
    },
    "category": "Retail",
    "featured": false,
    "heroImage": "/images/case-studies/meijer.jpg",
    "images": [
      "/images/case-studies/gallery/meijer/meijer-1.jpg",
      "/images/case-studies/gallery/meijer/meijer-2.jpg",
      "/images/case-studies/gallery/meijer/meijer-3.jpg",
      "/images/case-studies/gallery/meijer/meijer-4.jpg",
      "/images/case-studies/gallery/meijer/meijer-5.jpg",
      "/images/case-studies/gallery/meijer/meijer-6.jpg",
      "/images/case-studies/gallery/meijer/meijer-7.jpg"
    ]
  },
  {
    "id": "waiakea-water",
    "name": "Waiakea Water x Aaron Judge Opening Day",
    "tagline": "Pure Hawaiian Hydration",
    "description": "Street Teams Co partnered with Waiakea Hawaiian Volcanic Water to execute a street team activation during the Opening Weekend at Yankee Stadium in New York City. Our brand ambassadors engaged thousands of fans through product sampling and positive interactions, leveraging Aaron Judge's endorsement to enhance brand awareness and recognition.",
    "industry": "Beverage",
    "services": [
      "Brand Ambassadors",
      "Street Teams",
      "Product Distribution"
    ],
    "markets": [
      "New York City"
    ],
    "date": "April 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1pnMMxwibwuQvjngy0kbQ-AIwVPexB-uM?usp=share_link",
    "stats": {
      "Event Duration": "3 Days",
      "Location": "Yankee Stadium, NYC",
      "Services": "Street Team Activation"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/waiakea-hero.jpg",
    "images": [
      "/images/case-studies/gallery/waiakea/waiakea-1.jpg",
      "/images/case-studies/gallery/waiakea/waiakea-2.jpg",
      "/images/case-studies/gallery/waiakea/waiakea-3.jpg",
      "/images/case-studies/gallery/waiakea/waiakea-4.jpg",
      "/images/case-studies/gallery/waiakea/waiakea-5.jpg"
    ]
  },
  {
    "id": "skinny-mixes",
    "name": "Skinny Mixes - NYC Street Sampling Blitz",
    "tagline": "Sugar-Free Flavor Revolution",
    "description": "Street Teams Co deployed a street sampling squad across Manhattan to put Skinny Mixes directly in consumers' hands. Our ambassadors hit Union Square, Times Square, and SoHo with branded coolers and sampling stations, creating high-energy interactions that drove immediate product trial and social media buzz.",
    "industry": "Food & Beverage",
    "services": [
      "Street Sampling",
      "Guerrilla Product Distribution",
      "Urban Brand Ambassadors"
    ],
    "markets": [
      "New York City"
    ],
    "date": "March 2025",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1J5BNDKfyZNo_Y0gR__AbClEJDMelKHwH?usp=sharing",
    "stats": {
      "Samples Distributed": "15,000+",
      "Direct Interactions": "8,000+",
      "Social Media Posts": "500+",
      "Location": "Manhattan, NYC"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/skinny-mixes-hero.jpg",
    "heroPosition": "center right",
    "images": [
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-1.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-2.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-3.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-4.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-5.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-6.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-7.jpg",
      "/images/case-studies/gallery/skinny-mixes/skinny-mixes-8.jpg"
    ]
  },
  {
    "id": "culinary-dropout",
    "name": "Culinary Dropout - Ashford Crossing Launch",
    "tagline": "Comfort Food Revolution",
    "description": "Street Teams Co partnered with Culinary Dropout to execute a grand opening promotion in the Atlanta market. Our team provided brand activation and street team promotion to create an engaging experience that successfully increased local awareness and customer engagement during the launch event.",
    "industry": "Food & Beverage",
    "services": [
      "Brand Activation",
      "Grand Opening Promotion",
      "Street Team"
    ],
    "markets": [
      "Atlanta"
    ],
    "date": "February 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1X6ZCgE1j8rhk9m65RLXfZ0FsZjZAfZC7?usp=sharing",
    "stats": {
      "Event Duration": "10 Days",
      "Location": "Dunwoody, Atlanta",
      "Services": "Grand Opening Promotion"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/culinary-dropout.jpg",
    "images": [
      "/images/case-studies/gallery/culinary-dropout/culinary-dropout-1.jpg",
      "/images/case-studies/gallery/culinary-dropout/culinary-dropout-2.jpg",
      "/images/case-studies/gallery/culinary-dropout/culinary-dropout-3.jpg",
      "/images/case-studies/gallery/culinary-dropout/culinary-dropout-4.jpg",
      "/images/case-studies/gallery/culinary-dropout/culinary-dropout-5.jpg"
    ]
  },
  {
    "id": "katjes-candy",
    "name": "Katjes USA - Sweets & Snacks Trade Show",
    "tagline": "European Candy Excellence",
    "description": "Street Teams Co partnered with Katjes USA Inc. to execute a brand activation at the Sweets & Snacks trade show in Chicago/Indianapolis. Our team provided experiential event staffing and sampling activation, effectively engaging attendees and enhancing brand visibility during the event.",
    "industry": "Food & Beverage",
    "services": [
      "Brand Activation",
      "Event Staffing",
      "Sampling Activation"
    ],
    "markets": [
      "Chicago",
      "Indianapolis"
    ],
    "date": "May 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1fdv7i_3kXyDHMJLajR7bG-IDJITcUdyR?usp=sharing",
    "stats": {
      "Event Duration": "3 Days",
      "Location": "Indiana Convention Center",
      "Services": "Experiential Event Staffing"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/katjes-hero.jpg",
    "images": [
      "/images/case-studies/gallery/katjes/katjes-1.jpg",
      "/images/case-studies/gallery/katjes/katjes-2.jpg",
      "/images/case-studies/gallery/katjes/katjes-3.jpg",
      "/images/case-studies/gallery/katjes/katjes-4.jpg",
      "/images/case-studies/gallery/katjes/katjes-5.jpg",
      "/images/case-studies/gallery/katjes/katjes-6.jpg",
      "/images/case-studies/gallery/katjes/katjes-7.jpg",
      "/images/case-studies/gallery/katjes/katjes-8.jpg"
    ]
  },
  {
    "id": "microsoft-events",
    "name": "Microsoft - NRF Conference",
    "tagline": "Empowering Every Person",
    "description": "Street Teams Co partnered with Microsoft to execute event staffing and guest experience management at the National Retail Federation Show in New York City. Our team provided high-touch support and on-site leadership, ensuring seamless coordination and professional service throughout the multi-day engagement.",
    "industry": "Technology",
    "services": [
      "Event Staffing",
      "Guest Experience",
      "Meeting Check-In",
      "Wayfinding"
    ],
    "markets": [
      "New York City"
    ],
    "date": "January 2020",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1YEVNExT1l9Eiaj9sKmxAuBqkNz8huCiD?usp=sharing",
    "stats": {
      "Event": "NRF Conference",
      "Location": "Jacob K. Javits Convention Center",
      "Services": "Event Staffing & Guest Experience"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/microsoft-hero.jpg",
    "images": [
      "/images/case-studies/gallery/microsoft/microsoft-1.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-2.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-3.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-4.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-5.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-6.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-7.jpg",
      "/images/case-studies/gallery/microsoft/microsoft-8.jpg"
    ]
  },
  {
    "id": "netflix-activations",
    "name": "Netflix Premiere Events",
    "tagline": "Stories That Move You",
    "description": "Premiere event staffing and fan experience activations for Netflix original series launches, including red carpet events, fan screenings, and immersive pop-up experiences.",
    "industry": "Entertainment",
    "services": [
      "Premiere Events",
      "Fan Experiences",
      "VIP Management"
    ],
    "markets": [
      "Los Angeles"
    ],
    "date": "2021",
    "googleDriveUrl": "https://drive.google.com/drive/folders/17ffDXAso3Tu5-ossU3AXTfdqjr2p-YkU",
    "stats": {
      "Premiere Events": "3",
      "Event Staff": "Team of 7",
      "Location": "Goya Studios, Hollywood"
    },
    "category": "Entertainment",
    "featured": false,
    "heroImage": "/images/case-studies/netflix-hero.jpg",
    "images": [
      "/images/case-studies/gallery/netflix/netflix-1.jpg",
      "/images/case-studies/gallery/netflix/netflix-2.jpg",
      "/images/case-studies/gallery/netflix/netflix-3.jpg",
      "/images/case-studies/gallery/netflix/netflix-4.jpg",
      "/images/case-studies/gallery/netflix/netflix-5.jpg",
      "/images/case-studies/gallery/netflix/netflix-6.jpg",
      "/images/case-studies/gallery/netflix/netflix-7.jpg",
      "/images/case-studies/gallery/netflix/netflix-8.jpg"
    ]
  },
  {
    "id": "ted-talk-events",
    "name": "TED Conference Staffing",
    "tagline": "Ideas Worth Spreading",
    "description": "Street Teams Co partnered with TED to execute event staffing for the TED Conference in Atlanta. Our team provided comprehensive guest experience support across multiple venues including Pullman Yards, ensuring smooth check-in, badge distribution, attendee flow management, refuel area staffing, and VIP arrival support throughout the event.",
    "industry": "Events",
    "services": [
      "Front-of-House Staffing",
      "Check-in & Registration",
      "VIP Support",
      "Wayfinding"
    ],
    "markets": [
      "Atlanta"
    ],
    "date": "October 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1pnMMxwibwuQvjngy0kbQ-AIwVPexB-uM?usp=share_link",
    "stats": {
      "Event Duration": "6 Days",
      "Location": "Pullman Yards, Atlanta",
      "Venues": "Multiple Locations"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/ted-talk-hero.jpg",
    "images": [
      "/images/case-studies/gallery/ted/ted-1.jpg",
      "/images/case-studies/gallery/ted/ted-2.jpg",
      "/images/case-studies/gallery/ted/ted-3.jpg",
      "/images/case-studies/gallery/ted/ted-4.jpg",
      "/images/case-studies/gallery/ted/ted-5.jpg",
      "/images/case-studies/gallery/ted/ted-6.jpg",
      "/images/case-studies/gallery/ted/ted-7.jpg",
      "/images/case-studies/gallery/ted/ted-8.jpg"
    ]
  },
  {
    "id": "clarins-beauty",
    "name": "Clarins - Multi-Market Product Launch Tour",
    "tagline": "Plant-Powered Beauty",
    "description": "Clarins partnered with Street Teams Co to execute a multi-market product launch tour in the beauty and skincare industry. Our team provided event staffing, sampling activation, and street team promotion at Macy's and Nordstrom locations, ensuring a seamless and engaging experience for the brand while effectively reaching target audiences.",
    "industry": "Beauty",
    "services": [
      "Event Staffing",
      "Sampling Activation",
      "Street Team Promotion"
    ],
    "markets": [
      "Yonkers",
      "Skokie",
      "Orlando",
      "Garden City",
      "Flushing",
      "Costa Mesa",
      "Boca Raton"
    ],
    "date": "September 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1CQEzIZzsl9pjuHBAdjlq9RIwbRs4etAR?usp=drive_link",
    "stats": {
      "Locations": "Macy's & Nordstrom",
      "Markets": "Multiple US Cities",
      "Services": "Sampling Activation"
    },
    "category": "Beauty & Fashion",
    "featured": false,
    "heroImage": "/images/case-studies/clarins.jpg",
    "images": [
      "/images/case-studies/gallery/clarins/clarins-1.jpg",
      "/images/case-studies/gallery/clarins/clarins-2.jpg",
      "/images/case-studies/gallery/clarins/clarins-3.jpg",
      "/images/case-studies/gallery/clarins/clarins-4.jpg",
      "/images/case-studies/gallery/clarins/clarins-5.jpg",
      "/images/case-studies/gallery/clarins/clarins-6.jpg",
      "/images/case-studies/gallery/clarins/clarins-7.jpg",
      "/images/case-studies/gallery/clarins/clarins-8.jpg"
    ]
  },
  {
    "id": "byoma-skincare",
    "name": "BYOMA - Ulta Beauty Product Sampling Tour",
    "tagline": "Barrier Care Made Simple",
    "description": "Street Teams Co partnered with BYOMA to execute a product sampling tour across major markets including Atlanta, Chicago, Denver, Miami, New York City, and Texas. Our team provided event staffing, sampling activation, and street team promotion at Ulta Beauty locations, successfully enhancing brand visibility and engagement during the activation period.",
    "industry": "Beauty",
    "services": [
      "Event Staffing",
      "Sampling Activation",
      "Street Team Promotion"
    ],
    "markets": [
      "Atlanta",
      "Chicago",
      "Denver",
      "Miami",
      "New York City",
      "Texas"
    ],
    "date": "September-October 2023",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1_6AwLOOI-bKa3NeoRI_K8vcfojtLAZRP?usp=sharing",
    "stats": {
      "Retail Partner": "Ulta Beauty",
      "Markets": "6 Major Cities",
      "Duration": "2 Months"
    },
    "category": "Beauty & Fashion",
    "featured": false,
    "heroImage": "/images/case-studies/byoma-hero.jpg",
    "images": [
      "/images/case-studies/gallery/byoma/byoma-1.jpg",
      "/images/case-studies/gallery/byoma/byoma-2.jpg",
      "/images/case-studies/gallery/byoma/byoma-3.jpg",
      "/images/case-studies/gallery/byoma/byoma-4.jpg",
      "/images/case-studies/gallery/byoma/byoma-5.jpg",
      "/images/case-studies/gallery/byoma/byoma-6.jpg",
      "/images/case-studies/gallery/byoma/byoma-7.jpg",
      "/images/case-studies/gallery/byoma/byoma-8.jpg"
    ]
  },
  {
    "id": "polaris-powersports",
    "name": "Polaris - National Finals Rodeo",
    "tagline": "Think Outside",
    "description": "Street Teams Co partnered with Polaris to execute a booth activation at the National Finals Rodeo in Las Vegas. Our team provided event staffing and brand ambassador services to drive consumer engagement and lead capture, ensuring a seamless and engaging experience for the brand throughout the 10-day event.",
    "industry": "Automotive",
    "services": [
      "Event Staffing",
      "Brand Ambassadors",
      "Lead Capture",
      "Giveaway Distribution"
    ],
    "markets": [
      "Las Vegas"
    ],
    "date": "December 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/17dctKgx5PO05_bw5scsdbKXS1olrtwAS?usp=sharing",
    "stats": {
      "Event": "National Finals Rodeo",
      "Duration": "10 Days",
      "Location": "Thomas & Mack Stadium"
    },
    "category": "Automotive",
    "featured": false,
    "heroImage": "/images/case-studies/gallery/polaris/polaris-15.jpg",
    "images": [
      "/images/case-studies/gallery/polaris/polaris-15.jpg",
      "/images/case-studies/gallery/polaris/polaris-1.jpg",
      "/images/case-studies/gallery/polaris/polaris-2.jpg",
      "/images/case-studies/gallery/polaris/polaris-3.jpg",
      "/images/case-studies/gallery/polaris/polaris-4.jpg",
      "/images/case-studies/gallery/polaris/polaris-5.jpg",
      "/images/case-studies/gallery/polaris/polaris-6.jpg",
      "/images/case-studies/gallery/polaris/polaris-7.jpg",
      "/images/case-studies/gallery/polaris/polaris-8.jpg",
      "/images/case-studies/gallery/polaris/polaris-9.jpg",
      "/images/case-studies/gallery/polaris/polaris-10.jpg",
      "/images/case-studies/gallery/polaris/polaris-11.jpg",
      "/images/case-studies/gallery/polaris/polaris-12.jpg"
    ]
  },
  {
    "id": "car-wash-promotions",
    "name": "Dash Car Wash - Las Vegas Grand Opening",
    "tagline": "Shine On",
    "description": "Dash Car Wash partnered with Street Teams Co to execute a grand opening event in Las Vegas from September 26 to October 13, 2024. Our team provided event staffing and promotional support through brand ambassadors and street teams, successfully driving engagement and awareness for the new location.",
    "industry": "Automotive",
    "services": [
      "Event Staffing",
      "Grand Opening Promotion",
      "Street Team"
    ],
    "markets": [
      "Las Vegas"
    ],
    "date": "September-October 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/13fmVFc15G77tH31zEhgUp1fYSrA6fOOD?usp=sharing",
    "stats": {
      "Event Duration": "18 Days",
      "Location": "Las Vegas",
      "Services": "Grand Opening Promotion"
    },
    "category": "Automotive",
    "featured": false,
    "heroImage": "/images/case-studies/car-wash-hero.jpg",
    "images": [
      "/images/case-studies/gallery/car-wash/car-wash-1.jpg",
      "/images/case-studies/gallery/car-wash/car-wash-2.jpg",
      "/images/case-studies/gallery/car-wash/car-wash-3.jpg",
      "/images/case-studies/gallery/car-wash/car-wash-4.jpg"
    ]
  },
  {
    "id": "formula-1-las-vegas",
    "name": "+44 Formula One - Las Vegas Street Activation",
    "tagline": "Racing Into the Future",
    "description": "Street Teams Co deployed brand ambassadors across the Las Vegas Strip and surrounding venues during the Formula 1 Grand Prix. Our street teams distributed branded merchandise, created photo-op stations, and drove foot traffic to the +44 activation at The Wynn — blending guerrilla street marketing with high-profile event presence.",
    "industry": "Sports & Entertainment",
    "services": [
      "Street Team Deployment",
      "Guerrilla Brand Activation",
      "Merchandise Distribution"
    ],
    "markets": [
      "Las Vegas"
    ],
    "date": "November 2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1aTzRjejThSTFB5g7_d3Y7AR8EmYNUHI4?usp=sharing",
    "stats": {
      "Duration": "11 Days",
      "Street Team Size": "20+ Ambassadors",
      "Direct Interactions": "15,000+",
      "Location": "Las Vegas Strip"
    },
    "category": "Entertainment",
    "featured": false,
    "heroImage": "/images/case-studies/formula-1-5.jpg",
    "images": [
      "/images/case-studies/gallery/formula1/formula1-1.jpg",
      "/images/case-studies/gallery/formula1/formula1-2.jpg",
      "/images/case-studies/gallery/formula1/formula1-3.jpg",
      "/images/case-studies/gallery/formula1/formula1-4.jpg",
      "/images/case-studies/gallery/formula1/formula1-5.jpg",
      "/images/case-studies/gallery/formula1/formula1-6.jpg",
      "/images/case-studies/gallery/formula1/formula1-7.jpg",
      "/images/case-studies/gallery/formula1/formula1-8.jpg"
    ]
  },
  {
    "id": "williams-racing-f1",
    "name": "Williams Racing - Multi-City Street Presence",
    "tagline": "Racing Heritage on the Streets",
    "description": "Street Teams Co provided street-level brand presence for Williams Racing across three major F1 markets. Our teams worked the areas surrounding race venues — hotels, restaurants, fan zones, and transit hubs — engaging racing fans with branded giveaways, photo opportunities, and race-day information that extended the Williams brand far beyond the track.",
    "industry": "Sports & Entertainment",
    "services": [
      "Street Team Deployment",
      "Fan Engagement",
      "Branded Giveaways"
    ],
    "markets": [
      "Las Vegas",
      "Miami",
      "Texas"
    ],
    "date": "2023-2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1pnMMxwibwuQvjngy0kbQ-AIwVPexB-uM?usp=share_link",
    "stats": {
      "Markets": "3 Major Race Cities",
      "Events Covered": "6 Race Weekends",
      "Fan Interactions": "25,000+",
      "Brand Impressions": "500K+"
    },
    "category": "Entertainment",
    "featured": false,
    "heroImage": "/images/case-studies/williams-racing.jpg",
    "images": [
      "/images/case-studies/williams-racing.jpg",
      "/images/case-studies/williams-racing-2.jpg",
      "/images/case-studies/williams-racing-3.jpg"
    ]
  },
  {
    "id": "mrbeast-events",
    "name": "MrBeast Feastables - Street Sampling Tour",
    "tagline": "Better Ingredients, Better Chocolate",
    "description": "Street Teams Co hit the streets of Las Vegas and New York City for MrBeast's Feastables brand, running high-energy street sampling activations that generated massive crowds and viral social moments. Our teams distributed samples at strategic locations near universities, transit hubs, and entertainment districts.",
    "industry": "Food & Beverage",
    "services": [
      "Street Sampling",
      "Guerrilla Marketing",
      "Crowd Activation"
    ],
    "markets": [
      "Las Vegas",
      "New York City"
    ],
    "date": "February 2023",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1jDA_ff4MWc9LlLMx7S65Oru15Yy-VOBc?usp=drive_link",
    "stats": {
      "Samples Given": "20,000+",
      "Social Media Mentions": "1,500+",
      "Markets": "Las Vegas, NYC",
      "Crowd Gatherings": "50+ Events"
    },
    "category": "Entertainment",
    "featured": false,
    "heroImage": "/images/case-studies/mrbeast-hero.jpg"
  },
  {
    "id": "bond-vet",
    "name": "Bond Vet - Grand Openings",
    "tagline": "Modern Pet Care",
    "description": "Bond Vet partnered with Street Teams Co to execute grand opening events across multiple locations including Narbeth PA, Paramus NJ, Glenview, and Ponce. Our efforts included event staffing, flyering, and street team promotions, driving awareness and engagement within pet owner communities for these new veterinary facilities.",
    "industry": "Healthcare",
    "services": [
      "Event Staffing",
      "Grand Opening Promotion",
      "Street Team"
    ],
    "markets": [
      "New York",
      "New Jersey",
      "Atlanta"
    ],
    "date": "2023-2024",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1CyEDNF_36_1siTdUChYEhQCQtykn6yAi?usp=sharing",
    "stats": {
      "Markets": "NY, NJ, Atlanta",
      "Services": "Grand Opening Promotion",
      "Type": "Veterinary Clinic Launch"
    },
    "category": "Healthcare",
    "featured": false,
    "heroImage": "/images/case-studies/bond-vet.jpg",
    "images": [
      "/images/case-studies/gallery/bond-vet/bond-vet-1.jpg",
      "/images/case-studies/gallery/bond-vet/bond-vet-2.jpg",
      "/images/case-studies/gallery/bond-vet/bond-vet-3.jpg",
      "/images/case-studies/gallery/bond-vet/bond-vet-4.jpg",
      "/images/case-studies/gallery/bond-vet/bond-vet-5.jpg"
    ]
  },
  {
    "id": "qwick-staffing",
    "name": "Qwick - SXSW Street Team Activation",
    "tagline": "Staff On Demand",
    "description": "Street Teams Co partnered with Qwick to execute a street team activation at SXSW in Austin, Texas. Our team provided brand ambassadors and guerilla marketing services to enhance brand awareness and engage festival attendees, resulting in hundreds of direct interactions and heightened visibility across the event.",
    "industry": "Technology",
    "services": [
      "Brand Ambassadors",
      "Street Team Marketing",
      "Consumer Engagement"
    ],
    "markets": [
      "Austin, Texas"
    ],
    "date": "March 2023",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1pnMMxwibwuQvjngy0kbQ-AIwVPexB-uM?usp=share_link",
    "stats": {
      "Event": "SXSW Festival",
      "Duration": "2 Days",
      "Services": "Street Team Marketing"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/qwick.jpg",
    "images": [
      "/images/case-studies/gallery/qwick/qwick-1.jpg",
      "/images/case-studies/gallery/qwick/qwick-2.jpg",
      "/images/case-studies/gallery/qwick/qwick-3.jpg",
      "/images/case-studies/gallery/qwick/qwick-4.jpg",
      "/images/case-studies/gallery/qwick/qwick-5.jpg",
      "/images/case-studies/gallery/qwick/qwick-6.jpg",
      "/images/case-studies/gallery/qwick/qwick-7.jpg"
    ]
  },
  {
    "id": "starbucks-seasonal",
    "name": "Starbucks Brand Activation",
    "tagline": "Inspiring Connection",
    "description": "Street Teams Co partnered with Starbucks to execute a dynamic brand activation in the coffee industry. Our team provided engaging promotional events that enhanced customer interaction and increased brand loyalty, ensuring a memorable experience that resonated with coffee lovers.",
    "industry": "Food & Beverage",
    "services": [
      "Event Staffing",
      "Promotional Engagement",
      "Brand Activation"
    ],
    "markets": [
      "Various"
    ],
    "date": "Ongoing",
    "stats": {
      "Industry": "Coffee & Beverage",
      "Services": "Brand Activation",
      "Type": "Promotional Events"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/starbucks-hero.jpg"
  },
  {
    "id": "solar-company",
    "name": "Solar Company Marketing Activation",
    "tagline": "Power Your Future",
    "description": "Street Teams Co partnered with Solar Company to execute a comprehensive marketing activation focused on promoting solar energy solutions. Our team provided targeted outreach and engagement strategies to increase brand awareness and customer acquisition, ensuring a significant impact in the renewable energy market.",
    "industry": "Energy",
    "services": [
      "Marketing Activation",
      "Targeted Outreach",
      "Customer Engagement"
    ],
    "markets": [
      "Southwest Region"
    ],
    "date": "Ongoing",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1lbEFlRPldB20jOdu8dYAmCTu9GsTWUsI?usp=sharing",
    "stats": {
      "Industry": "Renewable Energy",
      "Services": "Marketing Activation",
      "Region": "Southwest"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/solar-company.jpg"
  },
  {
    "id": "topps-cards",
    "name": "Topps - NHL All Star Beach Fest",
    "tagline": "Collect the Moment",
    "description": "Street Teams Co partnered with Topps to execute a fan engagement activation at the NHL All Star Beach Fest in Miami. Our team provided brand ambassadors, booth support, and consumer education, driving app downloads and creating a high-energy experience that resonated with attendees, resulting in hundreds of interactions and strong demand for exclusive giveaways.",
    "industry": "Entertainment",
    "services": [
      "Brand Ambassadors",
      "Booth Support",
      "App Promotion",
      "Giveaways"
    ],
    "markets": [
      "Miami"
    ],
    "date": "February 2023",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1pnMMxwibwuQvjngy0kbQ-AIwVPexB-uM?usp=share_link",
    "stats": {
      "Event": "NHL All Star Beach Fest",
      "Duration": "3 Days",
      "Location": "Ft. Lauderdale Beach Park"
    },
    "category": "Entertainment",
    "featured": false,
    "heroImage": "/images/case-studies/topps-cards.jpg",
    "images": [
      "/images/case-studies/gallery/topps/topps-1.jpg",
      "/images/case-studies/gallery/topps/topps-2.jpg"
    ]
  },
  {
    "id": "cortie-digital",
    "name": "Cortie Digital Marketing Events",
    "tagline": "Digital Innovation",
    "description": "Conference and trade show staffing for Cortie Digital featuring tech demonstrations, lead capture, and B2B networking support.",
    "industry": "Technology",
    "services": [
      "Trade Show Staffing",
      "Lead Generation",
      "Tech Demos"
    ],
    "markets": [
      "Tech Conferences Nationwide"
    ],
    "date": "2024",
    "stats": {
      "Conferences": "25+",
      "Leads Captured": "10,000+",
      "Demos Conducted": "5,000+",
      "Meeting Bookings": "2,000+"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/cortie-digital.jpg",
    "images": [
      "/images/case-studies/cortie-digital.jpg",
      "/images/case-studies/cortie-digital-2.jpg",
      "/images/case-studies/cortie-digital-3.jpg"
    ]
  },
  {
    "id": "peelzon-beauty",
    "name": "Peelzon Skincare Launch",
    "tagline": "Reveal Your Best Skin",
    "description": "Product launch and sampling campaign for Peelzon skincare featuring beauty consultants, in-store demonstrations, and influencer events.",
    "industry": "Beauty",
    "services": [
      "Product Launch",
      "Sampling",
      "Influencer Events"
    ],
    "markets": [
      "Los Angeles",
      "New York",
      "Miami"
    ],
    "date": "2024",
    "stats": {
      "Launch Events": "20+",
      "Samples Distributed": "50,000+",
      "Influencer Partners": "100+",
      "Sales Generated": "$2M+"
    },
    "category": "Beauty & Fashion",
    "featured": false,
    "heroImage": "/images/case-studies/peelzon.jpg"
  },
  {
    "id": "brooklyn-magazine",
    "name": "Brooklyn Magazine Events",
    "tagline": "Brooklyn Culture",
    "description": "Event staffing and promotional support for Brooklyn Magazine events including launch parties, cultural events, and brand partnerships.",
    "industry": "Media",
    "services": [
      "Event Staffing",
      "Brand Partnerships",
      "VIP Management"
    ],
    "markets": [
      "New York"
    ],
    "date": "2024",
    "stats": {
      "Events Staffed": "30+",
      "Attendees Served": "15,000+",
      "Brand Partners": "50+",
      "Media Impressions": "10M+"
    },
    "category": "Entertainment",
    "featured": false,
    "heroImage": "/images/case-studies/brooklyn-magazine.jpg"
  },
  {
    "id": "merrell-outdoor",
    "name": "Merrell Outdoor Activations",
    "tagline": "Trail Tested",
    "description": "Brand activation and product sampling for Merrell outdoor footwear featuring hiking events, trail activations, and outdoor enthusiast engagement.",
    "industry": "Outdoor & Sports",
    "services": [
      "Brand Activation",
      "Product Sampling",
      "Event Marketing"
    ],
    "markets": [
      "Denver, CO"
    ],
    "date": "2024",
    "stats": {
      "Events": "25+",
      "Product Trials": "10,000+",
      "Trail Activations": "50+",
      "Brand Engagement": "100,000+"
    },
    "category": "Sports",
    "featured": false,
    "heroImage": "/images/case-studies/merrell-hero.jpg",
    "heroVideo": "651787642"
  },
  {
    "id": "grubhub-campaign",
    "name": "Grubhub - NYC Street Team",
    "tagline": "Delivering Happiness",
    "description": "Street Teams Co partnered with Grubhub to enhance their brand presence through targeted activations in the food delivery industry in New York City. Our team provided restaurant catering street team services, driving customer engagement and awareness through strategic outreach campaigns.",
    "industry": "Food Tech",
    "services": [
      "Street Teams",
      "Brand Activation",
      "Market Outreach"
    ],
    "markets": [
      "New York City"
    ],
    "date": "January 2019",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1STigwcAMOkNqjLeSia9U9EM00xwCxcbQ?usp=drive_link",
    "stats": {
      "Location": "New York City",
      "Type": "Restaurant Catering Street Team",
      "Services": "Brand Activation"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/grubhub-hero.jpg",
    "images": [
      "/images/case-studies/gallery/grubhub/grubhub-1.jpg",
      "/images/case-studies/gallery/grubhub/grubhub-2.jpg",
      "/images/case-studies/gallery/grubhub/grubhub-3.jpg",
      "/images/case-studies/gallery/grubhub/grubhub-4.jpg"
    ]
  },
  {
    "id": "premier-protein-sampling",
    "name": "Premier Protein National Sampling",
    "tagline": "Fuel Your Day",
    "description": "National sampling campaign for Premier Protein featuring in-store demos, gym activations, and health-focused event marketing.",
    "industry": "Health & Nutrition",
    "services": [
      "Product Sampling",
      "In-Store Demos",
      "Gym Activations"
    ],
    "markets": [
      "Nationwide"
    ],
    "date": "2024",
    "stats": {
      "Samples Distributed": "1M+",
      "Retail Locations": "5,000+",
      "Gym Partnerships": "500+",
      "Purchase Intent": "+70%"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/premier-protein-hero.jpg",
    "heroVideo": "394084617"
  },
  {
    "id": "clif-bar-marketing",
    "name": "Clif Bar National Marketing",
    "tagline": "Adventure Fueled",
    "description": "National marketing campaign for Clif Bar featuring outdoor event sponsorships, athlete partnerships, and adventure sports activations.",
    "industry": "Health & Nutrition",
    "services": [
      "Event Sponsorship",
      "Athlete Partnerships",
      "Sampling"
    ],
    "markets": [
      "Nationwide"
    ],
    "date": "2024",
    "stats": {
      "Events Sponsored": "200+",
      "Samples Distributed": "2M+",
      "Athlete Partners": "50+",
      "Social Reach": "50M+"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/clif-bar-hero.jpg"
  },
  {
    "id": "boss-coffee-launch",
    "name": "Boss Coffee US Launch",
    "tagline": "Boss Level Coffee",
    "description": "US product launch campaign for Boss Coffee featuring street team activations, sampling events, and brand awareness campaigns in key urban markets.",
    "industry": "Beverage",
    "services": [
      "Product Launch",
      "Street Teams",
      "Sampling"
    ],
    "markets": [
      "Denver, Colorado"
    ],
    "date": "2024",
    "stats": {
      "Launch Events": "50+",
      "Samples Distributed": "100,000+",
      "Brand Awareness": "+200%",
      "Retail Placement": "1,000+"
    },
    "category": "Food & Beverage",
    "featured": false,
    "heroImage": "/images/case-studies/boss-coffee-hero.jpg"
  },
  {
    "id": "aimco-residential",
    "name": "Aimco Residential Marketing",
    "tagline": "Home Sweet Home",
    "description": "Residential property marketing and leasing support for Aimco featuring community events, prospect engagement, and brand ambassador programs.",
    "industry": "Real Estate",
    "services": [
      "Community Events",
      "Leasing Support",
      "Brand Ambassadors"
    ],
    "markets": [
      "Nationwide"
    ],
    "date": "2024",
    "stats": {
      "Properties Supported": "100+",
      "Community Events": "500+",
      "Prospect Engagements": "50,000+",
      "Lease Conversions": "+35%"
    },
    "category": "Retail",
    "featured": false,
    "heroImage": "/images/case-studies/aimco-hero.jpg"
  },
  {
    "id": "lyft-national",
    "name": "Lyft - Multi-Market Experiential Activations",
    "tagline": "Your Ride Awaits",
    "description": "Lyft partnered with Street Teams Co to execute multi-market experiential activations across major cities such as Chicago, Dallas, Denver, Los Angeles, Miami, and New York City from June to September 2023. Our services included brand activation and event staffing, which successfully enhanced brand visibility and engagement in each market.",
    "industry": "Transportation",
    "services": [
      "Brand Activation",
      "Event Staffing",
      "Experiential Support"
    ],
    "markets": [
      "Chicago",
      "Dallas",
      "Denver",
      "Los Angeles",
      "Miami",
      "New York City"
    ],
    "date": "June-September 2023",
    "googleDriveUrl": "https://drive.google.com/drive/folders/1JTWP62tu34XtUA-YKqI4DqUHNOBDc6L5?usp=drive_link",
    "stats": {
      "Duration": "4 Months",
      "Markets": "6 Major Cities",
      "Services": "Experiential Activations"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/lyft-hero.jpg"
  },
  {
    "id": "mac-cosmetics-campaign",
    "name": "MAC Cosmetics - Powder Kiss National Launch",
    "tagline": "All Ages, All Races, All Genders",
    "description": "MAC Cosmetics launched a national Powder Kiss campaign across major cities including Atlanta, Chicago, Dallas, Denver, Las Vegas, Los Angeles, Miami, and New York City. Our team provided brand activation and experiential event staffing at MAC FSS, Macy's, Nordstrom, Ulta, and Bloomingdale's locations, ensuring a memorable experience that effectively showcased the new product line.",
    "industry": "Beauty",
    "services": [
      "Brand Activation",
      "Event Staffing",
      "Sampling Activation"
    ],
    "markets": [
      "Atlanta",
      "Chicago",
      "Dallas",
      "Denver",
      "Las Vegas",
      "Los Angeles",
      "Miami",
      "New York City",
      "Honolulu"
    ],
    "date": "April 2019",
    "googleDriveUrl": "https://drive.google.com/drive/folders/13-8CKGX1d_CUGcog49Wpx1gH9tmeHiqy?usp=sharing",
    "stats": {
      "Campaign": "Powder Kiss Launch",
      "Retailers": "MAC FSS, Macy's, Nordstrom, Ulta, Bloomingdale's",
      "Markets": "9 Major US Cities"
    },
    "category": "Beauty & Fashion",
    "featured": false,
    "heroImage": "/images/case-studies/mac-cosmetics-new-hero.jpg",
    "images": [
      "/images/case-studies/gallery/mac/mac-1.jpg",
      "/images/case-studies/gallery/mac/mac-2.jpg",
      "/images/case-studies/gallery/mac/mac-3.jpg",
      "/images/case-studies/gallery/mac/mac-4.jpg",
      "/images/case-studies/gallery/mac/mac-5.jpg"
    ]
  },
  {
    "id": "adidas-staffing",
    "name": "Adidas - Street-Level Sports Marketing",
    "tagline": "Impossible Is Nothing",
    "description": "Street Teams Co executed a national street marketing campaign for Adidas, deploying brand ambassadors outside sporting events, running clubs, and urban basketball courts. Our teams distributed exclusive promo codes, ran on-the-spot shoe fitting experiences, and created pop-up engagement zones that brought the Adidas brand directly to athletes and sneakerheads on the streets.",
    "industry": "Sports & Apparel",
    "services": [
      "Street Team Marketing",
      "Pop-Up Activations",
      "Urban Sports Engagement",
      "Guerrilla Product Demos"
    ],
    "markets": [
      "Nationwide"
    ],
    "date": "2024",
    "stats": {
      "Street Activations": "500+",
      "Direct Interactions": "100,000+",
      "Pop-Up Events": "2,000+",
      "Brand Impressions": "500M+"
    },
    "category": "Sports",
    "featured": false,
    "heroImage": "/images/case-studies/adidas-hero.jpg"
  },
  {
    "id": "visible-wireless",
    "name": "Visible - 75-City Street Team Blitz",
    "tagline": "Wireless Made Simple",
    "description": "Street Teams Co executed an unprecedented 75-city guerrilla street team campaign for Visible wireless. Our teams hit college campuses, transit stations, and urban hotspots with branded pop-up stations, offering on-the-spot sign-ups and free trials. The ground-level approach bypassed traditional advertising to create direct, personal connections with potential subscribers.",
    "industry": "Telecommunications",
    "services": [
      "Guerrilla Street Marketing",
      "Campus Activations",
      "Pop-Up Sign-Up Stations",
      "Street Teams"
    ],
    "markets": [
      "Nationwide"
    ],
    "date": "2024",
    "stats": {
      "Cities Activated": "75+",
      "New Subscribers": "50,000+",
      "Direct Sign-Ups": "12,000+",
      "Brand Awareness": "+150%"
    },
    "category": "Technology",
    "featured": false,
    "heroImage": "/images/case-studies/visible-hero.jpg"
  },
  {
    "id": "american-bike-ride",
    "name": "American Bike Ride",
    "tagline": "Events & Sports",
    "description": "Street Teams Co partnered with American Bike Ride to execute event staffing from March 8, 2025, to August 11, 2025. Our team provided essential support to ensure a seamless and engaging experience during the event, effectively enhancing participant interaction and satisfaction.",
    "industry": "Events & Sports",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [],
    "date": "",
    "stats": {
      "Markets": "4+",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Events & Sports",
    "heroImage": "/images/case-studies/american-bike-ride.jpg"
  },
  {
    "id": "avail-car-sharing-chicago-street-team",
    "name": "Avail Car Sharing - Chicago Street Team",
    "tagline": "Mobility",
    "description": "Avail Car Sharing partnered with our team to execute a brand activation campaign in Chicago. Over three days, we provided brand ambassadors and street team promotions to enhance visibility and engagement, effectively driving brand awareness in the local market.",
    "industry": "Mobility",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Chicago"
    ],
    "date": "",
    "stats": {
      "Markets": "1",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Mobility",
    "heroImage": "/images/case-studies/avail-car-sharing---chicago-street-team.jpg"
  },
  {
    "id": "beacon",
    "name": "Beacon",
    "tagline": "Technology",
    "description": "Beacon executed a brand activation on October 3, 2025, aimed at enhancing brand visibility and engagement. The activation successfully connected with the target audience, showcasing innovative strategies that resonated well in the market.",
    "industry": "Technology",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [],
    "date": "",
    "stats": {
      "Markets": "4+",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Technology",
    "heroImage": "/images/case-studies/beacon.jpg"
  },
  {
    "id": "bio-me",
    "name": "Bio Me",
    "tagline": "Health & Wellness",
    "description": "Street Teams Co partnered with Bio Me to execute a sampling activation on December 3, 2024. Our team provided key services to enhance brand visibility and engage potential customers effectively.",
    "industry": "Health & Wellness",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [],
    "date": "",
    "stats": {
      "Markets": "4+",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Health & Wellness",
    "heroImage": "/images/case-studies/bio-me.jpg"
  },
  {
    "id": "complexcon-las-vegas",
    "name": "ComplexCon Las Vegas",
    "tagline": "Entertainment",
    "description": "Street Teams Co partnered with ComplexCon Las Vegas to execute a brand activation in the entertainment and events market. Our team provided brand ambassadors and experiential event staffing to drive engagement and create memorable experiences for attendees.",
    "industry": "Entertainment",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Las Vegas"
    ],
    "date": "",
    "stats": {
      "Markets": "1",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Entertainment",
    "heroImage": "/images/case-studies/complexcon-las-vegas.jpg"
  },
  {
    "id": "cortland-apartments-atlanta-braves-pop-up",
    "name": "Cortland Apartments - Atlanta Braves Pop-up",
    "tagline": "Real Estate",
    "description": "Street Teams Co partnered with Cortland Apartments to execute a brand activation pop-up event for the Atlanta Braves in September 2024. Our team provided comprehensive event staffing and experiential event support, successfully enhancing brand visibility and engagement in the real estate market.",
    "industry": "Real Estate",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Atlanta"
    ],
    "date": "",
    "stats": {
      "Markets": "1",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Real Estate",
    "heroImage": "/images/case-studies/cortland-apartments---atlanta-braves-pop-up.jpg"
  },
  {
    "id": "duracell-x-formula-1-racing-activations",
    "name": "Duracell x Formula 1 Racing Activations",
    "tagline": "Sports Marketing",
    "description": "Street Teams Co partnered with Duracell to execute a multi-year brand activation in key U.S. race markets including Las Vegas, Austin, and Miami. Our team provided experiential staffing and interactive elements to enhance consumer engagement during major Formula 1 race weekends, creating memo...",
    "industry": "Sports Marketing",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Miami",
      "Las Vegas",
      "Austin"
    ],
    "date": "",
    "stats": {
      "Markets": "3",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Sports Marketing",
    "heroImage": "/images/case-studies/duracell-x-formula-1-racing-activations.jpg"
  },
  {
    "id": "get-neer-chicago-midwinter-dental-conference",
    "name": "Get Neer - Chicago MidWinter Dental Conference",
    "tagline": "Healthcare",
    "description": "Get Neer partnered with the Chicago MidWinter Dental Conference to execute brand activation and street team marketing in the beauty and skincare industry. Our team provided engaging street team promotions, successfully increasing brand awareness and interaction during the event.",
    "industry": "Healthcare",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Chicago"
    ],
    "date": "",
    "stats": {
      "Markets": "1",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Healthcare",
    "heroImage": "/images/case-studies/get-neer---chicago-midwinter-dental-conference.jpg"
  },
  {
    "id": "gopuff",
    "name": "GoPuff",
    "tagline": "Technology",
    "description": "GoPuff engaged with us for brand activation in Denver, executing a successful campaign that enhanced brand visibility and engagement. Our efforts focused on strategic outreach and memorable interactions, effectively connecting the brand with its target audience over the activation period.",
    "industry": "Technology",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Denver"
    ],
    "date": "",
    "stats": {
      "Markets": "1",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Technology",
    "heroImage": "/images/case-studies/gopuff.jpg"
  },
  {
    "id": "hard-rock-miami",
    "name": "Hard Rock Miami",
    "tagline": "Entertainment",
    "description": "Street Teams Co partnered with Hard Rock Miami to execute a street team marketing campaign from March 6 to March 29, 2025. Our team engaged directly with the community to enhance brand visibility and drive local engagement, successfully creating a buzz around the Hard Rock experience.",
    "industry": "Entertainment",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [
      "Miami"
    ],
    "date": "",
    "stats": {
      "Markets": "4+",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Entertainment",
    "heroImage": "/images/case-studies/hard-rock-miami.jpg"
  },
  {
    "id": "kendra-scott",
    "name": "Kendra Scott",
    "tagline": "Beauty & Retail",
    "description": "Street Teams Co partnered with Kendra Scott to execute a street team promotion, enhancing brand visibility and community engagement. Our team implemented targeted outreach efforts that effectively connected with potential customers, driving interest and brand awareness in the local market.",
    "industry": "Beauty & Retail",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [],
    "date": "",
    "stats": {
      "Markets": "4+",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Beauty & Retail",
    "heroImage": "/images/case-studies/kendra-scott.jpg"
  },
  {
    "id": "wooble",
    "name": "Wooble",
    "tagline": "Consumer Brands",
    "description": "Wooble engaged in a sampling tour to promote its offerings, enhancing brand visibility and customer interaction. This initiative successfully showcased their products, leading to increased consumer interest and engagement.",
    "industry": "Consumer Brands",
    "services": [
      "Street Team Marketing",
      "Brand Ambassadors",
      "Experiential Marketing"
    ],
    "markets": [],
    "date": "",
    "stats": {
      "Markets": "4+",
      "Client Satisfaction": "100%",
      "Support": "24/7"
    },
    "category": "Consumer Brands",
    "heroImage": "/images/case-studies/wooble.jpg"
  }
];



// Helper functions
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return portfolioCaseStudies.find(study => study.id === id);
}

export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  if (category === "All") return portfolioCaseStudies;
  return portfolioCaseStudies.filter(study => study.category === category);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return portfolioCaseStudies.filter(study => study.featured);
}

export function getCategories(): string[] {
  const categories = new Set<string>(["All"]);
  portfolioCaseStudies.forEach(study => {
    if (study.category) categories.add(study.category);
  });
  return Array.from(categories);
}
