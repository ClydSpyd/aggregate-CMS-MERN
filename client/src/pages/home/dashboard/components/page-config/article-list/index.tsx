import { IoDocumentTextSharp, IoWarning } from "react-icons/io5";
import API from "../../../../../../api";
import ArticleCard from "../../../../../../components/article-card";
import ModuleTitle from "../../../../../../components/utility-comps/module-title";
import { usePageConfig } from "../../../../../../contexts/page-config-context";

export default function ArticleList() {
  const {
    articles,
    setArticles,
    pageConfig: { count },
  } = usePageConfig();

  const handleDelete = async (id: string) => {
    const { error } = await API.article.deleteArticle(id);
    if (!error) {
      setArticles((prev) => prev?.filter((article) => article._id !== id));
    }
  };

  console.log("articles", articles);

  return (
    <div className="w-full flex flex-col gap-2 border rounded-lg p-4">
      <div className="flex gap-2 pb-2">
        <ModuleTitle title={"Articles"} />
        {count > 0 && (
          <div className="flex gap-1 items-center bg-indigo-500 px-[6px] rounded-sm">
            <p className="text-[14px] py-[2px] text-white font-semibold">
              {count}
            </p>
            <IoDocumentTextSharp size={16} className="text-white" />
          </div>
        )}
      </div>
      <div className="w-full flex gap-4 flex-wrap items-stretch">
        {articles.length > 0 ? (
          articles.map((item) => (
            <ArticleCard
              item={item}
              key={item._id}
              handleDelete={() => handleDelete(item._id)}
              permaDeath
            />
          ))
        ) : (
          <div className="flex w-full justify-center">
            <p className="w-fit text-md p-2 px-[12px] rounded-md bg-red-500 text-white gap-1 my-16 flex items-center font-semibold">
              <IoWarning size={24} className="text-white" />
              no content
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
