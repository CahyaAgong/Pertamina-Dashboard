export const CardHeader = ({ children, className }) => {
  return (
    <div className={`card-header mb-2 ${className}`}>
      {children}
    </div>
  );
};
