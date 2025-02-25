/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { cn, debounce } from "../../../lib/utilities";
import InputField from "../../../components/utility-comps/input-field";
import LinkSelectorModal from "../../../components/link-selector-modal";
import { CgAddR } from "react-icons/cg";
import TooltipWrapper from "../../../components/utility-comps/tooltip-wrapper";
import { TbPhotoEdit } from "react-icons/tb";

export default function ArticleSlideItem({
  item,
  updateItem,
  idx,
}: {
  item: SlideItem;
  idx: number;
  updateItem: (index: number, item: SlideItem) => void;
}) {
  const [itemData, setItemData] = useState<SlideItem>(item);

  useEffect(() => {
    handleSave(itemData);
  }, [itemData]);

  const handleUpdate = (key: keyof ListItemData, value: string) => {
    setItemData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = useCallback(
    debounce((data: SlideItem) => {
      if (Object.values(data).includes("")) return;
      console.log("saving", data);
      updateItem(idx, data);
    }, 500),
    []
  );
  const handleLinkUrl = (
    imgUrl: string,
    type?: SlideType,
    videoUrl?: string
  ) => {
    setItemData((prev: SlideItem) => {
      if (type === "video") {
        return {
          ...prev,
          type,
          imgUrl,
          videoUrl,
        } as VideoSlideItem;
      } else {
        return {
          ...prev,
          type,
          imgUrl,
        } as ImageSlideItem;
      }
    });
  };

  return (
    <div className="w-full flex gap-2 p-4 rounded-lg border h-[250px]">
      <LinkSelectorModal selectCallback={handleLinkUrl}>
        <div
          className={cn(
            "h-full w-[250px] flex items-center justify-center rounded-md border hover:border-indigo-500 transition-all duration-300 cursor-pointer group overflow-hidden relative"
          )}
        >
          {!!itemData.imgUrl ? (
            <>
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-300 cursor-pointer group"
                src={itemData.imgUrl}
                alt="img"
              />
              <div
                className={cn(
                  "absolute z-20 transition-all duration-300 ease-in group-hover:opacity-100 opacity-0"
                )}
              >
                <TooltipWrapper message="update item">
                  <div className="h-[55px] w-[55px] cursor-pointer flex items-center justify-center border border-slate-400 rounded-md transition-all duration-200 bg-white text-slate-500 hover:text-indigo-500 hover:border-indigo-500">
                    <TbPhotoEdit size={35} />
                  </div>
                </TooltipWrapper>
              </div>
            </>
          ) : (
            <CgAddR className="text-4xl text-gray-200 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-300" />
          )}
        </div>
      </LinkSelectorModal>
      <div className="h-full grow flex flex-col gap-2">
        <InputField
          placeholder="Slide Heading"
          value={itemData.title}
          onChange={(val: string) => handleUpdate("title", val)}
        />
        <textarea
          placeholder="Slide Content"
          onChange={(e) => handleUpdate("textContent", e.target.value)}
          value={itemData.textContent}
          className="resize-none border p-2 rounded-sm w-full grow"
        ></textarea>
      </div>
    </div>
  );
}
