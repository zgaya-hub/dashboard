import { Dialog, DialogActions, DialogTitle } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { DialogContent, ListItemText, MenuItem, Radio, SxProps } from "@mui/material";
import { ClearIcon, DoneIcon, SearchIcon, StreetViewIcon } from "@/components/icons";
import { SearchInput } from "@/components/Form";
import { GenrePickerEmptyComponent } from "..";
import { mediaGenreList } from "../constants";
import { MediaGenriesEnum } from "zgaya.hub-client-types/lib";

interface GenrePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: MediaGenriesEnum
  onOk: (countrName: MediaGenriesEnum) => void;
}

export default function GenrePickerModal({ isOpen, onClose, onOk, defaultValue }: GenrePickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(MediaGenriesEnum.ACTION);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredGenres = useMemo(() => {
    return mediaGenreList.filter((language) => language.toLowerCase().includes(searchText.toLowerCase()));
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

  const handleOnToggleSearchInput = () => {
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
        {t("Components.Modals.GenrePickerModal.pickAGenre")}
        <ClearIcon iconButton={false} onClick={handleOnClose} />
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 0 }}>
        {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Components.Modals.GenrePickerModal.search")} /> : null}
        <RadioGroup value={value} onChange={handleOnChange} defaultValue={defaultValue}>
          {filteredGenres.map((genre) => {
            return (
              <MenuItem onClick={() => setValue(genre)}>
                <StreetViewIcon isListIcon />
                <ListItemText>{genre}</ListItemText>
                <Radio value={genre} />
              </MenuItem>
            );
          })}
          {!filteredGenres.length ? <GenrePickerEmptyComponent height={32} /> : null}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <SearchIcon onClick={handleOnToggleSearchInput} />
        <Button onClick={handleOnClose} variant="text">
          {t("Components.Modals.GenrePickerModal.cancel")}
        </Button>
        <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
          {t("Components.Modals.GenrePickerModal.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
