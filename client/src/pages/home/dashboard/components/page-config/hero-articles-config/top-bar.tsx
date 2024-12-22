import { Dispatch, SetStateAction } from "react";
import ModuleTitle from "../../../../../../components/utility-comps/module-title";
import SliderToggle from "../../../../../../components/utility-comps/slider-toggle";
import { usePageConfig } from "../../../../../../contexts/page-config-context";
import { cn, getRandomEntries } from "../../../../../../lib/utilities";
import { FaRandom } from "react-icons/fa";
import { CgPlayListRemove } from "react-icons/cg";

import { LayoutIcon } from "../layout-icon";
import TooltipWrapper from "../../../../../../components/utility-comps/tooltip-wrapper";
import { useNotification } from "../../../../../../contexts/notification-context";

export default function TopBar({
  setEditArticles,
  showQuadBlock,
}: {
  setEditArticles: Dispatch<SetStateAction<boolean>>;
  showQuadBlock: boolean;
}) {
  const {
    pageConfig: { heroConfig },
    handleHeroConfigChange,
    articles,
  } = usePageConfig();
  const { showToast } = useNotification();

  const handleHeroToggle = (val: boolean) => {
    handleHeroConfigChange({ enabled: val });
  };

  const handleUnset = () => {
    setEditArticles(false);
    handleHeroConfigChange({ articles: [] });
  };

  const handleLayoutChange = (layout: QuadBlockLayout) => {
    handleHeroConfigChange({ layout });
  };

  const handleRandomize = () => {
    const randomArticleIds = getRandomEntries(articles.map((i:Article) =>  i._id), 5);
    if(randomArticleIds.length < 5){
      showToast("Not enough articles to randomize", "error");
    } else {
      console.log({ randomArticleIds });
      const payload = articles.filter((i:Article) => randomArticleIds.includes(i._id));
      handleHeroConfigChange({ articles: payload });
      // handleHeroConfigChange({ articles: randomArticleIds });
    }
  }

  return (
    <div className="flex items-center gap-2 justify-between w-full">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center mr-2">
          <ModuleTitle title={"Hero"} />
          <SliderToggle
            enabled={heroConfig.enabled}
            onToggle={handleHeroToggle}
          />
        </div>
        <TooltipWrapper message={"Randomize articles"}>
          <div
            onClick={handleRandomize}
            className={cn(
              "h-[35px] w-[40px] cursor-pointer rounded-md border flex gap-2 justify-center items-center group transition-all duration-300",
              heroConfig.enabled && showQuadBlock
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          >
            <FaRandom
              size={20}
              className=" text-gray-400/70 group-hover:text-indigo-500"
            />
          </div>
        </TooltipWrapper>
        <TooltipWrapper message={"Unset articles"}>
          <div
            onClick={handleUnset}
            className={cn(
              "h-[35px] w-[40px] cursor-pointer rounded-md border flex gap-2 justify-center items-center group transition-all duration-300",
              heroConfig.enabled && showQuadBlock
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          >
            <CgPlayListRemove
              size={30}
              className=" text-gray-400/70 group-hover:text-indigo-500 relative top-[2px] left-[2px]"
            />
          </div>
        </TooltipWrapper>
      </div>
      <div className="relative">
        <p
          className={cn(
            "absolute-vert right-0 text-sm font-semibold transition-all duration-300 bg-slate-300 text-white rounded-md px-2 py-1 pointer-events-none",
            !heroConfig.enabled ? "opacity-100" : "opacity-0"
          )}
        >
          Disabled
        </p>
        <div
          className={cn(
            "w-full flex items-center justify-end transition-all duration-300",
            heroConfig.enabled ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <p className="text-sm text-indigo-500 mr-1">layout:</p>
          <LayoutIcon
            onClick={() => handleLayoutChange("quad-grid")}
            layout={"quad-grid"}
            selected={heroConfig.layout}
          />
          <LayoutIcon
            onClick={() => handleLayoutChange("quad-list")}
            layout={"quad-list"}
            selected={heroConfig.layout}
          />
        </div>
      </div>
    </div>
  );
}
