import TextField, { TextFieldProps } from "@mui/material/TextField";

export interface SimpleInputProps extends Omit<TextFieldProps, ""> {}

export default function SimpleInput({ variant = "filled", ...restProps }: SimpleInputProps) {
  return <TextField {...restProps} variant={variant} />;
}
