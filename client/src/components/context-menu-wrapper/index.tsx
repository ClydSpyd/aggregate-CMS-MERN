import { HiDotsVertical } from "react-icons/hi";
import { cn } from "../../lib/utilities";
import { useState } from "react";

export default function ContextMenuWrapper({
  children,
  alwaysVisible,
  relative,
}: {
  children: React.ReactNode;
  alwaysVisible?: boolean;
  relative?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div
      onMouseLeave={() => setMenuOpen(false)}
      onClick={() => setMenuOpen(!menuOpen)}
      className={cn(
        "h-[25px] w-[25px] rounded-sm border border-slate-300 shadow-sm cursor-pointer  duration-300 transition-all ease-out z-40 flex items-center justify-center bg-white text-slate-400 hover hover:border-indigo-500",
        alwaysVisible ? "" : "opacity-0 group-hover/container:opacity-100",
        relative ? "relative" : "absolute top-2 right-2"
      )}
    >
      <HiDotsVertical size={16} />
      <div
        className={cn(
          "absolute transition-all duration-100 ease-out right-[-0px] py-1 w-[150px]",
          menuOpen
            ? "opacity-100 top-[100%] pointer-events-auto"
            : "opacity-0 top-1/2 pointer-events-none"
        )}
      >
        {children}
      </div>
    </div>
  );
}
