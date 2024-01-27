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
  formRegister: UseFormRegister<SeasonCreateFormFieldInterface>;
  formControl: Control<SeasonCreateFormFieldInterface>;
  formErrors: FieldErrors<SeasonCreateFormFieldInterface>;
  formWatch: UseFormWatch<SeasonCreateFormFieldInterface>;
  onImageSelect: (image: File) => void;
  isLoading: boolean;
}

export default function SeasonCreateForm({ formRegister, formControl, formErrors, onImageSelect, isLoading, formWatch }: SeasonCreateFormProps) {
  const { t } = useTranslation();
  const [episodeNumberPopoverAnchorEl, setEpisodeNumberPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <Stack padding={4} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={formRegister} name="title" label={t("Feature.Quick.SeasonCreateForm.title")} helperText={formErrors.title?.message} error={!!formErrors.title} fullWidth required autoFocus />
        <DatePickerModal name="releaseDate" control={formControl} label={t("Feature.Quick.SeasonCreateForm.releaseDate")} views={["year", "month"]} fullWidth />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography color={formErrors.number ? "red" : ""}>{t("Feature.Quick.SeasonCreateForm.selectABackdropImage")}</Typography>
          <Button onClick={(event) => setEpisodeNumberPopoverAnchorEl(event.currentTarget)} color={formErrors.number ? "error" : "primary"}>
            {formWatch("number")}
          </Button>
          <Popover open={!!episodeNumberPopoverAnchorEl} anchorEl={episodeNumberPopoverAnchorEl} onClose={() => setEpisodeNumberPopoverAnchorEl(null)}>
            <TextField register={formRegister} name={"number"} autoFocus type="number" />
          </Popover>
        </Stack>
        <FileSelectInput label={t("Feature.Quick.SeasonCreateForm.selectABackdropImage")} fullWidth onFileSelect={onImageSelect} loading={isLoading} helperText={formErrors.imageId?.message} error={!!formErrors.imageId} />
      </Stack>
      <TextField register={formRegister} name="plotSummary" label={t("Feature.Quick.SeasonCreateForm.plotSummary")} helperText={formErrors.plotSummary?.message} error={!!formErrors.plotSummary} multiline rows={5} fullWidth required />
      <DevTool control={formControl} />
    </Stack>
  );
}
