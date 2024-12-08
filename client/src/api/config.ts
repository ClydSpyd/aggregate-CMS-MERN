import { baseClient } from ".";
import { ApiResponse, ErrorResponse } from "./types";

export const configFunctions = {
  getDashConfig: async (): Promise<ApiResponse<DashConfig>> => {
    try {
      const { data, status } = await baseClient.get("/config/dashboard");
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  getArticleCount: async (
    tags: string[]
  ): Promise<ApiResponse<{ count: number }>> => {
    try {
      const { data, status } = await baseClient.post("/utility/article-count", {
        tags,
      });
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  addNavItem: async (
    item: ConfigBlockData
  ): Promise<ApiResponse<NavItemConfig>> => {
    try {
      const { data, status } = await baseClient.post("/config/dashboard/nav-item", {
        name: item.name,
        tags: item.tags,
      });
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
};