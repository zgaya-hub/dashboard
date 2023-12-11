import { ChangeEvent } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchIcon } from "../icons";
import Tooltip from "../Tooltip";
import { OutlinedInput, OutlinedInputProps, SxProps } from "@mui/material";

interface SearchInputProps extends Omit<OutlinedInputProps, "sx" | "onChange"> {
  onChange?: (text: string) => void;
  tooltip?: string;
  sx?: SxProps;
}

export default function SearchInput({ onChange, sx, tooltip, ...restProps }: SearchInputProps) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    if (onChange) {
      onChange(newText);
    }
  };

  const inputStyle: SxProps = {
    "& .MuiTextField-root": {
      border: "none",
      outline: 0,
    },
    ...sx,
  };

  return (
    <Tooltip title={tooltip || ""}>
      <OutlinedInput
        {...restProps}
        sx={inputStyle}
        onChange={handleOnChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Tooltip>
  );
}
