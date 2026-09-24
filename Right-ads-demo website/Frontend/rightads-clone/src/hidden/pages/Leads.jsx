import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusActions from '../components/StatusActions';
import { useAdminData } from '../hooks/useAdminData';

const Leads = () => {
  const { data, loading, error, refetch } = useAdminData('/api/leads');
  const [, setTick] = useState(0);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (row) => row.phone || '—' },
    { key: 'service_required', label: 'Service' },
    { key: 'budget', label: 'Budget', render: (row) => row.budget || '—' },
    {
      key: 'message',
      label: 'Requirement',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.message || '—'}</span>,
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (row) => new Date(row.created_at).toLocaleString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <StatusActions
          module="lead"
          record={row}
          backendStatus={row.status}
          generateMeeting
          onUpdate={() => { refetch(); setTick((n) => n + 1); }}
        />
      ),
    },
  ];

  if (loading) return <div className="admin-loading">Loading leads...</div>;

  return (
    <div>
      {error && <p className="admin-error">{error}</p>}
      <DataTable columns={columns} data={data} emptyMessage="No service leads yet." />
    </div>
  );
};

export default Leads;
