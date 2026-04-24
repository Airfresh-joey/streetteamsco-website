import { useMetaTags } from '../hooks/useMetaTags';

export default function PrivacyPolicy() {
  useMetaTags({
    title: 'Privacy Policy | Street Teams Co',
    description: 'Street Teams Co privacy policy. Learn how we collect, use, and protect your personal information.',
    canonical: 'https://streetteamsco.com/privacy',
    noindex: true,
  });

  return (
    <div className="legal-page">
      <section className="service-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="service-hero-subtitle">Last updated: April 20, 2026</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container legal-content">
          <h2>Introduction</h2>
          <p>
            Street Teams Co ("we," "our," or "us") respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website streetteamsco.com or engage our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, phone number, and company name when you submit a contact form or request a quote.</li>
            <li><strong>Campaign Details:</strong> Information about your marketing needs, event details, and campaign requirements.</li>
            <li><strong>Communication Records:</strong> Records of your correspondence with us via email or our contact form.</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and referring URLs.</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution.</li>
            <li><strong>Cookies and Tracking:</strong> We use Google Analytics to understand website usage patterns. See our Cookie section below.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide quotes</li>
            <li>To deliver and manage street marketing campaigns and staffing services</li>
            <li>To communicate about our services, updates, and promotions</li>
            <li>To improve our website, services, and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share information with:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party services that help us operate our business (e.g., form processing via Formspree, analytics via Google Analytics).</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to analyze website traffic and improve your experience. Google Analytics
            collects anonymized usage data. You can opt out of Google Analytics by installing the
            {' '}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information, including HTTPS encryption,
            secure form processing, and access controls. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <h2>California Privacy Rights (CCPA)</h2>
          <p>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA),
            including the right to know what personal information we collect, the right to delete your information, and
            the right to opt out of the sale of your information. We do not sell personal information.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect personal information
            from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions about this Privacy Policy or your personal information, contact us at:{' '}
            <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
