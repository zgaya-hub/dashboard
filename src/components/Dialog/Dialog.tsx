import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Paper, PaperProps } from "@mui/material";
import DialogHeader from "./DialogHeader";
import Draggable from "react-draggable";

interface DialogProps extends MuiDialogProps {
  headerText?: string;
  headerHidden?: boolean;
  onClose?: () => void;
  outAreaClose?: boolean;
  isDraggable?: boolean;
}

function PaperComponent({ ...restProps }: PaperProps) {
  return (
    <Draggable handle="#isDraggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...restProps} />
    </Draggable>
  );
}

export default function Dialog({ onClose, headerHidden = false, headerText, outAreaClose = true, children, isDraggable = false, ...restProps }: DialogProps) {
  if (isDraggable) {
    return (
      <MuiDialog PaperComponent={(paperProps) => <PaperComponent {...paperProps} />} onClose={outAreaClose ? onClose : () => {}} {...restProps}>
        {!headerHidden ? <DialogHeader id="isDraggable-dialog-title" isDragable={isDraggable} title={headerText} onClose={onClose} /> : null}
        {children}
      </MuiDialog>
    );
  }

  return (
    <MuiDialog onClose={outAreaClose ? onClose : () => {}} {...restProps}>
      {!headerHidden ? <DialogHeader title={headerText} onClose={onClose} /> : null}
      {children}
    </MuiDialog>
  );
}
