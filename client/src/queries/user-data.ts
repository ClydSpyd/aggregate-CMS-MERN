import { useQuery } from "@tanstack/react-query";
import API from "../api";

export const useAdminUsers = () => {
    return useQuery<AdminUser[]>({
      queryKey: ["admin-users"],
      queryFn: async () => {
        const response = await API.user.getAllAdminUsers();
        if (response.error) throw new Error(response.error);
        return response.data!;
      },
    });
}

export const useAuthorUsers = () => {
    return useQuery<AuthorData[]>({
      queryKey: ["author-users"],
      queryFn: async () => {
        const response = await API.user.getAllAuthors();
        if (response.error) throw new Error(response.error);
        return response.data!;
      },
    });
}