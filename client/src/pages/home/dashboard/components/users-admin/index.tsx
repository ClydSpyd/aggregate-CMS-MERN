import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import AppLoader from "../../../../../components/app-loader";
import API from "../../../../../api";
import { cn, debounce, delay } from "../../../../../lib/utilities";
import { FaUserPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const debounceInput = debounce(
    (
      input: string,
      setFilteredUsers: Dispatch<SetStateAction<AdminUser[] | null>>,
      users: AdminUser[],
    ) => {
      console.log("debouncing");
      console.log({ input, users });
      setFilteredUsers(
        !input
          ? users
          : users.filter((user: AdminUser) => {
              return (
                user.username.toLowerCase().includes(input.toLowerCase()) ||
                user.email.toLowerCase().includes(input.toLowerCase())
              );
            })
      );
    },
    300
  );

export default function UsersAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[] | null>(null);
  const [searchInupt, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await API.user.getAllAdminUsers();
      if (data) {
        delay(500).then(() => {
            setUsers(data);
            setFilteredUsers(data);
        });
      } else if (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="relative h-[50px] w-[350px] flex gap-2 items-center justify-between border rounded-md p-2">
          <IoSearch size={28} className="text-slate-400" />
          <input
            value={searchInupt}
            onChange={(e) => {
              setSearchInput(e.target.value);
              debounceInput(e.target.value, setFilteredUsers, users);
            }}
            type="text"
            autoFocus
            placeholder="Search Users"
            className="w-full h-full text-lg placeholder:text-lg"
          />
          <TiDelete
            onClick={() => {
              setSearchInput("");
              setFilteredUsers(users);
            }}
            size={22}
            className={cn(
              "cursor-pointer absolute-vert right-1 text-slate-400 hover:text-slate-600 duration-300 ease-out",
              searchInupt.length > 0
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          />
        </div>
        <div className="flex gap-2 items-center h-[40px] cursor-pointer px-4 rounded-md bg-indigo-500 text-white duration-300 ease-out hover:bg-indigo-600">
          <p>Create User</p>
          <FaUserPlus size={20} />
        </div>
      </div>
      <div className="border rounded-lg flex flex-col justify-start grow overflow-x-auto">
        <TableHeader />
        <section className="p-1 rounded-md grow flex flex-col justify-start gap-1">
          {!filteredUsers ? (
            <AppLoader asChild spinnerOnly />
          ) : filteredUsers.length === 0 ? (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-base text-slate-400">
                No users {users.length > 0 ? "matching search" : "found"}
              </p>
            </div>
          ) : (
            filteredUsers.map((user, idx) => (
              <TableRow user={user} zIndex={filteredUsers.length - idx} />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
