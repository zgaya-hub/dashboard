import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import SimpleTextInput, { SimpleTextInputProps } from "./SimpleTextInput";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchIcon } from "../icons";
import Tooltip from "../Tooltip";

interface SearchInputProps extends SimpleTextInputProps {
  searchType?: "enter" | "change";
  onSearch?: (text: string) => void;
  placeholder?: string;
  tooltip?: string;
}

export default function SearchInput({ searchType = "change", onSearch, placeholder, tooltip, ...restProps }: SearchInputProps) {
  const [searchText, setSearchText] = useState<string>("");

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setSearchText(newText);
    if (searchType === "change" && onSearch) {
      onSearch(newText);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchType === "enter" && onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <Tooltip title={tooltip || ""}>
      <SimpleTextInput
        {...restProps}
        placeholder={placeholder}
        value={searchText}
        onChange={handleOnChange}
        hiddenLabel
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
}
