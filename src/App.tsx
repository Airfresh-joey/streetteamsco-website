import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Lazy-loaded page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
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
const NotFound = lazy(() => import('./pages/NotFound'));

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
            <a href="/fifa-world-cup-2026-staffing" style={{color: '#f59e0b', fontWeight: 700}}>World Cup 2026</a>
            <a href="/blog/">Blog</a>
            {isHome ? (
              <a href="#contact" className="nav-cta">Get Quote</a>
            ) : (
              <Link to="/#contact" className="nav-cta">Get Quote</Link>
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
              <Link to="/industries">Industries</Link>
              <Link to="/locations">Locations</Link>
              <a href="/blog/">Blog</a>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <a href="/street-team-marketing-agency">Street Team Marketing Agency</a>
              <a href="/brand-ambassador-agency">Brand Ambassador Agency</a>
              <a href="/guerrilla-marketing-agency">Guerrilla Marketing Agency</a>
              <a href="/product-sampling-agency">Product Sampling Agency</a>
              <a href="/compare/atn-event-staffing">vs ATN Event Staffing</a>
              <a href="/compare/alt-terrain">vs Alt Terrain</a>
              <a href="/fifa-world-cup-2026-staffing" style={{color: '#f59e0b', fontWeight: 600}}>World Cup 2026 Staffing</a>
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
