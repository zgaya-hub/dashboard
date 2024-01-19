import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { DollarIcon, ErrorIcon } from "../icons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";
import { handleOnFormatPrice, handleOnParsePrice } from "@/utils";

interface PriceFieldProps<T extends FieldValues> extends Omit<MuiTextFieldProps, "name"> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  name: Path<T>;
  control: Control<T>;
}

export default function PriceField<T extends FieldValues>({ name, startIcon, endIcon, control, ...restProps }: Readonly<PriceFieldProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, name, value } }) => (
        <MuiTextField
          {...restProps}
          name={name}
          value={handleOnFormatPrice(value)}
          onChange={(e) => {
            const inputValue = e.target.value;
            onChange(handleOnParsePrice(inputValue));
          }}
          autoFocus
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DollarIcon fontSize="small" solid />
              </InputAdornment>
            ),

            endAdornment: restProps.error ? (
              <InputAdornment position="end">
                <ErrorIcon color="error" />
              </InputAdornment>
            ) : null,
          }}
          inputProps={{ maxLength: 15, pattern: "[0-9.]*" }}
        />
      )}
    />
  );
}
