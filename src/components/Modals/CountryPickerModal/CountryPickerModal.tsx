import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListItemIcon, ListItemText, MenuItem, SxProps } from "@mui/material";
import { DoneIcon, SearchIcon } from "@/components/icons";
import { countryListWithFlag } from "@/mock/countryListWithFlag";
import { SearchInput } from "@/components/Form";
import { CountryPickerEmptyComponent } from "..";
import { CountriesEnum } from "@/types/enum";

interface CountryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (countrName: CountriesEnum) => void;
}

export default function CountryPickerModal({ isOpen, onClose, onOk }: CountryPickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(CountriesEnum.USA);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredCountries = useMemo(() => {
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
    setValue(event.target.value);
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
        {t("Component.Modals.CountryPickerModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
        {t("Component.Modals.CountryPickerModal.ok")}
      </Button>
    </>
  );

  return (
    <Dialog dialogContentSx={{ padding: 0 }} open={isOpen} onClose={onClose} headerText={t("Component.Modals.CountryPickerModal.pickACountry")} dialogAction={dialogActions} sx={dialogBoxStyle} hideCrossButton>
      {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Component.Modals.CountryPickerModal.search")} /> : null}
      <RadioGroup value={value} onChange={handleOnChange}>
        {filteredCountries.map((country) => {
          return (
            <MenuItem onClick={() => setValue(country.name)}>
              <ListItemIcon sx={{ fontSize: "20px" }}>{country.flag}</ListItemIcon>
              <ListItemText>{country.name}</ListItemText>
              <Radio value={country.name} />
            </MenuItem>
          );
        })}
        {!filteredCountries.length ? <CountryPickerEmptyComponent height={36} /> : null}
      </RadioGroup>
    </Dialog>
  );
}
