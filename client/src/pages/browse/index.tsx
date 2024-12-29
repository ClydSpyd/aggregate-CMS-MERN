import { useEffect, useState } from "react";
import BrowseContent from "./browse-content";
import API from "../../api";
import AppLoader from "../../components/app-loader";

export default function BrowsePage() {
  const [recentArticles, setRecentArticles] = useState<Article[]|null>(null)
  const [error, setError] = useState<string | null>(null);

  const getRecentArticles = async () => {
    const { data, error } = await API.article.getRecentArticles();
    if (data) {
      setRecentArticles(data);
    } else if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getRecentArticles();
  }, []);

  return recentArticles ? (
    <div className="w-full h-full">
      <BrowseContent
        recentArticles={recentArticles}
        refetchRecent={getRecentArticles}
        error={error}
        setError={setError}
      />
    </div>
  ) : (
    <AppLoader />
  );
}
