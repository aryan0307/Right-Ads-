import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, User, Check, X, Clock } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import { apiRequest, updateMeetingStatus } from '../../config/api';
import { getToken } from '../utils/auth';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionId, setActionId] = useState(null);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest('/api/admin/meetings', { token: getToken() });
      setMeetings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load meetings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const handleStatus = async (meetingId, status) => {
    setActionId(meetingId);
    try {
      await updateMeetingStatus(meetingId, status, getToken());
      await fetchMeetings();
    } catch (err) {
      alert(err.message || 'Failed to update meeting');
    } finally {
      setActionId(null);
    }
  };

  if (loading) return <div className="admin-loading">Loading meetings...</div>;
  if (error) return <p className="admin-error">{error}</p>;

  if (!meetings.length) {
    return (
      <EmptyState
        message="No meetings scheduled yet. Approve a contact or lead request to generate a consultation meeting."
        icon={Video}
      />
    );
  }

  return (
    <div className="admin-meetings-grid">
      {meetings.map((meeting) => (
        <article key={meeting.id} className="admin-meeting-card floating-glass float-md">
          <div className="admin-meeting-card-header">
            <Video size={22} className="text-accent" />
            <StatusBadge status={meeting.status} />
          </div>
          <h3>{meeting.client_name}</h3>
          <div className="admin-meeting-meta">
            <span><User size={14} /> {meeting.client_email}</span>
            <span><Calendar size={14} /> {meeting.meeting_date || 'TBD'} at {meeting.meeting_time || 'TBD'}</span>
          </div>
          <div className="admin-meeting-id">
            Meeting ID: <strong>{meeting.meeting_id}</strong>
          </div>
          <div className="admin-meeting-id">
            Room: <strong>{meeting.room_id}</strong>
          </div>

          <div className="admin-meeting-actions">
            {meeting.status === 'Pending' && (
              <button
                type="button"
                className="admin-action-btn approve"
                disabled={actionId === meeting.id}
                onClick={() => handleStatus(meeting.id, 'Scheduled')}
              >
                <Check size={14} /> Approve
              </button>
            )}
            {meeting.status === 'Scheduled' && (
              <button
                type="button"
                className="admin-action-btn approve"
                disabled={actionId === meeting.id}
                onClick={() => handleStatus(meeting.id, 'Completed')}
              >
                <Clock size={14} /> Complete
              </button>
            )}
            {meeting.status !== 'Cancelled' && meeting.status !== 'Completed' && (
              <button
                type="button"
                className="admin-action-btn decline"
                disabled={actionId === meeting.id}
                onClick={() => handleStatus(meeting.id, 'Cancelled')}
              >
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <Link to={`/meeting/${meeting.room_id}`} className="admin-meeting-join-btn">
            Join Meeting
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Meetings;
