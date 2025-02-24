import { TbPhotoEdit } from "react-icons/tb";
import TooltipWrapper from "../../components/utility-comps/tooltip-wrapper";
import { useState } from "react";
import AppLoader from "../../components/app-loader";
import { cn, delay } from "../../lib/utilities";
import API from "../../api";
import LinkSelectorModal from "../../components/link-selector-modal";

export default function ArticleImagePicker({
  articleData,
  setArticleData,
}: {
  articleData: Article;
  setArticleData: (val: Article) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(articleData.imgUrl ?? "");

  const handleImgChange = async (url: string) => {
    console.log("url", url);
    setLoading(true);
    setImgSrc(url);
    setArticleData({ ...articleData, imgUrl: url });
    API.article.updateArticle(articleData._id, { imgUrl: url });
  };
  delay(600).then(() => {
    // setHoverable(false);
    setLoading(false);
  });

  return (
    <div className="w-full h-[300px] p-2 group">
      <div className="w-full h-full rounded-lg overflow-hidden relative">
        <img
          src={imgSrc}
          alt={articleData.title + "_img"}
          className="mx-auto w-full h-full object-cover object-center transition-all duration-200 ease-out pointer-events-none group-hover:scale-105"
        />
        {loading ? (
          <AppLoader
            spinnerOnly
            size={80}
            className="bg-white/40 h-full w-full absolute"
          />
        ) : (
          <div
            className={cn(
              "flex cursor-pointer h-full w-full absolute-center z-50 items-center justify-center p-2 gap-1 bg-slate-100/50 transition-all duration-300 ease-out backdrop-blur-sm opacity-0 group-hover:opacity-100"
            )}
          >
            <LinkSelectorModal
              selectCallback={handleImgChange}
              singleType="image"
            >
              <TooltipWrapper message="update photo" className="relative z-50">
                <div className="h-[55px] w-[55px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500">
                  <TbPhotoEdit size={35} />
                </div>
              </TooltipWrapper>
            </LinkSelectorModal>
          </div>
        )}
      </div>
    </div>
  );
}
