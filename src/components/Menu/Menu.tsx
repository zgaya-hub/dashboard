import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Menu as MuiMenu, MenuProps as MuiMenuProps, SxProps } from "@mui/material";
import { MenuHeader } from ".";
import Divider from "../Divider";

interface MenuProps extends Omit<MuiMenuProps, "sx"> {
  sx?: SxProps;
  headerText?: string;
  onBack?: () => void;
}

export default function Menu({ sx, children, onBack, headerText, ...restProps }: MenuProps) {
  const menuContainerStyle = useThemeStyles<SxProps>((theme) => ({
    "& .MuiMenu-list": {
      background: theme.palette.background.default,
    },
    ...sx,
  }));

  return (
    <MuiMenu sx={menuContainerStyle} {...restProps}>
      {onBack || headerText ? <MenuHeader onBack={onBack} children={headerText} /> : null}
      {onBack || headerText ?  <Divider /> : null}
     
      {children}
    </MuiMenu>
  );
}
