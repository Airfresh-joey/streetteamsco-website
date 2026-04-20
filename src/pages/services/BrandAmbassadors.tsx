import { Link } from 'react-router-dom';
import { useMetaTags } from '../../hooks/useMetaTags';
import Layout from '../../components/Layout';

export default function BrandAmbassadorsService() {
  useMetaTags({
    title: 'Brand Ambassador Services | Professional Event & Promotional Staff | Street Teams Co',
    description: 'Hire professional brand ambassadors nationwide. Trained promotional staff for events, trade shows, product launches, and in-store demos. From $25/hr in 1,000+ cities.',
    canonical: 'https://streetteamsco.com/services/brand-ambassadors',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Brand Ambassador Services',
      'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
      'description': 'Professional brand ambassador services for events, trade shows, product launches, and promotional campaigns across the United States.',
      'areaServed': 'United States',
      'serviceType': 'Brand Ambassador Services',
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
            <span>Brand Ambassadors</span>
          </nav>
          <h1>Brand Ambassador Services</h1>
          <p className="service-hero-subtitle">
            Hire professional, trained brand ambassadors who represent your brand with energy, expertise, and measurable results.
          </p>
          <div className="hero-cta">
            <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <h2>What Are Brand Ambassadors?</h2>
          <p>
            Brand ambassadors are professional promotional staff who represent your brand at events, in retail
            environments, and in public spaces. They serve as the human face of your marketing campaign — engaging
            consumers, demonstrating products, answering questions, and driving conversions through personal connection.
          </p>
          <p>
            Street Teams Co maintains a vetted network of brand ambassadors across 1,000+ US cities.
            Every ambassador undergoes background checks, interview screening, and campaign-specific training
            before deployment. We match ambassadors to your brand's demographics, energy level, and technical requirements.
          </p>

          <h3>Brand Ambassador Campaign Types</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>Trade Show & Conference Staff</h4>
              <p>Professional booth staff who can articulate your product's value proposition, conduct live demonstrations, qualify leads, and represent your brand to enterprise decision-makers.</p>
            </div>
            <div className="service-card">
              <h4>In-Store Demos & Sampling</h4>
              <p>Experienced retail ambassadors for product demonstrations, tastings, and sampling at grocery stores, big-box retailers, and specialty shops.</p>
            </div>
            <div className="service-card">
              <h4>Event & Festival Staff</h4>
              <p>Energetic brand representatives for music festivals, sporting events, food fairs, and community events. Trained for high-volume consumer engagement.</p>
            </div>
            <div className="service-card">
              <h4>Product Launch Teams</h4>
              <p>Dedicated teams for new product introductions, grand openings, and launch events. We create buzz through direct consumer interaction and social amplification.</p>
            </div>
          </div>

          <h3>Our Brand Ambassador Process</h3>
          <ol className="service-list">
            <li><strong>Discovery Call</strong> — We learn your brand, audience, campaign goals, and success metrics</li>
            <li><strong>Team Curation</strong> — We select ambassadors from our network who match your brand's profile and energy</li>
            <li><strong>Custom Training</strong> — Every ambassador receives product training, messaging guides, and role-play practice</li>
            <li><strong>Campaign Execution</strong> — GPS-tracked deployment with real-time field supervision and quality checks</li>
            <li><strong>Performance Reporting</strong> — Daily summaries and a comprehensive post-campaign report with ROI analysis</li>
          </ol>

          <h3>Brand Ambassador Rates</h3>
          <p>
            Brand ambassador rates start at $25/hour for standard promotional staff and range up to $75+/hour
            for specialized roles (bilingual, technical product knowledge, licensed bartenders).
            <Link to="/pricing"> View our complete pricing guide</Link> for detailed rate cards by campaign type.
          </p>

          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <details>
              <summary>How do you recruit and vet brand ambassadors?</summary>
              <p>Every brand ambassador in our network passes a multi-step vetting process: application review, video interview, reference check, and background screening. We maintain quality standards by collecting client ratings after every campaign and removing ambassadors who fall below our threshold.</p>
            </details>
            <details>
              <summary>Can ambassadors learn technical products?</summary>
              <p>Yes. We regularly staff for B2B SaaS companies, medical devices, financial services, and other technical verticals. We provide comprehensive product training and can assign ambassadors with relevant industry backgrounds.</p>
            </details>
            <details>
              <summary>What's the minimum team size?</summary>
              <p>We can deploy as few as 2 brand ambassadors for smaller activations. For large-scale campaigns, we regularly staff teams of 20-50+ across multiple cities simultaneously.</p>
            </details>
            <details>
              <summary>Do you provide uniforms and materials?</summary>
              <p>We work with your existing branded materials, or we can source branded apparel and collateral for your campaign. Uniform and material costs are quoted separately from staffing rates.</p>
            </details>
          </div>

          <div className="city-cta">
            <h3>Hire Brand Ambassadors for Your Next Campaign</h3>
            <p>Tell us about your campaign and we'll build a custom team proposal within 24 hours.</p>
            <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">Get Free Quote</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
