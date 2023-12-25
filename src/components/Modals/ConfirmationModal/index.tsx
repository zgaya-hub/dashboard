import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { Stack } from "@mui/material";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
  title?: string;
  cancelButtonText?: string;
  disabledConfirmButton?: boolean;
  disabledCancelButton?: boolean;
  confirmButtonText?: string;
  variant?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, cancelButtonText, confirmButtonText, children, title, disabledCancelButton, disabledConfirmButton, variant = "primary" }: ConfirmationModalProps) {
  const { t } = useTranslation();

  const handleOnConfirm = () => {
    onConfirm();
    onClose();
  };

  const dialogActions = (
    <>
      <Button onClick={onClose} variant="text" color={variant} disabled={disabledCancelButton} size="small">
        {cancelButtonText ?? t("Component.Modals.ConfirmationModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" color={variant} disabled={disabledConfirmButton} size="small">
        {confirmButtonText ?? t("Component.Modals.ConfirmationModal.confirm")}
      </Button>
    </>
  );

  return (
    <Dialog isDraggable dividers={false} open={isOpen} onClose={onClose} headerText={title ?? t("Component.Modals.ConfirmationModal.title")} hideCrossButton dialogAction={dialogActions}>
      {children ?? t("Component.Modals.ConfirmationModal.question")}
    </Dialog>
  );
}
