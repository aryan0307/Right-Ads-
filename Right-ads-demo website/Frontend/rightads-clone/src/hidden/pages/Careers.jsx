import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusActions from '../components/StatusActions';
import { useAdminData } from '../hooks/useAdminData';

const Careers = () => {
  const { data, loading, error, refetch } = useAdminData('/api/careers');
  const [, setTick] = useState(0);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (row) => row.phone || '—' },
    {
      key: 'skills',
      label: 'Skills',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.skills || '—'}</span>,
    },
    { key: 'experience', label: 'Experience', render: (row) => row.experience || '—' },
    {
      key: 'resume_path',
      label: 'Resume',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.resume_path || '—'}</span>,
    },
    {
      key: 'position',
      label: 'Applied Position',
      render: (row) => row.skills?.split(',')[0]?.trim() || 'Open Position',
    },
    { key: 'date', label: 'Date', render: () => '—' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <StatusActions
          module="career"
          record={row}
          backendStatus={row.status}
          onUpdate={() => { refetch(); setTick((n) => n + 1); }}
        />
      ),
    },
  ];

  if (loading) return <div className="admin-loading">Loading career applications...</div>;

  return (
    <div>
      {error && <p className="admin-error">{error}</p>}
      <DataTable columns={columns} data={data} emptyMessage="No career applications yet." />
    </div>
  );
};

export default Careers;
