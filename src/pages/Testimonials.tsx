import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

const testimonials = [
  {
    id: 1,
    name: 'Jessica Williams',
    title: 'Brand Manager',
    company: 'Spark Energy Drinks',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    quote: 'Street Teams Co delivered beyond expectations. Our campus sampling campaign reached over 50,000 students and drove a 40% increase in brand awareness among our target demographic.',
    campaign: 'Campus Sampling',
    results: ['50K+ students reached', '40% awareness increase', '15K samples distributed'],
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'VP of Marketing',
    company: 'Urban Apparel Co.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    quote: 'The street teams were professional, energetic, and perfectly represented our brand. The guerrilla marketing campaign created massive buzz on social media.',
    campaign: 'Guerrilla Marketing',
    results: ['2M+ social impressions', '500% ROI', '10 cities activated'],
  },
  {
    id: 3,
    name: 'Amanda Chen',
    title: 'Events Director',
    company: 'TechStart Conference',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    quote: 'Finding quality event staff used to be a nightmare. Street Teams Co provided us with 50+ trained brand ambassadors who exceeded every expectation.',
    campaign: 'Conference Staffing',
    results: ['50+ staff deployed', '98% satisfaction rate', 'Zero no-shows'],
  },
  {
    id: 4,
    name: 'David Rodriguez',
    title: 'Marketing Director',
    company: 'Fresh Foods Market',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    quote: 'The in-store product sampling campaign drove immediate results. We saw a 25% sales lift during the activation period and gained thousands of new customers.',
    campaign: 'Product Sampling',
    results: ['25% sales lift', '8K+ samples', '3K new customers'],
  },
  {
    id: 5,
    name: 'Sarah Kim',
    title: 'Growth Lead',
    company: 'FinTech Plus',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    quote: 'The lead generation campaign at SXSW was incredible. Professional teams, seamless execution, and we came home with over 2,000 qualified leads.',
    campaign: 'Trade Show Lead Gen',
    results: ['2,000+ leads captured', '35% conversion rate', '$500K pipeline'],
  },
  {
    id: 6,
    name: 'Michael Torres',
    title: 'Brand Activation Manager',
    company: 'Pacific Brewing Co.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    quote: 'Street Teams Co handled our entire festival presence across 6 events. Consistent quality, great communication, and measurable results every time.',
    campaign: 'Festival Activations',
    results: ['6 festivals', '100K+ samples', '15% market share gain'],
  },
];

const stats = [
  { value: '500+', label: 'Successful Campaigns' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Cities Nationwide' },
  { value: '10K+', label: 'Brand Ambassadors' },
];

export default function Testimonials() {
  useMetaTags({
    title: 'Street Team Marketing Reviews & Results | 500+ Campaigns | Street Teams Co',
    description: 'Street team marketing success stories from 500+ campaigns. 94% client retention, 4.9/5 rating. See real ROI results from brand ambassador & event staffing campaigns.',
    canonical: 'https://streetteamsco.com/testimonials',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Testimonials', 'item': 'https://streetteamsco.com/testimonials' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What results can I expect from a street team campaign?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Results vary by campaign type. Our clients typically see 25-40% brand awareness increases, 3-5x ROI multiples, and significant social media engagement. Product sampling campaigns often drive 15-25% sales lifts during activation periods.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How do you measure street team campaign success?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We track multiple KPIs including impressions generated, samples distributed, leads captured, social media engagement, and direct sales impact. Every campaign includes GPS tracking, daily photo reports, and a comprehensive post-campaign ROI analysis.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Do you have experience in my industry?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Street Teams Co has executed 500+ campaigns across 14+ industries including food & beverage, technology, fitness, cannabis, real estate, entertainment, automotive, healthcare, and more. We tailor our approach to each industry\'s unique needs.',
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="testimonials-page">
      <section className="testimonials-hero">
        <div className="container">
          <h1>Street Team Marketing Results & Testimonials</h1>
          <p className="testimonials-hero-subtitle">
            Real results from real campaigns. See why leading brands trust Street Teams Co.
          </p>
        </div>
      </section>

      <section className="testimonials-stats">
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

      <section className="testimonials-content">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-quote">
                  <span className="quote-mark">"</span>
                  {testimonial.quote}
                </div>
                <div className="testimonial-results">
                  <h4>Results</h4>
                  <ul>
                    {testimonial.results.map((result, i) => (
                      <li key={i}>{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-image" loading="lazy" width={200} height={200} />
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-title">{testimonial.title}</div>
                    <div className="author-company">{testimonial.company}</div>
                  </div>
                </div>
                <div className="testimonial-campaign">
                  <span className="campaign-tag">{testimonial.campaign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-content">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <details>
              <summary>What results can I expect from a street team campaign?</summary>
              <p>Results vary by campaign type. Our clients typically see 25-40% brand awareness increases, 3-5x ROI multiples, and significant social media engagement. Product sampling campaigns often drive 15-25% sales lifts during activation periods.</p>
            </details>
            <details>
              <summary>How do you measure street team campaign success?</summary>
              <p>We track multiple KPIs including impressions generated, samples distributed, leads captured, social media engagement, and direct sales impact. Every campaign includes GPS tracking, daily photo reports, and a comprehensive post-campaign ROI analysis.</p>
            </details>
            <details>
              <summary>Do you have experience in my industry?</summary>
              <p>Street Teams Co has executed 500+ campaigns across 14+ industries including food & beverage, technology, fitness, cannabis, real estate, entertainment, automotive, healthcare, and more. We tailor our approach to each industry's unique needs.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="testimonials-cta">
        <div className="container">
          <h2>Ready to Create Your Success Story?</h2>
          <p>Join the brands that trust Street Teams Co to deliver results.</p>
          <Link to="/#contact" className="btn btn-primary">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}
