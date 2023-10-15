import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function AuthOutlet() {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? <Navigate to="/" state={{ from: location }} /> : <Outlet />;
}
