import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import StaggerContainer from "../utility-comps/stagger-container";
import { StateHover } from "./state-hover";
import { StateConfirmDelete } from "./state-delete";
import { format } from "date-fns";
import { cn } from "../../lib/utilities";
import API from "../../api";

export default function ArticleCard({
  item,
  handleDelete,
  permaDeath,
  basicBlock
}: {
  item: Article;
  handleDelete: () => void;
  permaDeath?: boolean;
  basicBlock?: boolean;
}) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [localState, setLocalState] = useState<Article>(item);
    const contRef = useRef<HTMLDivElement>(null);
    useOutsideClick(contRef, () => {
      setConfirmDelete(false);
    });

    const unpublished = !localState.published
    console.log({ item, unpublished });

    const handlePublish = () => {
      API.article.updateArticle(item._id, { published: !item.published });
      setLocalState((prev:Article) => ({...prev, published: !prev.published}));
    };

  return (
    <div
      ref={contRef}
      className="w-[23%] h-auto max-h-[280px] min-h-[130px] flex flex-col overflow-visible"
      onMouseLeave={() => setConfirmDelete(false)}
    >
      <StaggerContainer>
        <div
          key={item._id}
          className={cn(
            "flex flex-col h-full w-full items-center text-center gap-2 rounded-lg p-2 pb-[12px] transition-all duration-300 ease-out border shadow-sm hover:border-indigo-500 hover:shadow-sm group relative overflow-hidden",
            unpublished ? "bg-gray-100/50" : "bg-white"
          )}
        >
          {!basicBlock && (
            <img
              src={item.imgUrl}
              alt={item.title}
              className="w-full h-[150px] object-cover rounded-lg"
            />
          )}
          <div className="grow flex flex-col justify-center">
            <p
              className={cn(
                "text-sm font-semibold line-clamp-3",
                unpublished ? "text-slate-300" : "text-indigo-500"
              )}
            >
              {item.title}
            </p>
          </div>
          <StateHover
            articleId={item._id}
            setConfirmDelete={setConfirmDelete}
            showUnpublish={basicBlock && !unpublished}
            handlePublish={handlePublish}
          />
          {confirmDelete && (
            <StateConfirmDelete
              display={confirmDelete}
              setDisplay={setConfirmDelete}
              handleDelete={handleDelete}
              permaDeath={!!permaDeath}
            />
          )}
          {basicBlock && (
            <div className="w-full flex justify-between items-center mt-2 gap-1 px-1">
              <p className="text-xs text-gray-500">
                {format(new Date(item.createdAt), "dd/MM/yyyy")}
              </p>
              <div className="flex gap-1 items-center relative z-20">
                <div className="relative z-10 h-[30px] w-[30px] rounded-full border-2 border-white overflow-hidden">
                  <img
                    src={item.author.avatarUrl}
                    alt={item.author.username + "_avatar"}
                  />
                </div>
                <div className="h-[32px] w-[32px] absolute-center z-1 bg-gray-400 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </StaggerContainer>
    </div>
  );
}
