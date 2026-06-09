import EmptyState from './EmptyState';

const DataTable = ({ columns, data, emptyMessage = 'No records found.', emptyIcon }) => {
  if (!data?.length) {
    return <EmptyState message={emptyMessage} icon={emptyIcon} />;
  }

  return (
    <div className="admin-table-wrap floating-glass floating-glass--static">
      <table className="admin-table admin-table-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((col) => (
                <td key={col.key} className={col.fullWidth ? 'admin-cell-full' : ''}>
                  {col.render ? col.render(row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
