import { User } from 'lucide-react';

const MeetingCard = ({ name, role, isActive = false }) => (
  <div className={`meeting-participant-card floating-glass ${isActive ? 'active' : ''}`}>
    <div className="meeting-avatar-placeholder">
      <User size={28} />
    </div>
    <div className="meeting-participant-info">
      <span className="meeting-participant-name">{name}</span>
      <span className="meeting-participant-role">{role}</span>
    </div>
    {isActive && <span className="meeting-speaking-dot" />}
  </div>
);

export default MeetingCard;
