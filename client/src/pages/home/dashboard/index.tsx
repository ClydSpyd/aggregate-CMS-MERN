// import { Link } from "react-router";
import { useAuth } from "../../../contexts/auth-context";
import AppLoader from "../../../components/app-loader";
import { useDashboard } from "../../../contexts/dash-contenxt";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { IconType } from "react-icons";
import { FaChevronRight } from "react-icons/fa";
import { cn } from "../../../lib/utilities";
import DashMain from "./views/dash-main";
import { useState } from "react";
import { useNotification } from "../../../contexts/notification-context";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: IconType;
  disabled?: boolean;
  selected?: boolean;
}

const Listitem = ({ text, icon, disabled, selected, onClick }: ListItemProps) => {
  const Icon = icon;
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full h-[50px] p-2 flex items-center justify-between border border-slate-200 rounded-sm cursor-pointer text-slate-500 transition-all duration-300 hover:border-slate-400/80",
        selected ? "!border-indigo-500 pointer-events-none" : "",
        disabled
          ? "opacity-30 pointer-events-none"
          : "pointer-events-auto opacity-100"
      )}
    >
      {text}
      <div
        className={cn(
          "flex items-center gap-2",
          selected ? "text-indigo-500" : ""
        )}
      >
        <Icon size={20} />
        <FaChevronRight size={14} />
      </div>
    </div>
  );
};

type DashView = "main" | "pages" | "users" | "deployments";

const views: Record<DashView, JSX.Element> = {
  main: <DashMain />,
  pages: <div>Pages</div>,
  users: <div>Users</div>,
  deployments: <div>deployments</div>,
};

export default function Dashboard() {
  const [view, setView] = useState<DashView>("main");
  const { user } = useAuth();
  const { config } = useDashboard();
  const { showToast } = useNotification();

  if(!config) return <AppLoader />

  return (
    <div className="flex w-screen h-fit gap-2 p-2 px-4 relative">
      <div className="min-w-[300px] max-w-[300px]" />
      <div className="w-[300px] h-[calc(100%-80px)] rounded-lg bg-slate-100/50 border shadow-md p-4 flex flex-col gap-6 items-center fixed">
        <div className="w-full flex flex-col gap-1 items-center">
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
        <div className="grow w-full flex flex-col gap-2">
          <Listitem
            onClick={() => setView("main")}
            text="Main"
            icon={MdOutlineDisplaySettings}
            selected={view === "main"}
          />
          <Listitem
            onClick={() => setView("pages")}
            text="Pages"
            icon={IoDocumentsOutline}
            selected={view === "pages"}
          />
          <Listitem
            onClick={() => setView("users")}
            text="Users"
            icon={TbUsersGroup}
            selected={view === "users"}
          />
          <Listitem
            onClick={() => setView("deployments")}
            text="Deployments"
            icon={HiOutlineRocketLaunch}
            selected={view === "deployments"}
          />
        </div>
        <div className="h-[50px] w-full">
          {/* <Listitem text="Account Settings" icon={IoSettingsOutline} /> */}
          <div onClick={() => {showToast("Deployment triggered", "info")}} className="w-full h-full border-2 border-indigo-500 text-indigo-500 rounded-md flex items-center justify-center font-semibold cursor-pointer">
              PUBLISH LATEST
            </div>
        </div>
      </div>
      <div className="grow h-full">{views[view]}</div>
    </div>
  );
}
