import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to sign-in page
    return <Navigate to="/sign-in" replace />;
  }

  // If token exists, allow to access the page
  return children;
};

export default ProtectedRoute;
