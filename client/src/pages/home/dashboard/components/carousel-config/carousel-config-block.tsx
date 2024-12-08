import { useRef, useState } from "react";
import StaggerContainer from "../../../../../components/utility-comps/stagger-container";
import { StateConfirmDelete } from "./state-delete";
import { StateHover } from "./state-hover";
import useOutsideClick from "../../../../../hooks/useOutsideClick";

export default function CarouselConfigBlock({
  item,
}: {
  item: Article;
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
            articleId={item._id}
            display={confirmDelete}
            setDisplay={setConfirmDelete}
          />
        </div>
      </StaggerContainer>
    </div>
  );
}
