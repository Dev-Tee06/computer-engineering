import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import AcademicInfo from '../components/AcademicInfo';
import MembersGrid from '../components/MembersGrid';
import CrazyMotionStudio from '../animations/CrazyMotionStudio';
import './Home.css';

export default function Home() {
  return (
    <main>
      <Hero />
      <AcademicInfo />

      {/* Featured Group Project */}
      <section className="home-featured">
        <div className="container">
          <div className="section-label">
            <Sparkles size={12} /> Featured Group Assignment
          </div>
          <div className="home-featured-header">
            <div>
              <h2 className="section-title">Crazy Motion Studio</h2>
              <p className="section-subtitle">
                The group's collaborative creative animation project — three scenes, one cinematic experience.
              </p>
            </div>
            <Link to="/animations/crazy-motion-studio" className="btn-outline home-featured-link">
              View Full Page <ArrowRight size={14} />
            </Link>
          </div>
          <div className="home-featured-anim">
            <CrazyMotionStudio />
          </div>
        </div>
      </section>

      {/* Group Members preview */}
      <section className="home-members">
        <div className="container">
          <div className="home-members-header">
            <div>
              <h2 className="section-title">Group Members</h2>
              <p className="section-subtitle">
                16 Computer Engineering students from the 2021 and 2022 cohorts.
              </p>
            </div>
            <Link to="/members" className="btn-outline">
              View All Members <ArrowRight size={14} />
            </Link>
          </div>
          <MembersGrid limit={8} />
        </div>
      </section>
    </main>
  );
}
