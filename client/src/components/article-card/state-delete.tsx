import { Dispatch, SetStateAction } from "react";
import { cn } from "../../lib/utilities";
import { IoWarning } from "react-icons/io5";

export const StateConfirmDelete = ({
    display,
    setDisplay,
    handleDelete,
    permaDeath,
  }: {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => void;
    permaDeath: boolean;
  }) => {
  
    return (
      <div
        className={cn(
          "h-full w-full absolute-center flex flex-col items-center justify-center p-6 gap-2 bg-slate-100/70 text-slate-500 backdrop-blur-sm transition-all duration-100",
          display
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-auto"
        )}
      >
        {permaDeath ? (
          <>
            <div className="relative">
              <IoWarning size={35} className="text-red-500 relative z-10" />
              <div className="absolute-center rounded-full !top-5 h-[15px] w-[15px] bg-white z-5" />
            </div>
            <p className="font-semibold leading-5 text-sm">
              PERMANENTLY DELETE ITEM FROM DATABASE?
            </p>
          </>
        ) : (
          <p>Delete?</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white text-sm w-[80px] py-1 rounded-md hover:bg-red-600 transition-all duration-100"
          >
            Confirm
          </button>
          <button
            onClick={() => setDisplay(false)}
            className="bg-white text-slate-500 text-sm w-[80px] py-1 rounded-md border hover:border-slate-300 hover:bg-slate-50 transition-all duration-100"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  