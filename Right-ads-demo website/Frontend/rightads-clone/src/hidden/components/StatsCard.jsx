const StatsCard = ({ label, value, icon: Icon, accent }) => (
  <div className="admin-stats-card floating-glass float-sm">
    <div className="admin-stats-icon" style={{ background: `${accent}20`, color: accent }}>
      <Icon size={22} />
    </div>
    <div className="admin-stats-info">
      <span className="admin-stats-value">{value}</span>
      <span className="admin-stats-label">{label}</span>
    </div>
  </div>
);

export default StatsCard;
