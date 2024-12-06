import { cn } from "../../lib/utilities";
import { ArticlePreviewProps } from "./types";
import { FiEdit } from "react-icons/fi";

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

export default function ArticlePreview({
  articleData,
  focusTitle,
  focusCaption,
}: ArticlePreviewProps) {
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
          <div
            className="mt-5 text-left"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </div>
      </div>
    </div>
  );
}
