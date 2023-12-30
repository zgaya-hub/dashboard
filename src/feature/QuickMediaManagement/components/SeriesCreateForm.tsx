import { DatePickerModal, FileSelectInput, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeriesCreateFieldType } from "../types";

interface SeriesCreateFormProps {
  register: UseFormRegister<SeriesCreateFieldType>;
  control: Control<SeriesCreateFieldType>;
  errors: FieldErrors<SeriesCreateFieldType>;
  onImageSelect: (image: File) => void;
  isLoading: boolean;
}

export default function SeriesCreateForm({ register, control, errors, onImageSelect, isLoading }: SeriesCreateFormProps) {
  const { t } = useTranslation();

  return (
    <Stack padding={4} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="mediaTitle" label={t("Feature.QuickMediaManagement.SeriesCreateForm.title")} helperText={errors.mediaTitle?.message} error={!!errors.mediaTitle} fullWidth required autoFocus />
        <Controller control={control} name="mediaReleaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label={t("Feature.QuickMediaManagement.SeriesCreateForm.releaseDate")} views={["year", "month"]} fullWidth />} />
        <FileSelectInput label={t("Feature.QuickMediaManagement.SeriesCreateForm.selectABackdropImage")} fullWidth onFileSelect={onImageSelect} loading={isLoading} helperText={errors.mediaImageId?.message} error={!!errors.mediaImageId} />
      </Stack>
      <TextField register={register} name="mediaPlotSummary" label={t("Feature.QuickMediaManagement.SeriesCreateForm.plotSummary")} helperText={errors.mediaPlotSummary?.message} error={!!errors.mediaPlotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Stack>
  );
}
