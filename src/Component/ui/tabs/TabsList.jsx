import React from "react";

export const TabsList = ({ className, children, activeValue, onChange }) => {
  return (
    <div className={`tabs-list flex gap-2 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue, onChange });
        }
        return child;
      })}
    </div>
  );
};
