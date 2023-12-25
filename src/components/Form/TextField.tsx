import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { ErrorIcon } from "../icons";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> extends Omit<MuiTextFieldProps, "name"> {
  register: UseFormRegister<T>;
  name: Path<T>
}

export default function TextField<T extends FieldValues>({ register, name, ...restProps }: TextFieldProps<T>) {
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
