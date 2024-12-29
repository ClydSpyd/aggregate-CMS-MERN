import { useEffect, useState } from "react";
import Dropdown from "../utility-comps/dropdown";
import API from "../../api";
import { FaUsers } from "react-icons/fa6";

export default function AuthorSelector({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (val: string | null) => void;
}) {
  const [authors, setAuthors] = useState<AdminUser[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await API.user.getAllAdminUsers();
      if (data) {
        setAuthors(data);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <div className="bg-white shadow-sm">
      <div className="border p-2 flex flex-col gap-2 pb-4">
        <p className="text-xs text-[#a0a0a0]">Author:</p>
        <Dropdown
          options={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <div className="h-[35px] w-[35px] flex items-center justify-center rounded-full overflow-hidden bg-indigo-500">
                    <FaUsers size={20} fill="white" />
                  </div>
                  <p className="text-md">All authors</p>
                </div>
              ),
              value: null,
            },
            ...authors.map((author: AdminUser) => ({
              label: (
                <div className="flex items-center gap-2">
                  <img
                    src={author.avatarUrl}
                    alt="avatar"
                    className="h-[35px] w-[35px] rouneded-full overflow-hidden"
                  />
                  <p className="text-md">{author.username}</p>
                </div>
              ),
              value: author._id,
            })),
          ]}
          selected={selected}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
