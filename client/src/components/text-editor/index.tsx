/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";
import ReactQuill, { Value } from "react-quill";
import { toolbarOptions } from "./config";
import { cn, debounce } from "../../lib/utilities";
import "react-quill/dist/quill.snow.css";
import "./quill-editor.css";

export default function TextEditor({
  canSubmit,
  initialContent,
  saveCallback,
  postSubmistMsg,
  isError,
  border,
  btnClass,
  noToolbar,
  autosave,
}: {
  canSubmit: boolean;
  initialContent?: Value | null;
  saveCallback?: (raw: string, hmtl: string) => void;
  postSubmistMsg?: string | null;
  isError?: boolean;
  border?: boolean;
  btnClass?: string;
  noToolbar?: boolean;
  autosave?: boolean;
}) {
  const [dirty, setDirty] = useState<boolean>(false);
  const editorRef = useRef<ReactQuill | null>(null);

  const handleSave = async () => {
    console.log("handleSave");
    const editor = editorRef?.current?.getEditor(); // Access Quill instance
    const htmlContent = editor?.root.innerHTML; // Extract HTML
    const plainText = editor?.getText(); // Extract plain text
    console.log("plainText", plainText);
    saveCallback?.(plainText ?? "", htmlContent ?? "");
  };

  const debounceSave = useCallback(
    debounce(() => {
      handleSave();
    }, 700),
    [editorRef]
  );


  return (
    <div
      className={cn(
        "flex grow flex-col h-full p-2 relative",
        border ? "border" : ""
      )}
    >
      <div className="grow h-auto rounded-sm flex flex-col">
        <ReactQuill
          value={initialContent ?? undefined}
          onKeyDown={() => setDirty(true)}
          onChange={(e) => {
            console.log("e", e);
            setDirty(true);
            if (autosave) debounceSave();
          }}
          ref={editorRef}
          modules={{ toolbar: noToolbar ? false : toolbarOptions }}
        />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {postSubmistMsg && isError && (
          <p
            className={cn(
              "text-white h-fit px-2 rounded-lg text-base bg-red-600"
            )}
          >
            {postSubmistMsg}
          </p>
        )}
        {!autosave && (
          <div
            onClick={handleSave}
            className={cn(
              "h-[40px] w-[160px] flex items-center justify-center border rounded-md cursor-pointer  bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white transition-colors duration-200 pointer-events-auto relative z-50",
              canSubmit && dirty
                ? "opacity-100 pointer-events-auto"
                : "opacity-50 pointer-events-none",
              btnClass ?? ""
            )}
          >
            SAVE
          </div>
        )}
      </div>
    </div>
  );
}
