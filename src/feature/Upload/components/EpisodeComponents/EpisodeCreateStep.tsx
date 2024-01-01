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
import { useEffect, useState } from "react";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../../constants";
import { useGetNextEpisodeNumber } from "../../hooks";

export interface CreateEpisodeFormFieldType {
  title: string;
  plotSummary: string;
  releaseDate: number;
  number: number;
}

interface EpisodeCreateStepProps {
  thumbnailSrc: string;
  onSave: (fields: CreateEpisodeFormFieldType) => void;
  onThumbnailSelect: (episode: File) => void;
  isLoading: boolean;
  isCreateImageLoading: boolean;
  seasonId: string;
}

export default function EpisodeCreateStep({ thumbnailSrc, onSave, onThumbnailSelect, isLoading, isCreateImageLoading, seasonId }: EpisodeCreateStepProps) {
  const { t } = useTranslation();
  const [episodeNumberPopoverAnchorEl, setEpisodeNumberPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: nextSeasonNumberData } = useGetNextEpisodeNumber({ SeasonId: seasonId });

  useEffect(() => {
    if (nextSeasonNumberData) {
      setEpisodeFormValue("number", nextSeasonNumberData.number);
    }
  }, [nextSeasonNumberData]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue: setEpisodeFormValue,
    watch,
  } = useForm<CreateEpisodeFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
      number: 1,
    },
  });

  const renderForm = (
    <Form onSubmit={handleSubmit(onSave)} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth required />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label="Release date" views={["year", "month"]} fullWidth />} />
        <Popover open={!!episodeNumberPopoverAnchorEl} anchorEl={episodeNumberPopoverAnchorEl} onClose={() => setEpisodeNumberPopoverAnchorEl(null)}>
          <TextField register={register} name={"number"} autoFocus type="number" />
        </Popover>
        <Button onClick={(event) => setEpisodeNumberPopoverAnchorEl(event.currentTarget)} color={errors.number ? "error" : "primary"}>
          {watch("number")}
        </Button>
      </Stack>
      <TextField register={register} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
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
        <ImageUploadComponent isLoading={isCreateImageLoading} onImageDrop={onThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
        <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={1}>
          <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.cancel")}</Button>
          <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleSubmit(onSave)}>
            {t("Feature.VideoUpload.EpisodeUploadModal.next")}
          </Button>
        </Stack>
      </Stack>
      <Hidden mdDown>
        <EpisodeCardComponent title={watch("title")} plotSummary={watch("plotSummary")} thumbnail={thumbnailSrc} />
      </Hidden>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.number().required("Release date is required"),
  number: yup.number().required("Episode number must one or up").min(1),
});
