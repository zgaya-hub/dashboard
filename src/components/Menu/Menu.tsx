import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Menu as MuiMenu, MenuProps as MuiMenuProps, SxProps } from "@mui/material";

interface MenuProps extends Omit<MuiMenuProps, "sx"> {
  sx?: SxProps;
}

export default function Menu({ sx, children, ...restProps }: MenuProps) {
  const menuContainerStyle = useThemeStyles<SxProps>((theme) => ({
    "& .MuiMenu-list": {
      background: theme.palette.background.default,
    },
    ...sx,
  }));

  return (
    <MuiMenu
     sx={menuContainerStyle} {...restProps}>
      {children}
    </MuiMenu>
  );
}
