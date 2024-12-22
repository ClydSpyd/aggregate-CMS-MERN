import { useAuth } from "../../../contexts/auth-context";
import AppLoader from "../../../components/app-loader";
import { useDashboard } from "../../../contexts/dash-contenxt";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { useNotification } from "../../../contexts/notification-context";
import { DashListitem } from "./components/dash-list-item";


export default function Dashboard() {
  const { user } = useAuth();
  const { config, view, setView, views } = useDashboard();
  const { showToast } = useNotification();

  if (!config) return <AppLoader />;

  return (
    <div className="flex w-screen grow gap-2 p-2 px-4 relative">
      <div className="min-w-[300px] max-w-[300px]" />
      <div className="w-[300px] h-[calc(100%-77px)] rounded-lg bg-slate-100/50 border shadow-md p-4 flex flex-col gap-6 items-center fixed">
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
          <DashListitem
            onClick={() => setView("main")}
            text="Main"
            icon={MdOutlineDisplaySettings}
            selected={view === "main"}
          />
          <DashListitem
            onClick={() => setView("pages")}
            text="Pages"
            icon={IoDocumentsOutline}
            selected={view === "pages"}
          />
          <DashListitem
            onClick={() => setView("users")}
            text="Users"
            icon={TbUsersGroup}
            selected={view === "users"}
          />
          <DashListitem
            onClick={() => setView("deployments")}
            text="Deployments"
            icon={HiOutlineRocketLaunch}
            selected={view === "deployments"}
          />
        </div>
        <div className="h-[50px] w-full">
          {/* <Listitem text="Account Settings" icon={IoSettingsOutline} /> */}
          <div
            onClick={() => {
              showToast("Deployment triggered", "info");
            }}
            className="w-full h-full border-2 border-indigo-500 text-indigo-500 rounded-md flex items-center justify-center font-semibold cursor-pointer"
          >
            PUBLISH LATEST
          </div>
        </div>
      </div>
      {views[view]}
    </div>
  );
}
