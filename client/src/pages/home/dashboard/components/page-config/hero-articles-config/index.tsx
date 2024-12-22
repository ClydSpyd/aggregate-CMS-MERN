import { useEffect, useState } from "react";
import { cn, delay } from "../../../../../../lib/utilities";
import QuadBlock from "../../quad-block";
import { usePageConfig } from "../../../../../../contexts/page-config-context";
import TopBar from "./top-bar";


export default function HeroArticleConfig() {
  const {
    pageConfig: { heroConfig },
    articles,
    handleHeroConfigChange,
  } = usePageConfig();
  const [ editArticles, setEditArticles ] = useState(false);
  const showQuadBlock = heroConfig.articles.length > 0 || editArticles;

  useEffect(() => {
    if(!heroConfig.enabled){
      delay(500).then(() => {
        setEditArticles(false);
      });
    }
  }, [heroConfig.enabled]);

  return (
    <div
      className={cn(
        "w-full flex flex-col border shadow-sm rounded-lg p-2 px-4",
        heroConfig.enabled ? "gap-2" : "gap-0"
      )}
    >
      <TopBar setEditArticles={setEditArticles} showQuadBlock={showQuadBlock} />
      <div
        className={cn(
          "w-full gap-2 transition-all duration-300 ease-in-out overflow-hidden h-fit",
          heroConfig.enabled ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {showQuadBlock ? (
          <QuadBlock
            options={articles}
            configData={heroConfig}
            setConfigData={handleHeroConfigChange}
          />
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
