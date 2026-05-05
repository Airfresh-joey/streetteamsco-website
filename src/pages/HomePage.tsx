import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';
import ContactForm from '../components/ContactForm';
import { trackCTAClick, trackCalendlyOpen, trackEmailClick } from '../analytics';

export default function HomePage() {
  useMetaTags({
    title: 'Street Team Marketing Agency | 1,000+ Cities Nationwide | Street Teams Co',
    description: 'Street team marketing agency with professional brand ambassadors in 1,000+ US cities. 500+ campaigns executed, 94% client retention. Event staffing, product sampling & guerrilla marketing from $25/hr.',
    canonical: 'https://streetteamsco.com',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'MarketingAgency',
        'name': 'Street Teams Co',
        'url': 'https://streetteamsco.com',
        'logo': 'https://streetteamsco.com/images/og-image.jpg',
        'description': 'Street Teams Co is a nationwide street team marketing and brand ambassador agency operating in over 1,000 US cities.',
        'foundingDate': '2020',
        'areaServed': 'United States',
        'priceRange': '$25-$75/hr',
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'hello@streetteamsco.com',
          'contactType': 'sales',
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '127',
          'bestRating': '5',
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Street Marketing Services',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Street Team Marketing' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Brand Ambassador Services' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Event Staffing' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Product Sampling' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Guerrilla Marketing' } },
          ],
        },
      },
    ],
  });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const openCalendly = () => {
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;
    if (calendlyUrl && window.Calendly) {
      trackCalendlyOpen('homepage');
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      scrollToContact();
    }
  };

  return (
    <>
      <section className="hero">
        {/* Blue gradient overlay */}
        <div className="hero-overlay"></div>

        {/* Animated particles */}
        <div className="hero-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                width: `${(i * 2.3 + 2)}rem`,
                height: `${(i * 2.3 + 2)}rem`,
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23 + 5) % 100}%`,
                animationDuration: `${i * 1.5 + 4}s`,
                opacity: 0.15 + (i * 0.05),
              }}
            ></div>
          ))}
        </div>

        <div className="hero-inner">
          <div className="hero-grid">
            {/* Left column */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-pill">&#127942; #1 STREET TEAM MARKETING AGENCY</span>
              </div>

              <h1 className="hero-heading">
                <span className="hero-heading-white">STREET TEAM</span>
                <span className="hero-heading-gradient">MARKETING AGENCY</span>
                <span className="hero-heading-blue">1,000+ CITIES NATIONWIDE</span>
              </h1>

              <p className="hero-subtitle">
                Professional brand ambassadors and street marketing teams in
                <span className="text-yellow"> 1,000+ US cities</span>. Event staffing, product sampling, and guerrilla marketing that drives
                <span className="text-orange"> 40% higher engagement</span>
              </p>

              <div className="hero-tags">
                <span className="hero-tag hero-tag-yellow">Brand Ambassadors</span>
                <span className="hero-tag hero-tag-orange">Event Staffing</span>
                <span className="hero-tag hero-tag-blue">Product Sampling</span>
              </div>

              <div className="hero-stats-grid">
                <div className="hero-stat-box">
                  <div className="hero-stat-number text-yellow">1,000+</div>
                  <div className="hero-stat-label">CITIES</div>
                </div>
                <div className="hero-stat-box">
                  <div className="hero-stat-number text-orange">40%</div>
                  <div className="hero-stat-label">HIGHER ROI</div>
                </div>
                <div className="hero-stat-box">
                  <div className="hero-stat-number text-red">24/7</div>
                  <div className="hero-stat-label">SUPPORT</div>
                </div>
              </div>

              <div className="hero-cta">
                <a href="#contact" className="btn-hero-primary" onClick={(e) => { e.preventDefault(); trackCTAClick('GET INSTANT QUOTE', 'homepage'); scrollToContact(); }}>
                  GET INSTANT QUOTE
                </a>
                <button className="btn-hero-secondary" onClick={() => { trackCTAClick('BOOK STRATEGY CALL', 'homepage'); openCalendly(); }}>
                  BOOK STRATEGY CALL &rarr;
                </button>
              </div>

              <div className="hero-trust-badges">
                <div className="trust-badge">
                  <span className="trust-badge-number">87%</span>
                  <span className="trust-badge-label">Brand Recall Increase</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge-number">3.8x</span>
                  <span className="trust-badge-label">ROI Multiple</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge-number">94%</span>
                  <span className="trust-badge-label">Client Retention</span>
                </div>
              </div>
            </div>

            {/* Right column - hero image */}
            <div className="hero-right">
              <div className="hero-image-wrapper">
                <img
                  src="/images/hero-image.jpg"
                  alt="Street team marketing brand ambassador engaging consumers at a product sampling event"
                  className="hero-image"
                  width={2000}
                  height={1333}
                  fetchPriority="high"
                />
                <div className="hero-image-gradient"></div>
                <div className="hero-image-card">
                  <div className="hero-image-card-inner">
                    <div className="hero-image-card-title">NATIONWIDE COVERAGE</div>
                    <div className="hero-image-card-subtitle">1,000+ Cities &bull; All 50 States</div>
                    <div className="hero-image-card-avatars">
                      <div className="avatar-dots">
                        <div className="avatar-dot avatar-dot-yellow"></div>
                        <div className="avatar-dot avatar-dot-orange"></div>
                        <div className="avatar-dot avatar-dot-blue"></div>
                      </div>
                      <span className="avatar-text">Real People, Real Results</span>
                    </div>
                  </div>
                </div>
                <div className="hero-image-floating-badge">500+ CAMPAIGNS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <a href="#services" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('services');
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
          }}>&#x25BC;</a>
        </div>
      </section>

      {/* Client Logos */}
      <section className="client-logos">
        <div className="container">
          <p className="client-logos-label">Trusted by Leading Brands</p>
          <div className="client-logos-grid">
            <span className="client-logo">Netflix</span>
            <span className="client-logo">Microsoft</span>
            <span className="client-logo">Apple</span>
            <span className="client-logo">Starbucks</span>
            <span className="client-logo">Lyft</span>
            <span className="client-logo">Nissan</span>
            <span className="client-logo">Cirque du Soleil</span>
            <span className="client-logo">1800 Tequila</span>
            <span className="client-logo">Williams Racing</span>
            <span className="client-logo">TED</span>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2>Street Marketing Services We Offer</h2>
          <div className="services-grid">
            <Link to="/services/street-teams" className="service-card">
              <h3>Street Activations</h3>
              <p>High-traffic guerrilla marketing campaigns that generate buzz and drive brand awareness</p>
            </Link>
            <Link to="/services/brand-ambassadors" className="service-card">
              <h3>Brand Ambassadors</h3>
              <p>Professional teams trained to represent your brand with enthusiasm and expertise</p>
            </Link>
            <Link to="/services/event-staffing" className="service-card">
              <h3>Event Staffing</h3>
              <p>Experienced staff for trade shows, festivals, conferences, and special events</p>
            </Link>
            <Link to="/services/product-sampling" className="service-card">
              <h3>Product Sampling</h3>
              <p>Direct-to-consumer product distribution and sampling campaigns</p>
            </Link>
            <Link to="/services/guerrilla-marketing" className="service-card">
              <h3>Guerrilla Marketing</h3>
              <p>LED trucks, wild posting, pop-up experiences, and unconventional campaigns</p>
            </Link>
            <Link to="/pricing" className="service-card">
              <h3>View Pricing</h3>
              <p>Transparent pricing for all services. Brand ambassadors from $25/hr.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Staff Nationwide</div>
            </div>
            <div className="stat">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Campaigns</div>
            </div>
            <div className="stat">
              <div className="stat-number">94%</div>
              <div className="stat-label">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Street Teams Co Promise */}
      <section className="promise">
        <div className="container">
          <h2>The Street Teams Co Promise</h2>
          <div className="promise-grid">
            <div className="promise-card">
              <div className="promise-icon">&#9989;</div>
              <h3>Show-Up Guarantee</h3>
              <p>If any team member doesn't show, we replace them immediately or credit your account. No excuses, no exceptions.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon">&#127891;</div>
              <h3>Trained &amp; Briefed</h3>
              <p>Every street team member completes your brand training before deployment. They represent your brand like it's their own.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon">&#128205;</div>
              <h3>Real-Time Reporting</h3>
              <p>Live GPS tracking, photo uploads, and engagement metrics on every campaign. Full visibility from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Results */}
      <section className="home-testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="home-testimonials-grid">
            <div className="home-testimonial-card">
              <div className="home-testimonial-quote">
                <span className="quote-mark">&ldquo;</span>
                Street Teams Co deployed 40 brand ambassadors across 6 cities in one week. Our client's product sampling campaign generated a 28% trial-to-purchase rate.
              </div>
              <div className="home-testimonial-author">
                <div className="home-testimonial-name">Amanda R.</div>
                <div className="home-testimonial-title">Agency Director</div>
              </div>
            </div>
            <div className="home-testimonial-card">
              <div className="home-testimonial-quote">
                <span className="quote-mark">&ldquo;</span>
                We switched from ATN to Street Teams Co last year. Better staff quality, faster response times, and 20% lower costs.
              </div>
              <div className="home-testimonial-author">
                <div className="home-testimonial-name">Kevin S.</div>
                <div className="home-testimonial-title">Marketing VP</div>
              </div>
            </div>
            <div className="home-testimonial-card">
              <div className="home-testimonial-quote">
                <span className="quote-mark">&ldquo;</span>
                Their guerrilla marketing team turned heads in Times Square. We got 50,000+ impressions in a single day and the photos went viral on social.
              </div>
              <div className="home-testimonial-author">
                <div className="home-testimonial-name">Nicole P.</div>
                <div className="home-testimonial-title">Brand Manager</div>
              </div>
            </div>
            <div className="home-testimonial-card">
              <div className="home-testimonial-quote">
                <span className="quote-mark">&ldquo;</span>
                Used them for 3 trade shows this year. Always professional, always on time. My go-to for event staffing nationwide.
              </div>
              <div className="home-testimonial-author">
                <div className="home-testimonial-name">Jason M.</div>
                <div className="home-testimonial-title">Event Director</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-links">
        <div className="container">
          <h2>Street Team Marketing Nationwide</h2>
          <p>We operate in every major market. Find street teams in your city or explore our industry expertise.</p>
          <div className="home-links-grid">
            <div className="home-links-col">
              <h3>Top Markets</h3>
              <ul>
                <li><Link to="/locations/georgia/atlanta">Street Teams Atlanta</Link></li>
                <li><Link to="/locations/pennsylvania/philadelphia">Street Teams Philadelphia</Link></li>
                <li><Link to="/locations/tennessee/nashville">Street Teams Nashville</Link></li>
                <li><Link to="/locations/indiana/indianapolis">Street Teams Indianapolis</Link></li>
                <li><Link to="/locations/florida/miami">Street Teams Miami</Link></li>
                <li><Link to="/locations/california/los-angeles">Street Teams Los Angeles</Link></li>
                <li><Link to="/locations/new-york/new-york-city">Street Teams New York City</Link></li>
                <li><Link to="/locations/illinois/chicago">Street Teams Chicago</Link></li>
                <li><Link to="/locations">View All 1,000+ Cities</Link></li>
              </ul>
            </div>
            <div className="home-links-col">
              <h3>Industries</h3>
              <ul>
                <li><Link to="/industries/cannabis">Cannabis Street Marketing</Link></li>
                <li><Link to="/industries/technology">Tech & SaaS Marketing</Link></li>
                <li><Link to="/industries/food-beverage">Food & Beverage Sampling</Link></li>
                <li><Link to="/industries/retail">Retail Activations</Link></li>
                <li><Link to="/industries/entertainment">Entertainment Campaigns</Link></li>
                <li><Link to="/industries/fitness-wellness">Fitness & Wellness</Link></li>
                <li><Link to="/industries">View All 14 Industries</Link></li>
              </ul>
            </div>
            <div className="home-links-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="/street-team-marketing-agency">Street Team Marketing Agency</a></li>
                <li><a href="/brand-ambassador-agency">Brand Ambassador Agency</a></li>
                <li><a href="/guerrilla-marketing-agency">Guerrilla Marketing Agency</a></li>
                <li><a href="/product-sampling-agency">Product Sampling Agency</a></li>
                <li><Link to="/testimonials">Client Results & Testimonials</Link></li>
                <li><Link to="/pricing">Pricing & Rate Cards</Link></li>
                <li><a href="/blog/">Street Marketing Blog</a></li>
              </ul>
            </div>
            <div className="home-links-col">
              <h3>World Cup 2026</h3>
              <ul>
                <li><a href="/fifa-world-cup-2026-staffing">World Cup Staffing Overview</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/new-york-new-jersey">NYC/NJ Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/los-angeles">LA Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/miami">Miami Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/dallas">Dallas Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/houston">Houston Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing">View All 11 Host Cities</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Ready to Launch Your Campaign?</h2>
          <p>Let's discuss how Street Teams Co can amplify your brand, or email us at{' '}
            <a href="mailto:hello@streetteamsco.com" onClick={() => trackEmailClick()}>hello@streetteamsco.com</a>
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
