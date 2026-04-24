import { Link } from 'react-router-dom';
import { industries } from '../data/industries';
import { useMetaTags } from '../hooks/useMetaTags';

export default function IndustriesIndex() {
  useMetaTags({
    title: 'Street Team Marketing by Industry | 14 Verticals | Street Teams Co',
    description: 'Street team marketing for cannabis, tech, food & beverage, fitness, real estate, retail & more. Industry-specific brand ambassadors in 1,000+ cities. Get a free quote.',
    canonical: 'https://streetteamsco.com/industries',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Industries', 'item': 'https://streetteamsco.com/industries' },
      ],
    },
  });

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <h1>Street Team Marketing by Industry</h1>
          <p className="locations-hero-subtitle">
            Specialized street marketing solutions tailored to your industry's unique challenges
          </p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="locations-intro">
            <h2>Industry-Specific Marketing Expertise</h2>
            <p>
              Every industry has unique marketing challenges. Street Teams Co brings deep expertise
              in compliance, audience targeting, and activation strategy for the verticals that matter most.
            </p>
          </div>
          <div className="industries-grid">
            {industries.map(industry => (
              <Link key={industry.slug} to={`/industries/${industry.slug}`} className="industry-card">
                <h3>{industry.name}</h3>
                <p>{industry.tagline}</p>
                <span className="card-link">Learn More &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
