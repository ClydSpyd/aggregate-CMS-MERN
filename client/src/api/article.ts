import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse } from "./types";
import { InputData } from "../pages/browse/types";

export const articleFunctions = {
  createArticle: async (
    article: Partial<Article>,
    userId: string
  ): Promise<ApiResponse<Article>> => {
    console.log({ userId });
    const payload = {
      ...article,
      author: userId,
    };
    console.log(`Creating article:`, payload);
    try {
      const { data, status } = await baseClient.post("/article/create", payload);
      return { status, data };
    } catch (error) {
      console.error(`Error creating article:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getAllArticles: async (): Promise<ApiResponse<Article[]>> => {
    try {
      const { data, status } = await baseClient.get("/article/all");
      return { status, data };
    } catch (error) {
      console.error(`Error fetching articles:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getArticle: async (id: string): Promise<ApiResponse<Article>> => {
    try {
      const { data, status } = await baseClient.get(`/article/id/${id}`);
      return { status, data };
    } catch (error) {
      console.error(`Error fetching article:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getRecentArticles: async () => {
    try {
      const { data, status } = await baseClient.get("/article/recent?num=24");
      return { status, data };
    } catch (error) {
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getFilteredArticles: async (filters: InputData) => {
    try {
      const { data, status } = await baseClient.post(
        "/article/search/filters",
        {
          tags: filters.tags,
          text: filters.text,
          author: filters.author,
        }
      );
      return { status, data };
    } catch (error) {
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  updateArticle: async (id: string, payload: Partial<Article>) => {
    try {
      const { data, status } = await baseClient.patch(
        `/article/update/${id}`,
        payload
      );
      console.log(`Updated article:`, data);
      return { status, data };
    } catch (error) {
      const err = error as AxiosError;
      console.log(`Error updating article:`, err.message);
      return { error: err.message, status: 500 };
    }
  },
  deleteArticle: async (id: string) => {
    try {
      const { status } = await baseClient.delete(`/article/delete/${id}`);
      return { status };
    } catch (error) {
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
};
