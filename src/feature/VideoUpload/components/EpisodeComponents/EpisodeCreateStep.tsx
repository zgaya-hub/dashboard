import { Hidden, Popover, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { DatePickerModal, Form, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploadComponent from "../ImageUploadComponent";
import EpisodeCardComponent from "./EpisodeCardComponent";
import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";
import * as yup from "yup";
import { useState } from "react";
import { DUMMY_PLOT_SUMMARY, DUMMY_RELEASE_DATE } from "../../constants";

export interface CreateEpisodeFormFieldType {
  mediaTitle: string;
  mediaPlotSummary: string;
  mediaReleaseDate: number;
  episodeNumber: number;
}

interface EpisodeCreateStepProps {
  thumbnailSrc: string;
  onSave: (fields: CreateEpisodeFormFieldType) => void;
  onThumbnailSelect: (episode: File) => void;
  isLoading: boolean;
  isCreateMediaImageLoading: boolean;
}

export default function EpisodeCreateStep({ thumbnailSrc, onSave, onThumbnailSelect, isLoading, isCreateMediaImageLoading }: EpisodeCreateStepProps) {
  const { t } = useTranslation();
  const [episodeNumberPopoverAnchorEl, setEpisodeNumberPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEpisodeNumberPopoverAnchorEl(event.currentTarget);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<CreateEpisodeFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      mediaTitle: "",
      mediaPlotSummary: DUMMY_PLOT_SUMMARY,
      mediaReleaseDate: DUMMY_RELEASE_DATE,
      episodeNumber: 1,
    },
  });

  const renderForm = (
    <Form onSubmit={handleSubmit(onSave)} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="mediaTitle" label="Title" helperText={errors.mediaTitle?.message} error={!!errors.mediaTitle} fullWidth required />
        <Controller control={control} name="mediaReleaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label="Release date" views={["year", "month"]} fullWidth />} />
        <Popover open={!!episodeNumberPopoverAnchorEl} anchorEl={episodeNumberPopoverAnchorEl} onClose={() => setEpisodeNumberPopoverAnchorEl(null)}>
          <TextField register={register} name={"episodeNumber"} autoFocus type="number" />
        </Popover>
        <Button onClick={handleClick} color={errors.episodeNumber ? "error" : "primary"}>
          {watch("episodeNumber")}
        </Button>
      </Stack>
      <TextField register={register} name="mediaPlotSummary" label="Plot summary" helperText={errors.mediaPlotSummary?.message} error={!!errors.mediaPlotSummary} multiline rows={5} fullWidth required />
      <DevTool control={control} />
    </Form>
  );

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack width={"100%"} gap={2}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.reUsePrevious")}</Button>
        </Stack>
        {renderForm}
        <ImageUploadComponent isLoading={isCreateMediaImageLoading} onImageDrop={onThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
        <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={1}>
          <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.cancel")}</Button>
          <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleSubmit(onSave)}>
            {t("Feature.VideoUpload.EpisodeUploadModal.next")}
          </Button>
        </Stack>
      </Stack>
      <Hidden mdDown>
        <EpisodeCardComponent title={watch("mediaTitle")} plotSummary={watch("mediaPlotSummary")} thumbnail={thumbnailSrc} />
      </Hidden>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  mediaPlotSummary: yup.string().required("Plot summary is required"),
  mediaReleaseDate: yup.number().required("Release date is required"),
  episodeNumber: yup.number().required("Episode number must one or up").min(1),
});
