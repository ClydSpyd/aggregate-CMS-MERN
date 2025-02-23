import { CgAddR } from "react-icons/cg";
import AwsImagePicker from "../../../components/utility-comps/aws-image-picker";
import { useCallback, useEffect, useState } from "react";
import { cn, debounce } from "../../../lib/utilities";
import InputField from "../../../components/utility-comps/input-field";

export default function ArticleListItem({
  item,
  updateItem,
  idx
}: {
  item: ListItemData;
  idx: number;
  updateItem: (index: number, item: ListItemData) => void;
}) {
  const [itemData, setItemData] = useState<ListItemData>(item);

  useEffect(() => {
    handleSave(itemData);
  }
  , [itemData]);

  const handleUpdate = (key: keyof ListItemData, value: string) => {
    setItemData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSave = useCallback(
    debounce((data:ListItemData) => {
      console.log("item", data);
      if (Object.values(data).includes("")) return;
      console.log("saving", data);
      updateItem(idx, data);
    }, 500),
    []
  );

  return (
    <div className="w-full flex gap-2 p-4 rounded-lg border h-[250px]">
      <AwsImagePicker
        selectCallback={(url: string) => handleUpdate("imgUrl", url)}
      >
        <div
          className={cn(
            "h-full w-[250px] flex items-center justify-center rounded-md border hover:border-indigo-500 transition-all duration-300 cursor-pointer group overflow-hidden"
          )}
        >
          {!!itemData.imgUrl ? (
            <>
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-300 cursor-pointer group"
                src={itemData.imgUrl}
                alt="img"
              />
            </>
          ) : (
            <CgAddR className="text-4xl text-gray-200 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-300" />
          )}
        </div>
      </AwsImagePicker>
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
