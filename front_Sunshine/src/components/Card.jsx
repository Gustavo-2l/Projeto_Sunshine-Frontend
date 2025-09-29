import React from "react";

export const Card = ({ children, className = "rounded-full", ...props }) => {
  return (
    <div
      className={`glassmorphism rounded-2xl shadow-lg p-6 transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
