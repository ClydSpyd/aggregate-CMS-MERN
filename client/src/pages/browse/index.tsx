import { useState } from "react";
import BrowseContent from "./browse-content";
import AppLoader from "../../components/app-loader";
import { useRecentArticles } from "../../queries/userArticles";

export default function BrowsePage() {
  const [error, setError] = useState<string | null>(null);

  const { data: recentArticles, refetch } = useRecentArticles();

  return recentArticles ? (
    <div className="w-full h-full">
      <BrowseContent
        recentArticles={recentArticles}
        refetchRecent={refetch}
        error={error}
        setError={setError}
      />
    </div>
  ) : (
    <AppLoader />
  );
}
