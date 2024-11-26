export const AlertDescription = ({ children, className = "" }) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
};
