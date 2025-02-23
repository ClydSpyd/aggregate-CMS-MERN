import { useState } from "react";
import { ArticleViewProps, EditData } from "./types";
import API from "../../api";
import { useNotification } from "../../contexts/notification-context";
import ArticleImagePicker from "./article-image-picker";
import EditWrapper from "./edit-wrapper";
import ArticleListItems from "./article-list-items";
import ArticleContentEditor from "./article-content-editor";

export default function ArticleView({
  articleData,
  setArticleData,
}: ArticleViewProps) {
  const { showToast } = useNotification();
  const [edit, setEdit] = useState<EditData>({
    title: false,
    caption: false,
    content: false,
  });

  const toggleEdit = (key: keyof EditData) => {
    setEdit((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (value: string, key: string) => {
    setArticleData((prev: Article) => ({
      ...prev,
      [key]: value,
    }));
    try {
      API.article.updateArticle(articleData._id, {
        [key]: value,
      });
      showToast("Article updated", "success");
    } catch (error) {
      console.error(`Error updating article:`, error);
    }
  };


  return (
    <div className="grow h-full flex justify-center overflow-y-auto transition-all ease-in-out duration-500 px-4">
      <div className="w-full max-w-[1050px] h-fit flex flex-col items-center text-center pb-16">
        <ArticleImagePicker
          articleData={articleData}
          setArticleData={setArticleData}
        />
        <div className="w-full flex flex-col items-center">
          <EditWrapper
            editData={edit}
            keyName="title"
            saveCallback={handleInputChange}
            initialValue={articleData.title}
            toggleEdit={toggleEdit}
            inputClass="text-[55px] leading-[1.1] tracking-tighter font-bold text-indigo-500 my-4"
          >
            <h1 className="text-[55px] leading-[1.1] tracking-tighter font-bold text-indigo-500 my-2">
              {articleData.title}
            </h1>
          </EditWrapper>
          <EditWrapper
            editData={edit}
            keyName="caption"
            saveCallback={handleInputChange}
            initialValue={articleData.caption}
            toggleEdit={toggleEdit}
            inputClass="text-[30px] font-semibold"
          >
            {!!articleData.caption ? (
              <h1 className="text-[30px] font-semibold">
                {articleData.caption}
              </h1>
            ) : (
              <h1 className="text-[30px] opacity-20">
                [enter article subtitle]
              </h1>
            )}
          </EditWrapper>
          {articleData.type !== "slides" && (
            <ArticleContentEditor
              articleData={articleData}
              edit={edit}
              toggleEdit={toggleEdit}
              setArticleData={setArticleData}
            />
          )}
          {articleData.type === "list" && (
            <ArticleListItems
              items={articleData.listItems ?? []}
              setArticleData={setArticleData}
              articleData={articleData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
