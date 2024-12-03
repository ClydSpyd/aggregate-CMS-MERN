import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import DiscoverPage from "./pages/discover";
import BrowsePage from "./pages/browse";
import CreatePage from "./pages/create";
import HomePage from "./pages/home";
import LogoutPage from "./pages/logout";
import QueueProvider from "./contexts/queue-context";
import ProtectedRoute from "./components/protected-route";


export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Navbar />
      <QueueProvider>
        <div className="w-full flex items-center justify-center grow overflow-hidden">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/browse" element={<BrowsePage />} />
            </Route>
          </Routes>
        </div>
      </QueueProvider>
    </div>
  );
}
