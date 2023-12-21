import { Hidden, Stack, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { DatePickerModal, Form, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploadComponent from "../ImageUploadComponent";
import EpisodeCardComponent from "./EpisodeCardComponent";
import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";
import { useEffect } from "react";

export interface CreateEpisodeFormFieldType {
  title: string;
  plotSummary: string;
  episodeNo: number;
  releaseDate: number;
}

interface EpisodeCreateStepProps {
  thumbnailSrc: string;
  onSave: (fields: CreateEpisodeFormFieldType) => void;
  onThumbnailSelect: (episode: File) => void;
  isLoading: boolean;
  callSave: boolean;
}

export default function EpisodeCreateStep({ thumbnailSrc, onSave, onThumbnailSelect, isLoading, callSave }: EpisodeCreateStepProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (callSave) {
      handleSubmit(onSave)();
    }
  }, [callSave]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<CreateEpisodeFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: "",
    },
  });

  const inputContainerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
  }));

  const InputArea = (
    <Form onSubmit={handleSubmit(onSave)} sx={inputContainerStyle} gap={2}>
      <Stack direction={{ md: "row", sm: "column" }} gap={2}>
        <TextField register={register} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth />
        <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date)} inputRef={field.ref} value={field.value} label="Release date" views={["year", "month"]} fullWidth />} />
      </Stack>
      <TextField register={register} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth />
      <DevTool control={control} />
    </Form>
  );

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack width={"100%"} gap={2}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button variant="text">{t("Feature.VideoUpload.EpisodeUploadModal.reUsePrevious")}</Button>
        </Stack>
        {InputArea}
        <Stack direction={"row"} gap={2}>
          <ImageUploadComponent isLoading={isLoading} onImageDrop={onThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
          <ImageUploadComponent isLoading={isLoading} onImageDrop={onThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
        </Stack>
        <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={2}>
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
  releaseDate: yup.string().required("Release date is required"),
});
