import { Link } from 'react-router-dom';
import { locations, getTotalCityCount } from '../data/locations';
import { useMetaTags } from '../hooks/useMetaTags';

export default function LocationsIndex() {
  useMetaTags({
    title: 'Street Teams Co Locations | Brand Ambassadors & Street Marketing Nationwide',
    description: `Street Teams Co provides professional brand ambassadors and street marketing teams in ${locations.length} states and ${getTotalCityCount()}+ cities across the United States. Find street marketing services near you.`,
    canonical: 'https://streetteamsco.com/locations',
  });

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <h1>Street Marketing Teams Nationwide</h1>
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
