import { CgAdd } from "react-icons/cg";

interface NavConfigItem {
    name: string;
    tags: string[];
};

export default function NavConfig() {

    const dummyItems: NavConfigItem[] = [
        {
            name: "indie",
            tags: ["indie", "britpop", "search"],
        },
        {
            name: "metal",
            tags: ["metal", "heavy", "heavymetal"],
        },
        {
            name: "urban",
            tags: ["rap", "hiphop", "urban"],
        },
        {
            name: "pop",
            tags: ["pop", "top40", "charts"],
        }
    ];

  return(
    <div className="w-full rounded-lg bg-slate-100/50 border shadow-md p-4 py-3 flex flex-col gap-3">
      <div className="flex w-full items-center gap-4">
        <p className="text-indigo-500 font-semibold">Top-level nav items</p>
        <div className="h-[25px] w-[90px] flex gap-1 items-center justify-center text-xs text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer">
          <CgAdd size={18} />
          add item
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {dummyItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 rounded-lg p-2 bg-white border shadow-sm"
          >
            <p>{item.name}</p>
            <div className="flex gap-1">
              {item.tags.map((tag, index) => (
                <p
                  key={index}
                  className="px-2 rounded-[20px] border-2 border-indigo-500 text-indigo-500 bg-white text-xs w-fit"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}