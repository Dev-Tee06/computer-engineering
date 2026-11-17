import { GraduationCap, Code, Cpu } from 'lucide-react';
import './About.css';

const techniques = [
  { Icon: Code,         label: 'CSS 3D Animations', desc: 'CSS transforms, perspective, keyframe animations and custom variables.', cls: 'badge-cyan' },
  { Icon: Cpu,          label: 'HTML5 Canvas API',  desc: 'requestAnimationFrame loops with world-coordinate systems.', cls: 'badge-blue' },
  { Icon: GraduationCap,label: 'Blender / bpy',     desc: 'Python scripting inside Blender for 3D scene construction and rendering.', cls: 'badge-purple' },
];

export default function About() {
  return (
    <main className="page-wrapper">
      <div className="about container">

        <div className="about-hero">
          <div className="section-label">About This Project</div>
          <h1 className="section-title">CPE 505 — Computer Graphics and Animation</h1>
          <p className="section-subtitle">
            This interactive digital exhibition showcases the practical computer graphics and
            animation assignments submitted by 500-level Computer Engineering students at
            Federal University Oye-Ekiti.
          </p>
        </div>

        {/* University info */}
        <div className="about-uni card">
          <div className="about-uni-emblem">🎓</div>
          <div>
            <h2>Federal University Oye-Ekiti</h2>
            <p>Faculty of Computing and Information Engineering</p>
            <p>Department of Computer Engineering · Level 500</p>
            <p>Course: <strong>CPE 505 — Computer Graphics and Animation</strong></p>
          </div>
        </div>

        {/* Techniques */}
        <div className="about-section">
          <h2 className="about-section-title">Animation Techniques Used</h2>
          <div className="about-techniques">
            {techniques.map(({ Icon, label, desc, cls }) => (
              <div key={label} className="about-tech card">
                <div className="about-tech-icon"><Icon size={22} /></div>
                <span className={`badge ${cls}`}>{label}</span>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
