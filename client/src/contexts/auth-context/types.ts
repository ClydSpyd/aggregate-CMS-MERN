
export interface AuthContextData {
    user: User | null;
    loading: boolean;
    submitting: boolean;
    error: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const defaultAuthContextData: AuthContextData = {
  user: null,
  loading: true,
  submitting: false,
  error: null,
  login: () => {},
  logout: () => {},
};