import './styles.css'

export const Dialog = ({ children, isOpen, onClose }) => {
  return (
    <div
      className={`dialog ${ isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg overflow-hidden w-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
