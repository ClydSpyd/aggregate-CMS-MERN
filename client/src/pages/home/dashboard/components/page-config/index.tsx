/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PageConfigProps } from "./types";
import API from "../../../../../api";
import AppLoader from "../../../../../components/app-loader";
import { debounce, delay } from "../../../../../lib/utilities";
import HeroArticleConfig from "./hero-articles-config";

const debounceUpdate = debounce((data: DynamicPageConfig) => {
  console.log("debounceUpdate", data);
  API.config.updateDynamicPage(data);
}, 500);

export default function PageConfig({ title }: PageConfigProps) {
  const [pageConfig, setPageConfig] = useState<DynamicPageConfig | null>(null);

  useEffect(() => {
    if (pageConfig) {
      debounceUpdate(pageConfig);
    }
  }, [pageConfig]);

  const getPageConfig = async () => {
    const { data } = await API.config.getDynamicPageConfig(title);
    if (data) {
      delay(500).then(() => {
        setPageConfig(data);
      });
    }
  };

  useEffect(() => {
    getPageConfig();
  }, []);

  const handleHeroConfigChange = (config: QuadBlockConfig) => {
    if (!pageConfig) return;
    const payload = {
      ...pageConfig,
      heroConfig: config,
    };
    setPageConfig(payload);
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center gap-[10px]">
      {!pageConfig ? (
        <AppLoader asChild spinnerOnly />
      ) : (
        <>
          <HeroArticleConfig
            configData={pageConfig.heroConfig}
            handleChange={handleHeroConfigChange}
          />
          {/* <div className="flex w-full justify-between">
            <ModuleTitle title={"Articles"} />
          </div> */}
        </>
      )}
    </div>
  );
}
