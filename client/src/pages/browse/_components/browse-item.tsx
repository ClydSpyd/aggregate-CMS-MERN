import { useNavigate } from "react-router-dom";
import StaggerContainer from "../../../components/utility-comps/stagger-container";
import { HiDotsVertical } from "react-icons/hi";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { cn } from "../../../lib/utilities";
import { MdDeleteForever, MdFileUpload, MdFileUploadOff } from "react-icons/md";
import useOutsideClick from "../../../hooks/useOutsideClick";
import API from "../../../api";

const ContextMenu = ({
  setConfirmState,
  article,
  setLocalState,
}: {
  setLocalState: Dispatch<SetStateAction<Article>>;
  setConfirmState: Dispatch<SetStateAction<boolean>>;
  article: Article;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handlePublish = () => {
    API.article.updateArticle(article._id, { published: !article.published });
    setLocalState((prev) => ({ ...prev, published: !prev.published }));
  };
  return (
    <div
      onMouseLeave={() => setMenuOpen(false)}
      onClick={() => setMenuOpen(!menuOpen)}
      className="h-[25px] w-[25px] rounded-sm border cursor-pointer absolute top-2 right-2 duration-300 transition-all ease-out opacity-0 group-hover/container:opacity-100 z-40 flex items-center justify-center bg-white text-slate-400 hover hover:border-indigo-500"
    >
      <HiDotsVertical size={16} />
      <div
        className={cn(
          "absolute transition-all duration-100 ease-out right-[-0px] py-1 w-[150px]",
          menuOpen
            ? "opacity-100 top-[100%] pointer-events-auto"
            : "opacity-0 top-1/2 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-sm shadow-md border flex flex-col gap-1 p-1">
          <div
            onClick={() => setConfirmState(true)}
            className="w-full p-2 flex items-center justify-between hover:bg-slate-50"
          >
            Delete
            <MdDeleteForever size={22} />
          </div>
          <div
            onClick={handlePublish}
            className="w-full p-2 flex items-center justify-between hover:bg-slate-50"
          >
            {article.published ? "Unpublish" : "Publish"}
            {article.published ? (
              <MdFileUploadOff size={22} />
            ) : (
              <MdFileUpload size={22} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BrowseItem({
  article,
  handleDelete,
}: {
  article: Article;
  handleDelete: (id: string) => void;
}) {
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [localState, setLocalState] = useState<Article>(article);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => setConfirmState(false));
  const published = localState.published;

  return (
    <StaggerContainer>
      <ContextMenu
        setConfirmState={setConfirmState}
        article={localState}
        setLocalState={setLocalState}
      />
      <div
        ref={containerRef}
        key={article._id}
        onClick={() => navigate(`/article/${article._id}`)}
        className={cn(
          "bg-white shadow-sm p-2 pb-3 border flex flex-col justify-between gap-2 rounded-lg h-full min-h-[100px] relative cursor-pointer overflow-hidden",
          published ? "text-indigo-500" : "text-slate-300"
        )}
      >
        <p
          className={cn(
            "clamp-2-lines text-md",
            published ? "font-semibold" : ""
          )}
        >
          {article.title}
        </p>
        <div className="flex gap-1 flex-wrap">
          {article.tags.map((tag: string, idx: number) => (
            <div
              key={idx}
              className={cn(
                "h-fit text-white px-2 text-xs rounded-2xl flex items-center gap-1",
                published ? "bg-indigo-500" : "bg-slate-300"
              )}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "h-full w-full absolute bg-red-400/90 flex flex-col gap-1 items-center justify-center left-0 transition-all duration-100 ease-out z-50",
            confirmState
              ? "top-0 opacity-100 pointer-events-auto"
              : "top-[-100%] opacity-0 pointer-events-none"
          )}
        >
          <p className="text-white font-semibold">DELETE ARTICLE?</p>
          <div className="flex gap-1">
            <button
              onClick={() => setConfirmState(false)}
              className="w-[120px] flex justify-center border-2 border-indigo-500 text-indigo-500 bg-white p-1 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(article._id)}
              className="w-[120px] flex justify-center border-2 border-red-500 bg-red-500 text-white p-1 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </StaggerContainer>
  );
}
