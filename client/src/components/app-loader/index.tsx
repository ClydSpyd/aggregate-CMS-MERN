import spinner from '../../assets/loaders/spinner-indigo.svg';
import { cn } from '../../lib/utilities';
export default function AppLoader({
  asChild,
  spinnerOnly,
  size,
  className
}: {
  asChild?: boolean;
  spinnerOnly?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 items-center justify-center",
        asChild ? "w-full grow" : "fixed h-screen w-screen top-0 left-0",
        className
      )}
    >
      <img
        src={spinner}
        alt="loading spinner"
        className={`h-[${size ?? 50}px] w-[${size ?? 50}px]`}
      />
      {!spinnerOnly && <p className="text-xs">loading...</p>}
    </div>
  );
}
