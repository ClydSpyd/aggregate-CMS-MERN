import { MdOutlineOpenInNew } from "react-icons/md";
import { CgPlayListAdd, CgPlayListCheck } from "react-icons/cg";
import { cn } from "../../lib/utilities";
import { useQueue } from "../../contexts/queue-context";
// import Image from "next/image";
import StaggerContainer from "../../components/utility-comps/stagger-container";
import { Link } from "react-router";

export default function ListItem({
  item,
  selected,
  buttons
}: {
  item: FeedItem;
  selected: boolean;
  buttons?: {open:boolean, add:boolean};
}) {
  const { retreiveQueueItem, addItemToQueue, removeItemFromQueue } = useQueue();

  const isInQueue = !!retreiveQueueItem(item.id);

  if(isInQueue) console.log("isInQueue", item);

  const handleAddToQueue = () => {
    if (!isInQueue) {
      addItemToQueue(item);
    } else {
      removeItemFromQueue(item.id);
    }
  };

  return (
    <StaggerContainer>
      <div
        className={cn(
          "w-full border p-2 flex items-center gap-4 cursor-pointer",
          selected ? "bg-lime-300" : ""
        )}
      >
        <div className="min-h-[80px] min-w-[80px] border relative">
          <img
            className="absolute h-full w-full object-cover"
            src={item.imgUrl}
            alt={`${item.name}_logo`}
          />
        </div>
        <div className="grow">
          <h2 className="font-semibold">{item.name}</h2>
        </div>
        {buttons && (
          <div className="h-full gap-2 flex items-center justify-evenly">
            {buttons.open && (
              <Link to={item.url} target="_blank" rel="noreferrer">
                <div className="h-[40px] w-[40px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200">
                  <MdOutlineOpenInNew size={18} />
                </div>
              </Link>
            )}
            {buttons.add && (
              <div
                onClick={handleAddToQueue}
                className={cn(
                  "h-[40px] w-[40px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200",
                  isInQueue ? "bg-indigo-600 border-indigo-600" : "bg-white"
                )}
              >
                {!isInQueue ? (
                  <CgPlayListAdd
                    size={20}
                    className="relative top-[1px] left-[2px]"
                  />
                ) : (
                  <CgPlayListCheck
                    size={25}
                    className="relative top-[1px] left-[2px]"
                    color="white"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </StaggerContainer>
  );
}
