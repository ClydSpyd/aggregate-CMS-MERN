import { useEffect, useState } from "react";
import { usePageConfig } from "../../../../../contexts/page-config-context";
import { cn } from "../../../../../lib/utilities";
import ArticlePickerModal from "../../../../../components/utility-comps/article-picker-modal";
import SecondaryItem from "./secondary-item";

export default function SecondaryArticles({
  onChange,
}: {
  onChange: (articles: Article[]) => void;
}) {
  const {
    pageConfig: {
      heroConfig: { layout, articles },
    },
    articles: options,
  } = usePageConfig();
  const [selectedArticles, setSelectedArticles] = useState<Article[] | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const isGrid = layout.includes("grid");

  useEffect(() => {
    if (articles[0]) {
      console.log(articles[0].title);
      setSelectedArticles(articles.slice(1));
    }
  }, [articles]);

  const handleArticleSelect = (articles: Article[]) => {
    setSelectedArticles(articles);
    onChange(articles);
  };

  // replace selectedArtieles index based on _id
  const handleArticleUpdate = (currentId:string, article: Article) => {
    if(!selectedArticles) return;
    const updatedArticles: Article[] = selectedArticles.map((item: Article) =>
      item._id === currentId ? article : item
    );
    console.log({ article, updatedArticles });
    setSelectedArticles(updatedArticles);
    onChange(updatedArticles);
  };

  return (
    <div
      className={cn(
        "w-1/2 gap-2 grid relative group",
        isGrid ? "grid-cols-2 grid-rows-2" : "grid-cols-1 grid-rows-4"
      )}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <SecondaryItem
          key={i}
          article={selectedArticles?.[i]}
          handleArticleUpdate={handleArticleUpdate}
          isGrid={isGrid}
        />
      ))}
      {!selectedArticles?.slice(1).length && (
        <div
          onClick={() => setModalOpen(true)}
          className="absolute left-0 top-0 cursor-pointer h-full w-full flex flex-col items-center justify-center text-center gap-2 rounded-lg p-2 pb-4 hover:border-2 border-indigo-500 text-indigo-500 shadow-sm transition-all duration-300 ease-out hover:bg-indigo-100/50"
        ></div>
      )}

      {modalOpen && (
        <ArticlePickerModal
          open={true}
          setOpen={setModalOpen}
          reqCount={4}
          articles={options}
          onSubmit={handleArticleSelect}
          preSelected={selectedArticles ?? undefined}
        />
      )}
    </div>
  );
}
