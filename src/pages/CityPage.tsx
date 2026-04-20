import { useParams, Link } from 'react-router-dom';
import { getCityBySlug } from '../data/locations';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

export default function CityPage() {
  const { state: stateSlug, city: citySlug } = useParams<{ state: string; city: string }>();
  const result = stateSlug && citySlug ? getCityBySlug(stateSlug, citySlug) : undefined;

  const canonicalUrl = result
    ? `https://streetteamsco.com/locations/${result.state.slug}/${result.city.slug}`
    : undefined;

  useMetaTags({
    title: result
      ? `Street Teams in ${result.city.name}, ${result.state.abbreviation} | Brand Ambassadors & Event Staff | Street Teams Co`
      : 'Location Not Found | Street Teams Co',
    description: result
      ? `Hire professional street teams and brand ambassadors in ${result.city.name}, ${result.state.abbreviation}. Event staffing, product sampling, and guerrilla marketing campaigns. Get a free quote.`
      : 'Location not found.',
    canonical: canonicalUrl,
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: result ? [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `Street Teams Co - ${result.city.name}`,
        'description': `Professional street team marketing and brand ambassador services in ${result.city.name}, ${result.state.name}.`,
        'url': canonicalUrl,
        'areaServed': {
          '@type': 'City',
          'name': result.city.name,
          'containedInPlace': {
            '@type': 'State',
            'name': result.state.name,
          },
        },
        'parentOrganization': {
          '@type': 'Organization',
          'name': 'Street Teams Co',
          'url': 'https://streetteamsco.com',
        },
        'serviceType': [
          'Street Team Marketing',
          'Brand Ambassador Services',
          'Event Staffing',
          'Product Sampling',
          'Guerrilla Marketing',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Locations', 'item': 'https://streetteamsco.com/locations' },
          { '@type': 'ListItem', 'position': 3, 'name': result.state.name, 'item': `https://streetteamsco.com/locations/${result.state.slug}` },
          { '@type': 'ListItem', 'position': 4, 'name': result.city.name, 'item': canonicalUrl },
        ],
      },
    ] : undefined,
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
              Street Teams Co is one of {city.name}'s leading street team marketing and brand activation agencies.
              Our professional brand ambassadors are local to the {city.name} area and deliver high-impact,
              measurable results for your marketing campaigns across {state.name}.
            </p>

            <div className="services-list">
              <h3>Our Services in {city.name}</h3>
              <div className="services-grid">
                <div className="service-card">
                  <h4><Link to="/services/street-teams">Street Activations</Link></h4>
                  <p>High-traffic guerrilla marketing campaigns in {city.name}'s busiest areas to generate buzz and brand awareness.</p>
                </div>
                <div className="service-card">
                  <h4><Link to="/services/brand-ambassadors">Brand Ambassadors</Link></h4>
                  <p>Professional, trained teams in {city.name} who represent your brand with enthusiasm and expertise.</p>
                </div>
                <div className="service-card">
                  <h4><Link to="/services/event-staffing">Event Staffing</Link></h4>
                  <p>Experienced event staff for trade shows, festivals, conferences, and special events in {city.name}, {state.abbreviation}.</p>
                </div>
                <div className="service-card">
                  <h4><Link to="/services/product-sampling">Product Sampling</Link></h4>
                  <p>Direct-to-consumer product distribution and sampling campaigns throughout {city.name}.</p>
                </div>
              </div>
            </div>

            <div className="city-faq">
              <h3>Frequently Asked Questions About Street Teams in {city.name}</h3>
              <div className="faq-list">
                <details>
                  <summary>How much does a street team cost in {city.name}?</summary>
                  <p>Street team costs in {city.name} typically range from $25-$75 per hour per brand ambassador, depending on campaign requirements and team size. Contact us for a custom quote for your {city.name} campaign.</p>
                </details>
                <details>
                  <summary>How quickly can you deploy a street team in {city.name}?</summary>
                  <p>We can typically deploy a professional street team in {city.name} within 5-7 business days. For rush campaigns, we offer expedited timelines in {city.name}, {state.abbreviation}.</p>
                </details>
                <details>
                  <summary>What types of campaigns do you run in {city.name}?</summary>
                  <p>In {city.name}, we run brand activations, product sampling, event staffing, guerrilla marketing, flyering campaigns, LED truck advertising, and promotional events. Our {city.name} team is experienced across all campaign types.</p>
                </details>
              </div>
            </div>

            <div className="city-cta">
              <h3>Ready to Launch a Campaign in {city.name}?</h3>
              <p>
                Contact us today to discuss how Street Teams Co can amplify your brand in {city.name}, {state.name}.
              </p>
              <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
                View Pricing
              </Link>
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
