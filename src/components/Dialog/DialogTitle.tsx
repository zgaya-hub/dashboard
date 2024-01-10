import { DialogTitle as MuiDialogTitle, DialogTitleProps as MuiDialogTitleProps, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

export interface DialogTitleProps extends Omit<MuiDialogTitleProps, "sx"> {
  sx?: SxProps;
}

export default function DialogTitle({ children, sx, ...restProps }: DialogTitleProps) {
  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    ...sx,
  }));

  return (
    <MuiDialogTitle sx={containerStyle} {...restProps}>
      {children}
    </MuiDialogTitle>
  );
}
