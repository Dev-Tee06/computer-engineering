import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="page-wrapper">
      <div className="notfound">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/members" className="btn-outline">View Members</Link>
        </div>
      </div>
    </main>
  );
}
