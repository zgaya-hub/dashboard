import { Dialog, DialogTitle } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { DialogContent, ListItemIcon, ListItemText, MenuItem, SxProps } from "@mui/material";
import { ClearIcon, DoneIcon, SearchIcon } from "@/components/icons";
import { countryListWithFlag } from "@/mock/countryListWithFlag";
import { SearchInput } from "@/components/Form";
import { CountryPickerEmptyComponent } from "..";
import DialogAction from "@/components/Dialog/DialogActions";
import { MediaCountriesEnum } from "zgaya.hub-client-types/lib";

interface CountryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: MediaCountriesEnum
  onOk: (countrName: MediaCountriesEnum) => void;
}

export default function CountryPickerModal({ isOpen, onClose, onOk, defaultValue }: CountryPickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(MediaCountriesEnum.USA);
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

  const handleOnSearchInput = () => {
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
      <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} displayPrint={"block"}>
        {t("Components.Modals.CountryPickerModal.pickACountry")}
        <ClearIcon iconButton={false} onClick={handleOnClose} />
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 0 }}>
        {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Components.Modals.CountryPickerModal.search")} /> : null}
        <RadioGroup value={value} onChange={handleOnChange} defaultValue={defaultValue}>
          {filteredCountries.map((country) => {
            return (
              <MenuItem onClick={() => setValue(country.name)}>
                <ListItemIcon sx={{ fontSize: "20px" }}>{country.flag}</ListItemIcon>
                <ListItemText>{country.name}</ListItemText>
                <Radio value={country.name} />
              </MenuItem>
            );
          })}
          {!filteredCountries.length ? <CountryPickerEmptyComponent height={32} /> : null}
        </RadioGroup>
      </DialogContent>
      <DialogAction>
        <SearchIcon onClick={handleOnSearchInput} />
        <Button onClick={handleOnClose} variant="text">
          {t("Components.Modals.CountryPickerModal.cancel")}
        </Button>
        <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
          {t("Components.Modals.CountryPickerModal.ok")}
        </Button>
      </DialogAction>
    </Dialog>
  );
}
