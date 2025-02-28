import { AxiosError } from "axios";
import { uploadClient } from ".";
import { ApiResponse } from "./types";

export const uploadFunctions = {
  image: async (
    file: File,
    bucketFolder?: string
  ): Promise<ApiResponse<{ url: string }>> => {
    try {
      if (!file) throw new Error("No file provided");
      const formData = new FormData();
      formData.append("image", file);
      const { data, status } = await uploadClient.post(
        `/upload/image${bucketFolder ? `?folder=${bucketFolder}` : ""}`,
        formData
      );
      return { data, status };
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
      return { error: `Error uploading image`, status: 500 };
    }
  },
};
