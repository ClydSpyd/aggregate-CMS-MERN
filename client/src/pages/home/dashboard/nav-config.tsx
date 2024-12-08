/* eslint-disable react-hooks/exhaustive-deps */
import { CgAdd } from "react-icons/cg";
import ConfigBlock from "./dash-config-block";
import { useEffect, useState } from "react";
import ModalWrapper from "../../../components/utility-comps/modal-wrapper";
import TagSelector from "../../../components/tag-selector";
import API from "../../../api";
import { cn } from "../../../lib/utilities";

export default function NavConfig({ items }: { items: NavItemConfig[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="w-full rounded-lg bg-slate-100/50 border shadow-md p-4 py-3 flex flex-col gap-3">
        <div className="flex w-full items-center gap-4">
          <p className="text-indigo-500 font-semibold">Top-level nav items</p>
          <div
            onClick={() => setModalOpen(true)}
            className="h-[25px] w-[90px] flex gap-1 items-center justify-center text-xs text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer"
          >
            <CgAdd size={18} />
            add item
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {items.map((item, index) => (
            <ConfigBlock key={index} blockData={item} />
          ))}
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

const Modal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {

  const defaultVals: ConfigBlockData = {
    name: "",
    tags: [],
    active: true,
    count: 0,
  }
  const [configVals, setConfigVals] = useState<ConfigBlockData>(defaultVals);

  useEffect(() => {
    if(!open) {
      setConfigVals(defaultVals);
    }
  },[open]);

  const getArticleCount = async () => {
    try {
      const { data } = await API.config.getArticleCount(configVals.tags);
      if(!data) return;
      setConfigVals((prev: ConfigBlockData) => ({
        ...prev,
        count: data.count ?? 0,
      }));
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(configVals.tags.length > 0) {
      getArticleCount();
    }
  }, [configVals.tags]);

  return (
    <ModalWrapper open={open} onClose={() => setOpen(false)}>
      <div className="bg-white rounded-lg p-8 w-[500px] flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-indigo-500">New nav item</h1>
        <div className="">
          <p className="text-xs text-[#a0a0a0] mb-1">name:</p>
          <div className="!border w-full p-2 relative h-[50px] flex items-center">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfigVals((prev) => ({ ...prev, name: e.target.value }))
              }
              value={configVals.name}
            />
          </div>
        </div>
        <TagSelector
          tags={configVals.tags}
          setTags={(tags) => setConfigVals({ ...configVals, tags })}
        />
        <div className="mt-2" />
        {configVals?.tags?.length > 0 && (
          <div className="w-full justify-center flex gap-2 p-2 text-md">
            <p className="text-[#a0a0a0] mb-1">Matching articles:</p>
            <p
              className={cn(
                "font-semibold",
                configVals.count > 0 ? "text-indigo-500" : "text-red-500"
              )}
            >
              {configVals.count}
            </p>
          </div>
        )}
        <button className="w-full p-2 bg-indigo-500 text-white rounded-lg">
          Add item
        </button>
      </div>
    </ModalWrapper>
  );
};
