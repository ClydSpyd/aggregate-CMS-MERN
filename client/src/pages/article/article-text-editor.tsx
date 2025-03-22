import { useRef } from "react";
import TextEditor from "../../components/text-editor";

export const ArticleTextEditor = ({
    setShow,
    articleData,
    handleContentChange,
    noToolbar,
  }: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    articleData: Article;
    handleContentChange: (raw: string, html: string) => void;
    noToolbar?: boolean;
  }) => {
    const contRef = useRef<HTMLDivElement>(null);
    return (
      <div
        ref={contRef}
        className="h-full min-h-[400px] w-full rounded-lg flex flex-col items-center justify-center pb-2"
      >
        <div className="h-fit min-w-full overflow-y-auto">
          <TextEditor
            noToolbar={noToolbar}
            canSubmit={true}
            initialContent={articleData.content}
            saveCallback={handleContentChange}
            btnClass="absolute top-2 right-4"
            outsideClickHandler={() => setShow(false)}
          />
        </div>
      </div>
    );
  };