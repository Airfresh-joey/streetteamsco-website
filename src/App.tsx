import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import LocationsIndex from './pages/LocationsIndex';
import StatePage from './pages/StatePage';
import CityPage from './pages/CityPage';
import NotFound from './pages/NotFound';
import { useMetaTags } from './hooks/useMetaTags';
import ContactForm from './components/ContactForm';

function HomePage() {
  useMetaTags({
    title: 'Street Teams Co | Professional Brand Ambassadors & Street Marketing Nationwide',
    description: 'Street Teams Co provides elite brand ambassadors delivering high-impact street-level marketing campaigns nationwide. Street activations, event staffing, and product sampling in 1,000+ cities.',
    canonical: 'https://streetteamsco.com',
  });

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Street Marketing Teams</h1>
          <p className="hero-subtitle">
            Elite brand ambassadors delivering high-impact street-level marketing campaigns nationwide
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Get Started</a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2>What We Do</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📍</div>
              <h3>Street Activations</h3>
              <p>High-traffic guerrilla marketing campaigns that generate buzz and drive brand awareness</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3>Brand Ambassadors</h3>
              <p>Professional teams trained to represent your brand with enthusiasm and expertise</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Event Staffing</h3>
              <p>Experienced staff for trade shows, festivals, conferences, and special events</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Product Sampling</h3>
              <p>Direct-to-consumer product distribution and sampling campaigns</p>
            </div>
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
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Nationwide</div>
            </div>
            <div className="stat">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Impressions Generated</div>
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

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="logo">STREET TEAMS CO</Link>
          <div className="nav-links">
            {isHome ? (
              <>
                <a href="#services">Services</a>
                <Link to="/locations">Locations</Link>
                <a href="#contact">Contact</a>
              </>
            ) : (
              <>
                <Link to="/#services">Services</Link>
                <Link to="/locations">Locations</Link>
                <Link to="/#contact">Contact</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
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
              <p>Professional street marketing nationwide</p>
            </div>
            <div className="footer-links">
              <Link to="/#services">Services</Link>
              <Link to="/locations">Locations</Link>
              <Link to="/#contact">Contact</Link>
              <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Street Teams Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
