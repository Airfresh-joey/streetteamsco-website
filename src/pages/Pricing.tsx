import { useMetaTags } from '../hooks/useMetaTags';
import CostCalculator from '../components/CostCalculator';

export default function Pricing() {
  useMetaTags({
    title: 'Street Team Pricing 2026 | Brand Ambassadors from $25/hr | Street Teams Co',
    description: 'Street team marketing pricing: brand ambassadors from $25/hr, event staffing from $30/hr. Volume discounts available. No long-term contracts. 500+ campaigns, 94% client retention. Get a free custom quote.',
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
          {
            '@type': 'Question',
            'name': 'Do you offer volume discounts for large campaigns?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. We offer 10% off for 10+ staff bookings, 15% off for 20+ staff, and custom enterprise pricing for 50+ staff deployments or monthly retainer programs.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is included in campaign pricing?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'All campaigns include: campaign strategy, staff recruitment and training, field management, real-time GPS tracking, daily photo reports, and a comprehensive post-campaign report with ROI analysis.',
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Street Team Marketing Services',
        'provider': {
          '@type': 'Organization',
          'name': 'Street Teams Co',
          'url': 'https://streetteamsco.com',
        },
        'serviceType': 'Street Team Marketing',
        'areaServed': { '@type': 'Country', 'name': 'United States' },
        'priceRange': '$25-$75/hr',
      },
    ],
  });

  return (
    <>
      <section className="locations-hero">
        <div className="container">
          <h1>Street Team Marketing Pricing</h1>
          <p className="locations-hero-subtitle">
            Transparent pricing for brand ambassadors, street teams, event staffing, and guerrilla marketing campaigns.
            No hidden fees. No long-term contracts.
          </p>
        </div>
      </section>

      <section className="locations-content">
        <div className="container">
          <CostCalculator />

          <div style={{ marginTop: '4rem' }}>
            <h2>What's Included in Every Campaign</h2>
            <ul className="service-list">
              <li><strong>Campaign Strategy</strong> — Custom planning based on your goals, audience, and market</li>
              <li><strong>Staff Recruitment & Training</strong> — Vetted, background-checked staff with product-specific training</li>
              <li><strong>Field Management</strong> — On-site supervision and quality assurance</li>
              <li><strong>Real-Time Tracking</strong> — GPS tracking and daily field reports</li>
              <li><strong>Post-Campaign Report</strong> — Comprehensive recap with interaction counts, photos, and ROI analysis</li>
              <li><strong>Branded Uniforms</strong> — Custom-branded attire for your street team (design included)</li>
              <li><strong>Liability Insurance</strong> — Full coverage for all on-site activations</li>
            </ul>
          </div>

          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <details>
              <summary>How much does street team marketing cost?</summary>
              <p>Street team marketing costs typically range from $25-$75 per hour per brand ambassador, depending on the role and market. A full-day street team deployment (6-8 hours, 4-8 team members) averages $3,000-$8,000 in most markets. Monthly retainer programs start at $10,000.</p>
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
            <details>
              <summary>Do you offer volume discounts for large campaigns?</summary>
              <p>Yes. We offer 10% off for 10+ staff bookings, 15% off for 20+ staff, and custom enterprise pricing for 50+ staff deployments. Monthly retainer programs receive up to 20% off standard rates.</p>
            </details>
            <details>
              <summary>What is included in your campaign pricing?</summary>
              <p>All campaigns include campaign strategy, staff recruitment and training, field management, real-time GPS tracking, branded uniforms, daily photo reports, liability insurance, and a comprehensive post-campaign report with ROI analysis. Product costs and permits are quoted separately.</p>
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
