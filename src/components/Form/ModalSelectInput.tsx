import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { SearchIcon } from "../icons";

interface ModalSelectInputProps extends Omit<TextFieldProps, ""> {}

export default function ModalSelectInput({ ...restProps }: ModalSelectInputProps) {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
}
