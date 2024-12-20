/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PageConfigProps } from "./types";
import API from "../../../../../api";

export default function PageConfig({ title, tags }: PageConfigProps) {
  const [pageArticles, setPageArticles] = useState<Article[]>([]);

  const getArticles = async () => {
    const { data, status } = await API.article.getFilteredArticles({
      tags: tags,
      text: "",
    });
    if (status === 200) {
      setPageArticles(data);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="w-full min-h-full flex flex-col items-center gap-2">
      <p className="text-indigo-500 font-semibold w-full text-left">Hero Articles</p>
      <div className="w-full flex flex-col justify-center items-center py-16 px-4 rounded-lg border gap-2">
        <h1 className="text-lg font-semibold m-0">Hero articles unset</h1>
        <p>Articles will be randomly assigned on each page load</p>
        <div className="h-[40px] w-[150px] flex gap-1 items-center justify-center text-md text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer mt-2">
          Set articles
        </div>
      </div>
    </div>
  );
}
