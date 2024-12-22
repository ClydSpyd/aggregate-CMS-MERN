/* eslint-disable react-hooks/exhaustive-deps */
import { CgAdd } from "react-icons/cg";
import ConfigBlock from "./dash-config-block";
import { useState } from "react";
import NavItemModal from "./nav-item-modal";

export default function NavConfig({ items }: { items: DynamicPageConfig[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  console.log({ items });
  return (
    <>
      <div className="w-full rounded-lg bg-slate-100/50 border shadow-md p-4 py-3 flex flex-col gap-3">
        <div className="flex w-full items-center gap-4">
          <p className="text-indigo-500 font-semibold">Nav Items</p>
          <div
            onClick={() => setModalOpen(true)}
            className="h-[25px] w-[90px] flex gap-1 items-center justify-center text-xs text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer"
          >
            <CgAdd size={18} />
            add item
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-stretch">
          {items?.map((item, index) => (
            <ConfigBlock key={index} idx={index} blockData={item} />
          ))}
        </div>
      </div>
      <NavItemModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}


