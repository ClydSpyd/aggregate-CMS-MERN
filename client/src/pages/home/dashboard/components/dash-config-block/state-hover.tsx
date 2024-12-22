import { AiFillEdit } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { RiFileSettingsFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import TooltipWrapper from "../../../../../components/utility-comps/tooltip-wrapper";
import { useDashboard } from "../../../../../contexts/dash-contenxt";

export const StateHover = ({
  handleDelete,
  idx,
  handleEdit,
}: {
  handleDelete: () => void;
  handleEdit: () => void;
  idx: string;
}) => {
  const { setView } = useDashboard();

  const handleRedirect = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("idx", idx);
    window.history.replaceState({}, document.title, url.toString());
    setView("pages");
  };
  return (
    <div
      className={
        "h-full w-full absolute-center z-50 flex items-center justify-center p-2 gap-1 bg-slate-100/70 transition-all duration-100 opacity-0 backdrop-blur-[2px] group-hover:opacity-100"
      }
    >
      <TooltipWrapper message="edit item">
        <div
          onClick={handleEdit}
          className="h-[40px] w-[40px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <AiFillEdit size={22} />
        </div>
      </TooltipWrapper>
      <TooltipWrapper message="delete item">
        <div
          onClick={handleDelete}
          className="h-[40px] w-[40px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <MdDeleteForever size={25} />
        </div>
      </TooltipWrapper>
      <TooltipWrapper message="page config">
        <div
          onClick={handleRedirect}
          className="h-[40px] w-[40px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <RiFileSettingsFill size={22} />
        </div>
      </TooltipWrapper>
    </div>
  );
};
