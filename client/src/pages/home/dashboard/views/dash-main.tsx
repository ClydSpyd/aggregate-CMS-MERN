import { useDashboard } from "../../../../contexts/dash-contenxt";
import CarouselConfig from "../components/carousel-config";
import NavConfig from "../components/nav-config";
import TracksConfig from "../components/tracks-config";

export default function DashMain() {
    const { config } = useDashboard();
  return (
    <div className="w-full h-fit flex flex-col gap-4 pb-[9px]">
      <NavConfig items={config?.nav ?? []} />
      <CarouselConfig />
      <TracksConfig />
    </div>
  );
}
