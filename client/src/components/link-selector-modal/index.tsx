import { useState } from "react";
import ModalWrapper from "../utility-comps/modal-wrapper";
import ImgSelector from "./img-selector";
import VideoSelector from "./video-selector";

export default function LinkSelectorModal({
  selectCallback,
  children,
  singleType,
}: {
  selectCallback: (imgUrl: string, type?: SlideType, videoUrl?: string) => void;
  children: React.ReactNode;
  singleType?: SlideType;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<SlideType>(singleType ?? "image");

  const handleUpdate = (imgUrl: string, type: SlideType, videoUrl?: string) => {
    selectCallback(imgUrl, type, videoUrl);
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <ModalWrapper open={open} onClose={() => setOpen(false)}>
        <div className="w-[800px] h-[400px] bg-white rounded-lg flex flex-col p-2">
          <div className="h-[60px]">
            {singleType ? (
              <h1 className="ml-2 text-[22px] text-indigo-500 font-semibold capitalize">
                {singleType} Picker
              </h1>
            ) : (
              <div className="w-full rounded-sm flex gap-1 bg-white z-30 mb-2">
                <button
                  className={`w-[120px] rounded-lg py-2 px-6 text-center text-sm font-medium z-10 border border-indigo-500 ${
                    type === "image"
                      ? "text-white bg-indigo-500"
                      : " text-indigo-500 bg-white hover:bg-indigo-100"
                  }`}
                  onClick={() => setType("image")}
                >
                  Image
                </button>
                <button
                  className={`w-[120px] rounded-lg py-2 px-6 text-center text-sm font-medium z-10 border border-indigo-500 ${
                    type === "video"
                      ? "text-white bg-indigo-500"
                      : " text-indigo-500 bg-white hover:bg-indigo-100"
                  }`}
                  onClick={() => setType("video")}
                >
                  video
                </button>
              </div>
            )}
          </div>
          {type === "image" ? (
            <ImgSelector selectCallback={handleUpdate} />
          ) : (
            <VideoSelector selectCallback={handleUpdate} />
          )}
        </div>
      </ModalWrapper>
    </>
  );
}
