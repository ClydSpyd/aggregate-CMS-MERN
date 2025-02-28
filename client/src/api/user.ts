import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse } from "./types";

export const userFunctions = {
  getAllAdminUsers: async (): Promise<ApiResponse<AdminUser[]>> => {
    try {
      const { data, status } = await baseClient.get("/user/admin/all");
      return { status, data };
    } catch (error) {
      console.error(`Error fetching users:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getAllClientUsers: async (): Promise<ApiResponse<ClientUser[]>> => {
    try {
      const { data, status } = await baseClient.get("/user/client/all");
      return { status, data };
    } catch (error) {
      console.error(`Error fetching users:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getAllAuthors: async (): Promise<ApiResponse<AuthorData[]>> => {
    try {
      const { data, status } = await baseClient.get("/user/author/all");
      return { status, data };
    } catch (error) {
      console.error(`Error fetching authors:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  createAuthor: async (
    author: AuthorData
  ): Promise<ApiResponse<AuthorData>> => {
    try {
      const { data, status } = await baseClient.post("/user/author", author);
      return { status, data };
    } catch (error) {
      console.error(`Error creating author:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  deleteAuthor: async (
    authorId: string
  ): Promise<ApiResponse<AuthorData>> => {
    try {
      const { data, status } = await baseClient.delete(`/user/author/${authorId}`);
      return { status, data };
    } catch (error) {
      console.error(`Error deleting author:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  updateAuthor: async (
    payload: Partial<AuthorData>,
    authorId: string
  ): Promise<ApiResponse<AuthorData>> => {
    try {
      const { data, status } = await baseClient.patch(
        `/user/author/${authorId}`,
        payload
      );
      return { status, data };
    } catch (error) {
      console.error(`Error updating author:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  }
};
