import { useQuery } from "@tanstack/react-query";
import API from "../api";

export const useDashData = () => {
    return useQuery<DashConfig>({
      queryKey: ["dash-config"],
      queryFn: async () => {
        const response = await API.config.getDashConfig();
        if (response.error) throw new Error(response.error);
        return response.data!;
      },
    });
}
