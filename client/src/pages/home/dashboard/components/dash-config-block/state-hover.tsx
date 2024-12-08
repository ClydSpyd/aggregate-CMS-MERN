import { AiFillEdit } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TooltipWrapper from "../../../../../components/utility-comps/tooltip-wrapper";

export const StateHover = ({
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
  };
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