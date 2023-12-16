import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: {
  isAllowed: boolean;
  redirectPath?: string;
  children: ReactNode;
}) => {
  return isAllowed ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
