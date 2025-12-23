import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

export default function ProtectedRoute({ allowedRoles, children }) {
  const role = getRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
