import Elevator from "@/components/Tags/Elevator";
import { Stack, Typography } from "@mui/material";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesCreateFormFieldInterface } from "../types";
import { useState } from "react";
import { MediaCountriesEnum, LanguagiesEnum, MediaGenriesEnum } from "@/types/enum";
import { ModalSelectInput } from "@/components/Form";
import { CountryPickerModal, LanguagePickerModal, GenrePickerModal } from "@/components/Modals";
import SeriesStatusSelectComponent from "./SeriesStatusSelectComponent";

interface SeriesAdditionalInfoFormProps {
  setFormValue: UseFormSetValue<SeriesCreateFormFieldInterface>;
  watchFormValue: UseFormWatch<SeriesCreateFormFieldInterface>;
  formRegister: UseFormRegister<SeriesCreateFormFieldInterface>;
}

export default function SeriesAdditionalInfoForm({ setFormValue, watchFormValue, formRegister }: SeriesAdditionalInfoFormProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);

  const handleOnSelectCountry = (countrName: MediaCountriesEnum) => {
    setFormValue("originCountry", countrName);
    handleOnToggleCountryModalVisible();
  };

  const handleOnSelectGenre = (genre: MediaGenriesEnum) => {
    setFormValue("genre", genre);
    handleOnToggleGenreModalVisible();
  };

  const handleOnSelectLanguage = (language: LanguagiesEnum) => {
    setFormValue("originalLanguage", language);
    handleOnToggleLanguageModalVisible();
  };

  const handleOnToggleCountryModalVisible = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const handleOnToggleGenreModalVisible = () => {
    setIsGenreModalVisible(!isGenreModalVisible);
  };

  const handleOnToggleLanguageModalVisible = () => {
    setIsLanguageModalVisible(!isLanguageModalVisible);
  };

  return (
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.Series.SeriesAdditionalInfoForm.addAdditionalInfo")}</Typography>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.Series.SeriesAdditionalInfoForm.originCountry")} value={watchFormValue("originCountry")} onClick={handleOnToggleCountryModalVisible} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModalVisible} onOk={handleOnSelectCountry} />
        <ModalSelectInput isModalVisible={isLanguageModalVisible} label={t("Feature.Series.SeriesAdditionalInfoForm.originalLanguage")} value={watchFormValue("originalLanguage")} onClick={handleOnToggleLanguageModalVisible} fullWidth />
        <LanguagePickerModal isOpen={isLanguageModalVisible} onClose={handleOnToggleLanguageModalVisible} onOk={handleOnSelectLanguage} />
      </Stack>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isGenreModalVisible} label={t("Feature.Series.SeriesAdditionalInfoForm.pickAGenre")} value={watchFormValue("genre")} onClick={handleOnToggleGenreModalVisible} fullWidth />
        <GenrePickerModal isOpen={isGenreModalVisible} onClose={handleOnToggleGenreModalVisible} onOk={handleOnSelectGenre} />
        <SeriesStatusSelectComponent formRegister={formRegister} />
      </Stack>
    </Elevator>
  );
}
