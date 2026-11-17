import { Link } from 'react-router-dom';
import { Users, BookOpen, ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      {/* animated background grid */}
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__label">
          <span className="hero__label-dot" />
          CPE 505 · Computer Graphics and Animation
        </div>

        <h1 className="hero__heading">
          Exploring Computer Graphics
          <br />
          <span className="hero__heading-accent">Through Motion and Creativity.</span>
        </h1>

        <p className="hero__sub">
          An interactive exhibition of computer graphics and animation projects created by
          500-level Computer Engineering students of Federal University Oye-Ekiti.
        </p>

        <div className="hero__actions">
          <Link to="/members" className="btn-primary hero__btn">
            <Users size={16} /> Explore Group Members
          </Link>
          <Link to="/about" className="btn-outline hero__btn">
            <BookOpen size={16} /> About the Project
          </Link>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">16</span>
            <span className="hero__stat-label">Students</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">20+</span>
            <span className="hero__stat-label">Animations</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">3</span>
            <span className="hero__stat-label">Techniques</span>
          </div>
        </div>
      </div>

      <a href="#academic" className="hero__scroll" aria-label="Scroll down">
        <ChevronDown size={20} />
      </a>
    </section>
  );
}
