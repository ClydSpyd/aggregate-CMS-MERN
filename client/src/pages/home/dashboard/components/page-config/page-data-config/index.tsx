import TagSelector from "../../../../../../components/tag-selector";
import { usePageConfig } from "../../../../../../contexts/page-config-context";
import InputField from "../../../../../../components/utility-comps/input-field";
import Checkbox from "../../../../../../components/utility-comps/checkbox";
import TooltipWrapper from "../../../../../../components/utility-comps/tooltip-wrapper";
import { MdDeleteForever } from "react-icons/md";
import { useDashboard } from "../../../../../../contexts/dash-contenxt";

export default function PageDataConfig() {
  const {
    pageConfig: { _id: itemId, tags, name, active },
    setPageConfig,
  } = usePageConfig();
  const { updateNavItem } = useDashboard();

  const handleUpdate = (data:Partial<DynamicPageConfig>) => {
    setPageConfig((prev: DynamicPageConfig) => ({ ...prev, ...data }));
    updateNavItem(itemId, data);
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2 w-full h-fit">
        <div className="flex gap-1 w-full">
          <InputField
            autofocus
            placeholder="name"
            onChange={(val: string) => handleUpdate({ name: val })}
            value={name}
          />
        </div>
        <TooltipWrapper message={`${active ? "Deactivate" : "Activate"} page`}>
          <div
            onClick={() => handleUpdate({ active: !active })}
            className="h-full px-[12px] flex gap-4 items-center justify-between bg-white border rounded-sm relative cursor-pointer group hover:border-indigo-500"
          >
            <p className={"text-[#a0a0a0] text-md group-hover:text-[#747474]"}>
              Active
            </p>
            <Checkbox
              checked={active}
              size={16}
              additionalClass="min-h-[25px] min-w-[25px]"
            />
          </div>
        </TooltipWrapper>
        <TooltipWrapper message="delete item">
          <div
            // onClick={handleDelete}
            className="cursor-pointer h-[60px] w-[60px] flex items-center justify-center border rounded-sm bg-white text-slate-400 hover:text-indigo-500 hover:border-indigo-500"
          >
            <MdDeleteForever size={30} />
          </div>
        </TooltipWrapper>
      </div>
      <div className="w-full flex gap-2">
        <TagSelector
          tags={tags}
          setTags={(tags) => handleUpdate({ tags })}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
