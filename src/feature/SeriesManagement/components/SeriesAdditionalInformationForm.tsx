import Elevator from "@/components/Tags/Elevator";
import { Link, Stack, Typography } from "@mui/material";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreateSeriesFieldType } from "../types";
import { RadioGroupModal } from "@/components/Modals";
import { useState } from "react";
import { CountriesEnum } from "@/types/enum";
import { ModalSelectInput, SelectInput } from "@/components/Form";

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

  const handleOnSelectCountry = (countrName: CountriesEnum) => {
    setCreateSeriesFormValue("originCountry", countrName);
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const handleOnToggleCountryModalVisible = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  return (
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesAdditionalInformationForm.addAdditionalInformation")}</Typography>
      <Stack direction={"row"}>
        <ModalSelectInput label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.originCountry")} value={watchCreateSeriesFormValue("originCountry")} onChange={() => {}} onClick={handleOnToggleCountryModalVisible} />
        <RadioGroupModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModalVisible} onOk={handleOnSelectCountry} />
      </Stack>
    </Elevator>
  );
}
