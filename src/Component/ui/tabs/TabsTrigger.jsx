export const TabsTrigger = ({ value, activeValue, onChange, children }) => {
  const isActive = value === activeValue;

  return (
    <button
      onClick={() => onChange(value)}
      className={`tabs-trigger px-2 py-1 rounded-lg text-sm font-medium ${
        isActive
          ? "bg-white text-gray-900 shadow-md"
          : "bg-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
};
