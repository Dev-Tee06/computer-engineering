import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, User, BookOpen, AlertTriangle } from 'lucide-react';
import { getAssignmentById } from '../data/assignments';
import { getStudentById } from '../data/students';
import { resolveAnimation } from '../animations/index';
import BlenderVideoPreview from '../animations/BlenderVideoPreview';
import CrazyMotionStudio from '../animations/CrazyMotionStudio';
import './AssignmentDetail.css';

const SOURCE_STATUS_INFO = {
  complete:            { label: 'Complete Source', color: 'badge-green' },
  partial:             { label: 'Partial Source',  color: 'badge-orange' },
  'blender-script-only': { label: 'Blender Script Only', color: 'badge-purple' },
};

export default function AssignmentDetail() {
  const { id } = useParams();

  // Special route: group project
  if (id === 'crazy-motion-studio') {
    return (
      <main className="page-wrapper">
        <div className="assign-detail container">
          <Link to="/members" className="assign-detail-back">
            <ArrowLeft size={16} /> Back to Members
          </Link>
          <div className="assign-detail-header">
            <span className="badge badge-purple">Group Assignment</span>
            <h1 className="assign-detail-title">Crazy Motion Studio</h1>
            <p className="assign-detail-desc">
              A collaborative creative animation project with three scenes: The Great Chase,
              Lagos Traffic, and The Unbreakable Voice. Built with HTML, CSS animations and JavaScript.
            </p>
          </div>
          <div className="assign-detail-anim-box">
            <CrazyMotionStudio />
          </div>
        </div>
      </main>
    );
  }

  const assignment = getAssignmentById(id);
  if (!assignment) return <Navigate to="/404" replace />;

  const student = getStudentById(assignment.studentId);
  const AnimComponent = resolveAnimation(assignment);
  const statusInfo = SOURCE_STATUS_INFO[assignment.sourceStatus] ?? SOURCE_STATUS_INFO.partial;

  return (
    <main className="page-wrapper">
      <div className="assign-detail container">
        <Link to={student ? `/members/${student.id}` : '/members'} className="assign-detail-back">
          <ArrowLeft size={16} /> Back to Profile
        </Link>

        {/* Header */}
        <div className="assign-detail-header">
          <div className="assign-detail-badges">
            <span className={`badge ${statusInfo.color}`}>{statusInfo.label}</span>
            <span className="badge badge-blue">{assignment.courseCode}</span>
            <span className="badge badge-cyan">{assignment.animationType.toUpperCase()}</span>
          </div>
          <h1 className="assign-detail-title">{assignment.title}</h1>
          <p className="assign-detail-desc">{assignment.description}</p>

          {assignment.sourceStatus === 'blender-script-only' && (
            <div className="assign-detail-notice assign-detail-notice--purple">
              <AlertTriangle size={14} />
              This submission is a Blender Python (<code>bpy</code>) script. It cannot run in a
              browser. Add an exported MP4/WebM to <code>public/videos/</code> to enable playback.
            </div>
          )}
        </div>

        {/* Student info strip */}
        {student && (
          <Link to={`/members/${student.id}`} className="assign-detail-student">
            <div className="assign-detail-student-avatar">
              <User size={16} />
            </div>
            <div>
              <div className="assign-detail-student-name">{student.name}</div>
              <div className="assign-detail-student-matric">{student.matricNumber}</div>
            </div>
            <span className="assign-detail-student-cta">View Profile →</span>
          </Link>
        )}

        {/* Animation */}
        <div className="assign-detail-anim-box">
          {assignment.animationType === 'blender' ? (
            <BlenderVideoPreview assignment={assignment} />
          ) : AnimComponent ? (
            <AnimComponent assignment={assignment} />
          ) : (
            <div className="assign-detail-no-anim">
              <BookOpen size={32} />
              <p>Animation component not yet registered.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
