export const DialogTrigger = ({ children, asChild }) => {
  return asChild ? children : <div onClick={children.props.onClick}>{children}</div>;
};
