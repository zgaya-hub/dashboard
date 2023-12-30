import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListItemText, MenuItem, Radio, SxProps } from "@mui/material";
import { DoneIcon, SearchIcon, StreetViewIcon } from "@/components/icons";
import { SearchInput } from "@/components/Form";
import { GenriesEnum } from "@/types/enum";
import { GenrePickerEmptyComponent } from "..";
import { mediaGenreList } from "../constants";

interface GenrePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (countrName: GenriesEnum) => void;
}

export default function GenrePickerModal({ isOpen, onClose, onOk }: GenrePickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(GenriesEnum.ACTION);
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
        {t("Components.Modals.GenrePickerModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
        {t("Components.Modals.GenrePickerModal.ok")}
      </Button>
    </>
  );

  return (
    <Dialog dialogContentSx={{ padding: 0 }} open={isOpen} onClose={onClose} headerText={t("Components.Modals.GenrePickerModal.pickAGenre")} dialogAction={dialogActions} sx={dialogBoxStyle} hideCrossButton>
      {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Components.Modals.GenrePickerModal.search")} /> : null}
      <RadioGroup value={value} onChange={handleOnChange}>
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
    </Dialog>
  );
}
