import { MobileDatePicker, MobileDatePickerProps } from "@mui/x-date-pickers";

interface DatePickerModalProps extends MobileDatePickerProps<number> {
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
}

export default function DatePickerModal({ fullWidth, helperText, error, ...restProps }: DatePickerModalProps) {
  return <MobileDatePicker slotProps={{ textField: { fullWidth, helperText, error } }} {...restProps} />;
}
