import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce, delay } from "../../../lib/utilities";
import InputField from "../input-field";
import useOutsideClick from "../../../hooks/useOutsideClick";

// Generic type <T> allows you to pass any object shape
interface InputAutocompleteProps<T> {
  options: T[]; // The list of items to search through
  matchKey: keyof T; // The key in the object to use for matching (dynamic)
  outputPattern: Array<keyof T>;
  onChangeCallback: (val: string) => void; // Callback to handle input change
  placeholder: string;
  additionalClass?: string;
  defaultValue?: string;
}

export default function InputAutocomplete<T extends { [key: string]: any }>({
  options,
  matchKey,
  outputPattern,
  onChangeCallback,
  placeholder,
  additionalClass,
  defaultValue,
}: InputAutocompleteProps<T>) {
  const [input, setInput] = useState(defaultValue ?? "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  const hasSelectedValue = useRef<boolean>(false);
  useOutsideClick(contRef, () => {
    setSuggestions([]);
  });

  const fetchSuggestions = useCallback(
    debounce((query: string) => {
      if (!query || hasSelectedValue.current) {
        setSuggestions([]);
        return;
      }

      const filteredSuggestions = options
        .filter((option) =>
          option[matchKey]
            ?.toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .map((option) => outputPattern.map((key) => option[key]).join(", "));
      console.log({ filteredSuggestions });
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No results found"]
      );
      setLoading(false);
    }, 250),
    []
  );

  // Effect to handle input changes
  useEffect(() => {
    if (input?.length >= 3 && input !== defaultValue) {
      setLoading(true);
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // Handling input change
  const handleInputChange = (val: string) => {
    setInput(val);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "No results found") return;
    hasSelectedValue.current = true;
    setInput(suggestion);
    onChangeCallback(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    delay(500).then(() => {
      hasSelectedValue.current = false;
    });
  };

  return (
    <div ref={contRef} className="w-full relative z-20">
      <InputField
        additionalClass={additionalClass}
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
      />

      {suggestions.length > 0 && (
        <ul className="bg-white absolute top-[100%] w-full border-red h-fit max-h-[150px] overflow-y-auto p-1">
          {/* {loading && <div>Loading...</div>} */}
          {suggestions.map((suggestion, index) => (
            <li
              className="h-[40px] flex items-center cursor-pointer transition-all duration-200 ease-out hover:bg-gray-100 p-2"
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion} {/* Display the dynamic key value */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
