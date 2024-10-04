import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();
  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <div className="spinner-border text-primary" role="status"></div>
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   );
  // }
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
