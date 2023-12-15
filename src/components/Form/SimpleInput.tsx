import TextField, { TextFieldProps } from "@mui/material/TextField";

export interface SimpleInputProps extends Omit<TextFieldProps, ""> {}

export default function SimpleInput({ variant = "outlined", ...restProps }: SimpleInputProps) {
  return <TextField {...restProps} variant={variant} />;
}
