import React from "react";
import StaggerContainer from "../../../../../components/utility-comps/stagger-container";
import { format } from "date-fns";
import ContextMenuWrapper from "../../../../../components/context-menu-wrapper";
import { FaUserTimes, FaUserCog } from "react-icons/fa";


export default function TableRow({ user, zIndex }: { user: AdminUser, zIndex: number }) {
  return (
    <StaggerContainer className="h-fit">
      <div
        style={{ position: "relative", zIndex }}
        key={user._id}
        className="py-2 border rounded-md w-full flex justify-evenly items-center"
      >
        <div className="w-[80px] px-4 py-2">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="w-1/6 grow px-4 py-2 flex justify-center">
          {user.username}
        </div>
        <div className="w-1/5 grow px-4 py-2 flex justify-center text-sm">
          {user.email}
        </div>
        <div className="w-[150px] flex justify-center">
          <p className="text-sm text-white bg-indigo-500 rounded-md px-2 w-fit">
            {user.role}
          </p>
        </div>
        <div className="w-[120px] flex items-center justify-center text-sm">
          {format(new Date(user.createdAt), "MMM dd, yyyy")}
        </div>
        <div className="w-[120px] flex items-center justify-center text-sm">
          {user.lastLogin ? (
            format(new Date(user.lastLogin), "MMM dd, yyyy")
          ) : (
            <div className="h-[2px] w-[10px] bg-slate-400" />
          )}
        </div>
        <div className="w-[50px] h-full flex items-center justify-center">
          <ContextMenuWrapper alwaysVisible relative>
            <div className="bg-white rounded-sm shadow-md border flex flex-col gap-1 p-1">
              <div className="w-full p-2 flex items-center justify-between hover:bg-slate-50 px-2">
                Delete
                <FaUserTimes size={22} />
              </div>
              <div className="w-full p-2 flex items-center justify-between hover:bg-slate-50 px-2">
                Manage
                <FaUserCog size={22} />
              </div>
            </div>
          </ContextMenuWrapper>
        </div>
      </div>
    </StaggerContainer>
  );
}
