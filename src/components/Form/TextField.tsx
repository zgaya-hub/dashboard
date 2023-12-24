import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { ErrorIcon } from "../icons";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface TextFieldProps extends Omit<MuiTextFieldProps, ""> {
  register: UseFormRegister<FieldValues>;
}

export default function TextField({ register, name, ...restProps }: TextFieldProps) {
  return (
    <MuiTextField
      {...register(name!)}
      name={name}
      InputProps={{
        endAdornment: restProps.error ? (
          <InputAdornment position="end">
            <ErrorIcon color="error" />
          </InputAdornment>
        ) : null,
      }}
      {...restProps}
    />
  );
}
