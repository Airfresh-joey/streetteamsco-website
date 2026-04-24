import { useMetaTags } from '../hooks/useMetaTags';

export default function Pricing() {
  useMetaTags({
    title: 'Street Team Pricing 2026 | Brand Ambassadors from $25/hr | Street Teams Co',
    description: 'Street team marketing pricing: brand ambassadors from $25/hr, event staffing from $30/hr. No long-term contracts. 500+ campaigns, 94% client retention. Get a free custom quote.',
    canonical: 'https://streetteamsco.com/pricing',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Pricing', 'item': 'https://streetteamsco.com/pricing' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How much does street team marketing cost?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Street team marketing costs typically range from $25-$75 per hour per brand ambassador. A full-day team deployment averages $3,000-$8,000 depending on team size and market.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How much do brand ambassadors cost per hour?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Brand ambassador rates start at $25/hour for standard promotional staff and range up to $75+/hour for specialized roles like bilingual staff, licensed bartenders, or technical product demonstrators.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How much does event staffing cost?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Event staffing rates range from $25-$75 per hour per staff member depending on role, location, and event type. Most clients spend $2,000-$15,000 per event.',
            },
          },
        ],
      },
    ],
  });

  return (
    <>
      <section className="service-hero">
        <div className="container">
          <h1>Street Team Marketing Pricing</h1>
          <p className="service-hero-subtitle">
            Transparent pricing for brand ambassadors, street teams, event staffing, and guerrilla marketing campaigns.
          </p>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <h2>Brand Ambassador & Staff Rates</h2>
          <p>
            All rates are per person, per hour. Minimum booking is 2 staff for a 4-hour shift.
            Rates vary by market — major metros (NYC, LA, Chicago, Miami) may carry a 10-20% premium.
          </p>

          <div className="pricing-table-wrapper">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Staff Role</th>
                  <th>Hourly Rate</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Brand Ambassadors</strong></td>
                  <td>$25 - $45/hr</td>
                  <td>Street activations, flyering, product sampling, event support</td>
                </tr>
                <tr>
                  <td><strong>Product Demonstrators</strong></td>
                  <td>$35 - $55/hr</td>
                  <td>In-store demos, trade show booths, tech product showcases</td>
                </tr>
                <tr>
                  <td><strong>Booth Staff</strong></td>
                  <td>$30 - $50/hr</td>
                  <td>Trade shows, expos, conferences, lead qualification</td>
                </tr>
                <tr>
                  <td><strong>Hosts & Greeters</strong></td>
                  <td>$25 - $40/hr</td>
                  <td>Registration, check-in, VIP areas, corporate events</td>
                </tr>
                <tr>
                  <td><strong>Promotional Models</strong></td>
                  <td>$40 - $75/hr</td>
                  <td>Photo activations, brand visibility, consumer engagement</td>
                </tr>
                <tr>
                  <td><strong>Bilingual Staff</strong></td>
                  <td>$35 - $60/hr</td>
                  <td>Spanish, Mandarin, and other language campaigns</td>
                </tr>
                <tr>
                  <td><strong>Licensed Bartenders</strong></td>
                  <td>$40 - $65/hr</td>
                  <td>Events with alcohol service, brand tastings</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Campaign Package Estimates</h2>
          <p>
            These are typical all-in costs for common campaign types. Final pricing depends on team size,
            duration, market, and specific requirements.
          </p>

          <div className="services-grid">
            <div className="service-card pricing-card">
              <h3>Street Team Day</h3>
              <p className="pricing-range">$2,000 - $5,000</p>
              <ul>
                <li>4-8 brand ambassadors</li>
                <li>6-8 hour deployment</li>
                <li>Single market/city</li>
                <li>Campaign management</li>
                <li>Daily photo report</li>
              </ul>
              <p className="pricing-note">Ideal for product launches, grand openings, one-day promotions</p>
            </div>
            <div className="service-card pricing-card">
              <h3>Weekly Campaign</h3>
              <p className="pricing-range">$8,000 - $20,000</p>
              <ul>
                <li>4-10 brand ambassadors</li>
                <li>5-7 days of activations</li>
                <li>1-3 markets</li>
                <li>Dedicated campaign manager</li>
                <li>Comprehensive reporting</li>
              </ul>
              <p className="pricing-note">Best for brand launches, market entries, sustained awareness</p>
            </div>
            <div className="service-card pricing-card">
              <h3>Monthly Program</h3>
              <p className="pricing-range">$15,000 - $50,000+</p>
              <ul>
                <li>Ongoing team deployment</li>
                <li>Multi-city campaigns</li>
                <li>Multiple activation types</li>
                <li>Account manager assigned</li>
                <li>Monthly ROI reporting</li>
              </ul>
              <p className="pricing-note">For ongoing brand presence, national campaigns, retainer programs</p>
            </div>
          </div>

          <h2>Guerrilla Marketing Add-Ons</h2>
          <div className="pricing-table-wrapper">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Starting Price</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>LED Truck Advertising</strong></td>
                  <td>$1,500/day</td>
                  <td>Mobile digital billboard, GPS-tracked route, 8-10 hour circuit</td>
                </tr>
                <tr>
                  <td><strong>Wild Posting</strong></td>
                  <td>$3,000/campaign</td>
                  <td>50-100 poster placements in a single market, 4-week display</td>
                </tr>
                <tr>
                  <td><strong>Product Sampling Setup</strong></td>
                  <td>$500/location</td>
                  <td>Branded display, coolers/fixtures, setup and teardown</td>
                </tr>
                <tr>
                  <td><strong>Campaign Photography</strong></td>
                  <td>$800/day</td>
                  <td>Professional photographer documenting activations for your brand assets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>What's Included in Every Campaign</h2>
          <ul className="service-list">
            <li><strong>Campaign Strategy</strong> — Custom planning based on your goals, audience, and market</li>
            <li><strong>Staff Recruitment & Training</strong> — Vetted, background-checked staff with product-specific training</li>
            <li><strong>Field Management</strong> — On-site supervision and quality assurance</li>
            <li><strong>Real-Time Tracking</strong> — GPS tracking and daily field reports</li>
            <li><strong>Post-Campaign Report</strong> — Comprehensive recap with interaction counts, photos, and ROI analysis</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <details>
              <summary>How much does street team marketing cost?</summary>
              <p>Street team marketing costs typically range from $25-$75 per hour per brand ambassador, depending on the role and market. A full-day street team deployment (6-8 hours, 4-8 team members) averages $3,000-$8,000 in most markets. Monthly retainer programs start at $15,000.</p>
            </details>
            <details>
              <summary>Do you require long-term contracts?</summary>
              <p>No. We offer single-event booking, weekly campaigns, and monthly retainers. There are no long-term contracts required. Book what you need, when you need it.</p>
            </details>
            <details>
              <summary>Are travel costs included?</summary>
              <p>In-market staff rates include local travel. For campaigns requiring staff to travel to your market (smaller cities or specialized roles), travel, accommodation, and per diem are quoted separately.</p>
            </details>
            <details>
              <summary>What payment terms do you offer?</summary>
              <p>Standard terms are 50% deposit to confirm booking, 50% due on campaign completion. Net-30 terms are available for established clients and large programs.</p>
            </details>
            <details>
              <summary>How does pricing compare to hiring in-house?</summary>
              <p>Outsourcing to Street Teams Co eliminates recruiting costs, training time, payroll taxes, insurance, and management overhead. Most clients find our all-in cost is 30-50% less than building an equivalent in-house team, with the flexibility to scale up or down instantly.</p>
            </details>
          </div>

          <div className="city-cta">
            <h3>Get a Custom Quote</h3>
            <p>Every campaign is unique. Tell us about your goals and we'll provide a detailed proposal within 24 hours.</p>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">Get Free Quote</a>
          </div>
        </div>
      </section>
    </>
  );
}
