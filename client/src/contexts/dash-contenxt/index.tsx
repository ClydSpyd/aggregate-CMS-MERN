/* eslint-disable react-hooks/exhaustive-deps */
import {
  DashContextData,
  DashView,
  ViewMap,
  defaultDashContext,
} from "./types";
import { createContext, useContext, useEffect, useState } from "react";
import DashMain from "../../pages/home/dashboard/views/dash-main";
import DashPages from "../../pages/home/dashboard/views/dash-pages";
import { addParamToUrl } from "../../lib/utilities";
import DashUsers from "../../pages/home/dashboard/views/dash-users";
import { useDashData } from "../../queries/useDashData";

const DashContext = createContext<DashContextData>(defaultDashContext);

const views: ViewMap = {
  main: <DashMain />,
  pages: <DashPages />,
  users: <DashUsers />,
  deployments: <div>deployments</div>,
};

export const DashProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<DashConfig | null>(null);
  const [view, setView] = useState<DashView>("main");

  const updateNavItem = (id: string, data: Partial<DynamicPageConfig>) => {
    if (config) {
      const newConfig = { ...config };
      const nav = newConfig.nav.map((navItem) =>
        navItem._id === id ? { ...navItem, ...data } : navItem
      );
      setConfig({ ...newConfig, nav });
    }
  };

  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const tab = urlParams.get("tab");
    if (tab && tab in views) {
      setView(tab as DashView);
    }
  }, []);

  useEffect(() => {
    addParamToUrl("tab", view);
  }, [view]);

  const { data: queryData, error } = useDashData();

  useEffect(() => {
    if (queryData) setConfig(queryData);
  }, [queryData]);

  return (
    <DashContext.Provider
      value={{
        error: error?.message ?? null,
        config,
        setConfig,
        updateNavItem,
        views,
        view,
        setView,
      }}
    >
      {children}
    </DashContext.Provider>
  );
};

export const useDashboard = () => useContext(DashContext);
