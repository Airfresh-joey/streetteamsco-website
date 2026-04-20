import { Link } from 'react-router-dom';
import { useMetaTags } from '../../hooks/useMetaTags';
import Layout from '../../components/Layout';

export default function StreetTeamsService() {
  useMetaTags({
    title: 'Street Team Marketing Services | Nationwide Street Activations | Street Teams Co',
    description: 'Professional street team marketing services in 1,000+ US cities. Boots-on-the-ground brand activations, flyering, and consumer engagement campaigns with measurable ROI.',
    canonical: 'https://streetteamsco.com/services/street-teams',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Street Team Marketing',
      'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
      'description': 'Street team marketing is a form of experiential marketing in which a team of brand ambassadors is deployed in public spaces to engage consumers directly through sampling, demonstrations, flyering, or brand activations.',
      'areaServed': 'United States',
      'serviceType': 'Street Team Marketing',
    },
  });

  return (
    <Layout>
      <section className="service-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Services</span>
            <span className="breadcrumb-sep">/</span>
            <span>Street Teams</span>
          </nav>
          <h1>Street Team Marketing Services</h1>
          <p className="service-hero-subtitle">
            Deploy professional street teams in 1,000+ cities nationwide for high-impact, boots-on-the-ground marketing campaigns.
          </p>
          <div className="hero-cta">
            <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <h2>What Is Street Team Marketing?</h2>
          <p>
            Street team marketing is a form of experiential marketing in which a team of trained brand ambassadors
            is deployed in high-traffic public spaces to engage consumers directly. Unlike digital advertising,
            street teams create real, face-to-face interactions that build trust and drive immediate action.
          </p>
          <p>
            According to industry research, experiential marketing campaigns generate up to 3x higher engagement
            rates than traditional digital advertising. Street Teams Co has executed over 500 campaigns in more
            than 50 cities, consistently delivering measurable results for brands across every industry.
          </p>

          <h3>How Our Street Teams Work</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>Campaign Planning</h4>
              <p>We design custom street team strategies based on your target audience, campaign goals, and market. Every campaign includes location scouting, messaging development, and performance benchmarks.</p>
            </div>
            <div className="service-card">
              <h4>Team Recruitment & Training</h4>
              <p>We recruit local brand ambassadors in your target market who match your brand's demographics and energy. Every team member receives comprehensive training on your product, messaging, and engagement techniques.</p>
            </div>
            <div className="service-card">
              <h4>Field Deployment</h4>
              <p>Our teams deploy to high-traffic locations including shopping districts, transit hubs, entertainment areas, college campuses, and event venues. GPS-tracked with real-time reporting.</p>
            </div>
            <div className="service-card">
              <h4>Reporting & Analytics</h4>
              <p>Every campaign includes daily field reports, photo/video documentation, consumer interaction counts, sample distribution tracking, and a comprehensive post-campaign ROI analysis.</p>
            </div>
          </div>

          <h3>Types of Street Team Campaigns</h3>
          <ul className="service-list">
            <li><strong>Flyering & Leaflet Distribution</strong> — Targeted distribution of branded materials in high-foot-traffic areas</li>
            <li><strong>Product Sampling</strong> — Hands-on product experiences that convert consumers on the spot</li>
            <li><strong>Brand Activations</strong> — Interactive pop-up experiences that generate social buzz</li>
            <li><strong>Street Canvassing</strong> — Door-to-door or person-to-person outreach for lead generation</li>
            <li><strong>Mobile Billboard & LED Trucks</strong> — Moving brand displays through target neighborhoods</li>
            <li><strong>Sign Spinning & Directional</strong> — High-visibility signage driving foot traffic to retail locations</li>
          </ul>

          <h3>Why Choose Street Teams Co?</h3>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Campaigns Executed</div>
            </div>
            <div className="stat">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Impressions Generated</div>
            </div>
            <div className="stat">
              <div className="stat-number">94%</div>
              <div className="stat-label">Client Retention Rate</div>
            </div>
          </div>

          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <details>
              <summary>How much does street team marketing cost?</summary>
              <p>Street team marketing costs vary based on team size, campaign duration, and market. Brand ambassadors typically range from $25-$75/hour. A full-day street team deployment (6-8 hours, 4-8 team members) in a major market averages $3,000-$8,000. <Link to="/pricing">See our full pricing guide</Link>.</p>
            </details>
            <details>
              <summary>What cities do you operate in?</summary>
              <p>Street Teams Co operates in over 1,000 cities across all 50 US states. Our largest markets include <Link to="/locations/california/los-angeles">Los Angeles</Link>, <Link to="/locations/new-york/new-york-city">New York City</Link>, <Link to="/locations/illinois/chicago">Chicago</Link>, <Link to="/locations/florida/miami">Miami</Link>, and <Link to="/locations/texas/dallas">Dallas</Link>. <Link to="/locations">View all locations</Link>.</p>
            </details>
            <details>
              <summary>How quickly can you deploy a street team?</summary>
              <p>Standard deployment takes 5-7 business days from campaign approval. For rush campaigns in major markets, we can deploy teams in as few as 48 hours with our expedited service.</p>
            </details>
            <details>
              <summary>How do you measure street team campaign ROI?</summary>
              <p>We track consumer interactions, sample distributions, lead captures, QR code scans, coupon redemptions, and foot traffic lift. Every campaign includes a post-campaign ROI report with cost-per-interaction and conversion metrics.</p>
            </details>
          </div>

          <div className="city-cta">
            <h3>Ready to Launch a Street Team Campaign?</h3>
            <p>Get a free campaign strategy session with our team. We'll recommend the right approach for your brand, market, and budget.</p>
            <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">Get Free Quote</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
