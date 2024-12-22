import { usePageConfig } from "../../../../../contexts/page-config-context";
import { cn } from "../../../../../lib/utilities";
import PrincipalArticle from "./principal-article";
import SecondaryArticles from "./secondary-articles";

export default function QuadBlock({
  configData,
  setConfigData,
  options,
}: {
  configData: QuadBlockConfig;
  setConfigData: (data: Partial<QuadBlockConfig>) => void;
  options: Article[];
}) {
  const {
    pageConfig: {
      heroConfig: { layout },
    },
  } = usePageConfig();
  const handlePrincipalArticle = (article: Article) => {
    const articles = [...configData.articles];
    articles[0] = article;
    setConfigData({
      articles,
    });
  };

  const reverseLayout = layout.endsWith("-b");

  return (
    <div
      className={cn(
        "flex gap-2 py-2 rounded-md h-[500px]",
        reverseLayout ? "flex-row-reverse" : ""
      )}
    >
      <PrincipalArticle options={options} onChange={handlePrincipalArticle} />
      <SecondaryArticles />
    </div>
  );
}
