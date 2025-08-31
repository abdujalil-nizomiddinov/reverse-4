import React, { useEffect } from "react";

function Alert({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6300);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getStyle = () => {
    switch (type) {
      case "success":
        return "drop-shadow-[0_0_6px_#00ff00]";
      case "error":
        return "border-red-400 !text-red-400 drop-shadow-[0_0_6px_red]";
      case "warning":
        return "border-yellow-400 !text-yellow-400 drop-shadow-[0_0_6px_yellow]";
      default:
        return "border-green-400 !text-green-400 drop-shadow-[0_0_6px_#00ff00]";
    }
  };

  return (
    <div
      className={`fixed flex items-center gap-2 justify-center text-center top-5 right-5 py-3 px-6 shadow-md rounded-lg border font-mono text-md cursor-pointer animate-pulse ease-linear transition-all duration-300 bg-black ${getStyle()}`}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

export default Alert;
