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
  addDynamicPage: async (
    item: ConfigBlockData
  ): Promise<ApiResponse<DynamicPageConfig>> => {
    try {
      const { data, status } = await baseClient.post(
        "/config/dynamic-page",
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
  deleteDynamicPage: async (id: string): Promise<ApiResponse<DynamicPageConfig[]>> => {
    try {
      const { data, status } = await baseClient.delete(
        `/config/dynamic-page/${id}`
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  updateDynamicPage: async (
    item: ConfigBlockData
  ): Promise<ApiResponse<DynamicPageConfig[]>> => {
    try {
      const { data, status } = await baseClient.patch(
        `/config/dynamic-page/${item._id}`,
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
        "/config/home/carousel-items",
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
        `/config/home/carousel-items/${articleId}`
      );
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
};
