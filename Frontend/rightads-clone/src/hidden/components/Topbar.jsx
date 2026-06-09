import { useLocation } from 'react-router-dom';
import { getAdminUser } from '../utils/auth';

const titles = {
  '/dashboard': 'Dashboard Overview',
  '/dashboard/contact': 'Contact Messages',
  '/dashboard/leads': 'Service Leads',
  '/dashboard/careers': 'Career Applications',
  '/dashboard/internships': 'Internship Applications',
  '/dashboard/certificates': 'Certificates',
  '/dashboard/meetings': 'Consultation Meetings',
};

const Topbar = () => {
  const { pathname } = useLocation();
  const username = getAdminUser() || 'Admin';

  return (
    <header className="admin-topbar floating-glass floating-glass--static">
      <div>
        <h1>{titles[pathname] || 'Admin'}</h1>
        <p>Manage enquiries, applications, and consultations</p>
      </div>
      <div className="admin-topbar-user">
        <span className="admin-user-badge">{username}</span>
      </div>
    </header>
  );
};

export default Topbar;
