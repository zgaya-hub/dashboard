import { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TextField, TextFieldProps } from ".";

interface SelectInputProps<T extends FieldValues> extends Omit<TextFieldProps<T>, "name"> {
  control?: Control<T>;
  register?: UseFormRegister<T>;
  name: Path<T>;
  helperText?: string;
  label?: string;
}

export default function SelectInput<T extends FieldValues>({ children, ...restProps }: SelectInputProps<T>) {
  return (
    <TextField {...restProps} select>
      {children}
    </TextField>
  );
}
