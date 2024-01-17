import { useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Stack, Typography, Paper, MenuItem } from "@mui/material";
import { MediaCountriesEnum, MediaGenriesEnum, MediaLanguagiesEnum, MediaStatusEnum } from "zgaya.hub-client-types/lib";

import { ModalSelectInput, SelectInput } from "@/components/Form";
import { CountryPickerModal, GenrePickerModal, LanguagePickerModal } from "@/components/Modals";
import { SeriesCreateFormFieldInterface } from "../types";
import { values } from "lodash";

interface SeriesAdditionalInfoFormProps {
  setFormValue: UseFormSetValue<SeriesCreateFormFieldInterface>;
  watchFormValue: UseFormWatch<SeriesCreateFormFieldInterface>;
  formRegister: UseFormRegister<SeriesCreateFormFieldInterface>;
}

export default function SeriesAdditionalInfoForm({ setFormValue, watchFormValue, formRegister }: Readonly<SeriesAdditionalInfoFormProps>) {
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
    <Stack component={Paper} padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.Series.SeriesAdditionalInfoForm.addAdditionalInfo")}</Typography>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.Series.SeriesAdditionalInfoForm.originCountry")} value={watchFormValue("originCountry")} onClick={handleOnToggleCountryModal} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModal} onOk={handleOnSelectCountry} />
        <ModalSelectInput isModalVisible={isLanguageModalVisible} label={t("Feature.Series.SeriesAdditionalInfoForm.originalLanguage")} value={watchFormValue("originalLanguage")} onClick={handleOnToggleLanguageModal} fullWidth />
        <LanguagePickerModal isOpen={isLanguageModalVisible} onClose={handleOnToggleLanguageModal} onOk={handleOnSelectLanguage} />
      </Stack>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isGenreModalVisible} label={t("Feature.Series.SeriesAdditionalInfoForm.pickAGenre")} value={watchFormValue("genre")} onClick={handleOnToggleGenreModal} fullWidth />
        <GenrePickerModal isOpen={isGenreModalVisible} onClose={handleOnToggleGenreModal} onOk={handleOnSelectGenre} />
        <SelectInput label={t("Feature.Series.SeriesAdditionalInfoForm.selectStatus")} fullWidth name="status" register={formRegister}>
          {seriesStatusesList.map((seriesStatus) => (
            <MenuItem value={seriesStatus}>{seriesStatus}</MenuItem>
          ))}
        </SelectInput>
      </Stack>
    </Stack>
  );
}

const seriesStatusesList = values(MediaStatusEnum);
