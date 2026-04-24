import { useParams, Link } from 'react-router-dom';
import { getStateBySlug } from '../data/locations';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

export default function StatePage() {
  const { state: stateSlug } = useParams<{ state: string }>();
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  useMetaTags({
    title: state
      ? `Street Teams in ${state.name} | ${state.cities.length} Cities | Brand Ambassadors from $25/hr`
      : 'Location Not Found | Street Teams Co',
    description: state
      ? `Street team marketing in ${state.cities.length} ${state.abbreviation} cities including ${state.cities.slice(0, 3).map(c => c.name).join(', ')}. Brand ambassadors, event staffing & product sampling. 94% client retention. Get a free quote.`
      : 'Location not found.',
    canonical: state ? `https://streetteamsco.com/locations/${state.slug}` : undefined,
    schema: state ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Locations', 'item': 'https://streetteamsco.com/locations' },
        { '@type': 'ListItem', 'position': 3, 'name': state.name, 'item': `https://streetteamsco.com/locations/${state.slug}` },
      ],
    } : undefined,
  });

  if (!state) return <NotFound />;

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/locations">All Locations</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{state.name}</span>
          </nav>
          <h1>Street Teams in {state.name}</h1>
          <p className="locations-hero-subtitle">
            Professional brand ambassadors and event staffing across {state.cities.length} cities in {state.abbreviation}
          </p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="locations-intro">
            <h2>Available Cities in {state.name}</h2>
            <p>
              Select a city below to learn more about our street marketing services and brand ambassador teams available in {state.name}.
            </p>
          </div>

          <div className="cities-grid">
            {state.cities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${state.slug}/${city.slug}`}
                className="city-card"
              >
                <h3>{city.name}</h3>
                {city.population && (
                  <span className="city-population">Pop. {city.population}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
