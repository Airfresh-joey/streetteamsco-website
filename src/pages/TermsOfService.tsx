import { useMetaTags } from '../hooks/useMetaTags';

export default function TermsOfService() {
  useMetaTags({
    title: 'Terms of Service | Street Teams Co',
    description: 'Street Teams Co terms of service. Read our terms and conditions for using our website and engaging our street marketing services.',
    canonical: 'https://streetteamsco.com/terms',
  });

  return (
    <div className="legal-page">
      <section className="service-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="service-hero-subtitle">Last updated: April 20, 2026</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container legal-content">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Street Teams Co website (streetteamsco.com) or engaging our services, you agree
            to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
          </p>

          <h2>Services Description</h2>
          <p>
            Street Teams Co provides experiential marketing services including but not limited to: brand ambassador
            staffing, street team deployment, event staffing, product sampling, guerrilla marketing, and related
            promotional services. Specific services, deliverables, and pricing are outlined in individual Statements
            of Work (SOW) or service agreements.
          </p>

          <h2>Booking and Payment</h2>
          <ul>
            <li><strong>Quotes:</strong> All quotes are valid for 30 days from the date of issue unless otherwise stated.</li>
            <li><strong>Deposits:</strong> A 50% deposit is required to confirm booking. The remaining balance is due upon campaign completion.</li>
            <li><strong>Payment Methods:</strong> We accept bank transfer, credit card, and check payments.</li>
            <li><strong>Late Payments:</strong> Invoices not paid within agreed terms may incur a late fee of 1.5% per month.</li>
          </ul>

          <h2>Cancellation Policy</h2>
          <ul>
            <li>Cancellations made 14+ days before the campaign: full refund of deposit.</li>
            <li>Cancellations made 7-13 days before: 50% of deposit refunded.</li>
            <li>Cancellations made less than 7 days before: deposit is non-refundable.</li>
            <li>Rescheduling requests are accommodated when possible at no additional charge.</li>
          </ul>

          <h2>Client Responsibilities</h2>
          <p>Clients are responsible for:</p>
          <ul>
            <li>Providing accurate campaign briefs and brand guidelines</li>
            <li>Supplying necessary promotional materials and product samples in a timely manner</li>
            <li>Obtaining any required permits, licenses, or permissions for campaign locations</li>
            <li>Communicating any changes to campaign requirements promptly</li>
            <li>Ensuring all promotional claims and materials comply with applicable laws</li>
          </ul>

          <h2>Our Responsibilities</h2>
          <p>Street Teams Co will:</p>
          <ul>
            <li>Provide professional, trained staff as specified in the service agreement</li>
            <li>Manage campaign logistics and field operations</li>
            <li>Deliver post-campaign reporting as outlined in the agreement</li>
            <li>Maintain appropriate insurance coverage for our staff and operations</li>
            <li>Comply with all applicable labor laws and regulations</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            Client retains all rights to their brand materials, logos, and campaign assets. Street Teams Co retains
            the right to use campaign photos and results in our portfolio and marketing materials unless otherwise
            agreed in writing. All website content, including text, graphics, and code, is the property of Street Teams Co.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Street Teams Co shall not be liable for indirect, incidental, special, or consequential damages arising
            from our services. Our total liability shall not exceed the amount paid for the specific campaign or service
            in question. We are not liable for circumstances beyond our reasonable control, including but not limited to
            weather, venue cancellations, or government restrictions.
          </p>

          <h2>Indemnification</h2>
          <p>
            Clients agree to indemnify and hold harmless Street Teams Co from any claims, damages, or expenses arising
            from the client's products, promotional materials, or campaign content that we are directed to distribute.
          </p>

          <h2>Website Use</h2>
          <ul>
            <li>You may use our website for lawful purposes only.</li>
            <li>You may not reproduce, distribute, or modify website content without our written permission.</li>
            <li>We reserve the right to modify or discontinue any part of our website at any time.</li>
          </ul>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California. Any disputes shall be resolved in the
            courts of Los Angeles County, California.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued use of our website or services after
            changes constitutes acceptance of the updated Terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions about these Terms of Service, contact us at:{' '}
            <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
