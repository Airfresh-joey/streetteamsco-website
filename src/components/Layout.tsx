import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="logo">STREET TEAMS CO</Link>
          <div className="nav-links">
            <Link to="/services/street-teams">Services</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/locations">Locations</Link>
            <Link to="/contact" className="nav-cta">Get Quote</Link>
          </div>
        </div>
      </nav>

      {children}

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
                <Link to="/testimonials">Testimonials</Link>
              <Link to="/our-team">Our Team</Link>
              <Link to="/locations">Locations</Link>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
              <p>50+ states &middot; 1,000+ cities</p>
              <p>Response within 24 hours</p>
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
