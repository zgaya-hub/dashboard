import { Dialog, DialogActions, DialogTitle } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { DialogContent, DialogContentText, Divider, Stack, SxProps } from "@mui/material";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
  footerText?: string;
  title?: string;
  cancelButtonText?: string;
  disabledConfirmButton?: boolean;
  disabledCancelButton?: boolean;
  confirmButtonText?: string;
  variant?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, cancelButtonText, footerText, confirmButtonText, children, title, disabledCancelButton, disabledConfirmButton, variant = "primary" }: ConfirmationModalProps) {
  const { t } = useTranslation();

  const handleOnConfirm = () => {
    onConfirm();
    onClose();
  };

  const dialogContentStyle: SxProps = {
    pb: 0,
  };

  return (
    <Dialog isDraggable open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle variant="h5">{title ?? t("Components.Modals.ConfirmationModal.title")}</DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        {children}

        <Divider />
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <DialogContentText variant="caption">{footerText}</DialogContentText>
        </Stack>
        <Divider />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="text" color={variant} disabled={disabledCancelButton} size="small">
          {cancelButtonText ?? t("Components.Modals.ConfirmationModal.cancel")}
        </Button>
        <Button onClick={handleOnConfirm} variant="contained" color={variant} disabled={disabledConfirmButton} size="small">
          {confirmButtonText ?? t("Components.Modals.ConfirmationModal.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
