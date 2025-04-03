import API from "../../api";
import { HoverWrapper } from "../../components/utility-comps/hover-wrapper";
import { useNotification } from "../../contexts/notification-context";
import { ArticleTextEditor } from "./article-text-editor";
import { EditData } from "./types";

export default function ArticleContentEditor({
  articleData,
  edit,
  toggleEdit,
  setArticleData,
}: {
  articleData: Article;
  edit: EditData;
  toggleEdit: (key: keyof EditData) => void;
  setArticleData: React.Dispatch<React.SetStateAction<Article>>;
}) {
  const { showToast } = useNotification();

  const handleContentChange = (raw: string, html: string) => {
    setArticleData((prev: Article) => ({
      ...prev,
      content: html,
      rawContent: raw,
    }));
    try {
      API.article.updateArticle(articleData._id, {
        content: html,
        rawContent: raw,
      });
      showToast("Article updated", "success");
    } catch (error) {
      console.error(`Error updating article:`, error);
    }
  };

  return !edit.content ? (
    <HoverWrapper onClick={() => toggleEdit("content")} additionalClass="my-2 min-h-[400px]">
      {!!articleData.content.replaceAll("<p><br></p>", "").trim() ? (
        <div
          className="text-left p-4 ql-editor"
          dangerouslySetInnerHTML={{ __html: articleData.content }}
        />
      ) : (
        <h1 className="text-[30px] opacity-20">
          [enter article {articleData.type === "list" ? "intro" : "content"}]
        </h1>
      )}
    </HoverWrapper>
  ) : (
    <div className="w-full border transition-all duration-300 px-4 rounded-lg cursor-pointer relative group my-2">
      <ArticleTextEditor
        show={true}
        noToolbar={articleData.type === "list"}
        setShow={() => toggleEdit("content")}
        articleData={articleData}
        handleContentChange={(...rest) => {
          handleContentChange(...rest);
        }}
      />
    </div>
  );
}
