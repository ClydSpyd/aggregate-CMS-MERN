import { Dispatch, SetStateAction } from "react";

export interface DashContextData {
  config: DashConfig | null;
  error: string | null;
  setConfig: Dispatch<SetStateAction<DashConfig | null>>;
  updateNavItem: (id: string, data: Partial<DynamicPageConfig>) => void;
};

export const defaultDashContext: DashContextData = {
    config: null,
    error: null,
    setConfig: () => {},
    updateNavItem: () => {},
}