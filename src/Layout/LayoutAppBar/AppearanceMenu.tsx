import React from "react";
import { ListItemText, Divider, Menu, MenuItem, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LaptopIcon, LightModeIcon, MoonIcon, SignalBarIcon } from "@/components/icons";
import { MenuHeader } from "@/components/Menu";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface AppearanceMenuProps {
  anchorEl: null | HTMLElement;
  isVisible: boolean;
  onClose: () => void;
}

export default function AppearanceMenu({ anchorEl, isVisible, onClose }: AppearanceMenuProps) {
  const { t } = useTranslation();

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <MenuItem onClick={onClick} sx={menuItemStyle}>
      {icon}
      <ListItemText>{label}</ListItemText>
      <SignalBarIcon onClick={() => {}} />
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorEl} open={isVisible} onClose={onClose} onClick={onClose}>
      <MenuHeader>
        <ListItemText>{t("Layout.AppBar.AppearanceMenu.title")}</ListItemText>
      </MenuHeader>
      <Divider />
      {createMenuItem(<LaptopIcon isListIcon />, t("Layout.AppBar.AppearanceMenu.systemDefault"), () => {})}
      {createMenuItem(<MoonIcon isListIcon />, t("Layout.AppBar.AppearanceMenu.darkTheme"), () => {})}
      {createMenuItem(<LightModeIcon isListIcon />, t("Layout.AppBar.AppearanceMenu.lightTheme"), () => {})}
    </Menu>
  );
}
