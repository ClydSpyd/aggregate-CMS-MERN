// import { Link } from "react-router";
import { useAuth } from "../../../contexts/auth-context";
import CarouselConfig from "./carousel-config";
import NavConfig from "./nav-config";
import TracksConfig from "./tracks-config";
import AppLoader from "../../../components/app-loader";
import { useDashboard } from "../../../contexts/dash-contenxt";

export default function Dashboard() {
  const { user } = useAuth();
  const { config } = useDashboard();

  if(!config) return <AppLoader />

  return (
    <div className="flex w-screen h-fit gap-2 p-2 px-4 relative">
      <div className="min-w-[300px] max-w-[300px]" />
      <div className="w-[300px] h-[calc(100%-80px)] rounded-lg bg-slate-100/50 border shadow-md p-4 flex flex-col items-center fixed">
        <img
          src={user?.avatarUrl}
          alt="logo"
          className="min-w-[85px] min-h-[80px] max-w-[85px] max-h-[80px] rounded-full"
        />
        <h2 className="text-2xl font-semibold text-indigo-500">
          Welcome, {user?.username}
        </h2>
        <h4 className="px-2 rounded-[20px] border-2 border-indigo-500 bg-indigo-500 text-white text-xs w-fit">
          {user?.role}
        </h4>
      </div>
      <div className="grow flex flex-col gap-4 h-full">
        <NavConfig items={config?.nav} />
        <CarouselConfig />
        <TracksConfig />
      </div>
    </div>
  );
}
