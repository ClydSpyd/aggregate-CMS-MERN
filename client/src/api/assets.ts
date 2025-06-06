import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse } from "./types";

export const assetsFuntions = {
  getAllImgs: async (bucketPath?: string): Promise<ApiResponse<string[]>> => {
    try {
      const { data, status } = await baseClient.get(
        `/assets/images/${bucketPath ?? "uploads"}`
      );
      return { status, data };
    } catch (error) {
      console.error(`Error fetching images:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
};
