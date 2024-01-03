import { DialogActions as MuiDialogActions, DialogActionsProps, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

export interface DialogActionProps extends Omit<DialogActionsProps, "sx"> {
  sx?: SxProps;
}

export default function DialogAction({ sx, ...restProps }: DialogActionProps) {
  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    ...sx,
  }));

  return <MuiDialogActions sx={containerStyle} {...restProps} />;
}
