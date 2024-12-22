import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import ArticlePickerModal from "../../../../../components/utility-comps/article-picker-modal";
import { usePageConfig } from "../../../../../contexts/page-config-context";
import TooltipWrapper from "../../../../../components/utility-comps/tooltip-wrapper";
import { TbPhotoEdit } from "react-icons/tb";


export default function PrincipalArticle({
  options,
  onChange,
}: {
  options: Article[];
  onChange: (article: Article) => void;
}) {
  const {pageConfig: {heroConfig: {articles}}} = usePageConfig();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    articles[0] ?? null
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (articles[0]) {
      console.log(articles[0].title);
      setSelectedArticle(articles[0]);
    }
  }, [articles]);

  const  handleArticleSelect = (articles: Article[]) => {
    setSelectedArticle(articles[0]);
    onChange(articles[0]);
  }

  return (
    <div className="h-full w-1/2 border rounded-md shadow-md relative">
      {selectedArticle && (
        <div className="h-full w-full relative">
          <img
            src={selectedArticle.imgUrl}
            alt={selectedArticle.title}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="w-full min-h-1/3 absolute bottom-0 left-0 bg-white/40 opacity-85 text-slate-800 backdrop-blur-sm flex flex-col justify-center p-6">
            <h1 className="text-[40px] font-bold leading-[1]">
              {selectedArticle.title}
            </h1>
          </div>
        </div>
      )}
      <div
        onClick={() => setModalOpen(true)}
        className="absolute left-0 top-0 cursor-pointer h-full w-full flex flex-col items-center justify-center text-center gap-2 rounded-lg p-2 pb-4 hover:border-2 border-indigo-500 text-indigo-500 shadow-sm transition-all duration-300 ease-out hover:bg-indigo-100/50 group"
      >
        {!selectedArticle ? (
          <>
            <MdOutlineAddBox size={40} />
            <h1 className="font-semibold text-sm">ADD ARTICLE</h1>
          </>
        ) : (
          <TooltipWrapper message="edit item">
            <div
              onClick={() => {}}
              className="cursor-pointer p-2 flex items-center justify-center border rounded-xl transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500 opacity-0 group-hover:opacity-100"
            >
              <TbPhotoEdit size={40} />
            </div>
          </TooltipWrapper>
        )}
      </div>
      {modalOpen && (
        <ArticlePickerModal
          open={true}
          setOpen={setModalOpen}
          reqCount={1}
          articles={options}
          onSubmit={handleArticleSelect}
          preSelected={selectedArticle ? [selectedArticle] : undefined}
        />
      )}
    </div>
  );
}
