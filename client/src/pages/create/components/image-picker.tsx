import { useEffect, useRef, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import spinner from '../../../assets/loaders/spinner-grey.svg';
import API from "../../../api";

interface PickerProps {
  moduleTitle: string;
  defaultImageSrc: string | null;
  onChange: (imgSrc: string) => void;
  altText?: string;
}
export default function ImagePicker({
  moduleTitle,
  defaultImageSrc,
  altText,
  onChange
}: PickerProps) {
    const [imgSrc, setImgSrc] = useState<string>(defaultImageSrc ?? "");
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
      setImgSrc("");
        if(defaultImageSrc){
          setImgSrc(defaultImageSrc);
        }
    },[defaultImageSrc])

    const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
        const file = e.target.files?.[0];
        if (file) {
          const { data, error } = await API.upload.image(file);
          if(data){
            setImgSrc(data.url);
            onChange(data.url);
          } else {
            console.log(error);
          }
        }
      setLoading(false);
    }

    const handleInputClick = () => {
        inputRef.current?.click();
    }


  return (
    <div className="w-full h-full border p-1 flex flex-col relative group">
      <input
        className="relative z-50"
        ref={inputRef}
        onChange={handleImgChange}
        type="file"
        name="img_input"
        accept="image/png, image/jpeg, image/jpg"
        hidden
      />
      <p className="text-xs text-[#a0a0a0] mb-1">{moduleTitle}:</p>
      <div
        onClick={handleInputClick}
        className="grow w-full border rounded-md overflow-hidden group-hover:border-slate-400 relative cursor-pointer z-1"
      >
        <div className="absolute h-full w-full flex flex-col gap-1 items-center opacity-0 group-hover:opacity-100 bg-slate-300/50 backdrop-blur-sm  justify-center z-20 transition-all duration-300 ease-out">
          <div className="flex flex-col items-center gap-1 group/btn">
            <div className="h-[40px] w-[40px] bg-white text-slate-500 border hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300 ease-out flex items-center justify-center rounded-md">
              <MdOutlineFileUpload size={22} />
            </div>
            <p className="text-xs text-white font-bold">
              Upload Image
            </p>
          </div>
        </div>
        {loading ? (
          <div className="h-full w-full border flex items-center justify-center">
            <img src={spinner} alt="loading-spinner" height={35} width={35} />
          </div>
        ) : imgSrc ? (
          <img
            style={{ zIndex: 1 }}
            className="h-full w-full object-cover absolute"
            src={imgSrc}
            alt={altText ?? `${moduleTitle}_image`}
          />
        ) : (
          <div className="h-full w-full border flex items-center justify-center">
            <BsQuestionCircle className="text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
}