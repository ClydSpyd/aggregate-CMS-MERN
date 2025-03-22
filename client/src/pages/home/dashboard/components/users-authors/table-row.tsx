import React, { useRef, useState } from "react";
import StaggerContainer from "../../../../../components/utility-comps/stagger-container";
import ContextMenuWrapper from "../../../../../components/context-menu-wrapper";
import { FaUserTimes, FaUserCog } from "react-icons/fa";
import { cn } from "../../../../../lib/utilities";
import API from "../../../../../api";
import AuthorModal from "./author-modal";
import useOutsideClick from "../../../../../hooks/useOutsideClick";


export default function TableRow({
  user,
  zIndex,
  userCallback,
}: {
  user: AuthorData;
  zIndex: number;
  userCallback: (
    user: AuthorData,
    action: "create" | "update" | "delete"
  ) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    userCallback(user, "delete");
    API.user.deleteAuthor(user._id);
  }

  const handleUpdate = (data: AuthorData) => {
    userCallback(data, "update");
    API.user.updateAuthor(data, user._id);
  }
  
  useOutsideClick(contRef, () => setConfirmDelete(false));

  return (
    <StaggerContainer randomFactor={250} className="h-fit">
      <div
        ref={contRef}
        style={{ position: "relative", zIndex }}
        key={user._id}
        className="py-2 border rounded-md w-full flex justify-evenly items-center"
      >
        <div className="w-[100px] px-4 py-2">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex grow">
          <div className="w-1/3 grow px-4 py-2 flex justify-center">
            {user.name}
          </div>
          <div className="w-1/3 grow px-4 py-2 flex justify-center text-sm">
            {user.location}
          </div>
          <div className="w-1/3 grow px-4 py-2 flex justify-center text-sm">
            -
          </div>
        </div>
        <div className="w-[50px] h-full flex items-center justify-center">
          <ContextMenuWrapper alwaysVisible relative>
            <div className="bg-white rounded-sm shadow-md border flex flex-col gap-1 p-1">
              <div
                onClick={() => setConfirmDelete(true)}
                className="w-full p-2 flex items-center justify-between hover:bg-slate-50 px-2"
              >
                Delete
                <FaUserTimes size={22} />
              </div>
              <AuthorModal
                authorData={user}
                submitCallback={handleUpdate}
              >
                <div className="w-full p-2 flex items-center justify-between hover:bg-slate-50 px-2">
                  Manage
                  <FaUserCog size={22} />
                </div>
              </AuthorModal>
            </div>
          </ContextMenuWrapper>
        </div>
        <div
        style={{
          backdropFilter: "blur(4px)",
        }}
          className={cn(
            "w-full h-full absolute top-0 left-0 bg-slate-100/60 flex gap-2 items-center justify-end px-12",
            confirmDelete
              ? "scale-100 blur-none opacity-100 pointer-events-auto transition-all duration-200"
              : "scale-110 blur-md pointer-events-none opacity-0"
          )}
        >
          <h1 className="absolute-center">
            Delete author{" "}
            <span className="text-indigo-500 font-semibold">{user.name}</span>?
          </h1>
          <div
            onClick={handleDelete}
            className="w-[100px] h-[35px] text-sm button-danger"
          >
            confirm
          </div>
          <div
            onClick={() => setConfirmDelete(false)}
            className="w-[100px] h-[35px] text-sm button-border"
          >
            cancel
          </div>
        </div>
      </div>
    </StaggerContainer>
  );
}
