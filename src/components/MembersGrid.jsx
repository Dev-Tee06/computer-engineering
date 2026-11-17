import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import MemberCard from './MemberCard';
import { students } from '../data/students';
import './MembersGrid.css';

export default function MembersGrid({ limit }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list = limit ? students.slice(0, limit) : students;
    if (!q) return list;
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.matricNumber.toLowerCase().includes(q)
    );
  }, [query, limit]);

  return (
    <div className="members-grid-wrapper">
      {!limit && (
        <div className="members-grid-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by name or matric number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <div className="members-grid">
        {filtered.map((s) => (
          <MemberCard key={s.id} student={s} />
        ))}
        {filtered.length === 0 && (
          <p className="members-grid-empty">No students match your search.</p>
        )}
      </div>
    </div>
  );
}
