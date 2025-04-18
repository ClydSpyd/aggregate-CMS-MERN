import { useRef, useState } from "react";
import { DropwdownProps } from "./types";
import { cn } from "../../../lib/utilities";
import { FaAngleDown } from "react-icons/fa";
import useOutsideClick from "../../../hooks/useOutsideClick";

export default function Dropdown({
  options,
  selected,
  onChange,
  additionalClass,
  defaultIdxZero
}: DropwdownProps) {
  const [open, setOpen] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);

  const activeLabel = selected
    ? options.find((option) => option.value === selected)?.label
    : defaultIdxZero
    ? options[0]?.label
    : "Select";

  console.log({ selected, activeLabel, options });

  useOutsideClick(contRef, () => setOpen(false));

  const handleChange = (value: string | null) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div
      ref={contRef}
      className={cn(
        "cursor-pointer w-full h-full flex items-center justify-center bg-white rounded-sm relative px-2",
        additionalClass ? `${additionalClass}` : ""
      )}
    >
      <div
        onClick={() => setOpen(true)}
        className="w-full flex justify-between items-center"
      >
        <span
          className={cn(
            "grow flex",
            !selected ? "justify-center opacity-40" : ""
          )}
        >
          {activeLabel}
        </span>
        <FaAngleDown />
      </div>
      <div
        className={cn(
          "absolute top-[105%] w-full bg-white border rounded-sm shadow-md p-1",
          open ? "block" : "hidden"
        )}
      >
        {options
          .filter((i) => i.value !== selected)
          .map((option, index) => (
            <div
              key={index}
              onClick={() => handleChange(option.value)}
              className="w-full h-[60px] flex items-center justify-between px-2 hover:bg-slate-50"
            >
              {option.label}
            </div>
          ))}
      </div>
    </div>
  );
}
