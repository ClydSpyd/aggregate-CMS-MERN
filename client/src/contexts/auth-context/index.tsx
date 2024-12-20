/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../../api";
import { defaultAuthContextData } from "./types";
import { delay } from "../../lib/utilities";
import AppLoader from "../../components/app-loader";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(defaultAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setSubmitting(true);
    setError(null);
    const { data, error } = await API.auth.signin(username, password);
    if (data) {
      setUser(data.user);
      localStorage.setItem("authToken", data.token);
    } else if (error) {
      console.log({ error });
      setError(error);
    }
    delay(800).then(() => {
      setSubmitting(false);
      setLoading(false);
    });
  };

  const logout = async () => {
    await API.auth.logout();
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found in browser storage");
      setLoading(false);
      return;
    }

    const { data, error } = await API.auth.verifyToken(token);
    if (data) {
      setUser(data);
    } else if (error) {
      logout();
    }
    delay(800).then(() => setLoading(false));
  };

  useEffect(() => {
    checkAuth(); // Check session on app load
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error, submitting }}
    >
      {loading ? <AppLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
