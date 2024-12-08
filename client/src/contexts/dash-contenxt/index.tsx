import { DashContextData, defaultDashContext } from "./types";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../../api";

const DashContext = createContext<DashContextData>(defaultDashContext);

export const DashProvider = ({ children }: { children: React.ReactNode }) => {
    const [ config, setConfig ] = useState<DashConfig | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchConfig = async () => {
          console.log("fetching config");
          const { data, error } = await API.config.getDashConfig();
          if (data) {
            setConfig(data);
          } else if (error) {
            setError(error);
            console.error(error);
          }
        };
        fetchConfig();
      }, []);

    return (
      <DashContext.Provider value={{ error, config, setConfig }}>
        {children}
      </DashContext.Provider>
    );
};

export const useDashboard = () => useContext(DashContext);
