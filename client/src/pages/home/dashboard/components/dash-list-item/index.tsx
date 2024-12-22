
import { IconType } from "react-icons";
import { FaChevronRight } from "react-icons/fa";
import { cn } from "../../../../../lib/utilities";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    icon: IconType;
    disabled?: boolean;
    selected?: boolean;
  }
  
  export const DashListitem = ({
    text,
    icon,
    disabled,
    selected,
    onClick,
  }: ListItemProps) => {
    const Icon = icon;
    return (
      <div
        onClick={onClick}
        className={cn(
          "w-full h-[50px] p-2 flex items-center justify-between border border-slate-200 rounded-sm cursor-pointer text-slate-500 transition-all duration-300 hover:border-slate-400/80",
          selected ? "!border-indigo-500 pointer-events-none" : "",
          disabled
            ? "opacity-30 pointer-events-none"
            : "pointer-events-auto opacity-100"
        )}
      >
        {text}
        <div
          className={cn(
            "flex items-center gap-2",
            selected ? "text-indigo-500" : ""
          )}
        >
          <Icon size={20} />
          <FaChevronRight size={14} />
        </div>
      </div>
    );
  };