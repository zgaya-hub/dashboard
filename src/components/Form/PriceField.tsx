import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { DollarIcon, ErrorIcon } from "../icons";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

interface PriceFieldProps<T extends FieldValues> extends Omit<MuiTextFieldProps, "name"> {
  register: UseFormRegister<T>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  name: Path<T>;
}

export default function PriceField<T extends FieldValues>({ register, name, startIcon, endIcon, ...restProps }: PriceFieldProps<T>) {
  return (
    <MuiTextField
      {...register(name!)}
      name={name}
      InputProps={{
        endAdornment: restProps.error ? (
          <InputAdornment position="end">
            <ErrorIcon color="error" />
          </InputAdornment>
        ) : endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : null,
        startAdornment: <InputAdornment position="start">{startIcon ?? <DollarIcon fontSize="small" />}</InputAdornment>,
      }}
      inputProps={{ maxLength: 12 }}
      {...restProps}
    />
  );
}
