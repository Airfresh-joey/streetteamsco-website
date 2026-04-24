import { Link } from 'react-router-dom';
import { locations, getTotalCityCount } from '../data/locations';
import { useMetaTags } from '../hooks/useMetaTags';

export default function LocationsIndex() {
  useMetaTags({
    title: `Street Team Locations | Brand Ambassadors in ${getTotalCityCount()}+ Cities | Street Teams Co`,
    description: `Street team marketing in all 50 states and ${getTotalCityCount()}+ cities. Hire brand ambassadors from $25/hr with 94% client retention. Find local street teams near you and get a free quote.`,
    canonical: 'https://streetteamsco.com/locations',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Locations', 'item': 'https://streetteamsco.com/locations' },
      ],
    },
  });

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <h1>Street Team Marketing Locations Nationwide</h1>
          <p className="locations-hero-subtitle">
            Professional brand ambassadors and street teams in {getTotalCityCount()}+ cities across all 50 states
          </p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="locations-intro">
            <h2>Find Street Teams in Your Area</h2>
            <p>
              Street Teams Co operates in every major market in the United States.
              Select your state below to find available street marketing services in your city.
            </p>
          </div>

          <div className="states-grid">
            {locations.map((state) => (
              <Link
                key={state.slug}
                to={`/locations/${state.slug}`}
                className="state-card"
              >
                <h3>{state.name}</h3>
                <span className="city-count">{state.cities.length} cities</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
