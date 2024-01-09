import { DatePickerModal, FileSelectInput, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SeasonCreateFormFieldInterface } from "../types";
import Button from "@/components/Button";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";

interface SeasonCreateFormProps {
  register: UseFormRegister<SeasonCreateFormFieldInterface>;
  control: Control<SeasonCreateFormFieldInterface>;
  errors: FieldErrors<SeasonCreateFormFieldInterface>;
  watch: UseFormWatch<SeasonCreateFormFieldInterface>;
  onImageSelect: (image: File) => void;
  isLoading: boolean;
}

export default function SeasonCreateForm({ register, control, errors, onImageSelect, isLoading, watch }: SeasonCreateFormProps) {
  const { t } = useTranslation();
  const [episodeNumberPopoverAnchorEl, setEpisodeNumberPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <Stack padding={4} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label={t("Feature.Quick.SeasonCreateForm.title")} helperText={errors.title?.message} error={!!errors.title} fullWidth required autoFocus />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label={t("Feature.Quick.SeasonCreateForm.releaseDate")} views={["year", "month"]} fullWidth />} />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography color={errors.number ? "red" : ""}>{t("Feature.Quick.SeasonCreateForm.selectABackdropImage")}</Typography>
          <Button onClick={(event) => setEpisodeNumberPopoverAnchorEl(event.currentTarget)} color={errors.number ? "error" : "primary"}>
            {watch("number")}
          </Button>
          <Popover open={!!episodeNumberPopoverAnchorEl} anchorEl={episodeNumberPopoverAnchorEl} onClose={() => setEpisodeNumberPopoverAnchorEl(null)}>
            <TextField register={register} name={"number"} autoFocus type="number" />
          </Popover>
        </Stack>
        <FileSelectInput label={t("Feature.Quick.SeasonCreateForm.selectABackdropImage")} fullWidth onFileSelect={onImageSelect} loading={isLoading} helperText={errors.imageId?.message} error={!!errors.imageId} />
      </Stack>
      <TextField register={register} name="plotSummary" label={t("Feature.Quick.SeasonCreateForm.plotSummary")} helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Stack>
  );
}
