import TabbedSection from "../../../../components/utility-comps/tabbed-section";
import { useDashboard } from "../../../../contexts/dash-contenxt";
import PageConfig from "../components/page-config";

export default function DashPages(){
    const { config } = useDashboard();

    const onTabChange = (idx:number) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("idx", idx.toString());
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
    };

    const tabData =
      config?.nav?.map((item: NavItemConfig) => ({
        label: item.name.toLocaleLowerCase(),
        content: (
          <PageConfig key={item._id} tags={item.tags} title={item.name} />
        ),
      })) ?? [];

    return (
      <div className="w-full h-full">
        <TabbedSection tabs={tabData} onTabChange={onTabChange} />
      </div>
    );
};