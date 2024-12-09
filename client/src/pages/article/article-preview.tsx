import { useState } from "react";
import { cn } from "../../lib/utilities";
import { ArticlePreviewProps } from "./types";
import { FiEdit } from "react-icons/fi";
import ModalWrapper from "../../components/utility-comps/modal-wrapper";
import TextEditor from "../../components/text-editor";

const HoverWrapper = ({
  children,
  onClick,
  additionalClass = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  additionalClass?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full border border-transparent transition-all duration-300 hover:border-slate-300 px-10 rounded-lg cursor-pointer relative group",
        additionalClass
      )}
    >
      <FiEdit
        size={20}
        className="absolute top-2 right-2 transition-all duration-300 opacity-0 group-hover:opacity-100 text-slate-400"
      />
      {children}
    </div>
  );
};

const EditArticleContent = ({
  show,
  setShow,
  articleData,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  articleData: Article;
}) => {
  return (
    <ModalWrapper open={show} onClose={() => setShow(false)}>
      <div className="w-[80vw] h-[80vh] rounded-lg bg-white flex flex-col items-center justify-center pb-2">
        <div className="grow h-fit min-w-full overflow-y-auto pr-4">
          <TextEditor
            canSubmit={true}
            initialContent={articleData.content}
            saveCallback={() => {
              console.log("blocks, html");
            }}
          />
          {/* <h1>{articleData.content}</h1> */}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default function ArticlePreview({
  articleData,
  focusTitle,
  focusCaption,
}: ArticlePreviewProps) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="grow h-full flex justify-center overflow-y-auto transition-all ease-in-out duration-500 px-4">
      <div className="w-full max-w-[1050px] h-fit flex flex-col items-center text-center pb-16">
        <img
          src={articleData.imgUrl}
          alt={articleData.title + "_img"}
          className="w-full h-[600px] object-cover object-center"
        />
        <div className="w-full flex flex-col items-center">
          <HoverWrapper onClick={focusTitle} additionalClass="my-4">
            <h1
              onClick={focusTitle}
              className="text-[55px] leading-[1.1] tracking-tighter font-bold text-indigo-500 my-4"
            >
              {articleData.title}
            </h1>
          </HoverWrapper>
          <HoverWrapper onClick={focusCaption} additionalClass="my-2 py-4">
            <h3 onClick={focusCaption} className="text-3xl font-semibold px-10">
              {articleData.caption}
            </h3>
          </HoverWrapper>
          <HoverWrapper onClick={() => setEdit(true)} additionalClass="my-2">
            <div
              className="text-left p-4"
              dangerouslySetInnerHTML={{ __html: articleData.content }}
            />
          </HoverWrapper>
        </div>
        <EditArticleContent
          show={edit}
          setShow={setEdit}
          articleData={articleData}
        />
      </div>
    </div>
  );
}
