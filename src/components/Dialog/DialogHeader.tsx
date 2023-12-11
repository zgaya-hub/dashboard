import { DialogTitle, DialogTitleProps, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ClearIcon } from "../icons";

interface DialogHeaderProps extends Omit<DialogTitleProps, "sx"> {
  title?: string;
  isDragable?: boolean;
  onClose?: () => void;
  sx?: SxProps;
}

export default function DialogHeader({ title, onClose, sx, isDragable, ...restProps }: DialogHeaderProps) {
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
      {title}
      <ClearIcon onClick={onClose} />
    </DialogTitle>
  );
}
