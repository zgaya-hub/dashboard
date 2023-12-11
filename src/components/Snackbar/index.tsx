import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps, Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  fullWidth?: boolean;
  severity?: "error" | "info" | "success" | "warning";
  variant?: MuiAlertProps["variant"];
  horizontal?: "left" | "center" | "right";
}

interface SnackbarProps {
  muiProps?: {
    SnackbarProps?: MuiSnackbarProps;
    AlertProps?: MuiAlertProps;
  };
}

export default function Snackbar({ open, onClose, message, variant = "standard", severity = "error", muiProps, horizontal = "left" }: SnackbarProps) {
  const defaultSnackbarProps: MuiSnackbarProps = {
    autoHideDuration: 6000,
    onClose,
    ...muiProps?.SnackbarProps,
  };

  const defaultAlertProps: MuiAlertProps = {
    elevation: 6,
    variant: variant,
    severity: severity,
    ...muiProps?.AlertProps,
  };

  return (
    <MuiSnackbar anchorOrigin={{ horizontal, vertical: "bottom" }} {...defaultSnackbarProps} open={open}>
      <MuiAlert {...defaultAlertProps} sx={{maxWidth: 400}}>{message}</MuiAlert>
    </MuiSnackbar>
  );
}
