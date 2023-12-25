import { DatePickerModal, TextField } from "@/components/Form";
import Elevator from "@/components/Tags/Elevator";
import { DevTool } from "@hookform/devtools";
import { Link, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreateSeriesFieldType } from "../types";
import { RadioGroupModal } from "@/components/Modals";
import { useState } from "react";

interface SeriesAdditionalInformationFormProps {
  register: UseFormRegister<CreateSeriesFieldType>;
  control: Control<CreateSeriesFieldType>;
  errors: FieldErrors<CreateSeriesFieldType>;
}

export default function SeriesAdditionalInformationForm({ register, control, errors }: SeriesAdditionalInformationFormProps) {
  const { t } = useTranslation();
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(true);

  const handleOnToggleCountryModalVisible = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  return (
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesAdditionalInformationForm.addAdditionalInformation")}</Typography>
      <Link onClick={handleOnToggleCountryModalVisible}>Open Country picker</Link>
      {/* <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.title")} helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.releaseDate")} views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={register} name="plotSummary" label={t("Feature.SeriesManagement.SeriesAdditionalInformationForm.plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} /> */}
      <RadioGroupModal isOpen={isCountryModalVisible} title="Choose country" onClose={handleOnToggleCountryModalVisible} />
    </Elevator>
  );
}
