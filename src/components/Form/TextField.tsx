import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { ErrorIcon } from "../icons";
import { Control, Controller, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

export interface TextFieldProps<T extends FieldValues> extends Omit<MuiTextFieldProps, "name"> {
  register?: UseFormRegister<T>;
  control?: Control<T>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  name: Path<T>;
}

export default function TextField<T extends FieldValues>({ register, name, startIcon, endIcon, control, ...restProps }: Readonly<TextFieldProps<T>>) {
  const inputProps = {
    endAdornment: restProps.error && (
      <InputAdornment position="end">
        <ErrorIcon color="error" />
      </InputAdornment>
    ),
    startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
  };

  if (register) {
    return <MuiTextField {...register(name!)} name={name} InputProps={inputProps} {...restProps} />;
  } else if (control) {
    return <Controller control={control} name={name} render={({ field, ...restFields }) => <MuiTextField {...restFields} {...field} value={field.value || ""} InputProps={inputProps} {...restProps} />} />;
  } else {
    return <MuiTextField name={name} InputProps={{ ...inputProps, readOnly: true }} {...restProps} />;
  }
}
