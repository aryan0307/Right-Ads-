import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusActions from '../components/StatusActions';
import { useAdminData } from '../hooks/useAdminData';

const Certificates = () => {
  const { data, loading, error, refetch } = useAdminData('/api/certificates');
  const [, setTick] = useState(0);

  const columns = [
    { key: 'certificate_id', label: 'Certificate ID' },
    { key: 'name', label: 'Client Name' },
    { key: 'business', label: 'Business Name', render: () => '—' },
    { key: 'domain', label: 'Domain', render: (row) => row.domain || '—' },
    {
      key: 'issue_date',
      label: 'Issue Date',
      render: (row) => row.issue_date || '—',
    },
    {
      key: 'pdf_path',
      label: 'PDF',
      fullWidth: true,
      render: (row) => <span className="admin-cell-wrap">{row.pdf_path || '—'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <StatusActions
          module="certificate"
          record={row}
          backendStatus={row.status}
          onUpdate={() => { refetch(); setTick((n) => n + 1); }}
        />
      ),
    },
  ];

  if (loading) return <div className="admin-loading">Loading certificates...</div>;

  return (
    <div>
      {error && <p className="admin-error">{error}</p>}
      <DataTable columns={columns} data={data} emptyMessage="No certificates yet." />
    </div>
  );
};

export default Certificates;
