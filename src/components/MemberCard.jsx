import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ArrowRight, BookOpen } from 'lucide-react';
import './MemberCard.css';

export default function MemberCard({ student }) {
  const [imgError, setImgError] = useState(false);

  const initials = student.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');

  const assignmentCount = student.assignmentIds?.length ?? 0;

  return (
    <Link
      to={`/members/${student.id}`}
      className="member-card"
      aria-label={`View profile of ${student.name}`}
    >
      <div className="member-card__photo-wrap">
        {!imgError && student.image ? (
          <img
            src={student.image}
            alt={student.name}
            className="member-card__photo"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="member-card__initials">{initials}</div>
        )}
        <div className="member-card__photo-overlay" />
      </div>

      <div className="member-card__body">
        <div className="member-card__badge">
          <span className="badge badge-blue">Level 500</span>
          {assignmentCount > 0 && (
            <span className="badge badge-cyan">
              <BookOpen size={10} /> {assignmentCount} Assignment{assignmentCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <h3 className="member-card__name">{student.name}</h3>
        <p className="member-card__matric">{student.matricNumber}</p>

        <div className="member-card__footer">
          <span className="member-card__dept">Computer Engineering</span>
          <span className="member-card__cta">
            View Profile <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
