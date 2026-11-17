import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/fuoye-logo.jpg';
import './navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/members', label: 'Group Members' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <div className="navbar__brand-icon">
            <img src={logoImage} alt="" className="navbar__brand-logo" />
          </div>
          <span className="navbar__brand-text">CPE 505 Group 8</span>
        </Link>

        <nav className={`navbar__nav${open ? ' navbar__nav--open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="navbar__hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile overlay */}
      {open && <div className="navbar__overlay" onClick={() => setOpen(false)} />}
    </header>
  );
}
