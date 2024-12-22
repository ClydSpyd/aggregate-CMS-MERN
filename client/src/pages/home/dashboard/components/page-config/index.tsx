/* eslint-disable react-hooks/exhaustive-deps */
import { PageConfigProps } from "./types";
import HeroArticleConfig from "./hero-articles-config";
import { PageConfigProvider } from "../../../../../contexts/page-config-context";
import PageDataConfig from "./page-data-config";

const Content = () => {
  return (
    <div className="w-full min-h-full flex flex-col items-center gap-[10px]">
      <>
        <PageDataConfig />
        <HeroArticleConfig />
        {/* <div className="flex w-full justify-between">
            <ModuleTitle title={"Articles"} />
          </div> */}
      </>
    </div>
  );
};

export default function PageConfig({ title }: PageConfigProps) {

  return (
    <PageConfigProvider pageName={title}>
      <Content />
    </PageConfigProvider>
  );
}
