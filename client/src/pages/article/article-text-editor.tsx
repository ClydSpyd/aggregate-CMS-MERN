import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import TextEditor from "../../components/text-editor";
// import StickyWrapper from "../../components/utility-comps/sticky-wrapper";

export const ArticleTextEditor = ({
    setShow,
    articleData,
    handleContentChange,
    noToolbar,
    autosave,
  }: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    articleData: Article;
    handleContentChange: (raw: string, html: string) => void;
    noToolbar?: boolean;
    autosave?: boolean;
  }) => {
    const contRef = useRef<HTMLDivElement>(null);
    useOutsideClick(contRef, () => setShow(false));
    return (
      <div
        ref={contRef}
        className="h-full w-full rounded-lg bg-white flex flex-col items-center justify-center pb-2"
      >
        {/* <StickyWrapper>
          <h1 className="h-[200px] w-[400px] flex items-center justify-center bg-lime-500">
            öÖö
          </h1>
        </StickyWrapper> */}
        <div className="grow h-fit min-w-full overflow-y-auto">
          <TextEditor
            autosave={autosave}
            noToolbar={noToolbar}
            canSubmit={true}
            initialContent={articleData.content}
            saveCallback={handleContentChange}
            btnClass="absolute top-2 right-4"
          />
        </div>
      </div>
    );
  };