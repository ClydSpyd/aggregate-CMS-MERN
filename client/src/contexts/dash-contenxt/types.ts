export interface DashContextData {
    config: DashConfig | null;
    error: string | null;
    setConfig: (config: DashConfig) => void;
};

export const defaultDashContext: DashContextData = {
    config: null,
    error: null,
    setConfig: () => {},
}