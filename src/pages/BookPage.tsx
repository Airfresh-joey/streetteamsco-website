import { useEffect } from 'react';
import { useMetaTags } from '../hooks/useMetaTags';

export default function BookPage() {
  useMetaTags({
    title: 'Book a Discovery Call | Street Teams Co',
    description: 'Schedule a discovery call with Street Teams Co. Tell us about your brand activation goals and we\'ll put together a custom plan.',
    canonical: 'https://streetteamsco.com/book',
    noindex: true,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.querySelectorAll('script[src*="calendly"]').forEach(s => s.remove());
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff' }}>
      {/* Hero */}
      <div style={{ paddingTop: '100px', paddingBottom: '40px', textAlign: 'center', padding: '100px 24px 40px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#ff6b35', marginBottom: '12px' }}>
          Discovery Call
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
          Schedule Your Discovery Call
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto' }}>
          Tell us about your brand activation goals and we'll put together a custom plan for you.
        </p>
      </div>

      {/* Calendly */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px 60px' }}>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/joeykercher/street-teams-co-discovery-call"
          data-auto-height="true"
          style={{ minWidth: '320px', height: '700px', width: '100%' }}
        />
      </div>

      {/* Portfolio */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '8px', textAlign: 'center' }}>Our Work</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '40px' }}>A sample of campaigns we've run across the U.S.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { img: 'https://streetteamsco.com/images/case-studies/wagamama-hero.jpg', title: 'Wagamama Multi-City Street Team' },
              { img: 'https://streetteamsco.com/images/case-studies/cirque-du-soleil-hero.jpg', title: 'Cirque du Soleil Dallas Takeover' },
              { img: 'https://streetteamsco.com/images/case-studies/netflix-hero.jpg', title: 'Netflix Hollywood Premiere' },
              { img: 'https://streetteamsco.com/images/case-studies/1800-tequila.jpg', title: '1800 Tequila NBA All-Star Weekend' },
            ].map((item, i) => (
              <a key={i} href="/portfolio" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <img src={item.img} alt={item.title} loading="lazy" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '12px 16px' }}>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{item.title}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a href="/portfolio" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', padding: '12px 32px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
              View Full Portfolio →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
