import TooltipWrapper from "../../../../../components/utility-comps/tooltip-wrapper";
import { IoEye } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function HoverBtns({ articleId }: { articleId: string }) {
  const navigate = useNavigate();
  
  const handleRedirect = () => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="flex items-center gap-1">
      <TooltipWrapper message="change item">
        <div
          onClick={() => {}}
          className="h-[40px] w-[40px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          <FaExchangeAlt size={18} />
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
}
