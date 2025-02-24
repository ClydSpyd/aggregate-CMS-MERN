import { FaCheck } from "react-icons/fa";
import spinner from "../../assets/loaders/spinner-indigo.svg";
import { cn } from "../../lib/utilities";

export default function ImgGrid({
    imgs,
    selectedImg,
    setSelectedImg,
    error,
    loading,
}: {
  imgs: string[] | null;
  selectedImg: string | null;
  setSelectedImg: (img: string) => void;
  error: string | null;
  loading: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full grow max-h-[600px] flex flex-wrap overflow-scroll gap-2 p-2 pl-4 border rounded-md relative",
        !imgs?.length
          ? "items-center justify-center"
          : " items-start justify-start"
      )}
    >
      {imgs
        ? imgs.map((img, idx) => (
            <div
              onClick={() => setSelectedImg(img)}
              key={idx}
              className="w-[100px] h-[100px] flex items-center justify-center rounded-md border border-indigo-500 cursor-pointer overflow-hidden group relative"
            >
              {selectedImg === img && (
                <div className="absolute top-1 right-1 h-[25px] w-[25px] border border-white bg-indigo-500 rounded-full z-20 flex items-center justify-center">
                  <FaCheck className="text-white text-sm" />
                </div>
              )}
              <img
                src={img}
                alt={`img_${idx}`}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-200 ease-out"
              />
            </div>
          ))
        : error && <p>{error}</p>}
      {loading && (
        <div className="absolute h-full w-full flex flex-col items-center justify-center bg-indigo-200/80">
          <img
            src={spinner}
            alt="loading spinner"
            className={`h-[60px] w-[60px]`}
          />
        </div>
      )}
    </div>
  );
}
