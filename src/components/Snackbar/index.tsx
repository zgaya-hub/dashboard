import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps, Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";

interface SnackbarProps extends MuiSnackbarProps {
  AlertProps?: MuiAlertProps;
  message: string;
  title?: string;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

export default function Snackbar({ autoHideDuration = 5000, vertical = "bottom", horizontal = "left", title, AlertProps, message, ...restProps }: SnackbarProps) {
  const defaultAlertProps: MuiAlertProps = {
    variant: "filled",
    severity: "error",
    ...AlertProps,
  };

  return (
    <MuiSnackbar anchorOrigin={{ vertical: vertical, horizontal }} autoHideDuration={autoHideDuration} {...restProps}>
      <MuiAlert title={title} {...defaultAlertProps}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
