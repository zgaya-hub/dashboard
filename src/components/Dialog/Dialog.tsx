import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Paper, PaperProps } from "@mui/material";
import DialogHeader, { DialogHeaderProps } from "./DialogHeader";
import Draggable from "react-draggable";

interface DialogProps extends MuiDialogProps {
  headerText?: string;
  headerHidden?: boolean;
  onClose?: () => void;
  outAreaClose?: boolean;
  isDraggable?: boolean;
  hideCrossButton?: boolean;
  dialogHeaderProps?: DialogHeaderProps;
}

function PaperComponent({ ...restProps }: PaperProps) {
  return (
    <Draggable handle="#isDraggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...restProps} />
    </Draggable>
  );
}

export default function Dialog({ onClose, headerHidden = false, headerText, outAreaClose = true, children, isDraggable = false, hideCrossButton, dialogHeaderProps, ...restProps }: DialogProps) {
  if (isDraggable) {
    return (
      <MuiDialog PaperComponent={(paperProps) => <PaperComponent {...paperProps} />} onClose={outAreaClose ? onClose : () => {}} {...restProps}>
        {!headerHidden ? <DialogHeader id="isDraggable-dialog-title" hideCrossButton={hideCrossButton} isDragable={isDraggable} title={headerText} onClose={onClose} {...dialogHeaderProps} /> : null}
        {children}
      </MuiDialog>
    );
  }

  return (
    <MuiDialog onClose={outAreaClose ? onClose : () => {}} {...restProps}>
      {!headerHidden ? <DialogHeader hideCrossButton={hideCrossButton} title={headerText} onClose={onClose} {...dialogHeaderProps} /> : null}
      {children}
    </MuiDialog>
  );
}
