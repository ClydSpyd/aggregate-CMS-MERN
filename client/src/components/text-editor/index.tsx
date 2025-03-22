/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Value } from "react-quill";
import { cn } from "../../lib/utilities";
import "react-quill/dist/quill.snow.css";
import "./quill-editor.css";
import LinkSelectorModal from "../link-selector-modal";
import useOutsideClick from "../../hooks/useOutsideClick";
import ModalWrapper from "../utility-comps/modal-wrapper";

export default function TextEditor({
  canSubmit,
  initialContent,
  saveCallback,
  postSubmistMsg,
  isError,
  border,
  btnClass,
  noToolbar,
  outsideClickHandler,
}: {
  canSubmit: boolean;
  initialContent?: Value | null;
  saveCallback?: (raw: string, hmtl: string) => void;
  postSubmistMsg?: string | null;
  isError?: boolean;
  border?: boolean;
  btnClass?: string;
  noToolbar?: boolean;
  outsideClickHandler?: () => void;
}) {
  const [confirmClose, setConfirmClose] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);
  const imgPickerOpen = useRef<boolean>(false);
  const constRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<ReactQuill | null>(null);
  const imgModalRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    setDirty(false);
    const editor = editorRef?.current?.getEditor();
    const htmlContent = editor?.root.innerHTML;
    const plainText = editor?.getText();
    saveCallback?.(plainText ?? "", htmlContent ?? "");
  };

  const insertImg = (imageUrl: string) => {
    console.log("insertImg", imageUrl);
    const editor = editorRef?.current?.getEditor();
    if(!editor) return;
    const range = editor.getSelection()!;
    editor.insertEmbed(range.index, "image", imageUrl);
  };

  const toolbarOptions = useMemo(
    () => ({
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: function () {
          imgPickerOpen.current = true;
          imgModalRef.current?.click();
        },
      },
    }),
    []
  );
  
  useOutsideClick(constRef, (e: MouseEvent) => {
    // e.preventDefault();
    // e.stopPropagation();
    if (!outsideClickHandler||imgPickerOpen.current) return;
    if (dirty) {
      handleSave();
      outsideClickHandler();
    } else {
      imgPickerOpen.current = false;
      outsideClickHandler();

    }
  });

  return (
    <div
      ref={constRef}
      className={cn(
        "flex grow flex-col h-full p-2 relative",
        border ? "border" : ""
      )}
    >
      <div
        onClick={() => editorRef.current?.focus()}
        className="grow h-auto min-h-[400px] rounded-sm flex flex-col cursor-text"
      >
        <ReactQuill
          value={initialContent ?? undefined}
          onKeyDown={() => setDirty(true)}
          ref={editorRef}
          modules={{
            toolbar: noToolbar ? false : toolbarOptions,
          }}
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
      <div className="absolute">
        <LinkSelectorModal
          singleType="image"
          selectCallback={insertImg}
          closeCallback={() => (imgPickerOpen.current = false)}
        >
          <div ref={imgModalRef} />
        </LinkSelectorModal>
      </div>
      <ModalWrapper open={confirmClose} onClose={() => setConfirmClose(false)}>
        <div className="w-[300px] h-[200px] bg-white rounded-lg"></div>
      </ModalWrapper>
    </div>
  );
}
