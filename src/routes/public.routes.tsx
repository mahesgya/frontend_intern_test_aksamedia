import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/use.redux';

export const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};