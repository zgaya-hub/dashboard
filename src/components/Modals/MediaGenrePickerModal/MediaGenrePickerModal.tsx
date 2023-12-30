import { Dialog } from "@/components/Dialog";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { ListItemText, MenuItem, Radio, SxProps } from "@mui/material";
import { DoneIcon, SearchIcon, StreetViewIcon } from "@/components/icons";
import { SearchInput } from "@/components/Form";
import { MediaGenriesEnum } from "@/types/enum";
import { MediaGenrePickerEmptyComponent } from "..";
import { mediaGenreList } from "../constants";

interface MediaGenrePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (countrName: MediaGenriesEnum) => void;
}

export default function MediaGenrePickerModal({ isOpen, onClose, onOk }: MediaGenrePickerModalProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(MediaGenriesEnum.ACTION);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredMediaGenres = useMemo(() => {
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
        {t("Components.Modals.MediaGenrePickerModal.cancel")}
      </Button>
      <Button onClick={handleOnConfirm} variant="contained" endIcon={<DoneIcon />}>
        {t("Components.Modals.MediaGenrePickerModal.ok")}
      </Button>
    </>
  );

  return (
    <Dialog dialogContentSx={{ padding: 0 }} open={isOpen} onClose={onClose} headerText={t("Components.Modals.MediaGenrePickerModal.pickAGenre")} dialogAction={dialogActions} sx={dialogBoxStyle} hideCrossButton>
      {isSearchInputVisible ? <SearchInput autoFocus onChange={handleOnSearchChange} placeholder={t("Components.Modals.MediaGenrePickerModal.search")} /> : null}
      <RadioGroup value={value} onChange={handleOnChange}>
        {filteredMediaGenres.map((genre) => {
          return (
            <MenuItem onClick={() => setValue(genre)}>
              <StreetViewIcon isListIcon />
              <ListItemText>{genre}</ListItemText>
              <Radio value={genre} />
            </MenuItem>
          );
        })}
        {!filteredMediaGenres.length ? <MediaGenrePickerEmptyComponent height={32} /> : null}
      </RadioGroup>
    </Dialog>
  );
}
