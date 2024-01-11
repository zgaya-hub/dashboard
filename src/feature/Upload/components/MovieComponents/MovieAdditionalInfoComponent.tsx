import Elevator from "@/components/Tags/Elevator";
import { ListItemText, MenuItem, Stack, Typography } from "@mui/material";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ModalSelectInput, SelectInput } from "@/components/Form";
import { CountryPickerModal, LanguagePickerModal, GenrePickerModal } from "@/components/Modals";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "mirra-scope-client-types/lib";
import { values } from "lodash";
import { CreateMovieFormFieldType } from "../../types";

interface MovieAdditionalInfoComponentProps {
  setFormValue: UseFormSetValue<CreateMovieFormFieldType>;
  watchFormValue: UseFormWatch<CreateMovieFormFieldType>;
  formRegister: UseFormRegister<CreateMovieFormFieldType>;
}

export default function MovieAdditionalInfoComponent({ setFormValue, watchFormValue, formRegister }: MovieAdditionalInfoComponentProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);

  const handleOnSelectCountry = (countrName: MediaCountriesEnum) => {
    setFormValue("originCountry", countrName);
    handleOnToggleCountryModal();
  };

  const handleOnSelectGenre = (genre: MediaGenriesEnum) => {
    setFormValue("genre", genre);
    handleOnToggleGenreModal();
  };

  const handleOnSelectLanguage = (language: MediaLanguagiesEnum) => {
    setFormValue("originalLanguage", language);
    handleOnToggleLanguageModal();
  };

  const handleOnToggleCountryModal = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const handleOnToggleGenreModal = () => {
    setIsGenreModalVisible(!isGenreModalVisible);
  };

  const handleOnToggleLanguageModal = () => {
    setIsLanguageModalVisible(!isLanguageModalVisible);
  };

  return (
    <Elevator gap={2} elevation={0}>
      <Typography variant="h5">{t("Feature.VideoUpload.MovieUploadModal.addAdditionalInfo")}</Typography>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.VideoUpload.MovieUploadModal.originCountry")} value={watchFormValue("originCountry")} onClick={handleOnToggleCountryModal} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModal} onOk={handleOnSelectCountry} />
        <ModalSelectInput isModalVisible={isLanguageModalVisible} label={t("Feature.VideoUpload.MovieUploadModal.originalLanguage")} value={watchFormValue("originalLanguage")} onClick={handleOnToggleLanguageModal} fullWidth />
        <LanguagePickerModal isOpen={isLanguageModalVisible} onClose={handleOnToggleLanguageModal} onOk={handleOnSelectLanguage} />
      </Stack>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isGenreModalVisible} label={t("Feature.VideoUpload.MovieUploadModal.pickAGenre")} value={watchFormValue("genre")} onClick={handleOnToggleGenreModal} fullWidth />
        <GenrePickerModal isOpen={isGenreModalVisible} onClose={handleOnToggleGenreModal} onOk={handleOnSelectGenre} />
        <SelectInput label={t("Feature.VideoUpload.MovieUploadModal.selectStatus")} fullWidth name="status" register={formRegister}>
          {movieStatusesList.map((movieStatus) => {
            return (
              <MenuItem value={movieStatus}>
                <ListItemText>{movieStatus}</ListItemText>
              </MenuItem>
            );
          })}
        </SelectInput>
      </Stack>
    </Elevator>
  );
}

const movieStatusesList = values(MediaStatusEnum);
