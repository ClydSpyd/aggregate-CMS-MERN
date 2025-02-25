import { Dispatch, SetStateAction, useState } from "react";
import ArticleListItem from "./article-list-item";
import API from "../../../api";
import { v4 as uuidv4 } from 'uuid';
import { cn } from "../../../lib/utilities";

const blankItem = (id: string): ListItemData => ({
  id,
  imgUrl: "",
  title: "",
  textContent: "",
});

export default function ArticleListItems({
  items,
  setArticleData,
  articleData,
}: {
  items: ListItemData[];
  setArticleData: Dispatch<SetStateAction<Article>>;
  articleData: Article;
}) {
  const [canAddItem, setCanAddItem] = useState(true);

  const addItem = () => {
    setCanAddItem(false);
    const newItem = blankItem(uuidv4());
    setArticleData((prev) => ({
      ...prev,
      listItems: prev.listItems ? [...prev.listItems, newItem] : [newItem],
    }));
  };

  const updateItem = (item: ListItemData) => {
    const updatedItems = [...articleData.listItems!];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    updatedItems[index] = item;
    API.article.updateArticle(articleData._id, {
      listItems: updatedItems.filter((i) => i !== null),
    });
    setCanAddItem(true);
  };

  return !items.length ? (
    <div className="w-full flex flex-col items-center justify-center border rounded-lg p-4 py-8">
      <h1 className="text-lg font-semibold m-0">No list items added</h1>
      <p className="text-slate-400 font-thin">
        List articles cannot be published without list content
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
        <ArticleListItem
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
