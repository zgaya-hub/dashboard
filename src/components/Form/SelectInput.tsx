import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TextField } from ".";
import { TextFieldProps } from "./TextField";

interface SelectInputProps<T extends FieldValues> extends Omit<TextFieldProps<T>, "name"> {
  register: UseFormRegister<T>;
  name: Path<T>;
  helperText?: string;
  label?: string;
}

export default function SelectInput<T extends FieldValues>({ name, children, register, ...restProps }: SelectInputProps<T>) {
  return (
    <TextField register={register} name={name} {...restProps} select>
      {children}
    </TextField>
  );
}
