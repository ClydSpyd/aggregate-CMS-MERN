/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import ReactQuill, { Value } from "react-quill";
import { toolbarOptions } from "./config";
import { cn } from "../../lib/utilities";
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
}: {
  canSubmit: boolean;
  initialContent?: Value | null;
  saveCallback?: (raw: string, hmtl: string) => void;
  postSubmistMsg?: string | null;
  isError?: boolean;
  border?: boolean;
  btnClass?: string;
}) {
  const [dirty, setDirty] = useState<boolean>(false);
  const editorRef = useRef<ReactQuill | null>(null);

  const handleSave = async () => {
    const editor = editorRef?.current?.getEditor(); // Access Quill instance
    const htmlContent = editor?.root.innerHTML; // Extract HTML
    const plainText = editor?.getText(); // Extract plain text
    saveCallback?.(plainText ?? "", htmlContent ?? "");
  };

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
          ref={editorRef}
          modules={{ toolbar: toolbarOptions }}
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
      </div>
    </div>
  );
}
