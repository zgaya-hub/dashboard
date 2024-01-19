import { EventIcon } from "@/components/icons";
import { InputAdornment } from "@mui/material";
import { MobileDatePicker, DatePickerProps } from "@mui/x-date-pickers-pro";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface DatePickerModalProps<T extends FieldValues> extends DatePickerProps<Date> {
  register: UseFormRegister<T>;
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
  name: Path<T>;
}

export default function DatePickerModal<T extends FieldValues>({ name, fullWidth, register, helperText, error, ...restProps }: DatePickerModalProps<T>) {
  return (
    <MobileDatePicker
      slotProps={{
        textField: {
          ...register(name),
          fullWidth,
          helperText,
          error,
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <EventIcon iconButton />
              </InputAdornment>
            ),
          },
        },
      }}
      {...restProps}
    />
  );
}
