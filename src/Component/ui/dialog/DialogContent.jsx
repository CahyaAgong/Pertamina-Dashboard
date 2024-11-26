export const DialogContent = ({ children, styles = "" }) => {
  return <div className={`p-6 ${styles}`}>{children}</div>;
};
