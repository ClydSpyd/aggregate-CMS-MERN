import { InputFieldProps } from "./types";
import { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { cn } from "../../../lib/utilities";

export default function InputField({
  value,
  placeholder,
  onChange,
  additionalClass,
  withDeleteBtn,
  secure,
  refProp,
  autofocus,
  ...rest
}: //   validityCheck,
InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showValue, setShowValue] = useState(!secure);

  const inputRef = useRef<HTMLInputElement>(null);

  const ref = refProp ?? inputRef;

  const hanldleContainerClick = () => ref.current?.focus();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => onChange("");

  return (
    <div
      onClick={hanldleContainerClick}
      className={cn(
        "cursor-text h-[60px] w-full flex items-center justify-center bg-white border rounded-sm relative",
        additionalClass ? `${additionalClass}` : "",
        isFocused ? "hover:border-gray-200" : ""
      )}
    >
      {/* hidden input to prevent autofill */}
      <input
        type={!showValue ? "password" : "text"}
        placeholder={placeholder}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        {...rest}
      />
      {/* hidden input to prevent autofill */}
      <p
        className={cn(
          "absolute left-[10px] transition-all duration-300 m-0 text-[#a0a0a0] z-50",
          value !== "" || isFocused ? "top-[8px] text-xs" : "top-[15px] text-lg"
        )}
      >
        {placeholder}
      </p>
      {isFocused && (
        <div className="absolute rounded-sm inset-0 z-10 shadow-[inset_0_0_0_2px_black] pointer-events-none" />
      )}
      <input
        autoFocus={!!autofocus}
        autoComplete="off"
        className="w-full h-[30px] bg-transparent px-[10px] relative z-0 top-[8px] selection:bg-indigo-300"
        type={!showValue ? "password" : "text"}
        ref={ref}
        value={value}
        onChange={handleInput}
        data-testid="input-field"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setShowValue(!secure);
        }}
      />
      {!!value && withDeleteBtn && (
        <TiDelete
          onClick={handleClear}
          size={23}
          className="absolute z-20 text-slate-400 hover:text-slate-600 cursor-pointer right-[5px]"
        />
      )}

      {secure && (
        <div
          onClick={() => setShowValue(!showValue)}
          className={cn(
            "absolute right-1 h-[40px] w-[40px] flex items-center justify-center text-[25px] cursor-pointer z-50",
            showValue ? "text-black" : "text-slate-500"
          )}
        >
          {!showValue ? <IoMdEye /> : <IoMdEyeOff />}
        </div>
      )}
    </div>
  );
}
