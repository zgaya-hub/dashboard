import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps, SxProps } from "@mui/material";

export interface MenuItemProps extends Omit<MuiMenuItemProps, "sx"> {
  sx?: SxProps;
}

export default function MenuItem({ children, sx, ...restProps }: MenuItemProps) {
  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(40),
    background: theme.palette.background.default,
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.action.hover,
    },
    "&:active": {
      background: theme.palette.action.active,
    },
    padding: theme.spacing(2),
    ...sx,
  }));

  return (
    <MuiMenuItem {...restProps} sx={menuItemStyle}>
      {children}
    </MuiMenuItem>
  );
}
