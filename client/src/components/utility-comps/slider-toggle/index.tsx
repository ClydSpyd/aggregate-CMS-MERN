import React from "react";
import { SliderToggleProps } from "./types";

const SliderToggle: React.FC<SliderToggleProps> = ({ enabled, onToggle }) => {
  return (
    <div
      className={`relative w-[36px] h-[22px] flex items-center rounded-full p-[3px] cursor-pointer transition ${
        enabled ? "bg-indigo-500" : "bg-gray-300"
      }`}
      onClick={() => onToggle(!enabled)}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
          enabled ? "translate-x-[14px]" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default SliderToggle;
