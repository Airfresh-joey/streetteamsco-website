import { useEffect } from 'react';
import { useMetaTags } from '../hooks/useMetaTags';

const AFM_LOGO = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.27 124.49" style={{ height: '28px', width: 'auto' }} aria-label="Air Fresh Marketing">
    <path fill="white" d="M170.35,32.1h14L206.74,85H191.13l-3.82-9.38H167.05L163.3,85H148Zm12.76,32.19-5.85-14.93-5.93,14.93Z"/>
    <path fill="white" d="M208.1,30.23H223v10.5H208.1Zm.29,14.18h14.26V85H208.39Z"/>
    <path fill="white" d="M227.75,44.41H242v8.18c2.33-5.55,6.08-9.16,12.83-8.86v15h-1.2C246.2,58.74,242,63,242,72.4V85H227.75Z"/>
    <path fill="white" d="M258.29,32.48h42V45.23H272.84v8.94h24.83V66.25H272.84V85H258.29Z"/>
    <path fill="white" d="M303.83,44.41h14.25v8.18c2.32-5.55,6.07-9.16,12.83-8.86v15h-1.2c-7.43,0-11.63,4.28-11.63,13.66V85H303.83Z"/>
    <path fill="white" d="M332.64,64.89v-.15c0-11.85,8.47-21.23,20.47-21.23,14,0,20.48,10.28,20.48,22.21,0,.9,0,2-.07,2.93H346.36c1.13,4.42,4.35,6.67,8.78,6.67,3.38,0,6.08-1.27,9-4.12L372,77.73c-3.9,5-9.53,8.25-17.63,8.25C341.64,86,332.64,77.5,332.64,64.89Zm27.6-3.52c-.52-4.5-3.15-7.36-7.05-7.36s-6.3,2.93-7.05,7.36Z"/>
    <path fill="white" d="M374.65,79.9,380,71.27a26.34,26.34,0,0,0,13.95,4.66c2.47,0,3.6-.75,3.6-2.18V73.6c0-1.58-2.25-2.25-6.53-3.45-8-2.1-14.4-4.8-14.4-13V57c0-8.63,6.9-13.44,16.28-13.44a31.77,31.77,0,0,1,16.73,4.73l-4.88,9c-4.2-2.33-8.78-3.76-12-3.76-2.18,0-3.3.83-3.3,2v.14c0,1.58,2.32,2.33,6.6,3.61,8,2.25,14.4,5,14.4,12.9v.15c0,8.93-6.67,13.59-16.58,13.59A32.76,32.76,0,0,1,374.65,79.9Z"/>
    <path fill="white" d="M413.06,30.23h14.25V50c2.63-3.37,6.38-6.45,12.16-6.45,8.62,0,13.8,5.7,13.8,14.93V85H439V63c0-4.43-2.33-6.83-5.7-6.83s-6,2.4-6,6.83V85H413.06Z"/>
    <path fill="white" d="M62.25,0a62.25,62.25,0,1,0,62.24,62.25A62.31,62.31,0,0,0,62.25,0Zm0,109.51a47.27,47.27,0,1,1,47.26-47.26A47.32,47.32,0,0,1,62.25,109.51Z"/>
    <polygon fill="white" points="54.36 32.05 75.56 85.08 91.29 85.08 70.09 32.05 54.36 32.05"/>
    <polygon fill="white" points="33.21 85.08 48.94 85.08 58.73 60.59 42.99 60.59 33.21 85.08"/>
  </svg>
);

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

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/joeykercher/street-teams-co-discovery-call' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff' }}>

      {/* Hero */}
      <div style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#ff6b35', marginBottom: '16px' }}>
          Discovery Call
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>
          Schedule Your Discovery Call
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', margin: '0 auto 48px' }}>
          Tell us about your brand activation goals and we'll put together a custom plan for you.
        </p>

        {/* Book button */}
        <button
          onClick={openCalendly}
          style={{
            display: 'inline-block',
            background: '#ff6b35',
            color: '#fff',
            padding: '18px 48px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '1.1rem',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            marginBottom: '28px',
          }}
        >
          Pick a Time →
        </button>

        {/* Powered by AFM — right here, visible before and after clicking */}
        <div style={{ marginTop: '4px' }}>
          <a
            href="https://airfreshmarketing.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
              Powered by
            </span>
            {AFM_LOGO}
          </a>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { num: '500+', label: 'Campaigns' },
            { num: '1,000+', label: 'Cities' },
            { num: '24hr', label: 'Response' },
            { num: '94%', label: 'Retention' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ff6b35' }}>{num}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div style={{ padding: '60px 24px' }}>
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
