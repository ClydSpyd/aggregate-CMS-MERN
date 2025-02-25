/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { HoverWrapper } from "../../components/utility-comps/hover-wrapper";
import { cn, debounce } from "../../lib/utilities";
import useOutsideClick from "../../hooks/useOutsideClick";

interface EditData {
  title: boolean;
  caption: boolean;
  content: boolean;
}

export default function EditWrapper({
  children,
  keyName,
  editData,
  initialValue,
  toggleEdit,
  inputClass,
  saveCallback,
}: {
  children: React.ReactNode;
  keyName: keyof EditData;
  editData: EditData;
  saveCallback: (val: string, keyName: keyof EditData) => void;
  initialValue: string;
  toggleEdit: (keyName: keyof EditData) => void;
  inputClass?: string;
}) {
  const [inputVal, setInputVal] = useState<string>(initialValue);
  const editRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useOutsideClick(editRef, () => {
    if (!editData[keyName]) return;
    toggleEdit(keyName);
  });

  useEffect(() => {
    if (editData[keyName]) {
      const ref = keyName === "title" ? textAreaRef : inputRef;
      ref.current?.focus();
      ref.current?.setSelectionRange(0, ref.current.value.length);
    }
  }, [editData[keyName]]);

  const debounceUpdate = useCallback(
    debounce((input:string) => {
      saveCallback(input, keyName);
    }, 700),
    []
  );

  const autoResize = () => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return editData[keyName] ? (
    <div
      ref={editRef}
      className="w-full border  transition-all duration-300 px-6 rounded-lg cursor-pointer relative group py-6"
    >
      {" "}
      {keyName === "title" ? (
        <textarea
          onBlur={() => toggleEdit(keyName)}
          ref={textAreaRef}
          className={cn(
            "h-fit resize-none w-full text-center",
            inputClass ?? ""
          )}
          value={inputVal}
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputVal(e.target.value);
            debounceUpdate(e.target.value);
          }}
          id=""
          onChange={autoResize}
        />
      ) : (
        <input
          onBlur={() => toggleEdit(keyName)}
          ref={inputRef}
          className={cn("w-full text-center", inputClass ?? "")}
          type="text"
          value={inputVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
              setInputVal(e.target.value);
              debounceUpdate(e.target.value);
            }}
          id=""
        />
      )}
      {/* <div
        onClick={handleSave}
        className={cn(
          "absolute bottom-4 h-[40px] w-[160px] flex items-center justify-center border rounded-md cursor-pointer  bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white transition-colors duration-200 pointer-events-auto z-50",
          keyName === "title" ? "bottom-2 right-4" : "absolute-vert right-2"
        )}
      >
        SAVE
      </div> */}
    </div>
  ) : (
    <HoverWrapper
      onClick={() => {
        console.log({ keyName });
        toggleEdit(keyName);
      }}
      additionalClass=""
    >
      {children}
    </HoverWrapper>
  );
}
