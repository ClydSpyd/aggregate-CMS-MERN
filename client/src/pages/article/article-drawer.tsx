import { Link } from "react-router-dom";
import TagSelector from "../../components/tag-selector";
import { ArticleDrawerProps } from "./types";
import { format } from "date-fns";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useState } from "react";
import Checkbox from "../../components/utility-comps/checkbox";
import API from "../../api";
import { cn } from "../../lib/utilities";
import { isPublishable } from "../create/helpers";
import DisplayAuthorSelector from "../../components/author-selector/display-author-selector";

const formatDate = (date: Date) => {
  return format(date, "do MMM yyyy");
};
const extractDomain = (url: string) => {
  const match = url.match(
    /^(https?:\/\/)?(www\.)?([^/]+\.(com|net|co\.uk|es))/
  );
  console.log({ url, match });
  return match ? match[3] : "";
};

export default function ArticleDrawer({
  articleData,
}: ArticleDrawerProps) {
  const [primary, setPrimary] = useState<boolean>(articleData.highlight.includes("primary"));
  const [published, setPublished] = useState<boolean>(articleData.published);

  const handlePublished = () => {
    API.article.updateArticle(articleData._id, {
      published: !published,
    });
    setPublished((prev) => !prev);
  };
  const handleHighlight = (type: "primary" | "secondary") => {
    if(type === "primary") {
      setPrimary((prev) => !prev);
    }
    const arr = articleData.highlight;
    const index = arr.indexOf(type);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(type);
    }
    API.article.updateArticle(articleData._id, {
      highlight: arr,
    });
  };
  
    const handleTags = (tags: string[]) => {
      API.article.updateArticle(articleData._id, {
        tags,
      });
    }

  const publishable = isPublishable(articleData);

  const handleDisplayAuthor = (val: string) => {
    // setSelected(val);
    API.article.updateArticle(articleData._id, { displayAuthor: val });
  }


  return (
    <div className="h-[calc(100%-30px)] w-[370px] absolute right-4 top-4 flex flex-col no-bar-scroll-container">
      <div className="flex flex-col gap-2 grow">
        <TagSelector tags={articleData.tags} setTags={handleTags} />
        <div
          onClick={handlePublished}
          className={cn(
            "px-4 h-[60px] w-full flex items-center justify-between bg-white border rounded-sm relative cursor-pointer group",
            !publishable ? "pointer-events-none opacity-50" : ""
          )}
        >
          <p className={"text-[#a0a0a0] group-hover:text-[#747474]"}>
            Published
          </p>
          <Checkbox checked={published} />
        </div>
        <div
          className={cn(
            "rounded-md border bg-white p-4 pt-3 flex flex-col gap-2",
            !publishable ? "pointer-events-none opacity-50" : ""
          )}
        >
          <p className="text-xs text-[#a0a0a0]">Feature article:</p>
          <div
            onClick={() => handleHighlight("primary")}
            className="px-4 h-[60px] w-full flex items-center justify-between bg-white border rounded-sm relative cursor-pointer group"
          >
            <p className={"text-[#a0a0a0] group-hover:text-[#747474]"}>
              Primary carousel
            </p>
            <Checkbox checked={primary} />
          </div>
        </div>
        <div className="px-4 h-[60px] w-full flex items-center justify-between bg-white border rounded-sm relative">
          <p className={"text-[#a0a0a0]"}>Author:</p>
          <div className="flex items-center gap-1">
            <p>{articleData.author.username}</p>
            <div className="relative z-10 h-[40px] w-[40px] rounded-full border-2 border-white overflow-hidden">
              <img
                src={articleData.author.avatarUrl}
                alt={articleData.author.username + "_avatar"}
              />
            </div>
          </div>
        </div>
        <div className="px-2 pl-4 h-[60px] w-full flex gap-2 items-center justify-between bg-white border rounded-sm relative">
          <p className={"text-[#a0a0a0]"}>Display Author:</p>
          <div className="grow border h-[50px] flex items-center gap-1 relative z-20">
            <DisplayAuthorSelector
              onChange={handleDisplayAuthor}
              defaultSelected={articleData?.displayAuthor?._id ?? null}
            />
          </div>
        </div>
        <div className="px-4 h-[60px] w-full flex items-center justify-between bg-white border rounded-sm relative">
          <p className={"text-[#a0a0a0]"}>Created at:</p>
          <p>{formatDate(new Date(articleData.createdAt))}</p>
        </div>
        {/* {articleData.createdAt !== articleData.updatedAt && (
          <div className="px-4 h-[60px] w-full flex items-center justify-between bg-white border rounded-sm relative">
            <p className={"text-[#a0a0a0]"}>Update at:</p>
            <p>{formatDate(new Date(articleData.updatedAt))}</p>
          </div>
        )} */}
        {!!articleData.sourceUrl && (
          <div className="px-4 h-[60px] w-full flex items-center justify-between bg-white border rounded-sm relative">
            <p className="text-[#a0a0a0]">Source:</p>
            <div className="flex gap-2 items-center">
              <p>{extractDomain(articleData.sourceUrl)}</p>

              <Link to={articleData.sourceUrl} target="_blank" rel="noreferrer">
                <div
                  className={
                    "h-[35px] w-[35px] flex items-center justify-center bg-white border border-white rounded-md cursor-pointer hover:bg-indigo-500 hover:border-white transition-all duration-300 group/open"
                  }
                >
                  <MdOutlineOpenInNew
                    size={20}
                    className="text-indigo-600 group-hover/open:text-white"
                  />
                </div>
              </Link>
            </div>
          </div>
        )}
        {/* <div className="flex justify-between gap-2 px-4 h-[60px] w-full bg-white border rounded-sm relative cursor-pointe">
                <div
                onClick={() => setPrimary((prev) => !prev)}
                className="cursor-pointer flex items-center gap-4"
                >
                <p className={"text-[#a0a0a0]"}>Primary carousel</p>
                <Checkbox checked={primary} />
                </div>
                <div
                onClick={() => setSecondary((prev) => !prev)}
                className="cursor-pointer flex items-center gap-4"
                >
                <p className={"text-[#a0a0a0]"}>Secondary carousel</p>
                <Checkbox checked={secondary} />
                </div>
            </div> */}
      </div>
      <div className="w-full h-[60px] relative right-[2px]"></div>
    </div>
  );
}
