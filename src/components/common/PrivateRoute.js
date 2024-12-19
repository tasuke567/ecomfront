import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // Redirect to login and save the attempted URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;