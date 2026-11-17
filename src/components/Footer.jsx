import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import logoImage from '../assets/fuoye-logo.jpg';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <div className="footer__brand-icon">
            <img src={logoImage} alt="" className="footer__brand-logo" />
          </div>
          <div>
            <div className="footer__brand-name">CPE 505 Exhibition</div>
            <div className="footer__brand-sub">Computer Graphics & Animation</div>
          </div>
        </div>

        <div className="footer__meta">
          <div className="footer__meta-item">
            <MapPin size={13} />
            Federal University Oye-Ekiti, Ekiti State, Nigeria
          </div>
          <div className="footer__meta-item">
            <Mail size={13} />
            Faculty of Computing and Information Engineering
          </div>
        </div>

        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/members">Members</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <span>© 2024 CPE 505 — Department of Computer Engineering · Federal University Oye-Ekiti</span>
        </div>
      </div>
    </footer>
  );
}
