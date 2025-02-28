/* eslint-disable react-hooks/exhaustive-deps */
import InputField from "../../../components/utility-comps/input-field";
import TagSelector from "../../../components/tag-selector";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputData } from "../types";
import { cn } from "../../../lib/utilities";
import API from "../../../api";
import AuthorSelector from "../../../components/author-selector";

interface BrowseFiltersProps {
  setFilteredArticles: Dispatch<SetStateAction<Article[] | null>>;
  setError: Dispatch<SetStateAction<string | null>>;    
}

export default function BrowseFilters({
  setFilteredArticles,
  setError,
}: BrowseFiltersProps) {
  const [searchValues, setSearchValues] = useState<InputData>({
    text: "",
    tags: [],
    author: null,
  });
  const [localChange, setLocalChange] = useState(false);

  // const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  // const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  // const noFilters = searchValues.text === "" &&
  // searchValues.tags.length === 0 &&
  // !selectedStartDate &&
  // !selectedEndDate

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const titleParam = urlParams.get("title");
    const tagsParam = urlParams.get("tags");
    const authorParam = urlParams.get("author");
    const hasQueryParams =
      !!titleParam ||
      (tagsParam && tagsParam.split(",").length > 0) ||
      !!authorParam;
    if(!hasQueryParams) return;
    const payload: InputData = {
      text: titleParam || "",
      tags: tagsParam ? tagsParam.split(",") : [],
      author: authorParam ?? null,
    };
    setSearchValues(payload);
    getFilteredArticles(payload);
  },[]);
  

  useEffect(() => {
    const noFilters =
      searchValues.text === "" &&
      searchValues.tags.length === 0 &&
      !searchValues.author;
    if (noFilters) {
      setFilteredArticles(null);
      window.history.replaceState({}, "", `${window.location.pathname}`);
    }
    setLocalChange(!noFilters);
  }, [searchValues]);

  const getFilteredArticles = async (payload: InputData) => {
    const { data, error } = await API.article.getFilteredArticles(payload);
    if (data) {
      setFilteredArticles(data);
      const urlParams = new URLSearchParams();
      !!payload.text && urlParams.set("title", payload.text);
      payload.tags.length > 0 && urlParams.set("tags", payload.tags.join(","));
      !!payload.author && urlParams.set("author", payload.author);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${urlParams}`
      );
    }
    else if (error) {
      setError(error);
      setSearchValues({ text: "", tags: [], author: null });
    };
    setLocalChange(false);
  };

  const handleInputChange = (
    value: string | null,
    key: keyof typeof searchValues
  ) => {
    setSearchValues((prev: InputData) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTags = (tags: string[]) => {
    setSearchValues((prev: InputData) => ({
      ...prev,
      tags,
    }));
  };

  return (
    <div className="min-w-[450px] max-w-[450px] h-full p-2 border rounded-md flex flex-col gap-3 bg-slate-50">
      <p className="text-sm text-indigo-500 font-semibold text-slate-5000 mt-2">
        Browse database items
      </p>
      <div className="bg-white shadow-sm">
        <div className="border p-2 flex flex-col gap-2 pb-4">
          <p className="text-xs text-[#a0a0a0]">Title/caption text:</p>
          <InputField
            withDeleteBtn
            placeholder="enter text"
            value={searchValues.text}
            onChange={(val: string) => handleInputChange(val, "text")}
            additionalClass="border-gray-300"
          />
        </div>
      </div>
      <div className="shadow-sm">
        <TagSelector
          tags={searchValues.tags}
          setTags={(tags: string[]) => handleTags(tags)}
          additionalClass="border-gray-300"
        />
      </div>

      <div className="bg-white shadow-sm">
        <div className="border p-2 flex flex-col gap-2 pb-4">
          <p className="text-xs text-[#a0a0a0]">Author:</p>
          <AuthorSelector
            onChange={(val: string) => handleInputChange(val, "author")}
            selected={searchValues.author}
          />
        </div>
      </div>
      {/* <div className="grid grid-cols-2 border p-2 pb-4 gap-2 bg-white shadow-sm pointer-events-none opacity-40">
        <p className="text-xs text-[#a0a0a0] col-span-2">Date created:</p>
        <InputDate
          maxValue={selectedEndDate}
          withDeleteBtn
          placeholder="From"
          value={selectedStartDate}
          onChange={(e: Date | null) => setSelectedStartDate(e)}
        />
        <InputDate
          minValue={selectedStartDate}
          withDeleteBtn
          placeholder="To"
          value={selectedEndDate}
          onChange={(e: Date | null) => setSelectedEndDate(e)}
        />
      </div> */}
      <div className="grow" />
      <div
        onClick={() => getFilteredArticles(searchValues)}
        className={cn(
          "h-[60px] flex items-center justify-center text-white font-semibold transition-all duration-300 ease-in-out bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded-md",
          !localChange ? "opacity-40 pointer-events-none" : " opacity-100"
        )}
      >
        APPLY FILTERS
      </div>
    </div>
  );
}
