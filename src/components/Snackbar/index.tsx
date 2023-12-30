import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps, Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";

interface SnackbarProps extends Omit<MuiSnackbarProps, "onClose"> {
  AlertProps?: MuiAlertProps;
  message: string;
  title?: string;
  onClose?: () => void;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

export default function Snackbar({ autoHideDuration = 5000, onClose, vertical = "bottom", horizontal = "left", title, AlertProps, message, ...restProps }: SnackbarProps) {
  const defaultAlertProps: MuiAlertProps = {
    variant: "filled",
    severity: "error",
    onClose: onClose,
    ...AlertProps,
  };

  return (
    <MuiSnackbar anchorOrigin={{ vertical: vertical, horizontal }} autoHideDuration={autoHideDuration} onClose={onClose} {...restProps}>
      <MuiAlert title={title} onClose={onClose} {...defaultAlertProps}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
