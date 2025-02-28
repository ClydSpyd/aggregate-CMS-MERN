import {  useEffect, useState } from "react";
import API from "../../api";
import SelectorWrapper from "./selector-wrapper";

interface BrowseFiltersProps {
  onChange: (val: string) => void;
  selected: string | null;
}

export default function AuthorSelector({ onChange, selected }: BrowseFiltersProps) {
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
    <SelectorWrapper<AdminUser>
      withAllAuthors
      options={authors}
      displayValue="username"
      selected={selected}
      onChange={(val: string) => onChange(val)}
      dropdownClass="border h-[50px]"
    />
  );
}
