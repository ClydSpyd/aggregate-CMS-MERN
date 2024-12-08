/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import API from "../../../../api";
import { useDashboard } from "../../../../contexts/dash-contenxt";
import ModalWrapper from "../../../../components/utility-comps/modal-wrapper";
import TagSelector from "../../../../components/tag-selector";
import { cn } from "../../../../lib/utilities";
import spinner from ".././../../../assets/loaders/spinner-indigo.svg";
import Checkbox from "../../../../components/utility-comps/checkbox";
import { MdDeleteForever } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import InputField from "../../../../components/utility-comps/input-field";

const defaultVals: ConfigBlockData = {
  name: "",
  tags: [],
  active: true,
  count: 0,
  _id: ""
};

export default function NavItemModal({
  open,
  setOpen,
  valuesProp,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  valuesProp?: ConfigBlockData;
}) {
  const { config, setConfig } = useDashboard();
  const [configVals, setConfigVals] = useState<ConfigBlockData>(
    valuesProp ?? defaultVals
  );
  const [submitting, setSumbitting] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSumbitting(false);
    }
  }, [open]);

  const handleAddItem = async (item: ConfigBlockData) => {
    setSumbitting(true);
    try {
      let resData, error, returnArray: NavItemConfig[] = []
      if(valuesProp) {
        const res = await API.config.updateNavItem(item);
        resData = res.data;
        error = res.error;
        if(resData){
          returnArray = resData;
        }
      } else {
        const res = await API.config.addNavItem(item);
        resData = res.data;
        error = res.error;
        if(resData && config?.nav){
          returnArray = [...config.nav, resData];
        }
      }
      if (resData && config) {
        setConfig({
          ...config,
          nav: returnArray,
        });
        setOpen(false);
      } else if (error) {
        setError(error);
        console.error(error);
      }
    } catch (error) {
      setError("something went wrong");
      console.error(error);
    }
    setSumbitting(false);
  };

  useEffect(() => {
    if (!open) {
      console.log("resetting");
      setConfigVals(valuesProp ?? defaultVals);
      setError(null);
    }
  }, [open]);

  const getArticleCount = async () => {
    console.log("getting count");
    try {
      const { data } = await API.config.getArticleCount(configVals.tags);
      if (!data) return;
      setConfigVals((prev: ConfigBlockData) => ({
        ...prev,
        count: data.count ?? 0,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (configVals.tags.length > 0) {
      getArticleCount();
    }
  }, [configVals.tags]);

  useEffect(() => {
    setFormFilled(configVals.tags.length > 0 && configVals.name.length > 0);
  }, [configVals]);

  return (
    <ModalWrapper open={open} onClose={() => setOpen(false)}>
      <div className="bg-white rounded-lg p-8 pb-10 w-[500px] flex flex-col gap-2 relative overflow-hidden">
        <h1 className="text-2xl font-semibold text-indigo-500">
          {valuesProp ? "Edit" : "New"} nav item
        </h1>
        <InputField
          autofocus
          placeholder="name"
          onChange={(val: string) =>
            setConfigVals((prev) => ({ ...prev, name: val }))
          }
          value={configVals.name}
        />
        <TagSelector
          tags={configVals.tags}
          setTags={(tags) => setConfigVals({ ...configVals, tags })}
        />
        <div />

        {valuesProp && (
          <div className="w-full flex items-center gap-2 mb-2">
            <div
              onClick={() =>
                setConfigVals((prev) => ({ ...prev, active: !prev.active }))
              }
              className="grow px-4 h-[50px] w-full flex items-center justify-between bg-white border rounded-sm relative cursor-pointer group"
            >
              <p className={"text-[#a0a0a0] group-hover:text-[#747474]"}>
                Active
              </p>
              <Checkbox checked={configVals.active} />
            </div>
            <div className="opacity-40 cursor-not-allowed flex items-center justify-center min-h-[50px] min-w-[50px] max-h-[50px] max-w-[50px] border rounded-sm text-slate-400">
              <MdDeleteForever size={25} />
            </div>
            <div className="opacity-40 cursor-not-allowed flex items-center justify-center min-h-[50px] min-w-[50px] max-h-[50px] max-w-[50px] border rounded-sm text-slate-400">
              <FaListAlt size={20} />
            </div>
          </div>
        )}
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
        <div className="relative">
          <button
            onClick={() => handleAddItem(configVals)}
            className={cn(
              "w-full p-2 bg-indigo-500 text-white rounded-lg",
              formFilled
                ? "opacity-100 pointer-events-auto"
                : "opacity-50 pointer-events-none"
            )}
          >
            {!valuesProp ? "Add" : "Update"} item
          </button>
          {error && (
            <p className="text-red-500 top-[110%] text-[12px] absolute bottom-0 left-0 w-full text-center">
              {error}
            </p>
          )}
        </div>
        {submitting && (
          <div className="absolute-center top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col gap-2 items-center justify-center">
            <img src={spinner} alt="loading" className="w-[50px] h-[50px]" />
            <p className="text-indigo-500">Submitting</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
