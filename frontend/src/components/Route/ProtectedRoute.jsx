import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
