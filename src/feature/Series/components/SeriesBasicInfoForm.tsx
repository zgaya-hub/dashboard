import { DatePickerModal, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import { Typography, Stack, Paper } from "@mui/material";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesCreateFormFieldInterface } from "../types";

interface SeriesBasicInfoFormProps {
  formRegister: UseFormRegister<SeriesCreateFormFieldInterface>;
  errors: FieldErrors<SeriesCreateFormFieldInterface>;
  control: Control<SeriesCreateFormFieldInterface>;
}

export default function SeriesBasicInfoForm({ formRegister, control, errors }: SeriesBasicInfoFormProps) {
  const { t } = useTranslation();

  return (
    <Stack component={Paper} padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.Series.SeriesBasicInfoForm.addBasicInfo")}</Typography>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={formRegister} name="title" label={t("Feature.Series.SeriesBasicInfoForm.title")} helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <DatePickerModal register={formRegister} name="releaseDate" label={t("Feature.Series.SeriesBasicInfoForm.releaseDate")} views={["year", "month"]} fullWidth error={!!errors.releaseDate} helperText={errors.releaseDate?.message} />
      </Stack>
      <TextField register={formRegister} name="plotSummary" label={t("Feature.Series.SeriesBasicInfoForm.plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Stack>
  );
}
