import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Paper, PaperProps } from "@mui/material";
import { ClearIcon } from "../icons";
import DialogHeader from "./DialogHeader";
import Draggable from "react-draggable";

interface DialogProps extends MuiDialogProps {
  headerText?: string;
  headerHidden?: boolean;
  onClose?: () => void;
  outareaClose?: boolean;
  isDraggable?: boolean;
}

function PaperComponent({ ...restProps }: PaperProps) {
  return (
    <Draggable handle="#isDraggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...restProps} />
    </Draggable>
  );
}

export default function Dialog({ onClose, headerHidden = false, headerText, outareaClose = true, children, isDraggable = true, ...restProps }: DialogProps) {
  if (isDraggable) {
    return (
      <MuiDialog PaperComponent={(paperProps) => <PaperComponent {...paperProps} />} onClose={outareaClose ? onClose : () => {}} {...restProps}>
        {!headerHidden ? <DialogHeader id="isDraggable-dialog-title" isDragable={isDraggable} title={headerText} rightIcons={[<ClearIcon onClick={onClose} />]} /> : null}
        {children}
      </MuiDialog>
    );
  }

  return (
    <MuiDialog onClose={outareaClose ? onClose : () => {}} {...restProps}>
      {!headerHidden ? <DialogHeader title={headerText} rightIcons={[<ClearIcon onClick={onClose} />]} /> : null}
      {children}
    </MuiDialog>
  );
}
