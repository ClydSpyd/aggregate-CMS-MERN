import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { NotificationProvider } from "./contexts/notification-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
