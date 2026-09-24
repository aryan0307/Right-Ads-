import { useState } from 'react';
import { Check, X } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { updateRecordStatus } from '../../config/api';
import { getToken } from '../utils/auth';
import { getUnifiedStatus } from '../utils/statusStore';

const StatusActions = ({
  module,
  record,
  backendStatus = 'Pending',
  onUpdate,
  generateMeeting = false,
}) => {
  const [loading, setLoading] = useState(false);
  const status = getUnifiedStatus(backendStatus);
  const isFinal = status === 'Approved' || status === 'Declined';

  const handleStatus = async (newStatus) => {
    setLoading(true);
    try {
      await updateRecordStatus(
        module,
        record.id,
        newStatus,
        getToken(),
        generateMeeting && newStatus === 'Approved',
      );
      onUpdate?.();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-status-cell">
      <StatusBadge status={status} normalize />
      {!isFinal && (
        <div className="admin-status-actions">
          <button
            type="button"
            className="admin-action-btn approve"
            onClick={() => handleStatus('Approved')}
            disabled={loading}
            title="Approve"
          >
            <Check size={14} /> Approve
          </button>
          <button
            type="button"
            className="admin-action-btn decline"
            onClick={() => handleStatus('Declined')}
            disabled={loading}
            title="Decline"
          >
            <X size={14} /> Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusActions;
