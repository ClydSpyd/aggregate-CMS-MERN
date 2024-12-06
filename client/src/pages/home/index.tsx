import { useAuth } from "../../contexts/auth-context";
import Dashboard from "./dashboard";
import LoginForm from "./login-form";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex gap-2 h-full wl-full">{!user ? <LoginForm /> : <Dashboard />}</div>
  );
};
export default Home;
