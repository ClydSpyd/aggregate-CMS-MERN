import { IoDocumentTextSharp, IoWarning } from "react-icons/io5";
import StaggerContainer from "../../../../components/utility-comps/stagger-container";
import { AiFillEdit } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { cn, encodeQueryData } from "../../../../lib/utilities";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import API from "../../../../api";
import { useDashboard } from "../../../../contexts/dash-contenxt";
import { useNavigate } from "react-router-dom";
import TooltipWrapper from "../../../../components/utility-comps/tooltip-wrapper";
import NavItemModal from "./nav-item-modal";


const StateHover = ({
  handleDelete,
  redirectParams,
  handleEdit,
}: {
  handleDelete: () => void;
  handleEdit: () => void;
  redirectParams: string;
}) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/browse?${redirectParams}`);
  }
  return (
    <div
      className={
        "h-full w-full absolute-center z-50 flex items-center justify-center p-2 gap-1 bg-slate-100/70 transition-all duration-100 opacity-0 group-hover:opacity-100"
      }
    >
      <TooltipWrapper message="edit item">
        <div
          onClick={handleEdit}
          className="cursor-pointer h-[35px] w-[35px] flex items-center justify-center border rounded-sm transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <AiFillEdit size={18} />
        </div>
      </TooltipWrapper>
      <TooltipWrapper message="delete item">
        <div
          onClick={handleDelete}
          className="cursor-pointer h-[35px] w-[35px] flex items-center justify-center border rounded-sm bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <MdDeleteForever size={20} />
        </div>
      </TooltipWrapper>
      <TooltipWrapper message="view articles">
        <div
          onClick={handleRedirect}
          className="cursor-pointer h-[35px] w-[35px] flex items-center justify-center border rounded-sm bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <FaListAlt size={18} />
        </div>
      </TooltipWrapper>
    </div>
  );
};

const StateConfirmDelete = ({
  display,
  setDisplay,
  id
}: {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  id: string;
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {config, setConfig} = useDashboard();

  const handleConfirm = async () => {
    setSubmitting(true);
    console.log({ submitting });
    const {data} = await API.config.deleteNavItem(id);
    if(data && config) {
      setConfig({...config, nav: data});
      setDisplay(false);
    } else {};
    setSubmitting(false);
  }

  return (
    <div
      className={cn(
        "h-full w-full absolute-center flex flex-col items-center justify-center p-2 gap-1 bg-slate-100/70 backdrop-blur-sm transition-all duration-100",
        display
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-auto"
      )}
    >
      <p>Delete?</p>
      <div className="flex gap-2">
        <button onClick={handleConfirm} className="bg-red-500 text-white text-sm w-[80px] py-1 rounded-md hover:bg-red-600 transition-all duration-100">
          Confirm
        </button>
        <button
          onClick={() => setDisplay(false)}
          className="bg-white text-slate-500 text-sm w-[80px] py-1 rounded-md border hover:border-slate-300 hover:bg-slate-50 transition-all duration-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};


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
    <div className="max-w-[280px] min-w-[200px]">
      <StaggerContainer staggerDelay={50}>
        <div className="flex flex-col gap-3 rounded-lg p-4 bg-white border shadow-sm relative group hover:border-slate-400 overflow-hidden">
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
                className="px-2 rounded-[20px] border-2 border-indigo-500 text-indigo-500 bg-white text-xs w-fit"
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
