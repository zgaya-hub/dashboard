import { Grid, Hidden, Stack, SxProps } from "@mui/material";
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

export interface BasicInfoFormFieldType {
  title: string;
  plotSummary: string;
  episodeNo: number;
  releaseDate: number;
}

interface EpisodeCreateBasicInfoStepProps {
  thumbnailSrc: string;
  onSave: (fields: BasicInfoFormFieldType) => void;
  onThumbnailSelect: (episode: File) => void;
  isLoading: boolean;
}

export default function EpisodeCreateBasicInfoStep({ thumbnailSrc, onSave, onThumbnailSelect, isLoading }: EpisodeCreateBasicInfoStepProps) {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<BasicInfoFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: "",
    },
  });

  const handleOnSubmit = (data: BasicInfoFormFieldType) => {
    onSave(data);
  };

  const inputContainerStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
  }));

  const InputArea = (
    <Form onSubmit={handleSubmit(handleOnSubmit)} sx={inputContainerStyle} gap={2}>
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
        <Button> Reuse Previoud template</Button>
        {InputArea}
        <Stack direction={"row"}gap={2} >
          <ImageUploadComponent isLoading={isLoading} onImageDrop={onThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
          <ImageUploadComponent isLoading={isLoading} onImageDrop={onThumbnailSelect} title={t("Feature.VideoUpload.EpisodeUploadModal.imageUploadComponentTitle")} />
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
