import React, { useState } from "react";

export const Tabs = ({ defaultValue, className, onValueChange, children }) => {
  const [activeValue, setActiveValue] = useState(defaultValue);

  const handleChange = (value) => {
    setActiveValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div className={`tabs ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue, onChange: handleChange });
        }
        return child;
      })}
    </div>
  );
};
