/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BrowseFilters from "./_components/browse-filters";
import { ImWarning } from "react-icons/im";
import API from "../../api";
import ArticleCard from "../../components/article-card";
import { useRecentArticles } from "../../queries/userArticles";

interface BrowseProps {
  recentArticles: Article[];
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  refetchRecent: ReturnType<typeof useRecentArticles>["refetch"];
}

export default function BrowseContent({
  recentArticles,
  error,
  setError,
  refetchRecent,
}: BrowseProps) {
  const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(
    null
  );
  
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(
    filteredArticles ?? recentArticles
  );

  useEffect(() => {
    setDisplayedArticles(filteredArticles ?? recentArticles);
  }, [filteredArticles]);

  // const handleDelete = async () => {
  //   console.log("delete");
    const handleDelete = async (id: string) => {
    const { status, error } = await API.article.deleteArticle(id);
    setDisplayedArticles((prev) => prev?.filter((article) => article._id !== id));
    // delay(1000).then(() => refetchRecent());
    if (status === 200) {
      refetchRecent();
    } else if (error) {
      setError(error);
    }
  };

  console.log({ filteredArticles });

  return (
    <div className="w-full h-full flex gap-2 overflow-y-auto overflow-x-hidden box-border">
      <BrowseFilters
        setFilteredArticles={setFilteredArticles}
        setError={setError}
      />
      {error ? (
        <div className="grow h-full flex flex-col gap-2 items-center justify-center">
          <ImWarning className="text-indigo-500" size={40} />
          <p className="text-sm text-indigo-500">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-start grow">
          <div className="col-span-full">
            {filteredArticles ? (
              <p className="text-lg text-indigo-500 font-semibold text-slate-5000 mt-2">
                Filtered items:
              </p>
            ) : (
              <p className="text-lg text-indigo-500 font-semibold text-slate-5000 mt-2">
                Recent items:
              </p>
            )}
          </div>
          <div className="overflow-y-auto w-full flex gap-4 flex-wrap items-stretch pb-2">
            {filteredArticles?.length === 0 ? (
              <p>No items matching filters</p>
            ) : (
              displayedArticles.map((article: Article) => (
                <ArticleCard
                  key={article._id}
                  item={article}
                  handleDelete={() => handleDelete(article._id)}
                  basicBlock
                  permaDeath
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
