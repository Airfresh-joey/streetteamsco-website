import { Link, useNavigate } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';
import { useReveal } from '../hooks/useReveal';
import { useHomeEffects } from '../hooks/useHomeEffects';
import Ticker from '../components/ds/Ticker';
import ContactForm from '../components/ContactForm';
import { trackCTAClick, trackEmailClick } from '../analytics';

export default function HomePage() {
  useMetaTags({
    title: 'Street Team Marketing Agency | 1,000+ Cities Nationwide | Street Teams Co',
    description: 'Street team marketing agency with professional brand ambassadors in 1,000+ US cities. 500+ campaigns executed, 94% client retention. Event staffing, product sampling & guerrilla marketing nationwide.',
    canonical: 'https://streetteamsco.com',
    ogImage: 'https://streetteamsco.com/images/og-image.jpg',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'MarketingAgency',
        'name': 'Street Teams Co',
        'url': 'https://streetteamsco.com',
        'logo': 'https://streetteamsco.com/images/og-image.jpg',
        'description': 'Street Teams Co is a nationwide street team marketing and brand ambassador agency operating in over 1,000 US cities.',
        'foundingDate': '2020',
        'areaServed': 'United States',
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'hello@streetteamsco.com',
          'contactType': 'sales',
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '127',
          'bestRating': '5',
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Street Marketing Services',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Street Team Marketing' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Brand Ambassador Services' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Event Staffing' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Product Sampling' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Guerrilla Marketing' } },
          ],
        },
      },
    ],
  });

  useReveal();
  useHomeEffects();
  const navigate = useNavigate();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const tickerCities = [
    'NYC', 'Los Angeles', 'Chicago', 'Dallas', 'Houston', 'Miami', 'Atlanta',
    'Denver', 'Boston', 'San Francisco', 'Las Vegas', 'Washington DC', 'Seattle',
    'Austin', 'Philadelphia', 'Phoenix', 'Nashville', 'Now booking nationwide',
  ];

  return (
    <>
      <div className="ds-grain" aria-hidden="true"></div>
      {/* ===================== HERO ===================== */}
      <header className="ds-hero">
        <div className="ds-hero-grid" aria-hidden="true"></div>
        <div className="ds-hero-inner">
          <p className="ds-hero-eyebrow">
            <span className="ds-live-pill"><span className="ds-pulse"></span>CREWS ON THE STREET NOW</span>
            <span>Nationwide street team marketing agency</span>
          </p>
          <h1 className="ds-hero-h1">
            <span className="ds-line"><span style={{ '--d': '.05s' } as Record<string, string>}>Street Team</span></span>
            <span className="ds-line"><span style={{ '--d': '.18s' } as Record<string, string>}><span className="outline">Marketing</span> Agency</span></span>
          </h1>
          <div className="ds-hero-sub-row">
            <p className="ds-hero-sub">
              Professional brand ambassadors and street marketing crews in{' '}
              <strong>1,000+ US cities</strong>. Real people having real conversations with your
              customers — backed by GPS check-ins, photo proof, and real-time reporting on every shift.
            </p>
            <div className="ds-hero-ctas">
              <a
                href="#contact"
                className="ds-btn ds-btn-ink"
                onClick={(e) => { e.preventDefault(); trackCTAClick('GET INSTANT QUOTE', 'homepage'); scrollToContact(); }}
              >
                Get instant quote <span className="arrow">→</span>
              </a>
              <button
                className="ds-btn ds-btn-ghost"
                onClick={() => { trackCTAClick('SEE OUR WORK', 'homepage'); navigate('/portfolio'); }}
              >
                See our work
              </button>
            </div>
          </div>
        </div>
        <Ticker items={tickerCities} />
      </header>

      <div className="ds-hazard" aria-hidden="true"></div>

      {/* ===================== PROOF ===================== */}
      <section className="ds-section ds-section--paper">
        <div className="ds-wrap">
          <p className="ds-label ds-reveal">Proof, not promises</p>
          <div className="ds-proof-grid ds-reveal">
            <div className="ds-proof-cell"><div className="ds-proof-num">1,000<span className="suffix">+</span></div><p className="ds-proof-cap">US cities covered</p></div>
            <div className="ds-proof-cell"><div className="ds-proof-num">500<span className="suffix">+</span></div><p className="ds-proof-cap">Campaigns executed</p></div>
            <div className="ds-proof-cell"><div className="ds-proof-num">94<span className="suffix">%</span></div><p className="ds-proof-cap">Client retention</p></div>
            <div className="ds-proof-cell"><div className="ds-proof-num">4.9<span className="suffix">/5</span></div><p className="ds-proof-cap">Average client rating</p></div>
          </div>
        </div>
      </section>

      {/* ===================== MANIFESTO ===================== */}
      <section className="ds-section ds-section--paper" style={{ paddingTop: 0 }}>
        <div className="ds-wrap ds-reveal">
          <h2 className="ds-h2" data-words>Digital ads get skipped. <span className="hl">A handshake doesn't.</span></h2>
          <p className="ds-lede" style={{ marginTop: 24 }}>
            People remember the person who handed them a sample, made them laugh, and told them where
            to buy it. We turn sidewalks, campuses, transit hubs, and festivals into your
            highest-converting channel — and we bring back the data to prove it.
          </p>
        </div>
      </section>

      {/* ===================== A DAY ON THE STREET (scroll-scrubbed) ===================== */}
      <section className="ds-day" id="ds-day">
        <div className="ds-day-sticky">
          <canvas className="ds-day-canvas" aria-hidden="true"></canvas>
          <div className="ds-day-content">
            <p className="ds-label">A day on the street</p>
            <div className="ds-day-clock">05:00</div>
            <p className="ds-day-scene">Load-in</p>
            <p className="ds-day-copy">Vans loaded, routes mapped, crew briefed. We're set up before the city wakes up.</p>
          </div>
          <div className="ds-day-progress" aria-hidden="true"><div className="ds-fill"></div></div>
          <p className="ds-day-hint">Scroll to run the day</p>
        </div>
      </section>

      {/* ===================== CLIENT LOGOS ===================== */}
      <section className="client-logos ds-section--concrete" style={{ padding: '48px 32px' }}>
        <div className="container">
          <p className="client-logos-label">Trusted by leading brands</p>
          <div className="client-logos-grid">
            <img src="/images/logos/netflix.svg" alt="Netflix" className="client-logo" loading="lazy" width="100" height="40" />
            <img src="/images/logos/microsoft.svg" alt="Microsoft" className="client-logo" loading="lazy" width="120" height="40" />
            <img src="/images/logos/apple.svg" alt="Apple" className="client-logo" loading="lazy" width="40" height="48" />
            <img src="/images/logos/starbucks.svg" alt="Starbucks" className="client-logo" loading="lazy" width="48" height="48" />
            <img src="/images/logos/lyft.svg" alt="Lyft" className="client-logo" loading="lazy" width="80" height="40" />
            <img src="/images/logos/nissan.svg" alt="Nissan" className="client-logo" loading="lazy" width="100" height="40" />
            <img src="/images/logos/cirque-du-soleil.svg" alt="Cirque du Soleil" className="client-logo client-logo-wide" loading="lazy" width="140" height="40" />
            <img src="/images/logos/1800-tequila.svg" alt="1800 Tequila" className="client-logo" loading="lazy" width="100" height="40" />
            <img src="/images/logos/williams-racing.svg" alt="Williams Racing" className="client-logo" loading="lazy" width="120" height="40" />
            <img src="/images/logos/ted.svg" alt="TED" className="client-logo" loading="lazy" width="60" height="40" />
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="ds-section ds-section--ink">
        <div className="ds-wrap">
          <p className="ds-label ds-reveal">What we deploy</p>
          <h2 className="ds-h2 ds-reveal">Boots on the ground.<br />Built for your brief.</h2>
          <div className="ds-rows ds-reveal" style={{ marginTop: 40 }}>
            <Link className="ds-row" to="/services/street-teams">
              <span className="ds-row-name">Street Teams</span>
              <span className="ds-row-desc">High-energy crews in branded gear working sidewalks, transit hubs, and event perimeters — driving foot traffic, sign-ups, and buzz where your audience already is.</span>
              <span className="ds-row-tag">Most booked</span>
            </Link>
            <Link className="ds-row" to="/services/product-sampling">
              <span className="ds-row-name">Product Sampling</span>
              <span className="ds-row-desc">Hand-to-hand sampling with permits, logistics, and compliance handled. You ship product; we put it in the right hands and report every interaction.</span>
              <span className="ds-row-tag">CPG favorite</span>
            </Link>
            <Link className="ds-row" to="/services/guerrilla-marketing">
              <span className="ds-row-name">Guerrilla Marketing</span>
              <span className="ds-row-desc">Sidewalk takeovers, wild posting, costumed characters, and stunts engineered to stop crowds and earn organic social reach.</span>
              <span className="ds-row-tag">Earned media</span>
            </Link>
            <Link className="ds-row" to="/services/brand-ambassadors">
              <span className="ds-row-name">Brand Ambassadors</span>
              <span className="ds-row-desc">Vetted, trained, brand-matched ambassadors for retail demos, trade shows, conferences, and long-running field programs.</span>
              <span className="ds-row-tag">Staffing</span>
            </Link>
            <Link className="ds-row" to="/services/event-staffing">
              <span className="ds-row-name">Event Staffing</span>
              <span className="ds-row-desc">Experienced staff for trade shows, festivals, conferences, and special events — registration, demos, crowd management, and VIP hospitality.</span>
              <span className="ds-row-tag">Trade shows</span>
            </Link>
            <Link className="ds-row" to="/services/flyer-distribution">
              <span className="ds-row-name">Flyer Distribution</span>
              <span className="ds-row-desc">Targeted flyer drops, poster placement, and door-to-door collateral distribution with GPS-verified routes — grassroots reach, fully accountable.</span>
              <span className="ds-row-tag">Hyperlocal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FROM THE FIELD (real campaign photos) ===================== */}
      <section className="ds-section ds-section--concrete">
        <div className="ds-wrap">
          <p className="ds-label ds-reveal">From the field</p>
          <h2 className="ds-h2 ds-reveal">Real crews. Real campaigns.</h2>
          <div className="ds-work-grid">
            <a className="ds-work-card ds-reveal" href="/case-studies/qwick-staffing">
              <img src="/images/case-studies/qwick-2.jpg" alt="Street team brand ambassador handing out free coffee promo cards in a downtown plaza" loading="lazy" />
              <div className="ds-work-meta"><span className="ds-work-tag">Street Team</span><h3>Downtown coffee activation</h3></div>
            </a>
            <a className="ds-work-card ds-reveal" href="/case-studies/car-wash-promotions">
              <img src="/images/case-studies/car-wash-2.jpg" alt="Brand ambassadors distributing promotional materials hand-to-hand outside a retail location" loading="lazy" />
              <div className="ds-work-meta"><span className="ds-work-tag">Flyer Distribution</span><h3>Hand-to-hand outreach</h3></div>
            </a>
            <a className="ds-work-card ds-reveal" href="/case-studies/cortie-digital">
              <img src="/images/case-studies/cortie-digital-2.jpg" alt="Fans receiving branded t-shirts at a stadium gate activation" loading="lazy" />
              <div className="ds-work-meta"><span className="ds-work-tag">Event Activation</span><h3>Stadium gate giveaway</h3></div>
            </a>
            <a className="ds-work-card ds-reveal" href="/case-studies/beer-samplings-national">
              <img src="/images/case-studies/beer-samplings.jpg" alt="In-store beverage product sampling display set up by a street team" loading="lazy" />
              <div className="ds-work-meta"><span className="ds-work-tag">Product Sampling</span><h3>In-store beverage sampling</h3></div>
            </a>
            <a className="ds-work-card ds-reveal" href="/case-studies/meijer-retail">
              <img src="/images/case-studies/meijer-2.jpg" alt="Branded event tent activation set up outdoors for a retail campaign" loading="lazy" />
              <div className="ds-work-meta"><span className="ds-work-tag">Brand Activation</span><h3>Branded event tent</h3></div>
            </a>
            <a className="ds-work-card ds-reveal" href="/case-studies/formula-1-las-vegas">
              <img src="/images/case-studies/formula-1-2.jpg" alt="Experiential motorsport brand activation crew on site at a racing event" loading="lazy" />
              <div className="ds-work-meta"><span className="ds-work-tag">Experiential</span><h3>Motorsport activation</h3></div>
            </a>
          </div>
          <p className="ds-reveal" style={{ marginTop: 28 }}>
            <a href="/portfolio" className="ds-btn ds-btn-ink">See the full portfolio <span className="arrow">→</span></a>
          </p>
        </div>
      </section>

      {/* ===================== PROMISE / PROCESS ===================== */}
      <section className="ds-section ds-section--concrete">
        <div className="ds-wrap">
          <p className="ds-label ds-reveal">The Street Teams Co promise</p>
          <h2 className="ds-h2 ds-reveal">Brief us Monday.<br />Own the block by Friday.</h2>
          <div className="ds-cards ds-cards-3" style={{ marginTop: 40 }}>
            <div className="ds-card ds-reveal">
              <span className="ds-step">Show-up guarantee</span>
              <h3>Crews that show</h3>
              <p>If any team member doesn't show, we replace them immediately or credit your account. No excuses, no exceptions.</p>
            </div>
            <div className="ds-card ds-reveal">
              <span className="ds-step">Trained &amp; briefed</span>
              <h3>On-brand, every shift</h3>
              <p>Every team member completes your brand training before deployment. They represent your brand like it's their own.</p>
            </div>
            <div className="ds-card ds-reveal">
              <span className="ds-step">Real-time reporting</span>
              <h3>You get the receipts</h3>
              <p>Live GPS tracking, photo uploads, and engagement metrics on every campaign. Full visibility from brief to recap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="ds-section ds-section--paper">
        <div className="ds-wrap">
          <p className="ds-label ds-reveal">What our clients say</p>
          <div className="ds-cards ds-cards-3" style={{ marginTop: 32 }}>
            <div className="ds-card ds-reveal">
              <p style={{ marginBottom: 16 }}>"Street Teams Co deployed 40 brand ambassadors across 6 cities in one week. Our client's product sampling campaign generated a 28% trial-to-purchase rate."</p>
              <strong style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>Amanda R. — Agency Director</strong>
            </div>
            <div className="ds-card ds-reveal">
              <p style={{ marginBottom: 16 }}>"We switched from ATN to Street Teams Co last year. Better staff quality, faster response times, and 20% lower costs."</p>
              <strong style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>Kevin S. — Marketing VP</strong>
            </div>
            <div className="ds-card ds-reveal">
              <p style={{ marginBottom: 16 }}>"Their guerrilla marketing team turned heads in Times Square. 50,000+ impressions in a single day and the photos went viral on social."</p>
              <strong style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>Nicole P. — Brand Manager</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COVERAGE ===================== */}
      <section className="ds-section ds-section--paper" style={{ paddingBottom: 0 }}>
        <div className="ds-wrap ds-reveal" style={{ marginBottom: 48 }}>
          <p className="ds-label">Coverage</p>
          <h2 className="ds-h2">One agency.<br />Every market that matters.</h2>
          <p className="ds-lede" style={{ marginTop: 20 }}>
            Single-city blitz or 20-market national tour — one contract, one point of contact, one
            standard of quality. If your audience is on a street, we can be there too.
          </p>
        </div>
        <div className="ds-city-band">
          <div className="ds-city-track ds-ticker-anim">
            {['New York', 'Los Angeles', 'Chicago', 'Dallas', 'Houston', 'Miami', 'Atlanta', 'Denver', 'Boston',
              'New York', 'Los Angeles', 'Chicago', 'Dallas', 'Houston', 'Miami', 'Atlanta', 'Denver', 'Boston'].map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
        <div className="ds-city-band ds-city-band--outline">
          <div className="ds-city-track ds-ticker-anim">
            {['San Francisco', 'Las Vegas', 'Washington DC', 'Seattle', 'Austin', 'Philadelphia', 'Phoenix', 'Nashville',
              'San Francisco', 'Las Vegas', 'Washington DC', 'Seattle', 'Austin', 'Philadelphia', 'Phoenix', 'Nashville'].map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* ===================== NATIONWIDE LINK HUB ===================== */}
      <section className="home-links ds-section--ink" style={{ padding: '88px 32px' }}>
        <div className="ds-wrap">
          <h2 className="ds-h2" style={{ color: 'var(--paper)' }}>Street team marketing nationwide</h2>
          <p className="ds-lede" style={{ color: '#cfccc4', marginBottom: 40 }}>
            We operate in every major market. Find street teams in your city or explore our industry expertise.
          </p>
          <div className="home-links-grid">
            <div className="home-links-col">
              <h3>Top Markets</h3>
              <ul>
                <li><Link to="/locations/georgia/atlanta">Street Teams Atlanta</Link></li>
                <li><Link to="/locations/pennsylvania/philadelphia">Street Teams Philadelphia</Link></li>
                <li><Link to="/locations/tennessee/nashville">Street Teams Nashville</Link></li>
                <li><Link to="/locations/indiana/indianapolis">Street Teams Indianapolis</Link></li>
                <li><Link to="/locations/florida/miami">Street Teams Miami</Link></li>
                <li><Link to="/locations/california/los-angeles">Street Teams Los Angeles</Link></li>
                <li><Link to="/locations/new-york/new-york-city">Street Teams New York City</Link></li>
                <li><Link to="/locations/illinois/chicago">Street Teams Chicago</Link></li>
                <li><Link to="/locations">View All 1,000+ Cities</Link></li>
              </ul>
            </div>
            <div className="home-links-col">
              <h3>Industries</h3>
              <ul>
                <li><Link to="/industries/cannabis">Cannabis Street Marketing</Link></li>
                <li><Link to="/industries/technology">Tech &amp; SaaS Marketing</Link></li>
                <li><Link to="/industries/food-beverage">Food &amp; Beverage Sampling</Link></li>
                <li><Link to="/industries/retail">Retail Activations</Link></li>
                <li><Link to="/industries/entertainment">Entertainment Campaigns</Link></li>
                <li><Link to="/industries/fitness-wellness">Fitness &amp; Wellness</Link></li>
                <li><Link to="/industries">View All 14 Industries</Link></li>
              </ul>
            </div>
            <div className="home-links-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="/what-is-street-team-marketing">What Is Street Team Marketing?</a></li>
                <li><a href="/street-team-marketing-agency">Street Team Marketing Agency</a></li>
                <li><a href="/brand-ambassador-agency">Brand Ambassador Agency</a></li>
                <li><a href="/experiential-marketing-agency">Experiential Marketing Agency</a></li>
                <li><a href="/trade-show-staffing-agency">Trade Show Staffing Agency</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
                <li><a href="/case-studies/">Case Studies &amp; Results</a></li>
                <li><a href="/blog/">Street Marketing Blog</a></li>
              </ul>
            </div>
            <div className="home-links-col">
              <h3>Major Events</h3>
              <ul>
                <li><a href="/fifa-world-cup-2026-staffing">World Cup 2026 Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/los-angeles">World Cup &mdash; LA Staffing</a></li>
                <li><a href="/fifa-world-cup-2026-staffing/new-york-new-jersey">World Cup &mdash; NYC/NJ Staffing</a></li>
                <li><a href="/los-angeles-2028-staffing">Los Angeles 2028 Staffing</a></li>
                <li><a href="/los-angeles-2028-staffing/inglewood">LA 2028 &mdash; Inglewood (SoFi)</a></li>
                <li><a href="/los-angeles-2028-staffing/downtown-la">LA 2028 &mdash; Downtown LA</a></li>
                <li><a href="/los-angeles-2028-staffing">View All LA 2028 Areas</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PLAYBOOK CTA ===================== */}
      <section className="ds-section--concrete" style={{ padding: '64px 32px', textAlign: 'center' }}>
        <div className="ds-wrap" style={{ maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
          <p className="ds-label" style={{ justifyContent: 'center' }}>Free resource · 12 pages · No phone calls</p>
          <h2 className="ds-h2">The Street Team Activation Playbook</h2>
          <p className="ds-lede" style={{ margin: '0 auto 28px' }}>
            The exact framework — brief template, staffing math, vendor scorecard — we built from 500+
            campaigns. Built for brand managers planning a measurable street team campaign in 14 days.
          </p>
          <a href="/playbook" className="ds-btn ds-btn-ink">Download the playbook (free) <span className="arrow">→</span></a>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="contact ds-section--paper" style={{ padding: '88px 32px' }}>
        <div className="ds-wrap">
          <p className="ds-label">Let's take it outside</p>
          <h2 className="ds-h2">Ready to launch your campaign?</h2>
          <p className="ds-lede" style={{ marginBottom: 32 }}>
            Tell us about your campaign and get a detailed quote, or email us at{' '}
            <a href="mailto:hello@streetteamsco.com" onClick={() => trackEmailClick()} style={{ color: 'var(--orange-deep)', fontWeight: 700 }}>hello@streetteamsco.com</a>.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
