import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminDashboard from '@/pages/admin/AdminDashboard';

const AdminRoot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLogin = true;

  useEffect(() => {
    if (!isLogin) {
      navigate('/admin/login');
    }
  }, [isLogin, navigate]);

  return <AdminDashboard />;
};

export default AdminRoot;
