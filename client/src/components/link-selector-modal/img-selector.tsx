import { useEffect, useRef, useState } from "react";
import API from "../../api";
import ImgGrid from "./img-grid";
import { cn } from "../../lib/utilities";

export default function ImgSelector({
  selectCallback,
}: {
  selectCallback: (imgUrl: string, type: SlideType, videoUrl?: string) => void;
}) {
  const [imgs, setImgs] = useState<string[] | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImgs = async () => {
    const { data, error } = await API.assets.getAllImgs();
    if (data) {
      setImgs(
        data.filter(
          (url) => !url.includes("spinner") && /\.(jpg|jpeg|png)$/i.test(url)
        )
      );
    } else if (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImgs();
  }, []);

  const handleSelect = () => {
    selectCallback(selectedImg!, "image");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const { data, error } = await API.upload.image(file);
      if (data) {
        selectCallback(data.url, "image");
      } else {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <ImgGrid
        imgs={imgs}
        selectedImg={selectedImg}
        setSelectedImg={setSelectedImg}
        error={error}
        loading={loading}
      />
      <div className="h-[50px] w-full flex justify-end items-end gap-2">
        <button
          onClick={handleSelect}
          className={cn(
            "button-main",
            selectedImg
              ? "opacity-100 pointer-events-auto"
              : "opacity-40 pointer-events-none"
          )}
        >
          Use Selected
        </button>
        <button onClick={handleInputClick} className="button-main">
          Upload Image
        </button>
      </div>
      <input
        className="relative z-50"
        ref={fileInputRef}
        onChange={handleUpload}
        type="file"
        name="img_input"
        accept="image/png, image/jpeg, image/jpg"
        hidden
      />
    </>
  );
}
