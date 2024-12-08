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
      const { data, status } = await baseClient.post(
        "/config/dashboard/nav-item",
        {
          name: item.name,
          tags: item.tags,
        }
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  deleteNavItem: async (id: string): Promise<ApiResponse<NavItemConfig[]>> => {
    try {
      const { data, status } = await baseClient.delete(
        `/config/dashboard/nav-item/${id}`
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  updateNavItem: async (
    item: ConfigBlockData
  ): Promise<ApiResponse<NavItemConfig[]>> => {
    try {
      const { data, status } = await baseClient.patch(
        `/config/dashboard/nav-item/${item._id}`,
        item
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  addCarouselItems: async (
    articleIds: string[]
  ): Promise<ApiResponse<Article[]>> => {
    try {
      const { data, status } = await baseClient.post(
        "/config/dashboard/carousel-items",
        { articleIds }
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  removeCarouselItem: async (
    articleId: string
  ): Promise<ApiResponse<Article[]>> => {
    try {
      const { data, status } = await baseClient.delete(
        `/config/dashboard/carousel-items/${articleId}`
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
};
