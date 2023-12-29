import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListItemText, MenuItem, Radio, SxProps } from "@mui/material";
import { DoneIcon, SearchIcon, TranslateIcon } from "@/components/icons";
import { languageListWithCode } from "@/mock/languageListWithCode";
import { SearchInput } from "@/components/Form";
import { MediaLanguagiesEnum } from "@/types/enum";
import { LanguagePickerEmptyComponent } from "..";

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (countrName: MediaLanguagiesEnum) => void;
}

export default function LanguagePickerModal({ isOpen, onClose, onOk }: LanguagePickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(MediaLanguagiesEnum.URDU);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredLanguages = useMemo(() => {
    return languageListWithCode.filter((language) => language.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText]);

  const handleOnSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleOnClose = () => {
    setIsSearchInputVisible(false);
    onClose();
  };

  const handleOnConfirm = () => {
    onOk(value);
    setIsSearchInputVisible(false);
  };

  const handleOnSearchInputVisible = () => {
    setIsSearchInputVisible(!isSearchInputVisible);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    "& .MuiDialog-paper": {
      width: theme.spacing(48),
      maxHeight: theme.spacing(64),
    },
  }));

  const dialogActions = (
    <>
      <SearchIcon onClick={handleOnSearchInputVisible} />
      <Button onClick={handleOnClose} variant="text">
        {t("Components.Modals.LanguagePickerModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
        {t("Components.Modals.LanguagePickerModal.ok")}
      </Button>
    </>
  );

  return (
    <Dialog dialogContentSx={{ padding: 0 }} open={isOpen} onClose={onClose} headerText={t("Components.Modals.LanguagePickerModal.pickALanguage")} dialogAction={dialogActions} sx={dialogBoxStyle} hideCrossButton>
      {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Components.Modals.LanguagePickerModal.search")} /> : null}
      <RadioGroup value={value} onChange={handleOnChange}>
        {filteredLanguages.map((language) => {
          return (
            <MenuItem onClick={() => setValue(language.name)}>
              <TranslateIcon isListIcon />
              <ListItemText>{language.name}</ListItemText>
              <Radio value={language.name} />
            </MenuItem>
          );
        })}
        {!filteredLanguages.length ? <LanguagePickerEmptyComponent height={32} /> : null}
      </RadioGroup>
    </Dialog>
  );
}
