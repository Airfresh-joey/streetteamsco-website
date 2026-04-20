import { Link } from 'react-router-dom';
import { useMetaTags } from '../../hooks/useMetaTags';
import Layout from '../../components/Layout';

export default function ProductSamplingService() {
  useMetaTags({
    title: 'Product Sampling Agency | In-Store & Street Sampling Campaigns | Street Teams Co',
    description: 'Professional product sampling campaigns in 1,000+ US cities. In-store demos, street sampling, and direct-to-consumer distribution with trained sampling staff.',
    canonical: 'https://streetteamsco.com/services/product-sampling',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Product Sampling',
      'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
      'description': 'Professional product sampling and in-store demonstration services. Direct-to-consumer distribution campaigns that drive trial and conversion.',
      'areaServed': 'United States',
      'serviceType': 'Product Sampling',
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
            <span>Product Sampling</span>
          </nav>
          <h1>Product Sampling Services</h1>
          <p className="service-hero-subtitle">
            Put your product directly into consumers' hands with professional sampling campaigns in 1,000+ cities.
          </p>
          <div className="hero-cta">
            <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <h2>Why Product Sampling Works</h2>
          <p>
            Product sampling remains one of the highest-converting marketing tactics available. Industry data
            shows that 73% of consumers who try a free sample are more likely to purchase the product.
            Street Teams Co designs and executes sampling campaigns that put your product in the right hands,
            in the right locations, at the right time.
          </p>

          <h3>Sampling Campaign Types</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>In-Store Sampling</h4>
              <p>Trained demo staff in grocery stores, big-box retailers, and specialty shops. We manage retailer relationships, permitting, and compliance.</p>
            </div>
            <div className="service-card">
              <h4>Street Sampling</h4>
              <p>Direct distribution in high-foot-traffic areas: transit hubs, shopping districts, college campuses, and entertainment venues.</p>
            </div>
            <div className="service-card">
              <h4>Event Sampling</h4>
              <p>Product distribution at festivals, sporting events, community gatherings, and trade shows where your target audience is concentrated.</p>
            </div>
            <div className="service-card">
              <h4>Office & Gym Drops</h4>
              <p>Targeted sampling at corporate offices, coworking spaces, gyms, and wellness studios. Ideal for health, beverage, and snack brands.</p>
            </div>
          </div>

          <h3>Industries We Serve</h3>
          <ul className="service-list">
            <li><strong>Food & Beverage</strong> — Tastings, product trials, and recipe demonstrations at retail and events</li>
            <li><strong>Health & Wellness</strong> — Supplement, skincare, and personal care product sampling</li>
            <li><strong>Cannabis & CBD</strong> — Compliant sampling programs for dispensaries and cannabis events</li>
            <li><strong>Consumer Packaged Goods</strong> — Multi-market sampling programs for national product launches</li>
            <li><strong>Technology</strong> — Hands-on product demos for consumer electronics and apps</li>
          </ul>

          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <details>
              <summary>How many samples can a team distribute per day?</summary>
              <p>A team of 4 sampling staff can typically distribute 1,000-3,000 samples per day in a high-traffic location. Exact numbers depend on product type, location, and consumer engagement approach.</p>
            </details>
            <details>
              <summary>Do you handle product logistics?</summary>
              <p>Yes. We coordinate product shipping to activation sites, manage cold chain requirements for perishable items, and handle post-event product return or disposal.</p>
            </details>
            <details>
              <summary>Can you track sample-to-purchase conversion?</summary>
              <p>We implement multiple tracking methods: unique coupon codes, QR code scans, consumer email captures, and retail sales lift analysis. Post-campaign reports include conversion metrics.</p>
            </details>
          </div>

          <div className="city-cta">
            <h3>Plan a Sampling Campaign</h3>
            <p>Get a custom sampling strategy for your product, market, and budget.</p>
            <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">Get Free Quote</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
