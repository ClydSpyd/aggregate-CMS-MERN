/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { cn } from "../../lib/utilities";
import { FaChevronCircleRight } from "react-icons/fa";
import ArticleDrawer from "./article-drawer";
import ArticleView from "./article-view";
import { useLocalStorage } from "usehooks-ts";

export default function ArticlePage() {
  const [drawerOpen, setDrawrOpen] = useLocalStorage<boolean>(
    "aggreagate-drawer-open",
    false
  );
  const [articleData, setArticleData] = useState<Article>({} as Article);
  const { articleId } = useParams<{ articleId: string }>();

  useEffect(() => {
    const getArticle = async () => {
      if (!articleId || articleData._id) return;
      const { data } = await API.article.getArticle(articleId);
      if (data) {
        setArticleData(data);
      }
    };
    getArticle();
  }, [articleId]);

  return (
    <div className="h-full w-screen flex items-center justify-center overflow-hidden">
      {!articleData._id ? (
        <h1>Loading...</h1>
      ) : (
        <div className="w-full flex h-full">
          <div
            className={cn(
              "border border-t-0 h-full transition-all ease-in-out duration-500 rounded-tr-xl rounded-br-xl relative overflow-x-visible bg-slate-100",
              drawerOpen ? "w-[400px]" : "w-[20px]"
            )}
          >
            <ArticleDrawer articleData={articleData} />
            <div
              className="absolute-vert right-[-10px] cursor-pointer"
              onClick={() => setDrawrOpen(!drawerOpen)}
            >
              <FaChevronCircleRight
                size={20}
                className={cn(
                  "bg-white text-indigo-500 transition-all duration-300 ease-linear rounded-full",
                  drawerOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
          </div>
          <ArticleView
            setArticleData={setArticleData}
            articleData={articleData}
          />
        </div>
      )}
    </div>
  );
}
