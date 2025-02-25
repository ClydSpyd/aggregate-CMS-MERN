import TextEditor from "../../components/text-editor";
import { useQueue } from "../../contexts/queue-context";
// import dynamic from "next/dynamic";
import TagSelector from "../../components/tag-selector";
import { useIsFirstRender } from "../../hooks/isFirstRender";
import ConfirmModal from "./components/confirm-modal";
import useCreate from "./_hooks/useCreate";
import { cn } from "../../lib/utilities";
import InputField from "../../components/utility-comps/input-field";
import { useEffect, useState } from "react";
import ImagePicker from "./components/image-picker";
// import spinner from "@root/assets/loaders/spinner-indigo.svg";
import Queue from "./components/queue";
import AddArticlBtn from "./components/add-article-btn";

export default function CreatePage() {
  const isFirstRender = useIsFirstRender()
  const { queuedItems } = useQueue();
  const [emptyQueue, setEmptyQueue] = useState(false); 

  const {
    submitData,
    confirmSaved,
    formFilled,
    localFields,
    selectedArticle,
    saveCallback,
    handleDismiss,
    handleInputChange,
    handleTags,
    setSelectedArticle,
    handleImage,
  } = useCreate();

  
  useEffect(() => {
    setEmptyQueue(queuedItems.length === 0);
  }, [queuedItems]);

  // const handleNewArticle = () => {
  //   const instance = queuedItems.filter(
  //     (item: FeedItem) => item.name.slice(0, 11) === "NEW ARTICLE"
  //   ).length;
  //   const newArticle: FeedItem = {
  //     name: `NEW ARTICLE ${instance + 1}`,
  //     url: String(Math.ceil(Math.random() * 20000)),
  //     // url: "",
  //     imgUrl: "/favicon.ico",
  //     articleSrc: "custom",
  //     id: uuidv4(),
  //   };
  //   setQueuedItems((prev: FeedItem[]) => [...prev, newArticle]);
  //   setSelectedArticle(newArticle);
  // }

  return (
    queuedItems && (
      <div className="w-screen h-full flex overflow-hidden">
        <div className="min-w-[500px] max-w-[500px] h-full py-1 rounded-sm overflow-y-auto">
          <div className="w-full flex items-center justify-between mb-1 px-2 pr-4">
            <h4 className="font-semibold text-sm text-indigo-600 mb-1">
              Queued items:
            </h4>
            <AddArticlBtn />
          </div>
          <Queue
            items={queuedItems}
            onSelect={setSelectedArticle}
            selectedId={selectedArticle?.id ?? ""}
          />
        </div>
        <div
          className={cn(
            "overflow-y-auto grow pr-4 pb-2 flex flex-col gap-1 relative",
            emptyQueue
              ? "opacity-50 cursor-not-allowed [&_*]:pointer-events-none"
              : ""
          )}
        >
          {confirmSaved ? (
            <ConfirmModal handleDismiss={handleDismiss} />
          ) : (
            <>
              <div
                className={cn(
                  "h-full w-full cursor-not-allowed",
                  emptyQueue ? "absolute block z-50" : "hidden z-0"
                )}
              />
              <div className="w-full flex flex-col gap-2 py-2">
                <InputField
                  placeholder="Article Title"
                  value={localFields.title}
                  onChange={(val: string) => handleInputChange(val, "title")}
                />
                <InputField
                  placeholder="Caption"
                  value={localFields.caption}
                  onChange={(val: string) => handleInputChange(val, "caption")}
                />
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <TagSelector
                      tags={localFields.tags}
                      setTags={(tags: string[]) => handleTags(tags)}
                    />
                  </div>
                  <ImagePicker
                    moduleTitle="Hero Image"
                    defaultImageSrc={selectedArticle?.imgUrl ?? null}
                    altText="hero"
                    onChange={handleImage}
                  />
                </div>
              </div>
              {selectedArticle && !isFirstRender && (
                <TextEditor
                  border
                  saveCallback={saveCallback}
                  postSubmistMsg={submitData.msg}
                  isError={submitData.error}
                  canSubmit={formFilled}
                />
              )}
            </>
          )}
        </div>
      </div>
    )
  );
}
