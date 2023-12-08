import React from "react";
import { SxProps, ListItemIcon } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { LaptopIcon, LightModeIcon, MoonIcon } from "@/components/icons";
import Typography from "@/components/Typography";
import { MenuItem, Menu } from "@/components/Menu";

interface AppearanceMenuProps {
  anchorEl: null | HTMLElement;
  isVisible: boolean;
  onClose: () => void;
}

export default function AppearanceMenu({ anchorEl, isVisible, onClose }: AppearanceMenuProps) {
  const { t } = useTranslation();

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.sizing.menuWidth(theme),
  }));

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <MenuItem sx={menuItemStyle} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant="h6" color="primary">
        {label}
      </Typography>
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorEl} open={isVisible} onClose={onClose} onClick={onClose} headerText={t("Layout.AppBar.AppearanceMenu.title")} onBack={onClose}>
      {createMenuItem(<LaptopIcon />, t("Layout.AppBar.AppearanceMenu.systemDefault"), () => {})}
      {createMenuItem(<MoonIcon />, t("Layout.AppBar.AppearanceMenu.darkTheme"), () => {})}
      {createMenuItem(<LightModeIcon />, t("Layout.AppBar.AppearanceMenu.lightTheme"), () => {})}
    </Menu>
  );
}
