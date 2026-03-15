import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const response = await fetch('https://formspree.io/f/xwpkgjvn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">STREET TEAMS CO</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#case-studies">Case Studies</a>
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

      {/* Case Studies Section */}
      <section id="case-studies" className="case-studies">
        <div className="container">
          <h2>Case Studies</h2>
          <p className="section-subtitle">See how we've delivered results for our clients</p>
          
          <div className="case-studies-grid">
            {/* Cannabis Dispensary Case Study */}
            <div className="case-study-card">
              <div className="case-study-image">
                <div className="case-study-placeholder">
                  <span>🌿</span>
                </div>
                <div className="case-study-badge">Grand Opening</div>
              </div>
              <div className="case-study-content">
                <span className="case-study-category">Cannabis Retail</span>
                <h3>Cannabis Dispensary Grand Opening Campaign</h3>
                <p className="case-study-tagline">Driving foot traffic and community buzz for a new dispensary launch</p>
                
                <div className="case-study-section">
                  <h4>The Challenge</h4>
                  <p>A new cannabis dispensary was opening in a competitive market with several established competitors. They needed to build immediate awareness, drive opening week foot traffic, and establish themselves as a community-friendly, professional retail destination while navigating strict advertising regulations.</p>
                </div>
                
                <div className="case-study-section">
                  <h4>Our Solution</h4>
                  <p>Street Teams Co deployed a team of 8 brand ambassadors for a 10-day grand opening campaign. Our team conducted compliant street-level outreach at high-traffic locations including shopping centers, entertainment districts, and community events. We distributed educational materials, promotional offers, and branded merchandise while engaging consumers in conversations about the dispensary's quality products and welcoming atmosphere.</p>
                </div>
                
                <div className="case-study-results">
                  <h4>Results</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-number">2,500+</span>
                      <span className="result-label">First Week Customers</span>
                    </div>
                    <div className="result-item">
                      <span className="result-number">15,000</span>
                      <span className="result-label">Flyers Distributed</span>
                    </div>
                    <div className="result-item">
                      <span className="result-number">340%</span>
                      <span className="result-label">Above Sales Projections</span>
                    </div>
                    <div className="result-item">
                      <span className="result-number">4.8⭐</span>
                      <span className="result-label">Google Rating (First Month)</span>
                    </div>
                  </div>
                </div>
                
                <div className="case-study-testimonial">
                  <blockquote>
                    "Street Teams Co exceeded our expectations. Their team was professional, knowledgeable about compliance requirements, and genuinely connected with our target customers. Our opening week numbers were triple what we projected."
                  </blockquote>
                  <cite>— Marketing Director, [Client Name Available Upon Request]</cite>
                </div>
              </div>
            </div>
            
            {/* Tech Conference Case Study */}
            <div className="case-study-card">
              <div className="case-study-image">
                <div className="case-study-placeholder">
                  <span>💻</span>
                </div>
                <div className="case-study-badge">Event Staffing</div>
              </div>
              <div className="case-study-content">
                <span className="case-study-category">Technology</span>
                <h3>Tech Conference Booth Staffing</h3>
                <p className="case-study-tagline">Professional booth staff driving leads at a major technology conference</p>
                
                <div className="case-study-section">
                  <h4>The Challenge</h4>
                  <p>A B2B SaaS company was exhibiting at a major technology conference with over 15,000 attendees. They needed engaging booth staff who could articulate complex product benefits, qualify leads effectively, and represent their brand professionally to enterprise decision-makers—all while competing for attention among 200+ exhibitors.</p>
                </div>
                
                <div className="case-study-section">
                  <h4>Our Solution</h4>
                  <p>Street Teams Co provided a team of 6 tech-savvy brand ambassadors for the 3-day conference. Our team underwent comprehensive product training, including hands-on demos and competitive positioning. We implemented a strategic lead qualification process, engaging attendees with targeted questions to identify high-value prospects. Our staff managed booth flow, conducted live product demonstrations, and captured detailed lead information for the sales team.</p>
                </div>
                
                <div className="case-study-results">
                  <h4>Results</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-number">847</span>
                      <span className="result-label">Qualified Leads Captured</span>
                    </div>
                    <div className="result-item">
                      <span className="result-number">156</span>
                      <span className="result-label">Demo Requests</span>
                    </div>
                    <div className="result-item">
                      <span className="result-number">23</span>
                      <span className="result-label">Deals Closed (90 Days)</span>
                    </div>
                    <div className="result-item">
                      <span className="result-number">12x</span>
                      <span className="result-label">ROI on Staffing Cost</span>
                    </div>
                  </div>
                </div>
                
                <div className="case-study-testimonial">
                  <blockquote>
                    "The Street Teams Co staff were indistinguishable from our own employees. They learned our product inside and out and represented our brand better than we could have hoped. The quality of leads they generated was exceptional."
                  </blockquote>
                  <cite>— VP of Marketing, [Client Name Available Upon Request]</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Ready to Launch Your Campaign?</h2>
              <p>Let's discuss how Street Teams Co can amplify your brand with professional street marketing.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:hello@streetteamsco.com">hello@streetteamsco.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Coverage</strong>
                    <span>50+ cities nationwide</span>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">⚡</span>
                  <div>
                    <strong>Response Time</strong>
                    <span>Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-wrapper">
              {status === 'success' ? (
                <div className="form-success">
                  <span className="success-icon">✓</span>
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-secondary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3>Get a Free Quote</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Tell us about your project *</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Describe your campaign goals, target cities, timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Get My Free Quote'}
                  </button>
                  {status === 'error' && (
                    <p className="form-error">Something went wrong. Please try again or email us directly.</p>
                  )}
                </form>
              )}
            </div>
          </div>
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
