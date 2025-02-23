import { FiEdit } from "react-icons/fi";
import { cn } from "../../../lib/utilities";

export const HoverWrapper = ({
  children,
  onClick,
  additionalClass = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  additionalClass?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full border border-transparent transition-all duration-300 hover:border-gray-200 px-6 rounded-lg cursor-pointer relative group my-2 py-4",
        additionalClass
      )}
    >
      <FiEdit
        size={20}
        className="absolute top-2 right-2 transition-all duration-300 opacity-0 group-hover:opacity-100 text-slate-400"
      />
      {children}
    </div>
  );
};
