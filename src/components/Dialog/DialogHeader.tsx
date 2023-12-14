import { DialogTitle, DialogTitleProps, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ClearIcon } from "../icons";
import { ReactNode } from "react";

export interface DialogHeaderProps extends Omit<DialogTitleProps, "sx"> {
  title?: string;
  isDragable?: boolean;
  onClose?: () => void;
  hideCrossButton?: boolean;
  sx?: SxProps;
  leftIcon?: ReactNode;
}

export default function DialogHeader({ title, onClose, sx, isDragable, leftIcon, hideCrossButton, ...restProps }: DialogHeaderProps) {
  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: isDragable ? "move" : "default",
    fontSize: theme.typography.h5,
    ...sx,
  }));

  return (
    <DialogTitle flexDirection={"row"} sx={containerStyle} {...restProps}>
      {leftIcon}
      {title}
      {!hideCrossButton ? <ClearIcon onClick={onClose} /> : null}
    </DialogTitle>
  );
}
