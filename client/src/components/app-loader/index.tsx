import spinner from '../../assets/loaders/spinner-indigo.svg';
import { cn } from '../../lib/utilities';
export default function AppLoader({
  asChild,
  spinnerOnly,
}: {
  asChild?: boolean;
  spinnerOnly?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 items-center justify-center",
        asChild ? "w-full grow" : "fixed h-screen w-screen"
      )}
    >
      <img src={spinner} alt="loading spinner" className="h-[50px] w-[50px]" />
      {!spinnerOnly && <p className="text-xs">loading...</p>}
    </div>
  );
}
