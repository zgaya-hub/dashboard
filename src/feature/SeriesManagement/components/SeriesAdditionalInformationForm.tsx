import Elevator from "@/components/Tags/Elevator";
import { Stack, Typography } from "@mui/material";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreateSeriesFieldType } from "../types";
import { useState } from "react";
import { CountriesEnum, LanguagiesEnum } from "@/types/enum";
import { ModalSelectInput } from "@/components/Form";
import { CountryPickerModal, LanguagePickerModal } from "@/components/Modals";

interface SeriesAdditionalInformationFormProps {
  register: UseFormRegister<CreateSeriesFieldType>;
  control: Control<CreateSeriesFieldType>;
  errors: FieldErrors<CreateSeriesFieldType>;
  setCreateSeriesFormValue: UseFormSetValue<CreateSeriesFieldType>;
  watchCreateSeriesFormValue: UseFormWatch<CreateSeriesFieldType>;
}

export default function SeriesAdditionalInformationForm({ setCreateSeriesFormValue, watchCreateSeriesFormValue }: SeriesAdditionalInformationFormProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const handleOnSelectCountry = (countrName: CountriesEnum) => {
    setCreateSeriesFormValue("originCountry", countrName);
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const handleOnSelectLanguage = (language: LanguagiesEnum) => {
    setCreateSeriesFormValue("originalLanguage", language);
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const handleOnToggleCountryModalVisible = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  return (
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesAdditionalInformationForm.addAdditionalInformation")}</Typography>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.originCountry")} value={watchCreateSeriesFormValue("originCountry")} onChange={() => {}} onClick={handleOnToggleCountryModalVisible} fullWidth />
        <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModalVisible} onOk={handleOnSelectCountry} />
        <ModalSelectInput isModalVisible={isCountryModalVisible} label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.originalLanguage")} value={watchCreateSeriesFormValue("originCountry")} onChange={() => {}} onClick={handleOnToggleCountryModalVisible} fullWidth />
        <LanguagePickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModalVisible} onOk={handleOnSelectLanguage} />
      </Stack>
    </Elevator>
  );
}
