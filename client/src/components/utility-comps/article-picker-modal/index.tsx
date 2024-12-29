/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import ModalWrapper from "../../../components/utility-comps/modal-wrapper";
import { cn, debounce } from "../../../lib/utilities";
import InputField from "../../../components/utility-comps/input-field";
import spinner from "../../../assets/loaders/spinner-indigo.svg";
import Checkbox from "../../../components/utility-comps/checkbox";

export default function ArticlePickerModal({
  open,
  setOpen,
  articles,
  reqCount,
  onSubmit,
  preSelected,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  articles: Article[];
  reqCount: number;
  onSubmit: (articles: Article[]) => void;
  preSelected?: Article[];
}) {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const singleSelect = reqCount === 1;
  const reqSelected = selectedItems.length === reqCount;

  useEffect(() => {
    if(preSelected){
      console.log({ reqCount, preSelected });
      setSelectedItems(preSelected.map((i: Article) => i._id));
    }
  }, [preSelected]);

  const debouncedSearch = useCallback(
    debounce(async (input: string) => {
      setFilteredArticles(
        articles.filter((a) =>
          a.title.toLowerCase().includes(input.toLowerCase())
        )
      );
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    if (inputValue !== "") {
      debouncedSearch(inputValue);
    } else {
      setFilteredArticles(articles);
    }
  }, [inputValue]);

  const handleInput = (val: string) => {
    setInputValue(val);
  };

  const handleSubmit = async () => {
    onSubmit(selectedItems.map((id) => articles.find((a) => a._id === id)!));
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setInputValue("");
      setFilteredArticles(articles);
      setSelectedItems([]);
    }
  }, [open]);

  const handleCheckbox = (id: string) => {
    if (singleSelect) {
      setSelectedItems([id]);
    } else {
      setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  }

  return (
    <ModalWrapper open={open} onClose={() => setOpen(false)}>
      <div className="w-[600px] rounded-lg bg-white shadow-md p-6 pt-4 flex flex-col gap-2">
        <h1 className="text-lg text-indigo-500 font-semibold">
          Select {reqCount} Item{reqCount > 1 ? "s" : ""}
        </h1>
        <InputField
          autofocus
          withDeleteBtn
          value={inputValue}
          placeholder="Search articles"
          onChange={handleInput}
          additionalClass="w-full"
        />
        <div
          className={cn(
            "w-full overflow-hidden transition-all duration-300 ease-out flex flex-col gap-2",
            filteredArticles.length > 0 ? "max-h-[70vh]" : "max-h-0"
          )}
        >
          <div className="w-full min-h-[150px] flex flex-col justify-center items-center">
            {loading ? (
              <img src={spinner} className="w-12 h-12" alt="loading" />
            ) : inputValue && filteredArticles.length === 0 ? (
              <p className="text-sm text-indigo-500">NO ARTICLES FOUND</p>
            ) : (
              <div className="w-full grow flex flex-col gap-1 transition-all duration-300 ease-out max-h-[500px] overflow-y-auto pr-3">
                {filteredArticles.map((article, index) => (
                  <div
                    onClick={() => handleCheckbox(article._id)}
                    key={index}
                    className={cn(
                      "w-full flex justify-between items-center gap-4 p-2 border rounded-md cursor-pointer hover:border-slate-400/70 text-indigo-500",
                      !selectedItems.includes(article._id) &&
                        reqSelected &&
                        !singleSelect
                        ? "opacity-30 bg-slate-200 text-slate-400 pointer-events-none border-indigo-500"
                        : ""
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
                    <div className="w-[30px] h-[30px] flex justify-end items-center mr-1">
                      <Checkbox checked={selectedItems.includes(article._id)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className={cn(
              "w-full h-[50px] bg-indigo-500 text-white rounded-md transition-all duration-200 hover:bg-indigo-600",
              reqSelected
                ? "opacity-100 pointer-events-auto"
                : "opacity-50 pointer-events-none"
            )}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
