import { Link } from 'react-router-dom';
import { useMetaTags } from '../../hooks/useMetaTags';
import Layout from '../../components/Layout';

export default function GuerrillaMarketingService() {
  useMetaTags({
    title: 'Guerrilla Marketing Agency | Creative Street-Level Campaigns | Street Teams Co',
    description: 'Professional guerrilla marketing agency executing creative, unconventional campaigns that generate massive brand awareness. LED trucks, wild posting, flash mobs, and more.',
    canonical: 'https://streetteamsco.com/services/guerrilla-marketing',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Guerrilla Marketing',
      'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
      'description': 'Guerrilla marketing is an unconventional advertising strategy that uses surprise, creativity, and street-level tactics to promote a brand in public spaces. Street Teams Co designs and executes guerrilla marketing campaigns nationwide.',
      'areaServed': 'United States',
      'serviceType': 'Guerrilla Marketing',
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
            <span>Guerrilla Marketing</span>
          </nav>
          <h1>Guerrilla Marketing Agency</h1>
          <p className="service-hero-subtitle">
            Unconventional, creative marketing campaigns that capture attention and generate massive brand awareness without massive budgets.
          </p>
          <div className="hero-cta">
            <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <h2>What Is Guerrilla Marketing?</h2>
          <p>
            Guerrilla marketing is an unconventional advertising strategy that uses surprise, creativity,
            and street-level tactics to promote a brand in public spaces. The term was coined by Jay Conrad
            Levinson in 1984 and has since become one of the most effective ways for brands to cut through
            digital noise and create real-world impact.
          </p>
          <p>
            Street Teams Co is one of the few agencies in the United States that specializes in guerrilla marketing
            execution. While most experiential agencies focus on large-scale events, we design campaigns that
            work at the street level — where consumers actually are. Our guerrilla campaigns consistently
            deliver 3-5x the engagement rates of traditional advertising at a fraction of the cost.
          </p>

          <h3>Guerrilla Marketing Tactics We Execute</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>LED Truck Advertising</h4>
              <p>Mobile digital billboards that drive through target neighborhoods, event areas, and high-traffic corridors. Full video capability with GPS route tracking and impression estimates.</p>
            </div>
            <div className="service-card">
              <h4>Wild Posting & Wheat Pasting</h4>
              <p>Large-format poster campaigns on construction sites, buildings, and designated posting areas in urban markets. High-visibility placements in nightlife, arts, and shopping districts.</p>
            </div>
            <div className="service-card">
              <h4>Pop-Up Experiences</h4>
              <p>Temporary branded installations, interactive displays, and immersive experiences in high-foot-traffic locations. Designed for social media amplification.</p>
            </div>
            <div className="service-card">
              <h4>Stunt Marketing</h4>
              <p>Attention-grabbing public stunts, flash mobs, and surprise activations that generate press coverage and social virality. We handle permitting, logistics, and execution.</p>
            </div>
          </div>

          <h3>Why Guerrilla Marketing Works</h3>
          <ul className="service-list">
            <li><strong>Cuts Through Digital Noise</strong> — Real-world experiences create deeper memory encoding than screen-based ads</li>
            <li><strong>Social Media Amplification</strong> — Creative guerrilla campaigns generate organic shares, photos, and UGC</li>
            <li><strong>Cost-Effective Reach</strong> — A well-placed guerrilla campaign can generate millions of impressions for a fraction of a billboard buy</li>
            <li><strong>Hyper-Local Targeting</strong> — Deploy exactly where your target audience lives, works, and plays</li>
            <li><strong>Press & Media Coverage</strong> — Unconventional campaigns naturally attract media attention and earned press</li>
          </ul>

          <h3>LED Truck Advertising</h3>
          <p>
            Street Teams Co operates LED advertising trucks in major markets nationwide. Our mobile digital
            billboards feature high-resolution LED screens (up to 4K), GPS route tracking, and impression
            counting. LED trucks are the only guerrilla tactic that combines the reach of out-of-home
            advertising with the flexibility to target specific neighborhoods, events, and time windows.
          </p>
          <p>
            LED truck advertising rates start at $1,500 per day in most markets.
            <Link to="/pricing"> View our complete pricing guide</Link>.
          </p>

          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <details>
              <summary>Is guerrilla marketing legal?</summary>
              <p>Yes, when executed properly. Street Teams Co handles all permitting, compliance, and location approvals for every campaign. We work within local regulations and maintain relationships with venue owners and property managers in our operating cities.</p>
            </details>
            <details>
              <summary>How do you measure guerrilla marketing ROI?</summary>
              <p>We track foot traffic, social media mentions, QR/URL scans, coupon redemptions, press coverage, and direct consumer interactions. For LED trucks, we provide GPS route data with estimated impression counts based on traffic volume.</p>
            </details>
            <details>
              <summary>What cities have LED truck availability?</summary>
              <p>We currently operate LED trucks in <Link to="/locations/california/los-angeles">Los Angeles</Link>, <Link to="/locations/new-york/new-york-city">New York City</Link>, <Link to="/locations/florida/miami">Miami</Link>, <Link to="/locations/nevada/las-vegas">Las Vegas</Link>, <Link to="/locations/illinois/chicago">Chicago</Link>, <Link to="/locations/texas/dallas">Dallas</Link>, and <Link to="/locations/texas/houston">Houston</Link>. Additional markets available with advance booking.</p>
            </details>
            <details>
              <summary>How far in advance should I book a guerrilla campaign?</summary>
              <p>We recommend 2-3 weeks lead time for standard guerrilla campaigns and 4-6 weeks for large-scale activations or multi-city deployments. LED truck bookings require minimum 1 week advance notice.</p>
            </details>
          </div>

          <div className="city-cta">
            <h3>Plan a Guerrilla Marketing Campaign</h3>
            <p>Tell us your goals and we'll design a guerrilla strategy that fits your brand, market, and budget.</p>
            <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>View Pricing</Link>
            <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">Get Free Quote</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
