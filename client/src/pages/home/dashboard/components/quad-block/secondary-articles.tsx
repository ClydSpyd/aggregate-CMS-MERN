import { useEffect, useState } from "react";
import { usePageConfig } from "../../../../../contexts/page-config-context";
import { cn } from "../../../../../lib/utilities";
import ArticlePickerModal from "../../../../../components/utility-comps/article-picker-modal";
import { MdOutlineAddBox } from "react-icons/md";

export default function SecondaryArticles() {
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

  useEffect(() => {
    if (articles[0]) {
      console.log(articles[0].title);
      setSelectedArticles(articles.slice(1));
    }
  }, [articles]);


  const handleArticleSelect = (articles: Article[]) => {
    setSelectedArticles(articles);
    // onChange(articles[0]);
  };
  return (
    <div
      className={cn(
        "w-1/2 gap-2 grid relative group",
        layout === "quad-grid"
          ? "grid-cols-2 grid-rows-2"
          : "grid-cols-1 grid-rows-4"
      )}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-md shadow-md">
          {selectedArticles && selectedArticles[i] ? (
            <img
              src={selectedArticles[i].imgUrl}
              alt={selectedArticles[i].title}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="h-full w-full flex flex-col gap-1 text-indigo-500 items-center justify-center">
              <MdOutlineAddBox size={30} />
              <h1 className="font-semibold text-xs">ADD ARTICLE</h1>
            </div>
          )}
        </div>
      ))}
      <div
        onClick={() => setModalOpen(true)}
        className="absolute left-0 top-0 cursor-pointer h-full w-full flex flex-col items-center justify-center text-center gap-2 rounded-lg p-2 pb-4 hover:border-2 border-indigo-500 text-indigo-500 shadow-sm transition-all duration-300 ease-out hover:bg-indigo-100/50"
      ></div>

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
