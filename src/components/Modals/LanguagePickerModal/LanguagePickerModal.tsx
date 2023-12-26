import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";
import { DoneIcon, SearchIcon } from "@/components/icons";
import { countryListWithFlag } from "@/mock/countryList";
import { SearchInput } from "@/components/Form";
import { LanguagiesEnum } from "@/types/enum";

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (countrName: LanguagiesEnum) => void;
}

export default function LanguagePickerModal({ isOpen, onClose, onOk }: LanguagePickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(LanguagiesEnum.URDU);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredLanguages = useMemo(() => {
    return countryListWithFlag.filter((language) => language.name.toLowerCase().includes(searchText.toLowerCase()));
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
    setValue(event.target.value as LanguagiesEnum);
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    "& .MuiDialog-paper": {
      minWidth: theme.spacing(48),
      maxHeight: theme.spacing(64),
    },
  }));

  const dialogActions = (
    <>
      <SearchIcon onClick={handleOnSearchInputVisible} />
      <Button onClick={handleOnClose} variant="text">
        {t("Component.Modals.LanguagePickerModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
        {t("Component.Modals.LanguagePickerModal.ok")}
      </Button>
    </>
  );

  return (
    <Dialog dialogContentSx={{ padding: 0 }} open={isOpen} onClose={onClose} headerText={t("Component.Modals.LanguagePickerModal.pickALanguage")} dialogAction={dialogActions} sx={dialogBoxStyle} hideCrossButton>
      {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Component.Modals.LanguagePickerModal.search")} /> : null}
      <RadioGroup value={value} onChange={handleOnChange}></RadioGroup>
    </Dialog>
  );
}
