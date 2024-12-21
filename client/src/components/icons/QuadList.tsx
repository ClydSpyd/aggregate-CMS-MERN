import React from "react";

const QuadList: React.FC<IconProps> = ({ size, color = "#cacaca" }) => {
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
        x="58.47"
        y="29.88"
        width="50.24"
        height="9.81"
        rx="2.24"
        ry="2.24"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <rect
        x="58.47"
        y="43.56"
        width="50.24"
        height="9.81"
        rx="2.24"
        ry="2.24"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <rect
        x="58.47"
        y="2.29"
        width="50.24"
        height="9.81"
        rx="2.24"
        ry="2.24"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <rect
        x="58.47"
        y="15.98"
        width="50.24"
        height="9.81"
        rx="2.24"
        ry="2.24"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default QuadList;
