import { useState } from "react";
import { usePageConfig } from "../../../../../contexts/page-config-context";
import { cn } from "../../../../../lib/utilities";
import ArticlePickerModal from "../../../../../components/utility-comps/article-picker-modal";
import { MdOutlineAddBox } from "react-icons/md";
import StaggerContainer from "../../../../../components/utility-comps/stagger-container";
import HoverBtns from "./hover-btns";

export default function SecondaryItem({
  article,
  isGrid,
  handleArticleUpdate,
}: {
  article: Article;
  isGrid: boolean;
  handleArticleUpdate: (id: string, article: Article) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const { articles: options } = usePageConfig();
  return (
    <StaggerContainer className="duration-1000 ease-out">
      <div className="border rounded-md shadow-md relative flex h-full overflow-hidden">
        {article ? (
          <>
            <img
              src={article.imgUrl}
              alt={article.title}
              className={cn(
                "h-full object-cover",
                isGrid ? "w-full" : "min-w-[200px] max-w-[200px]"
              )}
            />

            <div
              className={cn(
                "bottom-0 left-0 bg-white/85 opacity-90 text-indigo-500 flex flex-col border justify-center p-4",
                isGrid
                  ? "h-[100px] w-full absolute backdrop-blur-sm "
                  : "h-full grow relative"
              )}
            >
              <h1 className="text-lg font-bold leading-[1.3] line-clamp-3">
                {/* {truncateString(article.title, 60)} */}
                {article.title}
              </h1>
            </div>
            <div
              onClick={() => setModalOpen(true)}
              className="absolute left-0 top-0 cursor-pointer h-full w-full flex flex-col items-center justify-center text-center gap-2 rounded-lg p-2 pb-4 hover:border-2 border-indigo-500 text-indigo-500 shadow-sm transition-all duration-300 ease-out hover:bg-indigo-100/50 opacity-0 hover:opacity-100"
            >
              <HoverBtns articleId={article._id} />
            </div>
          </>
        ) : (
          <div className="h-full w-full flex flex-col gap-1 text-indigo-500 items-center justify-center">
            <MdOutlineAddBox size={30} />
            <h1 className="font-semibold text-xs">ADD ARTICLE</h1>
          </div>
        )}

        {modalOpen && (
          <ArticlePickerModal
            open={true}
            setOpen={setModalOpen}
            reqCount={1}
            articles={options}
            onSubmit={(data: Article[]) =>
              handleArticleUpdate(article._id, data[0])
            }
            preSelected={[article!]}
          />
        )}
      </div>
    </StaggerContainer>
  );
}
