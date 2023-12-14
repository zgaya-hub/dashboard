import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps, Alert as MuiAlert, AlertProps as MuiAlertProps, AlertTitle } from "@mui/material";

interface SnackbarProps extends MuiSnackbarProps {
  AlertProps?: MuiAlertProps;
  message: string; // Add a message prop
  title?: string; // Add a message prop
}

export default function Snackbar({ autoHideDuration = 5000, title, AlertProps, message, ...restProps }: SnackbarProps) {
  const defaultAlertProps: MuiAlertProps = {
    variant: "filled",
    severity: "error",
    ...AlertProps,
  };

  return (
    <MuiSnackbar autoHideDuration={autoHideDuration} {...restProps}>
      <MuiAlert {...defaultAlertProps}>
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
