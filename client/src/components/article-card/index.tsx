import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import StaggerContainer from "../utility-comps/stagger-container";
import { StateHover } from "./state-hover";
import { StateConfirmDelete } from "./state-delete";

export default function ArticleCard({
  item,
  handleDelete,
  permaDeath,
}: {
  item: Article;
  handleDelete: () => void;
  permaDeath?: boolean;
}) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const contRef = useRef<HTMLDivElement>(null);
    useOutsideClick(contRef, () => {
      setConfirmDelete(false);
    });

  return (
    <div
      ref={contRef}
      className="w-[23%] h-auto flex flex-col overflow-visible"
    >
      <StaggerContainer>
        <div
          key={item._id}
          className="flex flex-col h-full w-full items-center text-center gap-2 rounded-lg p-2 pb-4 transition-all duration-300 ease-out bg-white border shadow-sm hover:border-indigo-500 hover:shadow-sm group relative overflow-hidden"
        >
          <img
            src={item.imgUrl}
            alt={item.title}
            className="w-full h-[150px] object-cover rounded-lg"
          />
          <div className="grow flex flex-col justify-center">
            <p className="text-sm font-semibold text-indigo-500">
              {item.title}
            </p>
          </div>
          {!confirmDelete && (
            <StateHover
              articleId={item._id}
              setConfirmDelete={setConfirmDelete}
            />
          )}
          <StateConfirmDelete
            display={confirmDelete}
            setDisplay={setConfirmDelete}
            handleDelete={handleDelete}
            permaDeath={!!permaDeath}
          />
        </div>
      </StaggerContainer>
    </div>
  );
}
