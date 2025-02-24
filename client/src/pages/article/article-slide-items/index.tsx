import { Dispatch, SetStateAction } from "react";
import ArticleSlideItem from "./article-slide-item";
import API from "../../../api";

const blankItem: SlideItem = {
  type: "image",
  imgUrl: "",
  title: "",
  textContent: "",
};

export default function ArticleSlideItems({
  items,
  setArticleData,
  articleData,
}: {
  items: SlideItem[];
  setArticleData: Dispatch<SetStateAction<Article>>;
  articleData: Article;
}) {
  const addItem = () => {
    setArticleData((prev) => ({
      ...prev,
      slideItems: prev.slideItems
        ? [...prev.slideItems, blankItem]
        : [blankItem],
    }));
  };

  const updateItem = (index: number, item: SlideItem) => {
    const payload = () => {
      const updatedItems = [...articleData.slideItems!];
      updatedItems[index] = item;
      return { ...articleData, slideItems: updatedItems };
    }
    setArticleData(payload());
    API.article.updateArticle(articleData._id, payload());
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
          idx={idx}
          item={item}
          updateItem={updateItem}
        />
      ))}
      <div className="w-[300px] mx-auto">
        <div onClick={addItem} className="button-main !w-full !h-[50px]">
          Add Item
        </div>
      </div>
    </div>
  );
}
