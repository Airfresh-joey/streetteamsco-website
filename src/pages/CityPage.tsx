import { useParams, Link } from 'react-router-dom';
import { getCityBySlug } from '../data/locations';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

export default function CityPage() {
  const { state: stateSlug, city: citySlug } = useParams<{ state: string; city: string }>();
  const result = stateSlug && citySlug ? getCityBySlug(stateSlug, citySlug) : undefined;

  useMetaTags({
    title: result
      ? `Street Teams in ${result.city.name}, ${result.state.abbreviation} | Brand Ambassadors | Street Teams Co`
      : 'Location Not Found | Street Teams Co',
    description: result
      ? `Hire professional brand ambassadors and street marketing teams in ${result.city.name}, ${result.state.name}. Street Teams Co provides event staffing, product sampling, and guerrilla marketing campaigns in ${result.city.name}, ${result.state.abbreviation}.`
      : 'Location not found.',
    canonical: result
      ? `https://streetteamsco.com/locations/${result.state.slug}/${result.city.slug}`
      : undefined,
  });

  if (!result) return <NotFound />;

  const { state, city } = result;

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/locations">All Locations</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to={`/locations/${state.slug}`}>{state.name}</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{city.name}</span>
          </nav>
          <h1>Street Teams in {city.name}, {state.abbreviation}</h1>
          <p className="locations-hero-subtitle">
            Professional brand ambassadors and street marketing in {city.name}
          </p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="city-detail">
            <h2>Street Marketing Services in {city.name}, {state.name}</h2>
            <p>
              Street Teams Co provides full-service street marketing and brand activation campaigns in {city.name}, {state.abbreviation}.
              Our professional brand ambassadors are local to the {city.name} area and deliver high-impact,
              measurable results for your marketing campaigns.
            </p>

            <div className="services-list">
              <h3>Our Services in {city.name}</h3>
              <div className="services-grid">
                <div className="service-card">
                  <h4>Street Activations</h4>
                  <p>High-traffic guerrilla marketing campaigns in {city.name}'s busiest areas to generate buzz and brand awareness.</p>
                </div>
                <div className="service-card">
                  <h4>Brand Ambassadors</h4>
                  <p>Professional, trained teams in {city.name} who represent your brand with enthusiasm and expertise.</p>
                </div>
                <div className="service-card">
                  <h4>Event Staffing</h4>
                  <p>Experienced event staff for trade shows, festivals, conferences, and special events in {city.name}, {state.abbreviation}.</p>
                </div>
                <div className="service-card">
                  <h4>Product Sampling</h4>
                  <p>Direct-to-consumer product distribution and sampling campaigns throughout {city.name}.</p>
                </div>
              </div>
            </div>

            <div className="city-cta">
              <h3>Ready to Launch a Campaign in {city.name}?</h3>
              <p>
                Contact us today to discuss how Street Teams Co can amplify your brand in {city.name}, {state.name}.
              </p>
              <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">
                Get a Quote for {city.name}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
