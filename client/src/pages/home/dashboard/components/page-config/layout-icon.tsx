import QuadGrid from "../../../../../components/icons/QuadGrid";
import QuadList from "../../../../../components/icons/QuadList";
import { cn } from "../../../../../lib/utilities";

type LayoutIconProps = {
  layout: QuadBlockLayout;
  selected: QuadBlockLayout;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutIcon = ({ layout, selected, ...rest }: LayoutIconProps) => {
  const isActive = selected === layout;
  return (
    <div
      className={cn(
        "cursor-pointer border rounded-md p-1",
        isActive ? "border-indigo-300" : "hover:border-indigo-300"
      )}
      {...rest}
    >
      {layout === "quad-list" ? (
        <QuadList size={20} color={isActive ? "rgb(99 102 241)" : undefined} />
      ) : (
        <QuadGrid size={20} color={isActive ? "rgb(99 102 241)" : undefined} />
      )}
    </div>
  );
};
