import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

interface DatePickerModalProps extends DatePickerProps<number> {
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
}

export default function DatePickerModal({ fullWidth, helperText, error, ...restProps }: DatePickerModalProps) {
  return <DatePicker slotProps={{ textField: { fullWidth, helperText, error } }} {...restProps} />;
}
