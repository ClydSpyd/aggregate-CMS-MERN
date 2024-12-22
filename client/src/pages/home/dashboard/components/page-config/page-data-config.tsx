// import { IoDocumentTextSharp, IoWarning } from "react-icons/io5";
import TagSelector from "../../../../../components/tag-selector";
import { usePageConfig } from "../../../../../contexts/page-config-context";
// import { cn } from "../../../../../lib/utilities";
import InputField from "../../../../../components/utility-comps/input-field";
import Checkbox from "../../../../../components/utility-comps/checkbox";
import TooltipWrapper from "../../../../../components/utility-comps/tooltip-wrapper";
import { MdDeleteForever } from "react-icons/md";
import { useDashboard } from "../../../../../contexts/dash-contenxt";

export default function PageDataConfig() {
  const {
    pageConfig: { _id: itemId, tags, name, active },
    setPageConfig,
  } = usePageConfig();
  const { updateNavItem } = useDashboard();

  const handleTags = (tags:string[]) => {
    setPageConfig((prev: DynamicPageConfig) => ({ ...prev, tags }));
    updateNavItem(itemId, { tags });
  }

  const handleCheckobox = (val: boolean) => {
    setPageConfig((prev: DynamicPageConfig) => ({ ...prev, active: val }));
    updateNavItem(itemId, { active: val });
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2 w-full h-fit">
        <div className="flex gap-1 w-full">
          <InputField
            autofocus
            placeholder="name"
            onChange={(val: string) => console.log(val)}
            value={name}
          />
        </div>
        <TooltipWrapper message={`${active ? "Deactivate" : "Activate"} page`}>
          <div
            onClick={() => handleCheckobox(!active)}
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
        {/* <div
          className={cn(
            "w-[90px] h-[60px] rounded-sm flex flex-col gap-1 items-center justify-center text-white font-bold",
            count > 0 ? "bg-indigo-500" : "bg-red-500"
          )}
        >
          {count > 0 ? (
            <>
              <IoDocumentTextSharp size={20} />
              <p className="text-md">{count}</p>
            </>
          ) : (
            <>
              <IoWarning size={20} />
              <p className="text-md">no content</p>
            </>
          )}
        </div> */}
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
        <TagSelector tags={tags} setTags={handleTags} className="rounded-lg" />
      </div>
    </div>
  );
}
