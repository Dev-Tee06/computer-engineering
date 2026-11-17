import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, BookOpen, Building2, Hash } from 'lucide-react';
import { getStudentById } from '../data/students';
import { getAssignmentsByStudent } from '../data/assignments';
import { resolveAnimation } from '../animations/index';
import BlenderVideoPreview from '../animations/BlenderVideoPreview';
import './StudentProfile.css';

export default function StudentProfile() {
  const { id } = useParams();
  const student = getStudentById(id);
  if (!student) return <Navigate to="/404" replace />;

  const assignments = getAssignmentsByStudent(id);

  return (
    <main className="page-wrapper">
      <div className="profile container">
        <Link to="/members" className="profile-back">
          <ArrowLeft size={16} /> Back to Members
        </Link>

        {/* Profile header card */}
        <div className="profile-card">
          <div className="profile-photo-wrap">
            <StudentPhoto student={student} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{student.name}</h1>
            <div className="profile-matric">{student.matricNumber}</div>

            <div className="profile-meta-grid">
              <MetaItem Icon={Building2} label="University" value="Federal University Oye-Ekiti" />
              <MetaItem Icon={BookOpen} label="Faculty" value={student.faculty} />
              <MetaItem Icon={GraduationCap} label="Department" value={student.department} />
              <MetaItem Icon={Hash} label="Level" value={`${student.level} Level`} />
              <MetaItem Icon={BookOpen} label="Course" value="CPE 505 — Computer Graphics and Animation" />
            </div>
          </div>
        </div>

        {/* Assignment history */}
        <div className="profile-assignments">
          <div className="profile-assignments-header">
            <h2>Assignment History</h2>
            <span className="badge badge-blue">
              {assignments.length} Submission{assignments.length !== 1 ? 's' : ''}
            </span>
          </div>

          {assignments.length === 0 ? (
            <p className="profile-no-assignments">No assignments have been added yet.</p>
          ) : (
            <div className="profile-assignments-list">
              {assignments.map((a) => (
                <AssignmentBlock key={a.id} assignment={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */

function MetaItem({ Icon, label, value }) {
  return (
    <div className="profile-meta-item">
      <div className="profile-meta-icon"><Icon size={15} /></div>
      <div>
        <div className="profile-meta-label">{label}</div>
        <div className="profile-meta-value">{value}</div>
      </div>
    </div>
  );
}

function StudentPhoto({ student }) {
  const [err, setErr] = useState(false);
  const initials = student.name.split(' ').slice(0, 2).map((n) => n[0]).join('');

  if (!err && student.image) {
    return (
      <img
        src={student.image}
        alt={student.name}
        className="profile-photo"
        onError={() => setErr(true)}
      />
    );
  }
  return <div className="profile-initials">{initials}</div>;
}

function AssignmentBlock({ assignment }) {
  const AnimComponent = resolveAnimation(assignment);
  const statusColors = {
    complete: 'badge-green',
    partial: 'badge-orange',
    'blender-script-only': 'badge-purple',
  };

  return (
    <div className="assign-block">
      <div className="assign-block-header">
        <div className="assign-block-badges">
          <span className={`badge ${statusColors[assignment.sourceStatus] ?? 'badge-orange'}`}>
            {assignment.sourceStatus === 'complete' ? 'Complete' :
             assignment.sourceStatus === 'partial' ? 'Partial Source' : 'Blender Script'}
          </span>
          <span className="badge badge-blue">{assignment.courseCode}</span>
          <span className="badge badge-cyan">{assignment.animationType.toUpperCase()}</span>
        </div>
        <Link to={`/animations/${assignment.id}`} className="assign-block-link">
          View Full Page →
        </Link>
      </div>

      <h3 className="assign-block-title">{assignment.title}</h3>
      <p className="assign-block-desc">{assignment.description}</p>

      <div className="assign-block-anim">
        {assignment.animationType === 'blender' ? (
          <BlenderVideoPreview assignment={assignment} />
        ) : AnimComponent ? (
          <AnimComponent assignment={assignment} />
        ) : (
          <div className="assign-block-placeholder">Animation component not registered.</div>
        )}
      </div>
    </div>
  );
}
