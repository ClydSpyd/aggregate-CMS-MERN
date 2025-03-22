import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppLoader from "../../../../../components/app-loader";
import { cn, debounce } from "../../../../../lib/utilities";
import { IoSearch } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import AuthorModal from "./author-modal";
import { FaUserPlus } from "react-icons/fa";
import { useAuthorUsers } from "../../../../../queries/user-data";

const debounceInput = debounce(
    (
      input: string,
      setFilteredUsers: Dispatch<SetStateAction<AuthorData[] | null>>,
      users: AuthorData[],
    ) => {
      console.log("debouncing");
      console.log({ input, users });
      setFilteredUsers(
        !input
          ? users
          : users.filter((user: AuthorData) => {
              return (
                user.name.toLowerCase().includes(input.toLowerCase()) ||
                user.location.toLowerCase().includes(input.toLowerCase())
              );
            })
      );
    },
    300
  );

export default function UsersAuthors() {
  const [users, setUsers] = useState<AuthorData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AuthorData[] | null>(null);
  const [searchInupt, setSearchInput] = useState<string>("");

  const { data: authors, isLoading, refetch } = useAuthorUsers();
  
  useEffect(() => {
    if (!isLoading && authors) {
      setUsers(authors);
      setFilteredUsers(authors);
    }
  }
  , [authors, isLoading]);

  const handleAuthor = (user: AuthorData, action:"create"|"update"|"delete") => {
    // refetch();
    let payload = [...users];
    switch (action) {
      case "create":
        payload = [...users, user];
        break;
      case "update":
        payload = users.map((u) => (u._id === user._id ? user : u));
        break;
      case "delete":
        payload = users.filter((u) => u._id !== user._id);
        break;
    }
    setUsers(payload);
    setFilteredUsers(payload);
  }

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
        <AuthorModal
          submitCallback={(authorData: AuthorData) =>
            handleAuthor(authorData, "create")
          }
        >
          <div
            className="flex gap-2 items-center h-[40px] cursor-pointer px-4 rounded-md bg-indigo-500 text-white duration-300 ease-out hover:bg-indigo-600"
          >
            <p>Create Author</p>
            <FaUserPlus size={20} />
          </div>
        </AuthorModal>
      </div>
      <div className="border rounded-lg flex flex-col justify-start grow overflow-x-auto">
        <TableHeader />
        <section className="p-1 rounded-md grow flex flex-col justify-start gap-1">
          {isLoading ? (
            <AppLoader asChild spinnerOnly />
          ) : filteredUsers?.length === 0 ? (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-base text-slate-400">
                No users {users.length > 0 ? "matching search" : "found"}
              </p>
            </div>
          ) : (
            filteredUsers?.map((user, idx) => (
              <TableRow
                key={user._id}
                user={user}
                zIndex={filteredUsers.length - idx}
                userCallback={handleAuthor}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
