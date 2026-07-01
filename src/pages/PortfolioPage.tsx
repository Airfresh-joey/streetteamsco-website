import { useState } from 'react';
import { useMetaTags } from '../hooks/useMetaTags';
import { portfolioCaseStudies, getCategories } from '../data/portfolioCaseStudies';

const FALLBACK = 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800&auto=format&fit=crop';

export default function PortfolioPage() {
  useMetaTags({
    title: 'Portfolio | Real Campaign Results | Street Teams Co',
    description: 'Real street team campaigns for real brands. Wagamama, Cirque du Soleil, Williams Racing F1, Netflix, Microsoft, 1800 Tequila and more. See actual photos and results.',
    canonical: 'https://streetteamsco.com/portfolio',
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...getCategories()];

  const filtered = activeCategory === 'All'
    ? portfolioCaseStudies
    : portfolioCaseStudies.filter(s => s.category === activeCategory);

  return (
    <div className="portfolio-page">
      {/* Hero */}
      <section className="portfolio-hero">
        <div className="container">
          <div className="portfolio-hero-badge">OUR WORK</div>
          <h1>Real Campaigns.<br />Real Results.</h1>
          <p>45+ case studies across street teams, brand ambassadors, guerrilla marketing, event staffing, and product sampling — for brands you know.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="portfolio-filters">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="portfolio-grid-section">
        <div className="container">
          <div className="portfolio-grid">
            {filtered.map(study => (
              <div key={study.id} className="portfolio-card">
                <div className="portfolio-card-image">
                  <img
                    src={study.heroImage || FALLBACK}
                    alt={study.name}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
                    loading="lazy"
                  />
                  <div className="portfolio-card-category">{study.category}</div>
                </div>
                <div className="portfolio-card-body">
                  <h3>{study.name}</h3>
                  <p className="portfolio-card-tagline">{study.tagline}</p>
                  {study.markets && (
                    <p className="portfolio-card-markets">📍 {study.markets.join(' · ')}</p>
                  )}
                  <div className="portfolio-card-stats">
                    {Object.entries(study.stats).slice(0, 3).map(([k, v]) => (
                      <div key={k} className="portfolio-stat">
                        <div className="portfolio-stat-value">{v}</div>
                        <div className="portfolio-stat-label">{k}</div>
                      </div>
                    ))}
                  </div>
                  {study.googleDriveUrl && (
                    <a
                      href={study.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-card-link"
                    >
                      View Full Campaign →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="portfolio-cta">
        <div className="container">
          <h2>Ready to be our next case study?</h2>
          <p>Get a free custom quote for your campaign.</p>
          <a href="/contact" className="btn-primary">Get a Free Quote</a>
        </div>
      </section>
    </div>
  );
}
