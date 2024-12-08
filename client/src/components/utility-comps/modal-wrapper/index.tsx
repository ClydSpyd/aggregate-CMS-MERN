import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { cn, delay } from "../../../lib/utilities";

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const appRoot = document.getElementById("root") as HTMLElement;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setMounted(true);
    } else {
      document.body.style.overflow = "auto";
      setMounted(false);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={cn(
        "fixed top-0 right-0 bottom-0 left-0 bg-slate-600/60 backdrop-blur-[2px] flex justify-center items-center z-50"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative transition-all duration-100 ease-linear",
          mounted ? "scale-100 blur-none" : "scale-105 blur-lg"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[10px] right-[10px] bg-none text-16 cursor-pointer border border-gray-100 hover:border-gray-300 h-[25px] w-[25px] rounded-md"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    appRoot
  );
};

export default ModalWrapper;
