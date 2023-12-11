import React from "react";
import { ListItemText, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, FeedbackIcon, LogoutIcon, MoonIcon, SettingIcon, SwitchAccountIcon, TranslateIcon } from "@/components/icons";
import UserCardForMenu from "./UserCardForMenu";
import { Menu, MenuItem } from "@/components/Menu";

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  isVisible: boolean;
  onClose: () => void;
  onSwitchAccount: () => void;
  onSetting: () => void;
  onLogout: () => void;
  onClickProfile: () => void;
  onAppearance: () => void;
  onTranslation: () => void;
  onShareFeedback: () => void;
}

export default function UserMenu({ anchorEl, isVisible, onClose, onSwitchAccount, onSetting, onClickProfile, onLogout, onAppearance, onTranslation, onShareFeedback }: UserMenuProps) {
  const { t } = useTranslation();

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void, hasChevron: boolean = false) => (
    <MenuItem onClick={onClick}>
      {icon}
      <ListItemText>{label}</ListItemText>
      {hasChevron && <ChevronRightIcon isListIcon />}
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorEl} open={isVisible} onClose={onClose} onClick={onClose}>
      <UserCardForMenu onClick={onClickProfile} onLogout={onLogout} />
      <Divider />
      {createMenuItem(<SwitchAccountIcon isListIcon />, t("Layout.AppBar.UserMenu.switchAccount"), onSwitchAccount)}
      {createMenuItem(<SettingIcon isListIcon />, t("Layout.AppBar.UserMenu.settings"), onSetting)}
      {createMenuItem(<LogoutIcon isListIcon />, t("Layout.AppBar.UserMenu.logout"), onLogout)}
      <Divider />
      {createMenuItem(<MoonIcon isListIcon />, t("Layout.AppBar.UserMenu.appearance"), onAppearance, true)}
      {createMenuItem(<TranslateIcon isListIcon />, t("Layout.AppBar.UserMenu.translation"), onTranslation, true)}
      {createMenuItem(<FeedbackIcon isListIcon />, t("Layout.AppBar.UserMenu.shareFeedback"), onShareFeedback)}
    </Menu>
  );
}
