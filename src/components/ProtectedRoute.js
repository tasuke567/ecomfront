import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const location = useLocation();
  const { user, token, loading } = useSelector(state => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};