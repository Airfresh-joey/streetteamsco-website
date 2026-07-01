import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

// Real crew-in-the-field photos from the case-study depot (no headshots / no fake names)
const crewPhotos = [
  { src: '/images/case-studies/cortie-digital-2.jpg', alt: 'Brand ambassadors handing out branded apparel to fans at a stadium activation', tag: 'Event Activation' },
  { src: '/images/case-studies/qwick-2.jpg', alt: 'Street team ambassador with promo signage in a downtown plaza', tag: 'Street Team' },
  { src: '/images/case-studies/car-wash-2.jpg', alt: 'Crew distributing promotional materials hand-to-hand outside a venue', tag: 'Flyering' },
  { src: '/images/case-studies/beer-samplings-2.jpg', alt: 'Sampling team running an in-store beverage activation', tag: 'Sampling' },
  { src: '/images/case-studies/meijer-2.jpg', alt: 'Crew operating a branded event tent outdoors', tag: 'Brand Activation' },
  { src: '/images/case-studies/formula-1-2.jpg', alt: 'Experiential crew on site at a motorsport activation', tag: 'Experiential' },
];

const values = [
  {
    icon: '🎯',
    title: 'Results-Driven',
    description: 'Every campaign is designed with measurable outcomes in mind. We track, report, and optimize for success.',
  },
  {
    icon: '🤝',
    title: 'Partnership Mindset',
    description: 'We become an extension of your team, understanding your brand as deeply as you do.',
  },
  {
    icon: '⚡',
    title: 'Agile Execution',
    description: 'From concept to activation in days, not weeks. We move fast without sacrificing quality.',
  },
  {
    icon: '🌟',
    title: 'Talent Excellence',
    description: 'Our brand ambassadors are carefully vetted, trained, and matched to your brand personality.',
  },
];

const stats = [
  { value: '50+', label: 'Markets Covered' },
  { value: '10K+', label: 'Trained Ambassadors' },
  { value: '12', label: 'Years in Business' },
  { value: '500+', label: 'Brands Served' },
];

export default function OurTeam() {
  useMetaTags({
    title: 'Street Teams Co Leadership | 10,000+ Brand Ambassadors Nationwide',
    description: 'Street Teams Co leadership team with 15+ years of experiential marketing experience. 10,000+ vetted brand ambassadors, 98% show-up rate, 4.9/5 client rating.',
    canonical: 'https://streetteamsco.com/our-team',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Our Team', 'item': 'https://streetteamsco.com/our-team' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How many brand ambassadors does Street Teams Co have?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Street Teams Co has a network of over 10,000 trained brand ambassadors across 50+ markets nationwide. Each ambassador is background-checked, product-trained, and rated on a reliability scoring system.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is Street Teams Co\'s show-up rate?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Street Teams Co maintains a 98% show-up rate across all campaigns, backed by our reliability scoring system and backup staffing protocols. Our client satisfaction rating is 4.9 out of 5.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How does Street Teams Co train brand ambassadors?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Every brand ambassador goes through brand-specific training that includes product knowledge, talking points, appearance standards, and campaign objectives. We also provide on-site field management to ensure quality execution.',
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="our-team-page">
      <section className="team-hero">
        <div className="container">
          <h1>Street Teams Co Leadership & Brand Ambassador Network</h1>
          <p className="team-hero-subtitle">
            Passionate professionals dedicated to making your brand unforgettable on the streets.
          </p>
        </div>
      </section>

      <section className="team-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-leadership">
        <div className="container">
          <h2>Our Crews in the Field</h2>
          <p className="section-subtitle">
            Real ambassadors running real activations nationwide — no stock photos, no actors.
          </p>
          <div className="ds-work-grid">
            {crewPhotos.map((p) => (
              <div key={p.src} className="ds-work-card">
                <img src={p.src} alt={p.alt} loading="lazy" />
                <div className="ds-work-meta"><span className="ds-work-tag">{p.tag}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-values">
        <div className="container">
          <h2>Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do.
          </p>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.title} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-ambassadors">
        <div className="container">
          <h2>Our Ambassador Network</h2>
          <div className="ambassador-content">
            <div className="ambassador-text">
              <p>
                Our strength lies in our people. We've built a network of over 10,000 brand ambassadors 
                across 50+ cities nationwide. Each ambassador goes through our rigorous screening and 
                training process to ensure they represent your brand with professionalism and authenticity.
              </p>
              <h3>Ambassador Standards</h3>
              <ul>
                <li>✓ Background-checked and verified</li>
                <li>✓ Brand-specific training protocols</li>
                <li>✓ Professional appearance standards</li>
                <li>✓ Real-time performance tracking</li>
                <li>✓ Reliability scoring system</li>
              </ul>
            </div>
            <div className="ambassador-stats">
              <div className="ambassador-stat">
                <span className="ambassador-stat-value">98%</span>
                <span className="ambassador-stat-label">Show-up Rate</span>
              </div>
              <div className="ambassador-stat">
                <span className="ambassador-stat-value">4.9/5</span>
                <span className="ambassador-stat-label">Client Rating</span>
              </div>
              <div className="ambassador-stat">
                <span className="ambassador-stat-value">Fast</span>
                <span className="ambassador-stat-label">Avg Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <details>
              <summary>How many brand ambassadors does Street Teams Co have?</summary>
              <p>Street Teams Co has a network of over 10,000 trained brand ambassadors across 50+ markets nationwide. Each ambassador is background-checked, product-trained, and rated on a reliability scoring system.</p>
            </details>
            <details>
              <summary>What is Street Teams Co's show-up rate?</summary>
              <p>Street Teams Co maintains a 98% show-up rate across all campaigns, backed by our reliability scoring system and backup staffing protocols. Our client satisfaction rating is 4.9 out of 5.</p>
            </details>
            <details>
              <summary>How does Street Teams Co train brand ambassadors?</summary>
              <p>Every brand ambassador goes through brand-specific training that includes product knowledge, talking points, appearance standards, and campaign objectives. We also provide on-site field management to ensure quality execution.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="team-cta">
        <div className="container">
          <h2>Work With Us</h2>
          <p>Ready to launch your next campaign with a team that delivers?</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Start a Campaign</Link>
            <Link to="/locations" className="btn btn-secondary">Find Your Market</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
