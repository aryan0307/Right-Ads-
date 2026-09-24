import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusActions from '../components/StatusActions';
import { useAdminData } from '../hooks/useAdminData';

const Internships = () => {
  const { data, loading, error, refetch } = useAdminData('/api/internships');
  const [, setTick] = useState(0);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'college', label: 'College' },
    { key: 'branch', label: 'Branch', render: (row) => row.branch || '—' },
    { key: 'year', label: 'Year', render: (row) => row.year || '—' },
    {
      key: 'skills',
      label: 'Skills',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.skills || '—'}</span>,
    },
    {
      key: 'resume_path',
      label: 'Resume',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.resume_path || '—'}</span>,
    },
    { key: 'domain', label: 'Domain', render: (row) => row.domain || '—' },
    { key: 'date', label: 'Date', render: () => '—' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <StatusActions
          module="internship"
          record={row}
          backendStatus={row.status}
          onUpdate={() => { refetch(); setTick((n) => n + 1); }}
        />
      ),
    },
  ];

  if (loading) return <div className="admin-loading">Loading internship applications...</div>;

  return (
    <div>
      {error && <p className="admin-error">{error}</p>}
      <DataTable columns={columns} data={data} emptyMessage="No internship applications yet." />
    </div>
  );
};

export default Internships;
