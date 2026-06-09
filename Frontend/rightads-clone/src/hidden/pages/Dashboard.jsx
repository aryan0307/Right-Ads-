import { useEffect, useState } from 'react';
import { Target, Clock, CheckCircle, XCircle, Video, CalendarCheck } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { apiRequest } from '../../config/api';
import { getToken } from '../utils/auth';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await apiRequest('/api/admin/analytics', { token: getToken() });
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;
  if (error) return <p className="admin-error">{error}</p>;

  return (
    <div>
      <div className="admin-stats-grid">
        <StatsCard label="Total Leads" value={stats.total_leads} icon={Target} accent="#2563EB" />
        <StatsCard label="Pending Requests" value={stats.pending_requests} icon={Clock} accent="#f59e0b" />
        <StatsCard label="Approved Requests" value={stats.approved_requests} icon={CheckCircle} accent="#22c55e" />
        <StatsCard label="Declined Requests" value={stats.declined_requests} icon={XCircle} accent="#ef4444" />
        <StatsCard label="Scheduled Meetings" value={stats.scheduled_meetings} icon={Video} accent="#3B82F6" />
        <StatsCard label="Completed Meetings" value={stats.completed_meetings} icon={CalendarCheck} accent="#60A5FA" />
      </div>
    </div>
  );
};

export default Dashboard;
