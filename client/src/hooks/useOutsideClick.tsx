import { type RefObject, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (e:MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("dragstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("dragstart", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
