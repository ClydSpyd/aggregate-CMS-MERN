import React from "react";

const QuadGrid: React.FC<IconProps> = ({
  size,
  color = "#cacaca",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110.74 55.23"
      className="icon"
      height={size}
    >
      <rect
        x="4.53"
        y="4"
        width="47.07"
        height="47.07"
        rx="4.73"
        ry="4.73"
        className="cls-1"
        fill={color}
        stroke={color}
        strokeWidth="8"
      />
      <rect
        x="60"
        y="3.26"
        width="20.78"
        height="20.78"
        rx="2.24"
        ry="2.24"
        className="cls-2"
        fill={color}
        stroke={color}
        strokeWidth="5"
      />
      <rect
        x="87.46"
        y="3.26"
        width="20.78"
        height="20.78"
        rx="2.24"
        ry="2.24"
        className="cls-2"
        fill={color}
        stroke={color}
        strokeWidth="5"
      />
      <rect
        x="60"
        y="31.25"
        width="20.78"
        height="20.78"
        rx="2.24"
        ry="2.24"
        className="cls-2"
        fill={color}
        stroke={color}
        strokeWidth="5"
      />
      <rect
        x="87.46"
        y="31.25"
        width="20.78"
        height="20.78"
        rx="2.24"
        ry="2.24"
        className="cls-2"
        fill={color}
        stroke={color}
        strokeWidth="5"
      />
    </svg>
  );
};

export default QuadGrid;
