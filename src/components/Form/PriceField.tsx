import { InputAdornment, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { DollarIcon, ErrorIcon } from "../icons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ReactNode, forwardRef } from "react";
import { NumericFormat as ReactNumericFormat, NumericFormatProps as ReactNumericFormatProps } from "react-number-format";

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
      render={({ field: { onChange, name, value } }) => {
        value = !value || value === 0 ? 0 : value
        return <MuiTextField
          name={name}
          value={value}
          onChange={onChange}
          autoFocus
          InputProps={{
            endAdornment: restProps.error ? (
              <InputAdornment position="end">
                <ErrorIcon color="error" />
              </InputAdornment>
            ) : endIcon ? (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ) : null,
            inputComponent: NumericFormat as any,
          }}
          inputProps={{ maxLength: 12 }}
          {...restProps}
        />
      }
      }
    />
  );
}

interface NumericFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormat = forwardRef<ReactNumericFormatProps, NumericFormatProps>(function NumericFormat(props, ref) {
  const { onChange, ...other } = props;

  return (
    <ReactNumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      prefix="$"
      thousandSeparator
      valueIsNumericString
    />
  );
});
