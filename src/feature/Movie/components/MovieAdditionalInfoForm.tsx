import { useState } from "react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MenuItem, Paper, Stack, Typography } from "@mui/material";
import { values } from "lodash";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { ModalSelectInput, SelectInput } from "@/components/Form";
import { CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";
import { MovieUpdateFormFieldInterface } from "../types";

interface MovieAdditionalInfoFormProps {
  setFormValue: UseFormSetValue<MovieUpdateFormFieldInterface>;
  watchFormValue: UseFormWatch<MovieUpdateFormFieldInterface>;
  formControl: Control<MovieUpdateFormFieldInterface>;
}

export default function MovieAdditionalInfoForm({ setFormValue, watchFormValue, formControl }: MovieAdditionalInfoFormProps) {
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
    /* TODO: use i18n for this component */
    <Stack component={Paper} width={"100%"} gap={2} p={2}>
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

        <SelectInput label={t("Feature.VideoUpload.MovieUploadModal.selectStatus")} fullWidth control={formControl} name="status">
          {movieStatusesList.map((movieStatus) => (
            <MenuItem defaultChecked value={movieStatus}>
              {movieStatus}
            </MenuItem>
          ))}
        </SelectInput>
      </Stack>
    </Stack>
  );
}

const movieStatusesList = values(MediaStatusEnum);
