import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const ProtectedRoute = ({ roles, children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
