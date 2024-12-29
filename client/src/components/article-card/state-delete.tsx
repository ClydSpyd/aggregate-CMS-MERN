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
          "h-full w-full absolute-center z-30 flex flex-col items-center justify-center p-6 bg-slate-100/70 text-slate-500 backdrop-blur-sm transition-all duration-100",
          display
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-auto"
        )}
      >
        {permaDeath ? (
          <>
            <div className="relative">
              <IoWarning size={30} className="text-red-500 relative z-10" />
              <div className="absolute-center rounded-full !top-5 h-[15px] w-[15px] bg-white z-5" />
            </div>
            <div className="flex flex-col items-center my-1">
              <p className="font-semibold leading-5 text-xs">
                PERMANENTLY DELETE?
              </p>
              <p className="text-[10px] text-red-500 relative bottom-[2px]">
                (IRREVERSIBLE ACTION)
              </p>
            </div>
          </>
        ) : (
          <p className="mb-2">Delete?</p>
        )}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setDisplay(false)}
            className="bg-white text-slate-500 text-sm w-[80px] h-[35px] rounded-md border hover:border-slate-300 hover:bg-slate-50 transition-all duration-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white text-sm w-[80px] h-[34px] rounded-md hover:bg-red-600 transition-all duration-100"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };
  