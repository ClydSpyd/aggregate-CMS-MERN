/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import ModalWrapper from "../../../../../components/utility-comps/modal-wrapper";
import { cn, debounce } from "../../../../../lib/utilities";
import InputField from "../../../../../components/utility-comps/input-field";
import API from "../../../../../api";
import spinner from "../../../../../assets/loaders/spinner-indigo.svg";
import { LuFileSearch2 } from "react-icons/lu";
import Checkbox from "../../../../../components/utility-comps/checkbox";
import { useDashboard } from "../../../../../contexts/dash-contenxt";

export default function AddarticleModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { config, setConfig } = useDashboard();

  const debouncedSearch = useCallback(
    debounce(async (input: string) => {
      console.log({ input });
      setLoading(true);
      const { data, error } = await API.article.getFilteredArticles({
        text: input,
        tags: [],
      });
      if (data) {
        setFilteredArticles(
          // data.filter((i: Article) => !i.highlight.includes("primary"))
          data
        );
      } else {
        console.error(`Error fetching articles:`, error);
      }
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    if (inputValue !== "") {
      debouncedSearch(inputValue);
    } else {
      setLoading(false);
      setFilteredArticles([]);
    }
  }, [inputValue]);

  const handleInput = (val: string) => {
    setLoading(true);
    setFilteredArticles([]);
    setInputValue(val);
  };

  const handleSubmit = async () => {
    const { data, error } = await API.config.addCarouselItems(selectedItems);
    if (data && config) {
      setConfig({
        ...config,
        carouselItems: [...data],
      });
      console.log(`Added carousel items:`, data);
      setOpen(false);
    } else {
      console.error(`Error adding carousel items:`, error);
    }
  };

  useEffect(() => {
    if (!open) {
      setInputValue("");
      setFilteredArticles([]);
      setSelectedItems([]);
    }
  }, [open]);

  return (
    <ModalWrapper open={open} onClose={() => setOpen(false)}>
      <div className="w-[600px] rounded-lg bg-white shadow-md p-6 pt-4 flex flex-col gap-2">
        <h1 className="text-lg text-indigo-500 font-semibold">
          Add Carousel Item
        </h1>
        <InputField
          autofocus
          withDeleteBtn
          value={inputValue}
          placeholder="Search articles"
          onChange={handleInput}
          additionalClass="w-full"
        />
        <div className="w-full min-h-[150px] flex flex-col justify-center items-center">
          {loading ? (
            <img src={spinner} className="w-12 h-12" alt="loading" />
          ) : !inputValue ? (
            <div className="flex flex-col items-center gap-2">
              <LuFileSearch2 size={50} className=" text-indigo-500" />
              <p className="text-indigo-500 text-sm">
                enter text to search articles
              </p>
            </div>
          ) : inputValue && filteredArticles.length === 0 ? (
            <p className="text-sm text-indigo-500">NO ARTICLES FOUND</p>
          ) : (
            <div className="w-full grow flex flex-col gap-1 max-h-[600px] overflow-y-auto pr-3">
              {filteredArticles.map((article, index) => (
                <div
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.includes(article._id)
                        ? prev.filter((i) => i !== article._id)
                        : [...prev, article._id]
                    )
                  }
                  key={index}
                  className={cn(
                    "w-full flex justify-between items-center gap-4 p-2 border rounded-md cursor-pointer hover:border-slate-400/70",
                    article.highlight.includes("primary")
                      ? "opacity-30 bg-slate-200 text-slate-400 pointer-events-none border-indigo-500"
                      : " text-indigo-500"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={article.imgUrl}
                      alt={article.title}
                      className="w-[50px] h-[50px] object-cover rounded-lg"
                    />
                    <p className="text-sm font-semibold">{article.title}</p>
                  </div>
                  {!article.highlight.includes("primary") && (
                    <div className="w-[30px] h-[30px] flex justify-end items-center mr-1">
                      <Checkbox checked={selectedItems.includes(article._id)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className={cn(
            "w-full h-[50px] bg-indigo-500 text-white rounded-md transition-all duration-200 hover:bg-indigo-600",
            selectedItems.length > 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-50 pointer-events-none"
          )}
        >
          SUBMIT
        </button>
      </div>
    </ModalWrapper>
  );
}
