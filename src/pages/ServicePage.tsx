import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { useMetaTags } from '../hooks/useMetaTags';
import NotFound from './NotFound';

// Curated Unsplash photos per service — real campaign/field work vibes
const servicePhotos: Record<string, { src: string; alt: string }[]> = {
  'brand-ambassadors': [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop', alt: 'Brand ambassador engaging consumers at a live event' },
    { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=900&auto=format&fit=crop', alt: 'Brand ambassadors representing a product at a pop-up activation' },
    { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop', alt: 'Professional brand ambassador team briefing before campaign deployment' },
  ],
  'street-teams': [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop', alt: 'Street team engaging pedestrians in a high-traffic urban area' },
    { src: 'https://images.unsplash.com/photo-1461180011046-0d3f86e2892f?q=80&w=900&auto=format&fit=crop', alt: 'Street marketing team distributing branded materials downtown' },
    { src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=900&auto=format&fit=crop', alt: 'Street team coordinator managing campaign logistics in the field' },
  ],
  'event-staffing': [
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop', alt: 'Professional event staff managing registration at a corporate conference' },
    { src: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=900&auto=format&fit=crop', alt: 'Event staffing team at a large brand activation' },
    { src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=900&auto=format&fit=crop', alt: 'Experienced event professionals running a seamless product launch' },
  ],
  'product-sampling': [
    { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop', alt: 'Product sampling staff handing out samples at a busy market event' },
    { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop', alt: 'Consumer sampling campaign in action at a high-foot-traffic location' },
    { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop', alt: 'Brand ambassador running a product trial and sampling program' },
  ],
  'guerrilla-marketing': [
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop', alt: 'Guerrilla marketing activation drawing a crowd in an urban setting' },
    { src: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=900&auto=format&fit=crop', alt: 'Street-level guerrilla marketing campaign creating brand buzz' },
    { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop', alt: 'Brand activation guerrilla event generating consumer engagement' },
  ],
  'flyer-distribution': [
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop', alt: 'Street team distributing flyers in a high-traffic pedestrian zone' },
    { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop', alt: 'Campaign coordinator tracking flyer distribution routes' },
    { src: 'https://images.unsplash.com/photo-1461180011046-0d3f86e2892f?q=80&w=900&auto=format&fit=crop', alt: 'Professional flyering team covering city blocks for a brand launch' },
  ],
  'experiential-marketing': [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop', alt: 'Experiential marketing activation with immersive brand experience' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop', alt: 'Live brand experience drawing crowds and creating social moments' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop', alt: 'Experiential event staff delivering an on-brand consumer activation' },
  ],
  'promotional-staffing': [
    { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=900&auto=format&fit=crop', alt: 'Promotional staffing team representing a brand at an activation' },
    { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop', alt: 'On-demand promo staff briefed and ready for a brand event' },
    { src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=900&auto=format&fit=crop', alt: 'Promotional models and brand ambassadors at a trade show booth' },
  ],
};

const relatedBlogPosts: Record<string, { title: string; url: string }[]> = {
  'street-teams': [
    { title: 'The Ultimate Guide to Street Team Marketing in 2026', url: '/blog/ultimate-guide-street-team-marketing.html' },
    { title: 'Street Team Marketing ROI: Boots on the Ground', url: '/blog/street-team-marketing-roi-boots-on-the-ground.html' },
    { title: 'How to Choose a Street Team Marketing Agency', url: '/blog/street-team-marketing-services-how-to-choose-agency.html' },
  ],
  'brand-ambassadors': [
    { title: 'How to Build a Brand Ambassador Program', url: '/blog/brand-ambassador-program-build-train-launch-guide.html' },
    { title: 'How to Hire Brand Ambassadors', url: '/blog/how-to-hire-brand-ambassadors.html' },
    { title: 'Brand Ambassador vs Street Team: Key Differences', url: '/blog/brand-ambassador-vs-street-team-differences.html' },
  ],
  'event-staffing': [
    { title: 'Event Staffing for Trade Shows Guide', url: '/blog/event-staffing-trade-shows-guide.html' },
    { title: 'Event Staffing for Corporate Events', url: '/blog/event-staffing-for-corporate-events.html' },
    { title: 'Hiring Event Staff Last Minute', url: '/blog/hiring-event-staff-last-minute.html' },
  ],
  'product-sampling': [
    { title: 'How to Run a Product Sampling Campaign', url: '/blog/how-to-run-a-product-sampling-campaign.html' },
    { title: 'Product Sampling Campaigns That Convert', url: '/blog/product-sampling-campaigns-that-convert.html' },
    { title: 'Direct to Consumer Sampling Strategies', url: '/blog/direct-to-consumer-sampling-strategies.html' },
  ],
  'guerrilla-marketing': [
    { title: 'Guerrilla Marketing Campaigns That Drive Results', url: '/blog/guerrilla-marketing-campaigns-that-drive-results.html' },
    { title: 'Guerrilla Marketing Case Studies: What Works', url: '/blog/guerrilla-marketing-case-studies-what-actually-works.html' },
    { title: 'Guerrilla Marketing Agency vs DIY', url: '/blog/guerrilla-marketing-agency-vs-diy.html' },
  ],
  'flyer-distribution': [
    { title: 'Professional Flyering Services Guide', url: '/blog/professional-flyering-services-flyer-distribution-guide.html' },
    { title: 'Flyer Distribution Best Practices', url: '/blog/flyer-distribution-best-practices.html' },
    { title: 'Street Team Promotion Ideas', url: '/blog/street-team-promotion-ideas-that-drive-conversions.html' },
  ],
  'experiential-marketing': [
    { title: 'What Is Experiential Marketing?', url: '/blog/what-is-experiential-marketing.html' },
    { title: 'Experiential Marketing Trends 2026', url: '/blog/experiential-marketing-trends-2026.html' },
    { title: 'Interactive Brand Experiences Guide', url: '/blog/interactive-brand-experiences-guide.html' },
  ],
  'promotional-staffing': [
    { title: 'Promotional Models vs Brand Ambassadors', url: '/blog/promotional-models-vs-brand-ambassadors.html' },
    { title: 'Pop-Up Shop Staffing Guide', url: '/blog/pop-up-shop-staffing-guide.html' },
    { title: 'Brand Ambassador Training Template', url: '/blog/brand-ambassador-training-program-template.html' },
  ],
};

export default function ServicePage() {
  const { service: serviceSlug } = useParams<{ service: string }>();
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  const serviceTitles: Record<string, string> = {
    'street-teams': 'Street Team Marketing Agency | Professional Street Teams Nationwide',
    'brand-ambassadors': 'Brand Ambassador Agency | Hire Nationwide Brand Ambassadors',
    'event-staffing': 'Event Staffing Agency | Professional Event Staff Nationwide',
    'product-sampling': 'Product Sampling Agency | Consumer Sampling Campaigns',
    'guerrilla-marketing': 'Guerrilla Marketing Agency | Creative Street Activations',
    'flyer-distribution': 'Flyer Distribution Services | Professional Flyering Nationwide',
    'experiential-marketing': 'Experiential Marketing Agency | Immersive Brand Experiences',
    'promotional-staffing': 'Promotional Staffing Agency | On-Demand Promo Talent',
  };

  useMetaTags({
    title: service
      ? (serviceTitles[service.slug] || `${service.name} Services | Street Teams Co`)
      : 'Service Not Found | Street Teams Co',
    description: service
      ? `${service.name} services in 1,000+ US cities. ${service.description.slice(0, 120)} Get a free quote today.`
      : 'Service not found.',
    canonical: service
      ? `https://streetteamsco.com/services/${service.slug}`
      : undefined,
    schema: service ? [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://streetteamsco.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://streetteamsco.com/services' },
          { '@type': 'ListItem', 'position': 3, 'name': service.name, 'item': `https://streetteamsco.com/services/${service.slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': service.name,
        'provider': { '@type': 'Organization', 'name': 'Street Teams Co', 'url': 'https://streetteamsco.com' },
        'description': service.description,
        'areaServed': 'United States',
        'url': `https://streetteamsco.com/services/${service.slug}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': service.faq.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a,
          },
        })),
      },
    ] : undefined,
  });

  if (!service) return <NotFound />;

  const photos = servicePhotos[service.slug] || servicePhotos['brand-ambassadors'];

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/services">All Services</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{service.name}</span>
          </nav>
          <h1>{service.name}</h1>
          <p className="locations-hero-subtitle">{service.tagline}</p>
        </div>
      </section>

      {/* Trust bar */}
      <div className="service-trust-bar">
        <div className="container">
          <div className="service-trust-items">
            <div className="service-trust-item">
              <span className="service-trust-num">10,000+</span>
              <span className="service-trust-label">Staff Nationwide</span>
            </div>
            <div className="service-trust-divider" />
            <div className="service-trust-item">
              <span className="service-trust-num">1,000+</span>
              <span className="service-trust-label">Cities Covered</span>
            </div>
            <div className="service-trust-divider" />
            <div className="service-trust-item">
              <span className="service-trust-num">500+</span>
              <span className="service-trust-label">Campaigns Executed</span>
            </div>
            <div className="service-trust-divider" />
            <div className="service-trust-item">
              <span className="service-trust-num">94%</span>
              <span className="service-trust-label">Client Retention</span>
            </div>
          </div>
        </div>
      </div>

      <section className="locations-content">
        <div className="container">
          <div className="service-detail">
            <div className="service-detail-intro">
              <h2>About {service.name}</h2>
              <p>{service.description}</p>
            </div>

            {/* Photo grid — real campaign work */}
            <div className="service-photo-grid">
              {photos.map((photo, i) => (
                <div key={i} className="service-photo-item">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            <div className="service-detail-section">
              <h3>What's Included</h3>
              <ul className="feature-list">
                {service.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-section">
              <h3>Benefits</h3>
              <div className="benefits-grid">
                {service.benefits.map((b, i) => (
                  <div key={i} className="benefit-card">{b}</div>
                ))}
              </div>
            </div>

            <div className="service-detail-section">
              <h3>Common Use Cases</h3>
              <ul className="feature-list">
                {service.useCases.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>

            <div className="service-detail-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                {service.faq.map((item, i) => (
                  <div key={i} className="faq-item">
                    <h4>{item.q}</h4>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {relatedBlogPosts[service.slug] && (
              <div className="service-detail-section">
                <h3>Related Resources</h3>
                <ul className="related-posts-list">
                  {relatedBlogPosts[service.slug].map((post, i) => (
                    <li key={i}><a href={post.url}>{post.title}</a></li>
                  ))}
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <Link to="/pricing">View our pricing</Link> | <Link to="/testimonials">See client results</Link>
                </p>
              </div>
            )}

            <div className="city-cta">
              <h3>Ready to Get Started with {service.name}?</h3>
              <p>Contact Street Teams Co today for a custom campaign proposal.</p>
              <Link to="/pricing" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
                View Pricing
              </Link>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
