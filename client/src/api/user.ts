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
    }
};