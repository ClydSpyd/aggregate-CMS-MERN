import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import DiscoverPage from "./pages/discover";
import BrowsePage from "./pages/browse";
import CreatePage from "./pages/create";
import QueueProvider from "./contexts/queue-context";

const Home = () => {
  return (
    <div className="flex gap-2">
      <a href="/discover">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">
          discover
        </button>
      </a>
      <a href="/create">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">
          create
        </button>
      </a>
      <a href="/browse">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">
          browse
        </button>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Navbar />
      <QueueProvider>
        <div className="w-full flex items-center justify-center grow overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/api/*" element={<Home />} />
          </Routes>
        </div>
      </QueueProvider>
    </div>
  );
}
