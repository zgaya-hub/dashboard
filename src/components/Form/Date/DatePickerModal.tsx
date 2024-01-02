import { EventIcon } from "@/components/icons";
import { InputAdornment } from "@mui/material";
import { MobileDatePicker, DatePickerProps } from "@mui/x-date-pickers-pro";

interface DatePickerModalProps extends DatePickerProps<Date> {
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
}

export default function DatePickerModal({ fullWidth, helperText, error, ...restProps }: DatePickerModalProps) {
  return (
    <MobileDatePicker
      slotProps={{
        textField: {
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
