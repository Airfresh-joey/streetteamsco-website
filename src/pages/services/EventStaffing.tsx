import { Link } from 'react-router-dom';
import { useMetaTags } from '../../hooks/useMetaTags';
import Layout from '../../components/Layout';

export default function EventStaffingService() {
  useMetaTags({
    title: 'Event Staffing Services | Trade Shows, Festivals & Conferences | Street Teams Co',
    description: 'Professional event staffing for trade shows, conferences, festivals, and corporate events. Experienced staff from $25/hr in 1,000+ US cities. Get a free quote.',
    canonical: 'https://streetteamsco.com/services/event-staffing',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Event Staffing',
      'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
      'description': 'Professional event staffing services for trade shows, conferences, festivals, and corporate events across the United States.',
      'areaServed': 'United States',
      'serviceType': 'Event Staffing',
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
            <span>Event Staffing</span>
          </nav>
          <h1>Event Staffing Services</h1>
          <p className="service-hero-subtitle">
            Experienced, professional event staff for trade shows, conferences, festivals, and corporate events in 1,000+ cities.
          </p>
          <div className="hero-cta">
            <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <h2>Professional Event Staff Nationwide</h2>
          <p>
            Street Teams Co provides trained, professional event staff for every type of event — from intimate
            corporate gatherings to large-scale music festivals with tens of thousands of attendees. Our event
            staffing network spans 1,000+ cities, so we can staff your events wherever they happen.
          </p>

          <h3>Event Types We Staff</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>Trade Shows & Expos</h4>
              <p>Booth staff, lead scanners, product demonstrators, and hospitality professionals for major trade shows and industry expos nationwide.</p>
            </div>
            <div className="service-card">
              <h4>Conferences & Conventions</h4>
              <p>Registration desk staff, room monitors, session facilitators, VIP hosts, and general conference support staff.</p>
            </div>
            <div className="service-card">
              <h4>Festivals & Outdoor Events</h4>
              <p>Brand activation teams, sampling staff, wayfinding assistants, and promotional crews for music festivals, food events, and outdoor activations.</p>
            </div>
            <div className="service-card">
              <h4>Corporate Events</h4>
              <p>Professional hosts, registration staff, AV support, and event coordinators for product launches, galas, holiday parties, and executive events.</p>
            </div>
          </div>

          <h3>Staff Roles Available</h3>
          <ul className="service-list">
            <li><strong>Brand Ambassadors</strong> — Engaging, on-brand promotional staff ($25-$45/hr)</li>
            <li><strong>Product Demonstrators</strong> — Trained on your product for live demos ($35-$55/hr)</li>
            <li><strong>Booth Staff</strong> — Trade show professionals who drive traffic and qualify leads ($30-$50/hr)</li>
            <li><strong>Hosts & Greeters</strong> — Professional first impressions for registration, check-in, VIP areas ($25-$40/hr)</li>
            <li><strong>Promotional Models</strong> — Photo-ready talent for brand visibility and consumer engagement ($40-$75/hr)</li>
            <li><strong>Bilingual Staff</strong> — Spanish, Mandarin, and other languages available ($35-$60/hr)</li>
            <li><strong>Licensed Bartenders</strong> — Certified bartenders for events with alcohol service ($40-$65/hr)</li>
          </ul>

          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <details>
              <summary>How much does event staffing cost?</summary>
              <p>Event staffing rates range from $25-$75 per hour depending on the role, location, and event requirements. Most clients spend between $2,000-$15,000 per event. <Link to="/pricing">See our complete pricing guide</Link>.</p>
            </details>
            <details>
              <summary>What's the minimum booking?</summary>
              <p>Minimum booking is 2 staff members for a 4-hour shift. There are no long-term contracts required — book for a single event or an ongoing series.</p>
            </details>
            <details>
              <summary>Can you staff multi-city events simultaneously?</summary>
              <p>Yes. We regularly staff national event tours, multi-city product launches, and simultaneous activations across 10+ markets. Our centralized management system ensures consistency across all locations.</p>
            </details>
            <details>
              <summary>How do you handle last-minute staffing requests?</summary>
              <p>We maintain backup staff in major markets for urgent requests. In most cities, we can fulfill rush orders with 48-72 hours notice. For same-day emergency staffing, availability varies by market.</p>
            </details>
          </div>

          <div className="city-cta">
            <h3>Staff Your Next Event</h3>
            <p>Tell us about your event and we'll provide a staffing plan and quote within 24 hours.</p>
            <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">Get Free Quote</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
