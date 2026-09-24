import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Target,
  Briefcase,
  GraduationCap,
  FileBadge,
  Video,
  LogOut,
} from 'lucide-react';
import { clearAuth } from '../utils/auth';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/contact', label: 'Contacts', icon: MessageSquare },
  { to: '/dashboard/leads', label: 'Leads', icon: Target },
  { to: '/dashboard/careers', label: 'Careers', icon: Briefcase },
  { to: '/dashboard/internships', label: 'Internships', icon: GraduationCap },
  { to: '/dashboard/certificates', label: 'Certificates', icon: FileBadge },
  { to: '/dashboard/meetings', label: 'Meetings', icon: Video },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar floating-glass floating-glass--static">
      <div className="admin-sidebar-brand">
        <h2>Right Ads</h2>
        <span>Admin Portal</span>
      </div>
      <nav className="admin-sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button type="button" className="admin-logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
