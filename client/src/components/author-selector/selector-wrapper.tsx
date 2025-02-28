import Dropdown from "../utility-comps/dropdown";
import { FaUsers } from "react-icons/fa6";

interface Props<T> {
  options: T[];
  selected: string | null;
  onChange: (val: string) => void;
  displayValue: keyof T;
  withAllAuthors?: boolean;
  dropdownClass?: string;
}

export default function SelectorWrapper<
  T extends { avatarUrl: string; _id: string }
>({
  options,
  selected,
  onChange,
  displayValue,
  withAllAuthors,
  dropdownClass,
}: Props<T>) {
  return (
    <Dropdown
      additionalClass={dropdownClass}
      defaultIdxZero={withAllAuthors}
      options={[
        ...(withAllAuthors
          ? [
              {
                label: (
                  <div className="flex items-center gap-2">
                    <div className="h-[35px] w-[35px] flex items-center justify-center rounded-full overflow-hidden bg-indigo-500">
                      <FaUsers size={20} fill="white" />
                    </div>
                    <p className="text-md">All authors</p>
                  </div>
                ),
                value: null,
              },
            ]
          : []),
        ...options.map((author) => ({
          label: (
            <div className="flex items-center gap-2">
              <img
                src={author.avatarUrl}
                alt="avatar"
                className="h-[35px] w-[35px] rounded-full overflow-hidden"
              />
              <p className="text-md">{String(author[displayValue])}</p>
            </div>
          ),
          value: author._id,
        })),
      ]}
      selected={options.find((opt) => opt._id === selected)?._id ?? null}
      onChange={(value: string | null) => onChange(value ?? "")}
    />
  );
}
