import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
 const { isAuthenticated, user, loading } = useAuth(); // ✅ include user if you want to log it

if (loading) return <div>Loading...</div>;

console.log("Auth State →", { isAuthenticated, user });

return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
