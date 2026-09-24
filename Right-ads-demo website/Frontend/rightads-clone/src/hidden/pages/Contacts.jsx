import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusActions from '../components/StatusActions';
import { useAdminData } from '../hooks/useAdminData';

const Contacts = () => {
  const { data, loading, error, refetch } = useAdminData('/api/contact');
  const [, setTick] = useState(0);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (row) => row.phone || '—' },
    {
      key: 'message',
      label: 'Message',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.message}</span>,
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
          module="contact"
          record={row}
          backendStatus={row.status || 'Pending'}
          generateMeeting
          onUpdate={() => { refetch(); setTick((n) => n + 1); }}
        />
      ),
    },
  ];

  if (loading) return <div className="admin-loading">Loading contacts...</div>;

  return (
    <div>
      {error && <p className="admin-error">{error}</p>}
      <DataTable columns={columns} data={data} emptyMessage="No contact messages yet." />
    </div>
  );
};

export default Contacts;
