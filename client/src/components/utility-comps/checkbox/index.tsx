import { cn } from "../../../lib/utilities";
import { CheckboxProps } from "./types";
import { FaCheck } from "react-icons/fa";


export default function Checkbox({ checked, additionalClass }: CheckboxProps) {
  return (
    <div
      className={cn(
        "h-[20px] w-[20px] rounded-sm border-2 border-indigo-500 flex items-center justify-center",
        checked ? "bg-indigo-500" : "bg-white",
        additionalClass
      )}
    >
      {checked && <FaCheck size={14} className="text-white" />}
    </div>
  );
}
