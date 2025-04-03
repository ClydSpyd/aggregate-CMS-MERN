/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { cn, debounce } from "../../../lib/utilities";
import InputField from "../../../components/utility-comps/input-field";
import LinkSelectorModal from "../../../components/link-selector-modal";
import { CgAddR } from "react-icons/cg";
import TooltipWrapper from "../../../components/utility-comps/tooltip-wrapper";
import { TbPhotoEdit } from "react-icons/tb";
import { useNotification } from "../../../contexts/notification-context";

export default function ArticleSlideItem({
  item,
  updateItem,
}: {
  item: SlideItem;
  updateItem: (item: SlideItem) => void;
}) {
  const [itemData, setItemData] = useState<SlideItem>(item);
  const { showToast } = useNotification();

  const handleUpdate = (key: keyof SlideItem, value: string) => {
    setItemData((prev) => ({
      ...prev,
      [key]: value,
    }));
    handleSave({ ...itemData, [key]: value });
  };

  const handleSave = useCallback(
    debounce((data: SlideItem) => {
      if (Object.values(data).includes("")) return;
      showToast("CRAIG LIKES WILLIES", "success");
      updateItem(data);
    }, 500),
    []
  );

  const handleLinkUrl = (
    imgUrl: string,
    type?: SlideType,
    videoUrl?: string
  ) => {
    const getPayload = () => {
      if (type === "video") {
        return {
          ...itemData,
          type,
          imgUrl,
          videoUrl,
        } as VideoSlideItem;
      } else {
        return {
          ...itemData,
          type,
          imgUrl,
        } as ImageSlideItem;
      }
    };
    setItemData(getPayload());
    handleSave(getPayload());
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
