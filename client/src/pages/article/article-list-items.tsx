import { Dispatch, SetStateAction } from "react";

export default function ArticleListItems({
  items,
  setArticleData,
}: {
  items: ListItem[];
  setArticleData: Dispatch<SetStateAction<Article>>;
}) {
  if (!items.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center border rounded-lg p-8">
        <h1 className="text-lg font-semibold m-0">No list items added</h1>
        <p className="text-slate-400 font-thin">
          List articles cannot be published without list content
        </p>
        <div
        //   onClick={() => setEditArticles(true)}
          className="min-h-[40px] max-h-[40px] w-[150px] flex gap-1 items-center justify-center text-md text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer mt-2"
        >
          Add Item
        </div>
      </div>
    );
};

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          {/* <p className="text-gray-500">{item.description}</p> */}
          <button
            // onClick={() => setArticleData(item)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}
