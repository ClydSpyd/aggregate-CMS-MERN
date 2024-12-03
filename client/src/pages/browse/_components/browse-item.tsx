import { useNavigate } from "react-router-dom";
import StaggerContainer from "../../../components/utility-comps/stagger-container";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { cn } from "../../../lib/utilities";

const ContextMenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div
      onMouseLeave={() => setMenuOpen(false)}
      onClick={() => setMenuOpen(!menuOpen)}
      className="h-[25px] w-[25px] rounded-sm border cursor-pointer absolute top-2 right-2 duration-300 transition-all ease-out opacity-0 group-hover/container:opacity-100 z-50 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500"
    >
      <HiDotsVertical size={16} />
      <div
        className={cn(
          "absolute transition-all duration-100 ease-out right-[-0px] py-1",
          menuOpen ? "opacity-100 top-[100%]" : "opacity-0 top-1/2"
        )}
      >
        <div className="bg-white rounded-sm shadow-md border px-2">
          <p>HELLO</p>
          <p>WORLD</p>
        </div>
      </div>
    </div>
  );
};

export default function BrowseItem({ article }: { article: Article }) {
  const navigate = useNavigate();
  return (
    <StaggerContainer>
      <ContextMenu />
      <div
        key={article._id}
        onClick={() => navigate(`/article/${article._id}`)}
        className="bg-white shadow-sm p-2 border flex flex-col gap-2 rounded-sm h-full relative cursor-pointer"
      >
        <p className="clamp-2-lines text-md text-indigo-500 font-semibold">
          {article.title}
        </p>
        <p className="clamp-1-line text-sm text-slate-500 font-light">
          {article.caption}
        </p>
        <div className="flex gap-1 flex-wrap">
          {article.tags.map((tag: string, idx: number) => (
            <div
              key={idx}
              className="h-fit bg-indigo-500 text-white px-2 text-xs rounded-2xl flex items-center gap-1"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </StaggerContainer>
  );
}
