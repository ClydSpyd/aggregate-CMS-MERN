import { Dispatch, SetStateAction, useState } from "react";
import ArticleSlideItem from "./article-slide-item";
import API from "../../../api";
import { v4 as uuidv4 } from 'uuid';
import { cn } from "../../../lib/utilities";

const blankItem = (id:string): SlideItem => ({
  _id: id,
  type: "image",
  imgUrl: "",
  title: "",
  textContent: "",
});

export default function ArticleSlideItems({
  items,
  setArticleData,
  articleData,
}: {
  items: SlideItem[];
  setArticleData: Dispatch<SetStateAction<Article>>;
  articleData: Article;
}) {
  const [canAddItem, setCanAddItem] = useState(true);
  
  const addItem = () => {
    setCanAddItem(false);
    const newItem = blankItem(uuidv4());
    setArticleData((prev) => ({
      ...prev,
      slideItems: prev.slideItems ? [...prev.slideItems, newItem] : [newItem],
    }));
  };

  const updateItem = (item: SlideItem) => {
    const idx = articleData.slideItems!.findIndex((i) => i._id === item._id);
    const updatedItems = [...articleData.slideItems!];
    updatedItems[idx] = item;
    API.article.updateArticle(articleData._id!, {
      // @ts-ignore
      slideItems: updatedItems.map(({ _id, ...rest }) => rest),
    });
    setCanAddItem(true);
  };

  return !items.length ? (
    <div className="w-full flex flex-col items-center justify-center border rounded-lg p-4 py-8">
      <h1 className="text-lg font-semibold m-0">No slides added</h1>
      <p className="text-slate-400 font-thin">
        Slideshow articles cannot be published without list content
      </p>
      <div
        onClick={addItem}
        className="min-h-[40px] max-h-[40px] w-[150px] flex gap-1 items-center justify-center text-md text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer mt-2"
      >
        Add Item
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-2">
      {items.map((item, idx) => (
        <ArticleSlideItem
          key={`list_item_${idx}`}
          item={item}
          updateItem={updateItem}
        />
      ))}
      <div className="w-[300px] mx-auto">
        <div
          onClick={addItem}
          className={cn(
            "button-main !w-full !h-[50px]",
            !canAddItem ? "opacity-30 pointer-events-none" : ""
          )}
        >
          Add Item
        </div>
      </div>
    </div>
  );
}
