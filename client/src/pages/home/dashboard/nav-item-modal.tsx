/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import API from "../../../api";
import { useDashboard } from "../../../contexts/dash-contenxt";
import ModalWrapper from "../../../components/utility-comps/modal-wrapper";
import TagSelector from "../../../components/tag-selector";
import { cn } from "../../../lib/utilities";
import spinner from "../../../assets/loaders/spinner-indigo.svg";

const defaultVals: ConfigBlockData = {
  name: "",
  tags: [],
  active: true,
  count: 0,
};

export default function NavItemModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { config, setConfig } = useDashboard();
  const [configVals, setConfigVals] = useState<ConfigBlockData>(defaultVals);
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
      const { data, error } = await API.config.addNavItem(item);
      if (data && config) {
        setConfig({
          ...config,
          nav: [...config.nav, data],
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
      setConfigVals(defaultVals);
      setError(null);
    }
  }, [open]);

  const getArticleCount = async () => {
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
            Add item
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
