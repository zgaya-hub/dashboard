import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Paper, PaperProps } from "@mui/material";
import Draggable from "react-draggable";

interface DialogProps extends MuiDialogProps {
  isDraggable?: boolean;
}

function PaperComponent({ ...restProps }: PaperProps) {
  return (
    <Draggable handle="#isDraggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...restProps} />
    </Draggable>
  );
}

export default function Dialog({ children, isDraggable = false, ...restProps }: DialogProps) {
  if (isDraggable) {
    return (
      <MuiDialog PaperComponent={(paperProps) => <PaperComponent {...paperProps} />} {...restProps}>
        {children}
      </MuiDialog>
    );
  }

  return <MuiDialog {...restProps}>{children}</MuiDialog>;
}
