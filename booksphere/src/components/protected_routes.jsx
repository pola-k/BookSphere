// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user_id = sessionStorage.getItem('user_id');
  
  if (!user_id) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
