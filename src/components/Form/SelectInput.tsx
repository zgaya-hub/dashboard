import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { FormControlProps } from "@mui/material/FormControl";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface SelectInputProps<T extends FieldValues> extends Omit<FormControlProps, "name"> {
  register: UseFormRegister<T>;
  name: Path<T>;
  helperText?: string;
  label?: string;
}

export default function SelectInput<T extends FieldValues>({ helperText, label, name, children, register, ...restProps }: SelectInputProps<T>) {
  return (
    <FormControl {...restProps}>
      <InputLabel>{label}</InputLabel>
      <Select {...register(name!)} name={name} label={label}>
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
