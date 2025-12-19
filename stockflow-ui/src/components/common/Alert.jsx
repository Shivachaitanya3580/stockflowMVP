import React from "react";

const Alert = ({
  type = "info",
  message,
  onClose
}) => {
  if (!message) return null;

  const baseStyles =
    "flex items-center justify-between p-3 rounded text-sm mb-4";

  const typeStyles = {
    success: "bg-green-100 text-green-700 border border-green-300",
    error: "bg-red-100 text-red-700 border border-red-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    info: "bg-blue-100 text-blue-700 border border-blue-300"
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type] || typeStyles.info}`}>
      <span>{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
