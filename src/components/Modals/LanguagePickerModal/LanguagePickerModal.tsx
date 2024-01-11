import { Dialog, DialogActions, DialogTitle } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { DialogContent, ListItemText, MenuItem, Radio, SxProps } from "@mui/material";
import { ClearIcon, DoneIcon, SearchIcon, TranslateIcon } from "@/components/icons";
import { languageListWithCode } from "@/mock/languageListWithCode";
import { SearchInput } from "@/components/Form";
import { LanguagePickerEmptyComponent } from "..";
import { MediaLanguagiesEnum } from "mirra-scope-client-types/lib";

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

  const handleOnSearchInputToggle = () => {
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

  return (
    <Dialog open={isOpen} onClose={onClose} sx={dialogBoxStyle}>
      <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"}>
        {t("Components.Modals.LanguagePickerModal.pickALanguage")}
        <ClearIcon onClick={handleOnClose} />
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 0 }}>
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
      </DialogContent>
      <DialogActions>
        <SearchIcon onClick={handleOnSearchInputToggle} />
        <Button onClick={handleOnClose} variant="text">
          {t("Components.Modals.LanguagePickerModal.cancel")}
        </Button>
        <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
          {t("Components.Modals.LanguagePickerModal.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
