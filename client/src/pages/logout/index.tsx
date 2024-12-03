import AppLoader from "../../components/app-loader";
import { useAuth } from "../../contexts/auth-context";
import { useEffect } from "react";

export default function LogoutPage() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  return <AppLoader />;
}
