import { useParams, Link } from 'react-router-dom';
import { getIndustryBySlug } from '../data/industries';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

export default function IndustryPage() {
  const { industry: industrySlug } = useParams<{ industry: string }>();
  const industry = industrySlug ? getIndustryBySlug(industrySlug) : undefined;

  useMetaTags({
    title: industry
      ? `${industry.name} Street Team Marketing | Brand Ambassadors & Activations | Street Teams Co`
      : 'Industry Not Found | Street Teams Co',
    description: industry
      ? `${industry.name} street team marketing in 1,000+ cities. ${industry.description.slice(0, 100)} Get a free quote.`
      : 'Industry not found.',
    canonical: industry
      ? `https://streetteamsco.com/industries/${industry.slug}`
      : undefined,
    schema: industry ? [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Industries', 'item': 'https://streetteamsco.com/industries' },
          { '@type': 'ListItem', 'position': 3, 'name': industry.name, 'item': `https://streetteamsco.com/industries/${industry.slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': `${industry.name} Street Team Marketing`,
        'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
        'description': industry.description,
        'areaServed': 'United States',
        'url': `https://streetteamsco.com/industries/${industry.slug}`,
      },
    ] : undefined,
  });

  if (!industry) return <NotFound />;

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/industries">All Industries</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{industry.name}</span>
          </nav>
          <h1>{industry.name} Marketing</h1>
          <p className="locations-hero-subtitle">{industry.tagline}</p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <div className="industry-detail">
            <div className="service-detail-intro">
              <h2>Street Marketing for {industry.name}</h2>
              <p>{industry.description}</p>
            </div>

            <div className="service-detail-section">
              <h3>Industry Challenges We Solve</h3>
              <ul className="feature-list">
                {industry.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-section">
              <h3>Our {industry.name} Marketing Solutions</h3>
              <ul className="feature-list">
                {industry.solutions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-section">
              <h3>Recommended Services</h3>
              <div className="benefits-grid">
                {industry.services.map((s, i) => (
                  <div key={i} className="benefit-card">{s}</div>
                ))}
              </div>
            </div>

            <div className="service-detail-section">
              <h3>Case Study</h3>
              <div className="case-study-card">
                <h4>{industry.caseStudy.title}</h4>
                <p>{industry.caseStudy.result}</p>
              </div>
            </div>

            <div className="city-cta">
              <h3>Ready to Launch a {industry.name} Marketing Campaign?</h3>
              <p>Street Teams Co has the industry expertise and nationwide reach to deliver results for {industry.name.toLowerCase()} brands.</p>
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
