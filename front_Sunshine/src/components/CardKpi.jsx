import React from "react";

export const CardKpi = ({ icon: Icon, value, label, color = "text-light", className = " rounded-full" }) => {
  return (
    <div className={`bg-white rounded-full shadow-md p-6 text-center ${className}`}>
      <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
      <h3 className="text-2xl font-bold text-dark">{value}</h3>
      <p className="text-dark/70">{label}</p>
    </div>
  );
};
