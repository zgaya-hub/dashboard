import { SxProps } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface AppBarProps extends Omit<MuiAppBarProps, "sx"> {
  sx?: SxProps;
}

export default function AppBar({ children, sx, ...restProps }: AppBarProps) {
  const appBarStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    ...sx,
  }));

  return (
    <MuiAppBar sx={appBarStyle} {...restProps}>
      {children}
    </MuiAppBar>
  );
}
