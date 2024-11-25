export const DialogTitle = ({ children, className }) => {
  return <h3 className={`text-lg font-semibold ${className ? className : ''}`}>{children}</h3>;
};
