import React from "react";
import clsx from "clsx";

const variantClasses = {
  warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
  success: "bg-green-50 border-green-200 text-green-700",
  error: "bg-red-50 border-red-200 text-red-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
  neutral: "bg-gray-50 border-gray-200 text-gray-700"
};

export const Alert = ({ children, variant = "info", className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2 p-4 border rounded-md ${variantClasses[variant] || variantClasses.info} ${className}`}
    >
      {children}
    </div>
  );
};
