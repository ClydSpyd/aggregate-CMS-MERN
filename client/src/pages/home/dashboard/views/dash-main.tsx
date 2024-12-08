import { useDashboard } from "../../../../contexts/dash-contenxt";
import CarouselConfig from "../components/carousel-config";
import NavConfig from "../components/nav-config";
import TracksConfig from "../components/tracks-config";

export default function DashMain() {
    const { config } = useDashboard();
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <NavConfig items={config?.nav ?? []} />
      <CarouselConfig />
      <TracksConfig />
    </div>
  );
}
