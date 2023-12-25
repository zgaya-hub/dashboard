import { DialogContent, Dialog as MuiDialog, DialogProps as MuiDialogProps, Paper, PaperProps, SxProps } from "@mui/material";
import DialogHeader, { DialogHeaderProps } from "./DialogHeader";
import Draggable from "react-draggable";
import DialogAction, { DialogActionProps } from "./DialogAction";
import { ReactNode } from "react";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface DialogProps extends Omit<MuiDialogProps, "sx"> {
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
  dividers?: boolean;
  sx?: SxProps;
}

function PaperComponent({ ...restProps }: PaperProps) {
  return (
    <Draggable handle="#isDraggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...restProps} />
    </Draggable>
  );
}

export default function Dialog({ dialogContentSx, onClose, sx, headerHidden = false, dividers = true, headerText, dialogActionProps, dialogAction, outAreaClose = true, children, isDraggable = false, hideCrossButton, dialogHeaderProps, ...restProps }: DialogProps) {
  const dialogContainerStyle = useThemeStyles<SxProps>((theme) => ({
    "& .MuiDialog-paperWidthXl": {
      background: theme.palette.background.default,
    },
    ...sx,
  }));

  if (isDraggable) {
    return (
      <MuiDialog sx={dialogContainerStyle} PaperComponent={(paperProps) => <PaperComponent {...paperProps} />} onClose={outAreaClose ? onClose : () => {}} {...restProps}>
        {!headerHidden ? <DialogHeader id="isDraggable-dialog-title" hideCrossButton={hideCrossButton} isDragable={isDraggable} title={headerText} onClose={onClose} {...dialogHeaderProps} /> : null}
        {dialogAction ? (
          <>
            <DialogContent dividers={dividers} sx={dialogContentSx}>
              {children}
            </DialogContent>{" "}
            <DialogAction children={dialogAction} {...dialogActionProps} />
          </>
        ) : (
          children
        )}
        {!dialogAction ? <DialogAction children={dialogAction} {...dialogActionProps} /> : null}
      </MuiDialog>
    );
  }

  return (
    <MuiDialog sx={dialogContainerStyle} onClose={outAreaClose ? onClose : () => {}} {...restProps}>
      {!headerHidden ? <DialogHeader hideCrossButton={hideCrossButton} title={headerText} onClose={onClose} {...dialogHeaderProps} /> : null}
      {dialogAction ? (
        <>
          <DialogContent dividers={dividers} sx={dialogContentSx}>
            {children}
          </DialogContent>{" "}
          <DialogAction children={dialogAction} {...dialogActionProps} />
        </>
      ) : (
        children
      )}
    </MuiDialog>
  );
}
