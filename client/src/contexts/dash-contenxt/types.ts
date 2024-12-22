import { Dispatch, SetStateAction } from "react";

export interface DashContextData {
  config: DashConfig | null;
  error: string | null;
  setConfig: Dispatch<SetStateAction<DashConfig | null>>;
  updateNavItem: (id: string, data: Partial<DynamicPageConfig>) => void;
  views: ViewMap;
  view: DashView;
  setView: Dispatch<SetStateAction<DashView>>;
};

export const defaultDashContext: DashContextData = {
    config: null,
    error: null,
    setConfig: () => {},
    updateNavItem: () => {},
    views: {} as ViewMap,
    view: "main",
    setView: () => {},
}

export type DashView = "main" | "pages" | "users" | "deployments";

export type ViewMap = Record<DashView, JSX.Element>;