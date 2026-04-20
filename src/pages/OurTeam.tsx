import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

const leadership = [
  {
    name: 'Alex Rivera',
    title: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Former VP of Field Marketing at a Fortune 500 company. 15+ years building high-performance street teams and experiential campaigns nationwide.',
    linkedin: '#',
  },
  {
    name: 'Michelle Park',
    title: 'VP of Operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Operations expert with a background in logistics and talent management. Ensures flawless execution across all 50+ markets we serve.',
    linkedin: '#',
  },
  {
    name: 'David Thompson',
    title: 'Director of Client Success',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Dedicated to helping brands achieve their marketing goals. Previously led experiential programs for major beverage and tech brands.',
    linkedin: '#',
  },
  {
    name: 'Sarah Martinez',
    title: 'Head of Talent Acquisition',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Recruits and trains our network of 10,000+ brand ambassadors. Expert in building teams that authentically represent brands.',
    linkedin: '#',
  },
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
    title: 'Our Team | Street Teams Co Leadership & Values',
    description: 'Meet the experienced team behind Street Teams Co. Learn about our leadership, values, and commitment to delivering exceptional street marketing results.',
    canonical: 'https://streetteamsco.com/our-team',
    schema: {
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
  });

  return (
    <div className="our-team-page">
      <section className="team-hero">
        <div className="container">
          <h1>Our Team</h1>
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
          <h2>Leadership Team</h2>
          <p className="section-subtitle">
            Industry veterans with a passion for experiential marketing excellence.
          </p>
          <div className="leadership-grid">
            {leadership.map((member) => (
              <div key={member.name} className="team-member">
                <img src={member.image} alt={member.name} className="member-image" loading="lazy" width={400} height={400} />
                <h3 className="member-name">{member.name}</h3>
                <div className="member-title">{member.title}</div>
                <p className="member-bio">{member.bio}</p>
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
                <span className="ambassador-stat-value">24hr</span>
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
            <Link to="/#contact" className="btn btn-primary">Start a Campaign</Link>
            <Link to="/locations" className="btn btn-secondary">Find Your Market</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
