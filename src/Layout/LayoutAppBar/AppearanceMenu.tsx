import React from "react";
import { ListItemText, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LaptopIcon, LightModeIcon, MoonIcon } from "@/components/icons";
import { MenuItem, Menu, MenuHeader } from "@/components/Menu";

interface AppearanceMenuProps {
  anchorEl: null | HTMLElement;
  isVisible: boolean;
  onClose: () => void;
}

export default function AppearanceMenu({ anchorEl, isVisible, onClose }: AppearanceMenuProps) {
  const { t } = useTranslation();

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <MenuItem onClick={onClick}>
      {icon}
      <ListItemText>{label}</ListItemText>
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
