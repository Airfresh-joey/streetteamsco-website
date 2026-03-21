import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { useMetaTags } from '../hooks/useMetaTags';

export default function ServicesIndex() {
  useMetaTags({
    title: 'Street Marketing Services | Brand Ambassadors, Event Staffing & More | Street Teams Co',
    description: 'Explore our full range of street marketing services: street team marketing, brand ambassadors, event staffing, product sampling, flyer distribution, guerrilla marketing, experiential marketing, and promotional staffing nationwide.',
    canonical: 'https://streetteamsco.com/services',
  });

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p className="locations-hero-subtitle">
            Full-service street marketing solutions for brands that want to win on the ground
          </p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="locations-intro">
            <h2>Street Marketing Services Nationwide</h2>
            <p>
              From guerrilla activations and product sampling to brand ambassadors and event staffing,
              Street Teams Co delivers the boots-on-the-ground marketing that drives real results in 1,000+ cities.
            </p>
          </div>
          <div className="services-index-grid">
            {services.map(service => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="service-index-card">
                <h3>{service.name}</h3>
                <p>{service.tagline}</p>
                <span className="card-link">Learn More &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
