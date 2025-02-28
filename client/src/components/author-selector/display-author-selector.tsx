import {  useEffect, useState } from "react";
import API from "../../api";
import SelectorWrapper from "./selector-wrapper";

interface BrowseFiltersProps {
  onChange: (val: string) => void;
  defaultSelected: string | null;
}

export default function DisplayAuthorSelector({ onChange, defaultSelected }: BrowseFiltersProps) {
  const [authors, setAuthors] = useState<AuthorData[]>([]);
  const [selected, setSelected] = useState<string | null>(defaultSelected);

  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await API.user.getAllAuthors();
      if (data) {
        setAuthors(data);
      }
    };
    fetchAuthors();
  }, []);

  const handleChange = (val: string) => {
    setSelected(val);
    onChange(val);
  }

  return (
    <SelectorWrapper<AuthorData>
      options={authors}
      displayValue="name"
      selected={selected}
      onChange={handleChange}
    />
  );
}
