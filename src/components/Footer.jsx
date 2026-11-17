import { MapPin } from 'lucide-react';
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
            <div className="footer__brand-name">CPE 505 Group 8</div>
          </div>
        </div>

        <div className="footer__meta">
          <div className="footer__meta-item">
            <MapPin size={13} />
            Federal University Oye-Ekiti, Ekiti State, Nigeria
          </div>
        </div>
      </div>
    </footer>
  );
}
