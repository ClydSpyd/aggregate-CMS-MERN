/* eslint-disable react-hooks/exhaustive-deps */
import { cn, debounce, isValidUrl } from "../../lib/utilities";
import { getYoutubePreviewImg } from "../../lib/link-utilities";
import { useCallback, useEffect, useState } from "react";
import InputField from "../utility-comps/input-field";
import { IoLogoYoutube } from "react-icons/io5";

export default function VideoSelector({
  selectCallback,
}: {
  selectCallback: (imgUrl: string, type: SlideType, videoUrl?: string) => void;
}) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");

  useEffect(() => {
    handleInput(textInput);
  }, [textInput]);

  const handleInput = useCallback(
    debounce(async (input: string) => {
      setImgUrl(null);
      console.log("DEBOUNCE");
      if (!isValidUrl(input)) return;
      const previewImg = getYoutubePreviewImg(input);
      console.log("previewImg", previewImg);
      if (previewImg) {
        setImgUrl(previewImg);
      }
    }, 500),
    []
  );

  const handleSelect = () => {
    if (!imgUrl || !isValidUrl(textInput)) return;
    selectCallback(imgUrl, "video", textInput);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField
        autofocus
        placeholder="Enter a YouTube URL"
        value={textInput}
        onChange={(val) => {
          setTextInput(val);
        }}
      />
      <div className="flex flex-col items-center">
        <div className="h-[200px] w-[200px] border rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <IoLogoYoutube className="text-[70px] text-white" />
          )}
        </div>
        <button
          className={cn(
            "button-main !w-[250px]",
            isValidUrl(textInput) && imgUrl
              ? "opacity-100 pointer-events-auto"
              : "opacity-40 pointer-events-none"
          )}
          onClick={handleSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
}
