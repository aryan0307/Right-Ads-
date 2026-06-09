import { Inbox } from 'lucide-react';

const EmptyState = ({ message = 'No records found.', icon: Icon = Inbox }) => (
  <div className="admin-empty-state floating-glass">
    <Icon size={40} className="text-accent" style={{ opacity: 0.5, marginBottom: 12 }} />
    <p>{message}</p>
  </div>
);

export default EmptyState;
