/* eslint-disable react-hooks/exhaustive-deps */
import { CgAddR } from "react-icons/cg";
import { useCallback, useState } from "react";
import { cn, debounce } from "../../../lib/utilities";
import InputField from "../../../components/utility-comps/input-field";
import { TbPhotoEdit } from "react-icons/tb";
import TooltipWrapper from "../../../components/utility-comps/tooltip-wrapper";
import LinkSelectorModal from "../../../components/link-selector-modal";

export default function ArticleListItem({
  item,
  updateItem,
}: {
  item: ListItemData;
  updateItem: (item: ListItemData) => void;
}) {
  const [itemData, setItemData] = useState<ListItemData>(item);

  const handleUpdate = (key: keyof ListItemData, value: string) => {
    console.log("HANDLE UPDATE", key, value);
    setItemData((prev) => ({
      ...prev,
      [key]: value,
    }));
    handleSave({ ...itemData, [key]: value });
  }

  const handleSave = useCallback(
    debounce((data:ListItemData) => {
      console.log("HANDLE SAVE", data);
      if (Object.values(data).includes("")) return;
      console.log("HANDLE SAVE - SAVING", data);
      updateItem(data);
    }, 500),
    []
  );

  return (
    <div className="w-full flex gap-2 p-4 rounded-lg border h-[250px]">
      <LinkSelectorModal
        singleType="image"
        selectCallback={(url: string) => handleUpdate("imgUrl", url)}
      >
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
                <TooltipWrapper message="update photo">
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
          placeholder="Card Heading"
          value={itemData.title}
          onChange={(val: string) => handleUpdate("title", val)}
        />
        <textarea
          placeholder="Card Content"
          onChange={(e) => handleUpdate("textContent", e.target.value)}
          value={itemData.textContent}
          className="resize-none border p-2 rounded-sm w-full grow"
        ></textarea>
      </div>
    </div>
  );
}
