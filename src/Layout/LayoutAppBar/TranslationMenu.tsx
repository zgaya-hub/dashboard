import React, { useState } from "react";
import { ListItemIcon } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TranslateIcon } from "@/components/icons";
import Typography from "@/components/Typography";
import { MenuItem, Menu } from "@/components/Menu";
import { SearchInput } from "@/components/Input";

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

export default function TranslationMenu({ anchorEl, isVisible, onClose }: TranslationMenuProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const filteredLanguages = supportedLanguages.filter((lan) => lan.languageName.toLowerCase().includes(searchText.toLowerCase()) || lan.countryName.toLowerCase().includes(searchText.toLowerCase()));

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <MenuItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant="h6" color="primary">
        {label}
      </Typography>
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorEl} open={isVisible} onClose={onClose} headerText={t("Layout.AppBar.TranslationMenu.title")} onBack={onClose}>
      <SearchInput
        tooltip={t("Layout.AppBar.TranslationMenu.searchInputTooltip")}
        fullWidth
        size="small"
        placeholder={t("Layout.AppBar.TranslationMenu.search")}
        value={searchText}
        onSearch={handleSearchChange}
      />
      {filteredLanguages.map((lan) => createMenuItem(<TranslateIcon />, `${lan.languageName} - ${lan.countryName}`, () => i18n.changeLanguage(lan.code)))}
    </Menu>
  );
}

const supportedLanguages: Language[] = [
  { code: "en", languageName: "English", countryName: "America", flag: "🇺🇸" },
  { code: "ar", languageName: "Arabic", countryName: "Palestine", flag: "🇵🇸" },
  { code: "hi", languageName: "Hindi", countryName: "India", flag: "🇮🇳" },
  { code: "ur", languageName: "Urdu", countryName: "Pakistan", flag: "🇵🇰" },
];
