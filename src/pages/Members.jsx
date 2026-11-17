import { Users } from 'lucide-react';
import MembersGrid from '../components/MembersGrid';
import './Members.css';

export default function Members() {
  return (
    <main className="page-wrapper">
      <div className="members-page">
        <div className="container">
          <div className="members-page-hero">
            <div className="members-page-icon">
              <Users size={28} />
            </div>
            <div>
              <div className="section-label">Our Team</div>
              <h1 className="section-title">Group Members</h1>
              <p className="section-subtitle">
                All 500-level Computer Engineering students who contributed to this
                Computer Graphics and Animation exhibition.
              </p>
            </div>
          </div>
          <MembersGrid />
        </div>
      </div>
    </main>
  );
}
