import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

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

            <div className="city-cta">
              <h3>Ready to Get Started with {service.name}?</h3>
              <p>Contact Street Teams Co today for a custom campaign proposal.</p>
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
