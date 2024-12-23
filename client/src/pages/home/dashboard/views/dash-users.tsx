import TabbedSection from "../../../../components/utility-comps/tabbed-section";
import UsersAdmin from "../components/users-admin";
import UsersClient from "../components/users-client";
// import { useDashboard } from "../../../../contexts/dash-contenxt";

export default function DashUsers(){
    // const { config } = useDashboard();

    const onTabChange = (idx:number) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("idx", idx.toString());
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
    };

    const tabData = [
      {
        label: "Admin Users",
        content: <UsersAdmin />,
      },
      {
        label: "Client Users",
        content: <UsersClient />,
      },
    ];

    return (
      <div className="w-full h-full">
        <TabbedSection tabs={tabData} onTabChange={onTabChange} />
      </div>
    );
};