import { useState } from "react";
import ModalWrapper from "../utility-comps/modal-wrapper";
import ImgSelector from "./img-selector";

export default function AvatarSelector({
  selectCallback,
  children,
}: {
  selectCallback: (avatarUrl: string) => void;
  children: React.ReactNode;
  singleType?: SlideType;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleUpdate = (avatarUrl: string) => {
    selectCallback(avatarUrl);
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <ModalWrapper open={open} onClose={() => setOpen(false)}>
        <div className="w-[800px] h-[400px] bg-white rounded-lg flex flex-col p-2">
          <div className="h-[60px]">
            <h1 className="ml-2 text-[22px] text-indigo-500 font-semibold capitalize">
              Avatar Picker
            </h1>
          </div>
          <ImgSelector selectCallback={handleUpdate} bucketPath="avatars" />
        </div>
      </ModalWrapper>
    </>
  );
}
