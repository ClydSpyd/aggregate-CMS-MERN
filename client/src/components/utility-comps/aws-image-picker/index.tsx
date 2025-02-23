import { useEffect, useRef, useState } from "react";
import ModalWrapper from "../modal-wrapper";
import API from "../../../api";
import { cn } from "../../../lib/utilities";
import { FaCheck } from "react-icons/fa";
import spinner from "../../../assets/loaders/spinner-indigo.svg";

export default function AwsImagePicker({
  children,
  selectCallback,
}: {
  children: React.ReactNode;
  selectCallback: (imgUrl: string) => void;
}) {
  const [modalOpen, setModelOpen] = useState<boolean>(false);
  const [imgs, setImgs] = useState<string[] | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImgs = async () => {
    // fetch images from aws
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
    selectCallback(selectedImg!);
    setModelOpen(false);
  }
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
      const file = e.target.files?.[0];
      if (file) {
        const { data, error } = await API.upload.image(file);
        if(data){
          selectCallback(data.url);
          setModelOpen(false);
        } else {
          console.log(error);
        }
      }
    setLoading(false);
  }

  const handleInputClick = () => {
      fileInputRef.current?.click();
  }

  return (
    <>
      <div onClick={() => setModelOpen(true)}>{children}</div>
      <ModalWrapper
        open={modalOpen}
        onClose={() => setModelOpen(false)}
        noCloseBtn
      >
        <div className="w-[800px] h-[400px] bg-white rounded-lg flex flex-col p-4 pt-4">
          <div
            className={cn(
              "w-full grow max-h-[600px] flex flex-wrap overflow-scroll gap-2 pr-2 border relative",
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
          <div className="h-[50px] w-full flex justify-between items-end">
            <button onClick={() => setModelOpen(false)} className="button-main">
              close
            </button>
            <div className="flex gap-2">
              <button onClick={handleInputClick} className="button-main">
                Upload Image
              </button>
              <button onClick={handleSelect} className="button-main">
                select
              </button>
            </div>
          </div>
        </div>
      </ModalWrapper>
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
};