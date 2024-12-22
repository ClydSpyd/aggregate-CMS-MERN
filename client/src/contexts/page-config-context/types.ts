import { Dispatch, SetStateAction } from "react";

export interface PageConfigContextData {
  pageConfig: DynamicPageConfig;
  setPageConfig: Dispatch<SetStateAction<DynamicPageConfig >>;
  handleHeroConfigChange: (input: Partial<QuadBlockConfig>) => void;
  articles: Article[];
}

export const defaultPageConfigContext: PageConfigContextData = {
    pageConfig: {} as DynamicPageConfig,
    setPageConfig: () => {},
    handleHeroConfigChange: () => {},
    articles: [],
}

