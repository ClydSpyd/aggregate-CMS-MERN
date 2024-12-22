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
  const handlePrincipalArticle = (article: Article) => {
    const articles = [...configData.articles];
    articles[0] = article;
    setConfigData({
      articles,
    });
  };

  return (
    <div className="flex gap-2 py-2 rounded-md h-[500px]">
      <PrincipalArticle options={options} onChange={handlePrincipalArticle} />
      <SecondaryArticles />
    </div>
  );
}
