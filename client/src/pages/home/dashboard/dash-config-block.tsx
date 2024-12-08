import { IoDocumentTextSharp, IoWarning } from "react-icons/io5";

export default function ConfigBlock({
  blockData,
}: {
  blockData: ConfigBlockData;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg p-4 bg-white border shadow-sm max-w-[280px] min-w-[150px]">
      <div className="w-full flex items-center justify-between gap-2 border-b pb-1">
        <p>{blockData.name}</p>
        <div className="flex items-center">
          {blockData.count < 1 ? (
            <>
              <p className="text-xs py-[2px] px-2 rounded-md bg-red-500 text-white flex gap-1">
              <IoWarning size={16} className="text-white" />
                no content
              </p>
            </>
          ) : (
            <>
              <p className="text-[14px] py-[2px] text-indigo-500 font-semibold">
                {blockData.count}
              </p>
              <IoDocumentTextSharp size={14} className="text-indigo-500" />
            </>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {blockData.tags.map((tag, index) => (
          <p
            key={index}
            className="px-2 rounded-[20px] border-2 border-indigo-500 text-indigo-500 bg-white text-xs w-fit"
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}
