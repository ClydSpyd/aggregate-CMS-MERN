import { MdDeleteForever } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TooltipWrapper from "../utility-comps/tooltip-wrapper";

export const StateHover = ({
  articleId,
  setConfirmDelete
}: {
  articleId: string;
  setConfirmDelete: (val: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/article/${articleId}`);
  };

  const handleDelete = async () => {
    setConfirmDelete(true);
  };

  return (
    <div
      className={
        "h-full w-full absolute-center z-50 flex items-center justify-center p-2 gap-1 bg-slate-100/70 transition-all duration-100 backdrop-blur-sm opacity-0 group-hover:opacity-100"
      }
    >
      <TooltipWrapper message="delete item">
        <div
          onClick={handleDelete}
          className="h-[40px] w-[40px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <MdDeleteForever size={23} />
        </div>
      </TooltipWrapper>
      <TooltipWrapper message="view article">
        <div
          onClick={handleRedirect}
          className="h-[40px] w-[40px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <IoEye size={22} />
        </div>
      </TooltipWrapper>
    </div>
  );
};