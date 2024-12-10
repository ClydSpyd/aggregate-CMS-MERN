import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import TextEditor from "../../components/text-editor";

export const ArticleTextEditor = ({
    setShow,
    articleData,
    handleContentChange,
  }: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    articleData: Article;
    handleContentChange: (raw: string, html: string) => void;
  }) => {
    const contRef = useRef<HTMLDivElement>(null);
    useOutsideClick(contRef, () => setShow(false));
    return (
      <div
        ref={contRef}
        className="h-full w-full rounded-lg bg-white flex flex-col items-center justify-center pb-2"
      >
        <div className="grow h-fit min-w-full overflow-y-auto pr-4">
          <TextEditor
            canSubmit={true}
            initialContent={articleData.content}
            saveCallback={handleContentChange}
            btnClass="absolute top-2 right-6"
          />
        </div>
      </div>
    );
  };