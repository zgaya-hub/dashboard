import { useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { values } from "lodash";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { ModalSelectInput, SelectInput, TextField } from "@/components/Form";
import { CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";

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
    <Stack gap={2}>
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

        <SelectInput
          label={t("Feature.VideoUpload.MovieUploadModal.selectStatus")}
          fullWidth
          register={formRegister}
          name="status"
          // TODO: this default value set by a problem its set empty string "" if not set any value it will fix in future
          defaultValue={MediaStatusEnum.RELEASED}
        >
          {movieStatusesList.map((movieStatus) => (
            <MenuItem value={movieStatus}>{movieStatus}</MenuItem>
          ))}
        </SelectInput>
      </Stack>
    </Stack>
  );
}

const movieStatusesList = values(MediaStatusEnum);
