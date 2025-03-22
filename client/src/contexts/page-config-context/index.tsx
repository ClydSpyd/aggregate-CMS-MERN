/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { PageConfigContextData, defaultPageConfigContext } from "./types";
import API from "../../api";
import { debounce, delay } from "../../lib/utilities";
import AppLoader from "../../components/app-loader";

const PageConfigContext = createContext<PageConfigContextData>(
  defaultPageConfigContext
);

const debounceUpdate = debounce((data: DynamicPageConfig) => {
  console.log("debounceUpdate", data);
  API.config.updateDynamicPage(data);
}, 500);

export const PageConfigProvider = ({
  children,
  pageName,
}: {
  children: React.ReactNode;
  pageName: string;
}) => {
  const [pageConfig, setPageConfig] = useState<DynamicPageConfig>(
    {} as DynamicPageConfig
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPageConfig = async () => {
      const { data } = await API.config.getDynamicPageConfig(pageName);
      if (data) {
        delay(500).then(() => {
          setPageConfig(data);
        });
      }
    };
    getPageConfig();
  }, [pageName]);

  useEffect(() => {
    if(!pageConfig.tags) return;
    const getArticles = async () => {
      const { data } = await API.article.getFilteredArticles({
        text: "",
        tags: pageConfig?.tags ?? [],
        author: null
      });
      if (data) {
        setArticles(data);
      }
      setLoading(false);
    };
    getArticles();
  }, [pageConfig]);

  useEffect(() => {
    if (pageConfig) {
      debounceUpdate(pageConfig);
    }
  }, [pageConfig]);

  const handleHeroConfigChange = (input: Partial<QuadBlockConfig>) => {
    if (!pageConfig) return;
    const payload = {
      ...pageConfig,
      heroConfig: {
        ...pageConfig.heroConfig,
        ...input,
      },
    };
    setPageConfig(payload);
  };

  if (!pageConfig._id)
    return (
      <div className="w-full min-h-full flex flex-col items-center gap-[10px]">
        <AppLoader asChild spinnerOnly />
      </div>
    );

  return !loading && (
    <PageConfigContext.Provider
      value={{
        pageConfig,
        setPageConfig,
        handleHeroConfigChange,
        articles,
        setArticles,
      }}
    >
      {children}
    </PageConfigContext.Provider>
  );
};

export const usePageConfig = () => useContext(PageConfigContext);
