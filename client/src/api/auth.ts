import { baseClient } from ".";
import { ApiResponse, ErrorResponse } from "./types";

export const authFunctions = {
  signin: async (
    username: string,
    password: string
  ): Promise<ApiResponse<{ user: AdminUser; token: string }>> => {
    try {
      const { data, status } = await baseClient.post("/auth/signin", {
        username,
        password,
      });
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  },
  logout: async (): Promise<void> => {
    await baseClient.post("/auth/logout");
  },
  verifyToken: async (token: string): Promise<ApiResponse<AdminUser>> => {
    try {
      const { data, status } = await baseClient.post("/auth/verify-token", {
        token,
      });
      return { status, data };
    } catch (error) {
      const err = error as ErrorResponse;
      return { error: err.response?.data.message, status: 500 };
    }
  }
};
