import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuth, children }: any) {
  const token = localStorage.getItem("token");
  if (!isAuth && !token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

