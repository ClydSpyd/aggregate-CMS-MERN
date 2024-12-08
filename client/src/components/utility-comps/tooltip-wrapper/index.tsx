import React, { useState } from "react";
import "./tooltip.css"; // Include necessary CSS for styling

interface TooltipProps {
  message: string;
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipProps> = ({
  message,
  delay = 300,
  side = "bottom",
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const hoverTimer = setTimeout(() => setShowTooltip(true), delay);
    setTimer(hoverTimer);
  };

  const handleMouseLeave = () => {
    if (timer) clearTimeout(timer);
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {showTooltip && (
        <div className={`tooltip-box tooltip-${side}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default TooltipWrapper;
