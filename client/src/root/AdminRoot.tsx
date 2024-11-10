import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminDashboard from '@/pages/admin/AdminDashboard';

const AdminRoot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoginMatutumMapping = localStorage.getItem('isLoginMatutumMapping');

  useEffect(() => {
    if (!isLoginMatutumMapping) {
      navigate('/login');
    }
  }, [isLoginMatutumMapping, navigate]);

  return <AdminDashboard />;
};

export default AdminRoot;
