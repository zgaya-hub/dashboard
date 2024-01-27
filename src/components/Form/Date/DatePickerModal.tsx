import { EventIcon } from "@/components/icons";
import { InputAdornment } from "@mui/material";
import { MobileDatePicker, DatePickerProps } from "@mui/x-date-pickers-pro";
import { Control, Controller, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface DatePickerModalProps<T extends FieldValues> extends DatePickerProps<Date> {
  control?: Control<T>;
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
  name: Path<T>;
}

export default function DatePickerModal<T extends FieldValues>({ name, control, fullWidth, helperText, error, ...restProps }: DatePickerModalProps<T>) {
  const textFieldProps = {
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
  };

  if (control) {
    return <Controller control={control} name={name} render={({ field, ...restFields }) => <MobileDatePicker {...restFields} {...field} value={field.value || new Date()} slotProps={{ textField: textFieldProps }} {...restProps} />} />;
  } else {
    return <MobileDatePicker readOnly slotProps={{ textField: { ...textFieldProps } }} {...restProps} />;
  }
}
