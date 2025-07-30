import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/use.redux';
import { Layout } from '../components/layout/layout';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};