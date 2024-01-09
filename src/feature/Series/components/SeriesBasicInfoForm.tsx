import { DatePickerModal, TextField } from "@/components/Form";
import Elevator from "@/components/Tags/Elevator";
import { DevTool } from "@hookform/devtools";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
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
    <Elevator padding={4} gap={2}>
      <Typography variant="h5">{t("Feature.Series.SeriesBasicInfoForm.addBasicInfo")}</Typography>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={formRegister} name="title" label={t("Feature.Series.SeriesBasicInfoForm.title")} helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label={t("Feature.Series.SeriesBasicInfoForm.releaseDate")} views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={formRegister} name="plotSummary" label={t("Feature.Series.SeriesBasicInfoForm.plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Elevator>
  );
}
