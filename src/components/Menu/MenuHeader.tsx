import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListItemIcon, MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps, SxProps } from "@mui/material";
import Typography from "../Typography";
import { ChevronLeftIcon } from "../icons";

interface MenuHeaderProps extends Omit<MuiMenuItemProps, "sx"> {
  sx?: SxProps;
  onBack?: () => void;
}

export default function MenuHeader({ children, onBack, sx, ...restProps }: MenuHeaderProps) {
  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.sizing.menuWidth(theme),
    padding: theme.spacing(0.5),
    background: theme.palette.background.default,
    fontSize: theme.typography.subtitle1,
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.background.default,
    },
    ...sx,
  }));

  return (
    <MuiMenuItem disableRipple onClick={onBack} {...restProps} sx={menuItemStyle}>
      <ListItemIcon>
        <ChevronLeftIcon />
      </ListItemIcon>
      <Typography color="secondary" variant="subtitle1">
        {children}
      </Typography>
    </MuiMenuItem>
  );
}
