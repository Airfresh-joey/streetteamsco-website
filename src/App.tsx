import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Lazy-loaded page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const LocationsIndex = lazy(() => import('./pages/LocationsIndex'));
const StatePage = lazy(() => import('./pages/StatePage'));
const CityPage = lazy(() => import('./pages/CityPage'));
const ServicesIndex = lazy(() => import('./pages/ServicesIndex'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const IndustriesIndex = lazy(() => import('./pages/IndustriesIndex'));
const IndustryPage = lazy(() => import('./pages/IndustryPage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const OurTeam = lazy(() => import('./pages/OurTeam'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const BookPage = lazy(() => import('./pages/BookPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Transparent nav over the hero; solid paper background once scrolled (v5 behavior)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return (
    <div className="app">
      <nav className={`nav ${scrolled || menuOpen ? 'scrolled' : ''}`}>
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
            <a href="/playbook" style={{color: '#f59e0b', fontWeight: 600}}>Free Playbook</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/case-studies/">Case Studies</a>
            <Link to="/locations">Locations</Link>
            <a href="/blog/">Blog</a>
            {isHome ? (
              <a href="#contact" className="nav-cta">Get Quote</a>
            ) : (
              <Link to="/contact" className="nav-cta">Get Quote</Link>
            )}
          </div>
        </div>
      </nav>

      <Suspense fallback={<div style={{minHeight:'100vh'}}></div>}>
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
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/book-call" element={<BookPage />} />
          <Route path="/locations" element={<LocationsIndex />} />
          <Route path="/locations/:state" element={<StatePage />} />
          <Route path="/locations/:state/:city" element={<CityPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Link to="/" className="logo">STREET TEAMS CO</Link>
              <p>Professional street marketing and brand ambassador services nationwide. Over 500 campaigns in 1,000+ US cities.</p>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <Link to="/services/street-teams">Street Teams</Link>
              <Link to="/services/brand-ambassadors">Brand Ambassadors</Link>
              <Link to="/services/guerrilla-marketing">Guerrilla Marketing</Link>
              <Link to="/services/event-staffing">Event Staffing</Link>
              <Link to="/services/product-sampling">Product Sampling</Link>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <Link to="/pricing">Pricing</Link>
              <a href="/how-it-works">How It Works</a>
              <a href="/about-street-teams-co">About Us</a>
              <Link to="/testimonials">Testimonials</Link>
              <a href="/case-studies/">Case Studies</a>
              <Link to="/industries">Industries</Link>
              <Link to="/locations">Locations</Link>
              <a href="/blog/">Blog</a>
            </div>
            <div className="footer-section">
              <h3>Resources</h3>
              <a href="/street-team-marketing-agency">Street Team Marketing Agency</a>
              <a href="/brand-ambassador-agency">Brand Ambassador Agency</a>
              <a href="/experiential-marketing-agency">Experiential Marketing Agency</a>
              <a href="/trade-show-staffing-agency">Trade Show Staffing Agency</a>
              <a href="/conference-staffing-agency">Conference Staffing</a>
              <a href="/in-store-demo-staffing">In-Store Demo Staffing</a>
              <a href="/promotional-models">Promotional Models</a>
              <a href="/what-is-street-team-marketing">What Is Street Team Marketing?</a>
              <a href="/compare/event-staffing-companies">Agency Comparisons</a>
              <a href="/playbook" style={{color: '#f59e0b', fontWeight: 600}}>Free Playbook (PDF)</a>
              <a href="/resources">All Resources</a>
              <a href="/faq">FAQ</a>
              <a href="/fifa-world-cup-2026-staffing" style={{color: '#f59e0b', fontWeight: 600}}>World Cup 2026 Staffing</a>
            </div>
            <div className="footer-section">
              <h3>Industries</h3>
              <a href="/cpg-brand-ambassadors">CPG Brand Ambassadors</a>
              <a href="/beauty-brand-sampling">Beauty &amp; Cosmetics Sampling</a>
              <a href="/app-launch-street-teams">App Launch Street Teams</a>
              <a href="/dispensary-marketing-agency">Dispensary Marketing</a>
              <a href="/college-nil-marketing">College NIL Marketing</a>
              <a href="/cannabis-marketing-agency">Cannabis Brand Marketing</a>
              <a href="/alcohol-brand-promotions">Alcohol Brand Promotions</a>
              <a href="/college-marketing-agency">College Marketing</a>
              <Link to="/industries">View All Industries</Link>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <Link to="/contact">Get a Quote</Link>
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
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '16px', paddingTop: '20px', textAlign: 'center' }}>
            <a href="https://airfreshmarketing.com" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Powered by</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.27 124.49" style={{ height: '22px', width: 'auto' }} aria-label="Air Fresh Marketing">
                <path fill="rgba(255,255,255,0.55)" d="M170.35,32.1h14L206.74,85H191.13l-3.82-9.38H167.05L163.3,85H148Zm12.76,32.19-5.85-14.93-5.93,14.93Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M208.1,30.23H223v10.5H208.1Zm.29,14.18h14.26V85H208.39Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M227.75,44.41H242v8.18c2.33-5.55,6.08-9.16,12.83-8.86v15h-1.2C246.2,58.74,242,63,242,72.4V85H227.75Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M258.29,32.48h42V45.23H272.84v8.94h24.83V66.25H272.84V85H258.29Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M303.83,44.41h14.25v8.18c2.32-5.55,6.07-9.16,12.83-8.86v15h-1.2c-7.43,0-11.63,4.28-11.63,13.66V85H303.83Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M332.64,64.89v-.15c0-11.85,8.47-21.23,20.47-21.23,14,0,20.48,10.28,20.48,22.21,0,.9,0,2-.07,2.93H346.36c1.13,4.42,4.35,6.67,8.78,6.67,3.38,0,6.08-1.27,9-4.12L372,77.73c-3.9,5-9.53,8.25-17.63,8.25C341.64,86,332.64,77.5,332.64,64.89Zm27.6-3.52c-.52-4.5-3.15-7.36-7.05-7.36s-6.3,2.93-7.05,7.36Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M374.65,79.9,380,71.27a26.34,26.34,0,0,0,13.95,4.66c2.47,0,3.6-.75,3.6-2.18V73.6c0-1.58-2.25-2.25-6.53-3.45-8-2.1-14.4-4.8-14.4-13V57c0-8.63,6.9-13.44,16.28-13.44a31.77,31.77,0,0,1,16.73,4.73l-4.88,9c-4.2-2.33-8.78-3.76-12-3.76-2.18,0-3.3.83-3.3,2v.14c0,1.58,2.32,2.33,6.6,3.61,8,2.25,14.4,5,14.4,12.9v.15c0,8.93-6.67,13.59-16.58,13.59A32.76,32.76,0,0,1,374.65,79.9Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M413.06,30.23h14.25V50c2.63-3.37,6.38-6.45,12.16-6.45,8.62,0,13.8,5.7,13.8,14.93V85H439V63c0-4.43-2.33-6.83-5.7-6.83s-6,2.4-6,6.83V85H413.06Z"/>
                <path fill="rgba(255,255,255,0.55)" d="M62.25,0a62.25,62.25,0,1,0,62.24,62.25A62.31,62.31,0,0,0,62.25,0Zm0,109.51a47.27,47.27,0,1,1,47.26-47.26A47.32,47.32,0,0,1,62.25,109.51Z"/>
                <polygon fill="rgba(255,255,255,0.55)" points="54.36 32.05 75.56 85.08 91.29 85.08 70.09 32.05 54.36 32.05"/>
                <polygon fill="rgba(255,255,255,0.55)" points="33.21 85.08 48.94 85.08 58.73 60.59 42.99 60.59 33.21 85.08"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <div className="sticky-cta-bar">
        <p>Ready to launch your campaign? Get a free quote in 24 hours.</p>
        {isHome ? (
          <a href="#contact" className="sticky-cta-btn" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('contact');
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
          }}>Get Free Quote</a>
        ) : (
          <Link to="/contact" className="sticky-cta-btn">Get Free Quote</Link>
        )}
        <a href="mailto:hello@streetteamsco.com" className="sticky-cta-email">Email Us</a>
      </div>
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
