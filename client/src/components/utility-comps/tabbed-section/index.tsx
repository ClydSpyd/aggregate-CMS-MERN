/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, ReactNode, useEffect } from "react";
import StaggerContainer from "../stagger-container";
import { removeParamFromUrl } from "../../../lib/utilities";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultActiveTab?: number;
  onTabChange?: (activeTabIndex: number) => void;
};

const TabbedSection: React.FC<TabsProps> = ({ tabs, defaultActiveTab = 0, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  useEffect(() => {
    return () => {
      removeParamFromUrl("idx");
    }
  }, []);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idxParam = urlParams.get("idx");
    if (idxParam) {
      console.log("idxParam", idxParam);
      setActiveTab(+idxParam);
    }
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab Headers */}
      <div className="w-fit rounded-sm flex bg-white z-30 mb-[-1px]">
        {tabs.map((tab, index) => (
          <StaggerContainer key={index}>
            <button
              key={index}
              className={`min-w-[100px] border rounded-t-lg py-2 px-6 text-center text-sm font-medium z-10 border-b ${
                activeTab === index
                  ? "border-b-white bg-white text-indigo-500"
                  : " text-gray-600 bg-slate-100/50 hover:bg-slate-100"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          </StaggerContainer>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 grow border rounded-md rounded-tl-none">
        {tabs[activeTab]?.content || <div>No content available</div>}
      </div>
    </div>
  );
};

export default TabbedSection;
