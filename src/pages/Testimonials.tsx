import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

const testimonials = [
  {
    id: 1,
    name: 'Jessica W.',
    title: 'Brand Manager',
    company: 'A Top-5 US energy drink brand',
    initials: 'JW',
    color: '#f59e0b',
    quote: 'We ran a campus sampling program across 12 universities. Street Teams Co was the only agency that gave us GPS-verified shift reports for every BA, so we could prove the ROI to our CMO. We renewed for the following semester.',
    campaign: 'Campus Sampling Program',
    results: ['50K+ students reached', '40% brand recall lift (pre/post survey)', '15K samples distributed'],
  },
  {
    id: 2,
    name: 'Marcus J.',
    title: 'VP of Marketing',
    company: 'A national DTC apparel brand',
    initials: 'MJ',
    color: '#2563eb',
    quote: 'Their team executed a wild posting + LED truck campaign across 10 cities in 5 days. Show-Up Guarantee was the deciding factor — we lost time on a competitor agency the prior year due to no-shows. Zero issues with Street Teams Co.',
    campaign: 'Guerrilla Marketing — 10 Cities',
    results: ['2.1M social impressions', '5.2x ROAS', '10 cities activated in 5 days'],
  },
  {
    id: 3,
    name: 'Amanda C.',
    title: 'Events Director',
    company: 'A national tech conference series',
    initials: 'AC',
    color: '#10b981',
    quote: 'We needed 50+ trained brand ambassadors across two cities with a 3-week lead time. Other agencies told us it was impossible. Street Teams Co staffed it fully — no no-shows, no quality issues.',
    campaign: 'Conference Staffing',
    results: ['50+ staff deployed', '98% client satisfaction score', 'Zero no-shows'],
  },
  {
    id: 4,
    name: 'David R.',
    title: 'Marketing Director',
    company: 'A regional natural foods grocer',
    initials: 'DR',
    color: '#dc2626',
    quote: 'In-store sampling at 40 of our locations. SPINS data showed a 25% velocity lift on the sampled SKU during the activation window. Cost per incremental unit was well below our digital benchmarks.',
    campaign: 'In-Store Product Sampling',
    results: ['25% SKU velocity lift (SPINS)', '8.4K samples distributed', '3K loyalty signups'],
  },
  {
    id: 5,
    name: 'Sarah K.',
    title: 'Growth Lead',
    company: 'A Series B fintech app',
    initials: 'SK',
    color: '#7c3aed',
    quote: 'We brought Street Teams Co to SXSW to capture qualified leads at our booth. They trained their team on our product in one session and outperformed our internal SDRs on demo-to-meeting conversion.',
    campaign: 'Trade Show Lead Generation (SXSW)',
    results: ['2,000+ qualified leads', '35% lead-to-meeting conversion', '$500K attributed pipeline'],
  },
  {
    id: 6,
    name: 'Michael T.',
    title: 'Brand Activation Manager',
    company: 'A craft beverage brand (multi-state)',
    initials: 'MT',
    color: '#0891b2',
    quote: 'Festival season is a logistics nightmare. They handled six events across four states — including overlapping weekends — without a single staffing miss. The post-event reports were the most detailed I have seen from any field marketing agency.',
    campaign: 'Festival Activation Series',
    results: ['6 festivals (4 states)', '100K+ samples', '15% market share gain in test markets'],
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
                  <div className="author-image author-initials" style={{ background: testimonial.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.5px', width: 56, height: 56, borderRadius: '50%' }} aria-label={testimonial.name}>
                    {testimonial.initials}
                  </div>
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
          <Link to="/contact" className="btn btn-primary">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}
