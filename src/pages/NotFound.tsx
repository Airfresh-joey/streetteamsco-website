import { Link } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

export default function NotFound() {
  useMetaTags({
    title: 'Page Not Found | Street Teams Co',
    description: 'The page you are looking for could not be found.',
  });

  return (
    <div className="locations-page">
      <section className="locations-hero">
        <div className="container">
          <h1>Page Not Found</h1>
          <p className="locations-hero-subtitle">
            The page you're looking for doesn't exist.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/locations" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              Browse Locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
