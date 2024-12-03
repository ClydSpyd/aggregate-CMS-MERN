import spinner from '../../assets/loaders/spinner-indigo.svg';
export default function AppLoader() {
  return (
    <div className="h-screen w-screen flex flex-col gap-1 items-center justify-center">
      <img src={spinner} alt="loading spinner" className="h-[50px] w-[50px]" />
      <p className="text-xs">loading...</p>
    </div>
  );
}
