import { DatePickerModal, FileSelectInput, GenderSelector, ModalSelectInput, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CineastCreateFormFieldInterface } from "../types";
import { DEFAULT_DATE_FORMAT } from "@/mock/constants";
import { useState } from "react";
import { CountryPickerModal } from "@/components/Modals";
import { ProfessionSelector } from ".";
import { MediaCountriesEnum } from "mirra-scope-client-types/lib";

interface CineastCreateFormProps {
  formRegister: UseFormRegister<CineastCreateFormFieldInterface>;
  formControl: Control<CineastCreateFormFieldInterface>;
  formErrors: FieldErrors<CineastCreateFormFieldInterface>;
  setFormValue: UseFormSetValue<CineastCreateFormFieldInterface>;
  watchFormValue: UseFormWatch<CineastCreateFormFieldInterface>;
  onImageSelect: (image: File) => void;
  isLoading: boolean;
}

export default function CineastCreateForm({ formRegister, formControl, formErrors, onImageSelect, watchFormValue, isLoading, setFormValue }: CineastCreateFormProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  const handleOnSelectCountry = (countrName: MediaCountriesEnum) => {
    setFormValue("country", countrName);
    handleOnToggleCountryModal();
  };

  const handleOnToggleCountryModal = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  return (
    <Stack padding={4} gap={2}>
      <TextField register={formRegister} name="fullName" label={t("Feature.Quick.CineastCreateForm.name")} helperText={formErrors.fullName?.message} error={!!formErrors.fullName} fullWidth required autoFocus />
      <Controller control={formControl} name="dateOfBirth" render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} format={DEFAULT_DATE_FORMAT} value={new Date(field.value)} label={t("Feature.Quick.CineastCreateForm.dateOfBirth")} fullWidth />} />
      <FileSelectInput label={t("Feature.Quick.CineastCreateForm.uploadProfileImage")} fullWidth onFileSelect={onImageSelect} loading={isLoading} helperText={formErrors.imageId?.message} error={!!formErrors.imageId} />
      <ProfessionSelector formRegister={formRegister} />
      <GenderSelector required label={t("Feature.Quick.CineastCreateForm.selectAGender")} name="gender" register={formRegister} helperText={formErrors.gender?.message} error={!!formErrors.gender} />
      <ModalSelectInput required isModalVisible={isCountryModalVisible} label={t("Feature.Quick.CineastCreateForm.country")} value={watchFormValue("country")} onClick={handleOnToggleCountryModal} helperText={formErrors.country?.message} error={!!formErrors.country} fullWidth />
      <CountryPickerModal isOpen={isCountryModalVisible} onClose={handleOnToggleCountryModal} onOk={handleOnSelectCountry} />
      <TextField register={formRegister} name="bio" label={t("Feature.Quick.CineastCreateForm.bio")} helperText={formErrors.bio?.message} error={!!formErrors.bio} multiline rows={3} fullWidth required />
      <DevTool control={formControl} />
    </Stack>
  );
}
