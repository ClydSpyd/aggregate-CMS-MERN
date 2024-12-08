import { IoDocumentTextSharp, IoWarning } from "react-icons/io5";
import StaggerContainer from "../../../../../components/utility-comps/stagger-container";
import { useRef, useState } from "react";
import { cn, encodeQueryData } from "../../../../../lib/utilities";
import useOutsideClick from "../../../../../hooks/useOutsideClick";
import NavItemModal from "../nav-item-modal";
import { StateHover } from "./state-hover";
import { StateConfirmDelete } from "./state-delete";

export default function ConfigBlock({
  blockData,
}: {
  blockData: ConfigBlockData;
}) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const confRef = useRef<HTMLDivElement>(null);
  useOutsideClick(confRef, () => setConfirmDelete(false));

  const redirectParams = encodeQueryData({
    tags: blockData.tags.join(","),
  });

  return (
    <div className="max-w-[330px] min-w-[200px]">
      <StaggerContainer staggerDelay={50}>
        <div
          className={cn(
            "h-full flex flex-col gap-3 rounded-lg p-4 bg-white border shadow-sm relative group hover:border-slate-400 overflow-hidden",
            blockData.active ? "" : "border-slate-300 text-slate-300"
          )}
        >
          <div className="w-full flex items-center justify-between gap-2 border-b pb-1">
            <p>{blockData.name}</p>
            <div className="flex items-center">
              {blockData.count < 1 ? (
                <>
                  <p className="text-xs py-[2px] px-2 rounded-md bg-red-500 text-white flex gap-1">
                    <IoWarning size={16} className="text-white" />
                    no content
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[14px] py-[2px] text-indigo-500 font-semibold">
                    {blockData.count}
                  </p>
                  <IoDocumentTextSharp size={14} className="text-indigo-500" />
                </>
              )}
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {blockData?.tags?.map((tag, index) => (
              <p
                key={index}
                className={cn(
                  "px-2 rounded-[20px] border-2 bg-white text-xs w-fit",
                  blockData.active
                    ? "border-indigo-500 text-indigo-500"
                    : "border-slate-300 text-slate-300 opacity-60"
                )}
              >
                {tag}
              </p>
            ))}
          </div>
          {!confirmDelete && (
            <StateHover
              redirectParams={redirectParams}
              handleEdit={() => setEditModal(true)}
              handleDelete={() => {
                setConfirmDelete(true);
                console.log("ö");
              }}
            />
          )}
          <div ref={confRef}>
            <StateConfirmDelete
              id={blockData._id}
              display={confirmDelete}
              setDisplay={setConfirmDelete}
            />
          </div>
          <NavItemModal
            open={editModal}
            setOpen={setEditModal}
            valuesProp={blockData}
          />
        </div>
      </StaggerContainer>
    </div>
  );
}
