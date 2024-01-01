import React, { useCallback, useMemo, useState } from "react";
import { Divider, ListItemText, Menu, MenuItem, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SearchIcon, SignalBarIcon, TranslateIcon } from "@/components/icons";
import { MenuHeader } from "@/components/Menu";
import { SearchInput } from "@/components/Form";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface TranslationMenuProps {
  anchorEl: null | HTMLElement;
  isVisible: boolean;
  onClose: () => void;
}

interface Language {
  code: string;
  languageName: string;
  countryName: string;
  flag: string;
}

const supportedLanguages: Language[] = [
  { code: "en", languageName: "English", countryName: "America", flag: "🇺🇸" },
  { code: "ar", languageName: "Arabic", countryName: "Palestine", flag: "🇵🇸" },
  { code: "hi", languageName: "Hindi", countryName: "India", flag: "🇮🇳" },
  { code: "ur", languageName: "Urdu", countryName: "Pakistan", flag: "🇵🇰" },
];

const TranslationMenu: React.FC<TranslationMenuProps> = ({ anchorEl, isVisible, onClose }) => {
  const { t, i18n } = useTranslation();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredLanguages = useMemo(() => {
    return supportedLanguages.filter((language) => language.languageName.toLowerCase().includes(searchText.toLowerCase()) || language.countryName.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText]);

  const handleOnSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleOnToggleSearchInput = () => {
    setIsSearchInputVisible(!isSearchInputVisible);
    setSearchText("");
  };

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  const renderHeader = (
    <MenuHeader secondaryAction={<SearchIcon onClick={handleOnToggleSearchInput} />}>
      <ListItemText>{t("Layout.AppBar.TranslationMenu.title")}</ListItemText>
    </MenuHeader>
  );

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <MenuItem onClick={onClick} sx={menuItemStyle}>
      {icon}
      <ListItemText>{label}</ListItemText>
      <SignalBarIcon iconButton />
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorEl} open={isVisible} onClose={onClose}>
      {renderHeader}
      <Divider />
      {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Layout.AppBar.TranslationMenu.search")} /> : null}
      {filteredLanguages.map((language) => createMenuItem(<TranslateIcon isListIcon />, `${language.languageName} - ${language.countryName}`, () => i18n.changeLanguage(language.code)))}
    </Menu>
  );
};

export default TranslationMenu;
