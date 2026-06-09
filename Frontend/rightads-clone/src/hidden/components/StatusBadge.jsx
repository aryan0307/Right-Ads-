import { getUnifiedStatus } from '../utils/statusStore';

const statusColors = {
  Pending: { bg: '#f59e0b', text: '#f59e0b' },
  Approved: { bg: '#22c55e', text: '#22c55e' },
  Declined: { bg: '#ef4444', text: '#ef4444' },
  Scheduled: { bg: '#2563EB', text: '#2563EB' },
  Completed: { bg: '#22c55e', text: '#22c55e' },
  Cancelled: { bg: '#ef4444', text: '#ef4444' },
};

const StatusBadge = ({ status, normalize = false }) => {
  const label = normalize ? getUnifiedStatus(status) : status;
  const colors = statusColors[label] || statusColors[getUnifiedStatus(status)] || { bg: '#64748B', text: '#64748B' };
  return (
    <span
      className="admin-status-badge"
      style={{
        background: `${colors.bg}20`,
        color: colors.text,
        borderColor: `${colors.bg}40`,
      }}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
