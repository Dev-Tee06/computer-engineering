import { GraduationCap, BookOpen, Building2, Award } from 'lucide-react';
import './AcademicInfo.css';

const info = [
  { Icon: Building2, label: 'University', value: 'Federal University Oye-Ekiti' },
  { Icon: BookOpen, label: 'Faculty', value: 'Faculty of Computing and Information Engineering' },
  { Icon: GraduationCap, label: 'Department', value: 'Department of Computer Engineering' },
  { Icon: Award, label: 'Level & Course', value: '500 Level — CPE 505: Computer Graphics and Animation' },
];

export default function AcademicInfo() {
  return (
    <section className="academic" id="academic">
      <div className="container">
        <div className="section-label">Academic Details</div>
        <h2 className="section-title">Course Information</h2>
        <div className="academic__grid">
          {info.map(({ Icon, label, value }) => (
            <div key={label} className="academic__card card">
              <div className="academic__icon">
                <Icon size={20} />
              </div>
              <div>
                <div className="academic__label">{label}</div>
                <div className="academic__value">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
