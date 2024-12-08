import { Dispatch, SetStateAction } from "react";
import { cn } from "../../../../../lib/utilities";
import API from "../../../../../api";
import { useDashboard } from "../../../../../contexts/dash-contenxt";

export const StateConfirmDelete = ({
    display,
    setDisplay,
    articleId,
  }: {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    articleId: string;
  }) => {
    // const [submitting, setSubmitting] = useState<boolean>(false);
    const { config, setConfig } = useDashboard();
  

    const handleConfirm = async () => {
      const { data, error } = await API.config.removeCarouselItem(articleId);
      if(data&&config){
        setConfig({
          ...config,
          carouselItems: data,
        });
      } else if (error) {
        console.error(`Error deleting carousel item:`, error);
      }
    };
  
    return (
      <div
        className={cn(
          "h-full w-full absolute-center flex flex-col items-center justify-center p-2 gap-1 bg-slate-100/70 text-slate-500 backdrop-blur-sm transition-all duration-100",
          display
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-auto"
        )}
      >
        <p>Delete?</p>
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
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
  