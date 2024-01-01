import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { CaretDownIcon } from "../icons";

interface ModalSelectInputProps extends Omit<TextFieldProps, ""> {
  isModalVisible?: boolean;
}

export default function ModalSelectInput({ value, isModalVisible, ...restProps }: ModalSelectInputProps) {
  return (
    <TextField
      value={value}
      InputLabelProps={{
        shrink: !!value || isModalVisible,
      }}
      InputProps={{
        readOnly: true,
        endAdornment: <InputAdornment position="end">{<CaretDownIcon />}</InputAdornment>,
      }}
      {...restProps}
    />
  );
}
