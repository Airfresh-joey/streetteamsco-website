import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">STREET TEAMS CO</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

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
          <a href="mailto:hello@streetteamsco.com" className="btn btn-primary btn-lg">
            Contact Us
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">STREET TEAMS CO</div>
              <p>Professional street marketing nationwide</p>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
              <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Street Teams Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
