import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utilities";
import { CgAdd } from "react-icons/cg";
import ModalWrapper from "../../../components/utility-comps/modal-wrapper";
import { IconType } from "react-icons";
import { RiArticleLine } from "react-icons/ri";
import { TbSlideshow } from "react-icons/tb";
import { ImList2 } from "react-icons/im";
import InputField from "../../../components/utility-comps/input-field";
import { buildArticlePayload } from "../helpers";
import { useAuth } from "../../../contexts/auth-context";
import API from "../../../api";
import { useNavigate } from 'react-router-dom';


interface ArticleOption {
    type: ArticleType;
    label: string;
    icon: IconType;
    iconSize: number;
}
const articleOptions: ArticleOption[] = [
  {
    type: "standard",
    label: "Standard",
    icon: RiArticleLine,
    iconSize: 32,
  },
  {
    type: "list",
    label: "List",
    icon: ImList2,
    iconSize: 23,
  },
  {
    type: "slides",
    label: "Slides",
    icon: TbSlideshow,
    iconSize: 40,
  },
];

export default function AddArticlBtn({
  size = "sm",
  text = "add article",
}: {
  size?: "sm" | "md" | "lg";
  text?: string;
}) {
  const [articleName, setArticleName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<ArticleType>("standard");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) {
      setSelectedType("standard");
    } else {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleCreateArticle = async () => {
    const payload: Article = buildArticlePayload({
      title: articleName,
      type: selectedType,
    });

    const { data, error } = await API.article.createArticle(
      payload,
      user?._id ?? ""
    );
    console.log({ payload, data, error });
    if (data) {
      navigate(`/article/${data._id}`);
    } else if (error) {
      console.log("failed to save article");
    }
  };
  return (
    <>
      <div
        //   onClick={handleNewArticle}
        onClick={() => setOpen(true)}
        className={cn(
          "flex gap-1 items-center justify-center text-sm text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer",
          size === "sm"
            ? "text-sm h-[30px] px-2"
            : size === "md"
            ? "text-base h-[40px] px-4"
            : "text-base h-[50px] px-6"
        )}
      >
        {size === "sm" && <CgAdd size={20} />}
        {text}
      </div>
      <ModalWrapper open={open} onClose={() => setOpen(false)}>
        <div className="bg-white rounded-lg pt-10 p-6 w-[400px] flex flex-col gap-2 relative overflow-hidden">
          {/* <h1 className="text-xl font-semibold text-indigo-500">
            Article Type
          </h1> */}

          <InputField
            placeholder="Article Title"
            value={articleName}
            onChange={(val: string) => setArticleName(val)}
            refProp={inputRef}
          />
          <div className="w-full flex gap-2 h-[100px]">
            {articleOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.type}
                  onClick={() => setSelectedType(option.type)}
                  className={cn(
                    "h-full w-1/3 flex flex-col items-center justify-center p-2 rounded-md cursor-pointer border-2",
                    selectedType === option.type
                      ? "bg-indigo-500 text-white border-transparent"
                      : "hover:bg-indigo-100 border-indigo-500 text-indigo-500"
                  )}
                >
                  <p>{option.label}</p>
                  <div className="h-[35px] w-[35px] flex items-center justify-center">
                    <Icon size={option.iconSize} />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            onClick={handleCreateArticle}
            className={cn(
              "h-[50px] w-full flex gap-1 items-center justify-center text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-[4px] cursor-pointer",
              articleName.length < 5 ? "opacity-50 pointer-events-none" : ""
            )}
          >
            Submit
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};