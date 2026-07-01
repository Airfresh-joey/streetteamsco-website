import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  useMetaTags({
    title: 'Contact Street Teams Co | Get a Free Street Team Marketing Quote',
    description: 'Contact Street Teams Co for a free street team marketing quote. Brand ambassadors, event staffing, and product sampling in 1,000+ US cities.',
    canonical: 'https://streetteamsco.com/contact',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Contact', 'item': 'https://streetteamsco.com/contact' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact Street Teams Co',
        'url': 'https://streetteamsco.com/contact',
        'mainEntity': {
          '@type': 'Organization',
          'name': 'Street Teams Co',
          'email': 'hello@streetteamsco.com',
          'areaServed': 'United States',
        },
      },
    ],
  });

  return (
    <>
      <section className="service-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Contact</span>
          </nav>
          <h1>Get a Free Street Team Marketing Quote</h1>
          <p className="service-hero-subtitle">
            Tell us about your campaign and we'll respond with a custom proposal.
            500+ campaigns executed across 1,000+ US cities.
          </p>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            <div>
              <ContactForm />
            </div>

            <div className="stats-grid" style={{ marginTop: '2rem' }}>
              <div className="stat">
                <div className="stat-number">Free</div>
                <div className="stat-label">Custom Quotes</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Campaigns Executed</div>
              </div>
              <div className="stat">
                <div className="stat-number">1,000+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
              <div className="stat">
                <div className="stat-number">94%</div>
                <div className="stat-label">Client Retention</div>
              </div>
            </div>

            <div className="city-cta" style={{ marginTop: '2rem' }}>
              <h3>Prefer Email?</h3>
              <p>
                Reach out directly at{' '}
                <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
                {' '}— every inquiry gets a response from a real strategist.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Want to see results first?{' '}
                <a href="/case-studies/">Browse our case studies</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
