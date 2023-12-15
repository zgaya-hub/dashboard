import { DialogContent, Divider, Dialog as MuiDialog, DialogProps as MuiDialogProps, Paper, PaperProps, SxProps } from "@mui/material";
import DialogHeader, { DialogHeaderProps } from "./DialogHeader";
import Draggable from "react-draggable";
import DialogAction, { DialogActionProps } from "./DialogAction";
import { ReactNode } from "react";

interface DialogProps extends MuiDialogProps {
  headerText?: string;
  headerHidden?: boolean;
  onClose?: () => void;
  outAreaClose?: boolean;
  isDraggable?: boolean;
  hideCrossButton?: boolean;
  dialogHeaderProps?: DialogHeaderProps;
  dialogActionProps?: DialogActionProps;
  dialogAction?: ReactNode;
  dialogContentSx?: SxProps;
}

function PaperComponent({ ...restProps }: PaperProps) {
  return (
    <Draggable handle="#isDraggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...restProps} />
    </Draggable>
  );
}

export default function Dialog({ dialogContentSx, onClose, headerHidden = false, headerText, dialogActionProps, dialogAction, outAreaClose = true, children, isDraggable = false, hideCrossButton, dialogHeaderProps, ...restProps }: DialogProps) {
  if (isDraggable) {
    return (
      <MuiDialog PaperComponent={(paperProps) => <PaperComponent {...paperProps} />} onClose={outAreaClose ? onClose : () => {}} {...restProps}>
        {!headerHidden ? <DialogHeader id="isDraggable-dialog-title" hideCrossButton={hideCrossButton} isDragable={isDraggable} title={headerText} onClose={onClose} {...dialogHeaderProps} /> : null}
        <DialogContent dividers sx={dialogContentSx}>{children}</DialogContent>
        {!dialogAction ? <DialogAction children={dialogAction} {...dialogActionProps} /> : null}
      </MuiDialog>
    );
  }

  return (
    <MuiDialog onClose={outAreaClose ? onClose : () => {}} {...restProps}>
      {!headerHidden ? <DialogHeader hideCrossButton={hideCrossButton} title={headerText} onClose={onClose} {...dialogHeaderProps} /> : null}
      <DialogContent dividers sx={dialogContentSx}>{children}</DialogContent>
      {dialogAction ? <DialogAction children={dialogAction} {...dialogActionProps} /> : null}
    </MuiDialog>
  );
}
