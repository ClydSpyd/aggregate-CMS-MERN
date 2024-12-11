/* eslint-disable react-hooks/exhaustive-deps */
import { MdClose } from "react-icons/md";
import { Notification } from "./types";
import { useEffect, useState } from "react";
import { cn, delay } from "../../lib/utilities";

export default function Toast({
  toastData,
  removeToast,
}: {
  toastData: Notification;
  removeToast: (key: string) => void;
}) {
    const [ exit, setExit ] = useState(false);

    const dismissToast = () => {
        setExit(true);
        delay(350).then(() => removeToast(toastData.key));
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        if (exit) return;
        setExit(true);
        delay(350).then(() => removeToast(toastData.key));
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

  return (
    <div
      onClick={dismissToast}
      className={cn(
        "bg-white shadow-md rounded-md w-[300px] transition-all duration-300 ease-out overflow-hidden border animate-drop-in",
        !exit ? "h-[60px] opacity-100 my-1" : "h-0 opacity-0 my-[-1px]"
      )}
    >
      <div className={cn("flex items-center gap-4 h-full w-full px-2")}>
        <div className="bg-green-500 h-4 w-4 rounded-full"></div>
        <div className="flex-grow">
          <h3 className="text-base font-semibold">{toastData.key}</h3>
          <p className="text-sm">{toastData.message}</p>
        </div>
        <div className="cursor-pointer">
          <MdClose size={18} />
        </div>
      </div>
    </div>
  );
}
