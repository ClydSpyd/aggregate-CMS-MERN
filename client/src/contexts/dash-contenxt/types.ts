import { Dispatch, SetStateAction } from "react";

export interface DashContextData {
    config: DashConfig | null;
    error: string | null;
    setConfig: Dispatch<SetStateAction<DashConfig | null>>;
};

export const defaultDashContext: DashContextData = {
    config: null,
    error: null,
    setConfig: () => {},
}