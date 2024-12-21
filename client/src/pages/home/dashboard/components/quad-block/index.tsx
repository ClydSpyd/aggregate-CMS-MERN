import { cn } from "../../../../../lib/utilities";

export default function QuadBlock({
  configData,
  setConfigData,
}: {
  configData: QuadBlockConfig;
  setConfigData: (data: QuadBlockConfig) => void;
}) {
  return (
    <div className="flex gap-2 py-2 rounded-md h-[500px]">
      <div className="h-full w-1/2 border rounded-md shadow-md"></div>
      <div
        className={cn(
          "w-1/2 gap-2 grid",
          configData.layout === "quad-grid"
            ? "grid-cols-2 grid-rows-2"
            : "grid-cols-1 grid-rows-4"
        )}
      >
        <div className="border rounded-md shadow-md"></div>
        <div className="border rounded-md shadow-md"></div>
        <div className="border rounded-md shadow-md"></div>
        <div className="border rounded-md shadow-md"></div>
      </div>
    </div>
  );
}
