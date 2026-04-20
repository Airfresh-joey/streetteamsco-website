import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import LocationsIndex from './pages/LocationsIndex';
import StatePage from './pages/StatePage';
import CityPage from './pages/CityPage';
import ServicesIndex from './pages/ServicesIndex';
import ServicePage from './pages/ServicePage';
import IndustriesIndex from './pages/IndustriesIndex';
import IndustryPage from './pages/IndustryPage';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import OurTeam from './pages/OurTeam';
import Testimonials from './pages/Testimonials';
import NotFound from './pages/NotFound';
import { useMetaTags } from './hooks/useMetaTags';
import ContactForm from './components/ContactForm';

function HomePage() {
  useMetaTags({
    title: 'Street Teams Co | Professional Brand Ambassadors & Street Marketing Nationwide',
    description: 'Street Teams Co provides elite brand ambassadors and street marketing campaigns in 1,000+ US cities. Event staffing, product sampling, and guerrilla marketing.',
    canonical: 'https://streetteamsco.com',
  });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
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
                <span className="hero-badge-pill">&#127942; #1 HUMAN ENGAGEMENT AGENCY</span>
              </div>

              <h1 className="hero-heading">
                <span className="hero-heading-white">STREET TEAMS</span>
                <span className="hero-heading-gradient">HUMAN TO HUMAN</span>
                <span className="hero-heading-blue">CONNECTIONS</span>
              </h1>

              <p className="hero-subtitle">
                We connect your brand to real humans through authentic
                <span className="text-yellow"> human experiences</span> that create genuine connections and drive
                <span className="text-orange"> 40% higher engagement</span>
              </p>

              <div className="hero-tags">
                <span className="hero-tag hero-tag-yellow">Human Engagement</span>
                <span className="hero-tag hero-tag-orange">Authentic Connections</span>
                <span className="hero-tag hero-tag-blue">Real Experiences</span>
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
                <a href="#contact" className="btn-hero-primary" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                  GET INSTANT QUOTE
                </a>
                <button className="btn-hero-secondary" onClick={scrollToContact}>
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
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
                  alt="Professional Street Team Brand Ambassadors Creating Human Connections"
                  className="hero-image"
                  width={2000}
                  height={1333}
                  fetchPriority="high"
                />
                <div className="hero-image-gradient"></div>
                <div className="hero-image-card">
                  <div className="hero-image-card-inner">
                    <div className="hero-image-card-title">HUMAN TO HUMAN</div>
                    <div className="hero-image-card-subtitle">Authentic Brand Connections</div>
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
                <div className="hero-image-floating-badge">HUMAN FOCUSED</div>
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

      <section id="services" className="services">
        <div className="container">
          <h2>What We Do</h2>
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
              <div className="stat-number">500+</div>
              <div className="stat-label">Campaigns Executed</div>
            </div>
            <div className="stat">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Cities Nationwide</div>
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
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Ready to Launch Your Campaign?</h2>
          <p>Let's discuss how Street Teams Co can amplify your brand</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="logo">STREET TEAMS CO</Link>
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/industries">Industries</Link>
            <Link to="/locations">Locations</Link>
            <a href="/blog/">Blog</a>
            {isHome ? (
              <a href="#contact" className="nav-cta">Get Quote</a>
            ) : (
              <Link to="/#contact" className="nav-cta">Get Quote</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/:service" element={<ServicePage />} />
        <Route path="/industries" element={<IndustriesIndex />} />
        <Route path="/industries/:industry" element={<IndustryPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/locations" element={<LocationsIndex />} />
        <Route path="/locations/:state" element={<StatePage />} />
        <Route path="/locations/:state/:city" element={<CityPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Link to="/" className="logo">STREET TEAMS CO</Link>
              <p>Professional street marketing and brand ambassador services nationwide. Over 500 campaigns in 1,000+ US cities.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <Link to="/services/street-teams">Street Teams</Link>
              <Link to="/services/brand-ambassadors">Brand Ambassadors</Link>
              <Link to="/services/guerrilla-marketing">Guerrilla Marketing</Link>
              <Link to="/services/event-staffing">Event Staffing</Link>
              <Link to="/services/product-sampling">Product Sampling</Link>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <Link to="/pricing">Pricing</Link>
              <Link to="/testimonials">Testimonials</Link>
              <Link to="/our-team">Our Team</Link>
              <Link to="/industries">Industries</Link>
              <Link to="/locations">Locations</Link>
              <a href="/blog/">Blog</a>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
              <p>50+ states &middot; 1,000+ cities</p>
              <p>Response within 24 hours</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Street Teams Co. All rights reserved.</p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
