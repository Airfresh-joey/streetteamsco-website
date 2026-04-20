import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

const relatedBlogPosts: Record<string, { title: string; url: string }[]> = {
  'street-team-marketing': [
    { title: 'The Ultimate Guide to Street Team Marketing in 2026', url: '/blog/ultimate-guide-street-team-marketing.html' },
    { title: 'Street Team Marketing ROI: Boots on the Ground', url: '/blog/street-team-marketing-roi-boots-on-the-ground.html' },
    { title: 'How to Choose a Street Team Marketing Agency', url: '/blog/street-team-marketing-services-how-to-choose-agency.html' },
  ],
  'brand-ambassadors': [
    { title: 'How to Build a Brand Ambassador Program', url: '/blog/brand-ambassador-program-build-train-launch-guide.html' },
    { title: 'How to Hire Brand Ambassadors', url: '/blog/how-to-hire-brand-ambassadors.html' },
    { title: 'Brand Ambassador vs Street Team: Key Differences', url: '/blog/brand-ambassador-vs-street-team-differences.html' },
  ],
  'event-staffing': [
    { title: 'Event Staffing for Trade Shows Guide', url: '/blog/event-staffing-trade-shows-guide.html' },
    { title: 'Event Staffing for Corporate Events', url: '/blog/event-staffing-for-corporate-events.html' },
    { title: 'Hiring Event Staff Last Minute', url: '/blog/hiring-event-staff-last-minute.html' },
  ],
  'product-sampling': [
    { title: 'How to Run a Product Sampling Campaign', url: '/blog/how-to-run-a-product-sampling-campaign.html' },
    { title: 'Product Sampling Campaigns That Convert', url: '/blog/product-sampling-campaigns-that-convert.html' },
    { title: 'Direct to Consumer Sampling Strategies', url: '/blog/direct-to-consumer-sampling-strategies.html' },
  ],
  'guerrilla-marketing': [
    { title: 'Guerrilla Marketing Campaigns That Drive Results', url: '/blog/guerrilla-marketing-campaigns-that-drive-results.html' },
    { title: 'Guerrilla Marketing Case Studies: What Works', url: '/blog/guerrilla-marketing-case-studies-what-actually-works.html' },
    { title: 'Guerrilla Marketing Agency vs DIY', url: '/blog/guerrilla-marketing-agency-vs-diy.html' },
  ],
  'flyer-distribution': [
    { title: 'Professional Flyering Services Guide', url: '/blog/professional-flyering-services-flyer-distribution-guide.html' },
    { title: 'Flyer Distribution Best Practices', url: '/blog/flyer-distribution-best-practices.html' },
    { title: 'Street Team Promotion Ideas', url: '/blog/street-team-promotion-ideas-that-drive-conversions.html' },
  ],
  'experiential-marketing': [
    { title: 'What Is Experiential Marketing?', url: '/blog/what-is-experiential-marketing.html' },
    { title: 'Experiential Marketing Trends 2026', url: '/blog/experiential-marketing-trends-2026.html' },
    { title: 'Interactive Brand Experiences Guide', url: '/blog/interactive-brand-experiences-guide.html' },
  ],
  'promotional-staffing': [
    { title: 'Promotional Models vs Brand Ambassadors', url: '/blog/promotional-models-vs-brand-ambassadors.html' },
    { title: 'Pop-Up Shop Staffing Guide', url: '/blog/pop-up-shop-staffing-guide.html' },
    { title: 'Brand Ambassador Training Template', url: '/blog/brand-ambassador-training-program-template.html' },
  ],
};

export default function ServicePage() {
  const { service: serviceSlug } = useParams<{ service: string }>();
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  useMetaTags({
    title: service
      ? `${service.name} Services | Street Teams Co`
      : 'Service Not Found | Street Teams Co',
    description: service
      ? `${service.description.slice(0, 155)}...`
      : 'Service not found.',
    canonical: service
      ? `https://streetteamsco.com/services/${service.slug}`
      : undefined,
    schema: service ? [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://streetteamsco.com/services' },
          { '@type': 'ListItem', 'position': 3, 'name': service.name, 'item': `https://streetteamsco.com/services/${service.slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': service.name,
        'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
        'description': service.description,
        'areaServed': 'United States',
        'url': `https://streetteamsco.com/services/${service.slug}`,
      },
    ] : undefined,
  });

  if (!service) return <NotFound />;

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/services">All Services</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{service.name}</span>
          </nav>
          <h1>{service.name}</h1>
          <p className="locations-hero-subtitle">{service.tagline}</p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="service-detail">
            <div className="service-detail-intro">
              <h2>About {service.name}</h2>
              <p>{service.description}</p>
            </div>

            <div className="service-detail-section">
              <h3>What's Included</h3>
              <ul className="feature-list">
                {service.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-section">
              <h3>Benefits</h3>
              <div className="benefits-grid">
                {service.benefits.map((b, i) => (
                  <div key={i} className="benefit-card">{b}</div>
                ))}
              </div>
            </div>

            <div className="service-detail-section">
              <h3>Common Use Cases</h3>
              <ul className="feature-list">
                {service.useCases.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                {service.faq.map((item, i) => (
                  <div key={i} className="faq-item">
                    <h4>{item.q}</h4>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {relatedBlogPosts[service.slug] && (
              <div className="service-detail-section">
                <h3>Related Resources</h3>
                <ul className="related-posts-list">
                  {relatedBlogPosts[service.slug].map((post, i) => (
                    <li key={i}><a href={post.url}>{post.title}</a></li>
                  ))}
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <Link to="/pricing">View our pricing</Link> | <Link to="/testimonials">See client results</Link>
                </p>
              </div>
            )}

            <div className="city-cta">
              <h3>Ready to Get Started with {service.name}?</h3>
              <p>Contact Street Teams Co today for a custom campaign proposal.</p>
              <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
                View Pricing
              </Link>
              <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
