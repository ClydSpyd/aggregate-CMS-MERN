import { TbPhotoEdit } from "react-icons/tb";
import TooltipWrapper from "../../components/utility-comps/tooltip-wrapper";
import { useRef, useState } from "react";
import API from "../../api";
import AppLoader from "../../components/app-loader";
import { cn, delay } from "../../lib/utilities";

export default function ArticleImagePicker({
  articleData,
  setArticleData,
}: {
  articleData: Article;
  setArticleData: (val: Article) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [hoverable, setHoverable] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(articleData.imgUrl ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const { data, error } = await API.upload.image(file);
      if (data) {
        setImgSrc(data.url);
        setArticleData({ ...articleData, imgUrl: data.url });
        API.article.updateArticle(articleData._id, { imgUrl: data.url });
      } else {
        console.log(error);
      }
    }
    delay(600).then(() => {
      setHoverable(false);
      setLoading(false);
  });
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="w-full h-[300px] p-2 group"
      onMouseMove={() => setHoverable(true)}
    >
      <div className="w-full h-full rounded-lg overflow-hidden relative">
        <img
          src={imgSrc}
          alt={articleData.title + "_img"}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-200 ease-out"
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
              "flex cursor-pointer h-full w-full absolute-center z-50 items-center justify-center p-2 gap-1 bg-slate-100/50 transition-all duration-300 ease-out backdrop-blur-sm opacity-0 group-hover:opacity-100",
              hoverable ? "" : "!opacity-0"
            )}
          >
            <TooltipWrapper message="update photo">
              <div
                onClick={handleInputClick}
                className="h-[55px] w-[55px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500"
              >
                <TbPhotoEdit size={35} />
              </div>
            </TooltipWrapper>
          </div>
        )}
      </div>
      <input
        className="relative z-50"
        ref={inputRef}
        onChange={handleImgChange}
        type="file"
        name="img_input"
        accept="image/png, image/jpeg, image/jpg"
        hidden
      />
    </div>
  );
}
