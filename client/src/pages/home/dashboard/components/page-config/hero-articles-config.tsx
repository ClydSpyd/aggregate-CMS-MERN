import { useEffect, useState } from "react";
import ModuleTitle from "../../../../../components/utility-comps/module-title";
import SliderToggle from "../../../../../components/utility-comps/slider-toggle";
import { cn, delay } from "../../../../../lib/utilities";
import QuadBlock from "../quad-block";
import { LayoutIcon } from "./layout-icon";

export default function HeroArticleConfig({
  configData,
  handleChange,
}: {
  configData: QuadBlockConfig;
  handleChange: (data: QuadBlockConfig) => void;
}) {
  const [ editArticles, setEditArticles ] = useState(false);
  const showQuadBlock = configData.articles.length > 0 || editArticles;

  useEffect(() => {
    if(!configData.enabled){
      delay(500).then(() => {
        setEditArticles(false);
      });
    }
  }, [configData.enabled]);

  const handleHeroToggle = (val: boolean) => {
    if (!configData) return;
    const payload = {
      ...configData,
      enabled: val,
    };
    handleChange(payload);
  };

  const handleLayoutChange = (layout: QuadBlockLayout) => {
    console.log("layout", layout);
    if (!configData) return;
    const payload = {
      ...configData,
      layout,
    };
    handleChange(payload);
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col border shadow-sm rounded-lg p-2 px-4",
        configData.enabled ? "gap-2" : "gap-0"
      )}
    >
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex gap-2 items-center">
          <ModuleTitle title={"Hero"} />
          <SliderToggle
            enabled={configData.enabled}
            onToggle={handleHeroToggle}
          />
        </div>
        <div className="relative">
          <p
            className={cn(
              "absolute-vert right-0 text-sm font-semibold transition-all duration-300 bg-slate-300 text-white rounded-md px-2 py-1 pointer-events-none",
              !configData.enabled ? "opacity-100" : "opacity-0"
            )}
          >
            Disabled
          </p>
          <div
            className={cn(
              "w-full flex items-center justify-end transition-all duration-300",
              configData.enabled ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <p className="text-sm text-indigo-500 mr-1">layout:</p>
            <LayoutIcon
              onClick={() => handleLayoutChange("quad-grid")}
              layout={"quad-grid"}
              selected={configData.layout}
            />
            <LayoutIcon
              onClick={() => handleLayoutChange("quad-list")}
              layout={"quad-list"}
              selected={configData.layout}
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full gap-2 transition-all duration-300 ease-in-out overflow-hidden h-fit",
          configData.enabled ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {showQuadBlock ? (
          <QuadBlock configData={configData} setConfigData={() => {}} />
        ) : (
          <div className="w-full flex flex-col justify-center items-center py-4 pb-12 px-4 relative">
            <h1 className="text-lg font-semibold m-0">Hero articles unset</h1>
            <p className="text-slate-400 font-thin">
              Articles will be randomly assigned on each page load
            </p>
            <div
              onClick={() => setEditArticles(true)}
              className="min-h-[40px] max-h-[40px] w-[150px] flex gap-1 items-center justify-center text-md text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer mt-2"
            >
              Set articles
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
