import { cn } from "../../../lib/utilities";

export default function ModuleTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <p className={cn("text-indigo-500 font-semibold text-left", className)}>
      {title}
    </p>
  );
}