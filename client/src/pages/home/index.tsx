import { useAuth } from "../../contexts/auth-context";
import { DashProvider } from "../../contexts/dash-contenxt";
import Dashboard from "./dashboard";
import LoginForm from "./login-form";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex gap-2 h-full wl-full">
      {!user ? (
        <LoginForm />
      ) : (
        <DashProvider>
          <Dashboard />
        </DashProvider>
      )}
    </div>
  );
};
export default Home;
