import React from "react";
import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps, Alert as MuiAlert, AlertProps as MuiAlertProps, Button as MuiButton } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  fullWidth?: boolean;
  severity: "error" | "info" | "success" | "warning";
  variant?: MuiAlertProps["variant"];
  horizontal?: "left" | "center" | "right";
  onButton?: boolean;
}

interface SnackbarProps {
  muiProps?: {
    SnackbarProps?: MuiSnackbarProps;
    AlertProps?: MuiAlertProps;
  };
}

export default function Snackbar({ open, onClose, message, variant = "standard", severity = "error", muiProps, horizontal = "left", onButton }: SnackbarProps) {
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
      <MuiAlert
        {...defaultAlertProps}
        action={
          <MuiButton
            size="small"
            onClick={() => {
              // Add your button click logic here
              console.log("Button clicked!");
            }}
          >
            Feedback
          </MuiButton>
        }
      >
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
