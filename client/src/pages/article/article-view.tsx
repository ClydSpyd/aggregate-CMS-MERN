/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { ArticleViewProps } from "./types";
import API from "../../api";
import { HoverWrapper } from "../../components/utility-comps/hover-wrapper";
import { ArticleTextEditor } from "./article-text-editor";
import { cn } from "../../lib/utilities";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useNotification } from "../../contexts/notification-context";
import ArticleImagePicker from "./article-image-picker";

interface EditData {
  title: boolean;
  caption: boolean;
  content: boolean;
}

const EditWrapper = ({
  children,
  keyName,
  editData,
  initialValue,
  toggleEdit,
  inputClass,
  saveCallback,
}: {
  children: React.ReactNode;
  keyName: keyof EditData;
  editData: EditData;
  saveCallback: (val: string, keyName: keyof EditData) => void;
  initialValue: string;
  toggleEdit: (keyName: keyof EditData) => void;
  inputClass?: string;
}) => {
  const [inputVal, setInputVal] = useState<string>(initialValue);
  const editRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleSave = () => {
    saveCallback(inputVal, keyName);
    toggleEdit(keyName);
  };

  useOutsideClick(editRef, () => {
    if (!editData[keyName]) return;
    toggleEdit(keyName);
  });

  useEffect(() => {
    if (editData[keyName]) {
      const ref = keyName === "title" ? textAreaRef : inputRef;
      ref.current?.focus();
      ref.current?.setSelectionRange(0, ref.current.value.length);
    }
  }, [editData[keyName]]);

  return editData[keyName] ? (
    <div
      ref={editRef}
      className="w-full border  transition-all duration-300 border-slate-300 px-6 rounded-lg cursor-pointer relative group my-2 py-4"
    >
      {" "}
      {keyName === "title" ? (
        <textarea
          ref={textAreaRef}
          className={cn("w-full text-center", inputClass ?? "")}
          value={inputVal}
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputVal(e.target.value)
          }
          id=""
        />
      ) : (
        <input
          ref={inputRef}
          className={cn("w-full text-center", inputClass ?? "")}
          type="text"
          value={inputVal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputVal(e.target.value)
          }
          id=""
        />
      )}
      <div
        onClick={handleSave}
        className={cn(
          "absolute bottom-4 h-[40px] w-[160px] flex items-center justify-center border rounded-md cursor-pointer  bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white transition-colors duration-200 pointer-events-auto z-50",
          keyName === "title" ? "bottom-2 right-4" : "absolute-vert right-2"
        )}
      >
        SAVE
      </div>
    </div>
  ) : (
    <HoverWrapper
      onClick={() => {
        console.log({ keyName });
        toggleEdit(keyName);
      }}
      additionalClass=""
    >
      {children}
    </HoverWrapper>
  );
};

export default function ArticleView({
  articleData,
  setArticleData,
}: ArticleViewProps) {
  const { showToast } = useNotification();
  const [edit, setEdit] = useState({
    title: false,
    caption: false,
    content: false,
  });

  const toggleEdit = (key: keyof typeof edit) => {
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
            <h1 className="text-[55px] leading-[1.1] tracking-tighter font-bold text-indigo-500 my-4">
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
            <h1 className="text-[30px] font-semibold">{articleData.caption}</h1>
          </EditWrapper>
          {!edit.content ? (
            <HoverWrapper
              onClick={() => toggleEdit("content")}
              additionalClass="my-2"
            >
              <div
                className="text-left p-4"
                dangerouslySetInnerHTML={{ __html: articleData.content }}
              />
            </HoverWrapper>
          ) : (
            <div className="w-full border  transition-all duration-300 border-slate-300 px-6 rounded-lg cursor-pointer relative group">
              <ArticleTextEditor
                show={true}
                setShow={() => toggleEdit("content")}
                articleData={articleData}
                handleContentChange={(...rest) => {
                  handleContentChange(...rest);
                  toggleEdit("content");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
