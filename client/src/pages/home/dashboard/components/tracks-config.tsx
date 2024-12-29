import { CgAdd } from "react-icons/cg";

export default function TracksConfig() {

    // const dummyItems: ConfigBlockData[] = [
    //   {
    //     name: "Classical",
    //     tags: ["classical", "orchestra", "symphony"],
    //   },
    //   {
    //     name: "pop",
    //     tags: ["pop", "top40", "charts"],
    //   },
    //   {
    //     name: "electronic",
    //     tags: ["electronic", "edm", "dnb", "trance"],
    //   },
    //   {
    //     name: "metal",
    //     tags: ["metal", "heavy", "heavymetal"],
    //   },
    //   {
    //     name: "death metal",
    //     tags: ["deathmetal", "death", "metal"],
    //   },
    //   {
    //     name: "urban",
    //     tags: ["rap", "hiphop", "urban"],
    //   },
    //   {
    //     name: "progressive",
    //     tags: ["prog", "progressive"],
    //   },
    //   {
    //     name: "crunk",
    //     tags: ["crunk", "crunkcore", "crunk-core"],
    //   },
    // ] as ConfigBlockData[];

  return (
    <div className="w-full rounded-lg bg-slate-100/50 border shadow-md p-4 py-3 pb-6 flex flex-col gap-3">
      <div className="flex w-full items-center gap-4">
        <p className="text-indigo-500 font-semibold">Homepage tracks</p>
        <div className="h-[25px] w-[90px] flex gap-1 items-center justify-center text-xs text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer">
          <CgAdd size={18} />
          add item
        </div>
      </div>
      <div className="flex gap-2 flex-wrap pointer-events-none">
        {/* {dummyItems.map((item, index) => (
          <ConfigBlock key={index} idx={index} blockData={item} />
        ))} */}
        <h1 className="w-full text-sm text-center my-2">NO TRACKS FOUND</h1>
      </div>
    </div>
  );
}