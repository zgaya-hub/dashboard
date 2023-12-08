import { TextField, TextFieldProps } from "@mui/material";

export interface SimpleTextInputProps extends Omit<TextFieldProps, "variant"> {}

export default function SimpleTextInput({ ...restProps }: SimpleTextInputProps) {
  return <TextField {...restProps} variant="filled" />;
}
