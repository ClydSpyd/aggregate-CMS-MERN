import { useQuery } from "@tanstack/react-query";
import API from "../api";

export const useRecentArticles = () => {
    return useQuery<Article[]>({
      queryKey: ["recent-articles"],
      queryFn: async () => {
        const response = await API.article.getRecentArticles();
        if (response.error) throw new Error(response.error);
        return response.data!;
      },
    });
}
