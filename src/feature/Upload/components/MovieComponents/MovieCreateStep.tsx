import { Hidden, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { DatePickerModal, Form, TextField } from "@/components/Form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploadComponent from "../ImageUploadComponent";
import MovieCardComponent from "./MovieCardComponent";
import Button from "@/components/Button";
import { AttachFileIcon, SaveIcon } from "@/components/icons";
import * as yup from "yup";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../../constants";
import { CreateMovieFormFieldType } from "../../types";
import MovieAdditionalInfoComponent from "./MovieAdditionalInfoComponent";
import { useCreateImage } from "../../hooks";

interface MovieCreateStepProps {
  onSave: (fields: CreateMovieFormFieldType) => void;
  isLoading: boolean;
  isSaveButtonDisabled: boolean;
}

export default function MovieCreateStep({ onSave, isLoading, isSaveButtonDisabled }: MovieCreateStepProps) {
  const { t } = useTranslation();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue: setFormValue,
  } = useForm<CreateMovieFormFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
    },
  });

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack width={"100%"} gap={2}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button variant="text">{t("Feature.VideoUpload.MovieUploadModal.reUsePrevious")}</Button>
        </Stack>
        <Form onSubmit={handleSubmit(onSave)} gap={2}>
          <Stack direction={{ md: "row", sm: "column" }} gap={2}>
            <TextField register={register} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth required />
            <Controller control={control} name="releaseDate" rules={{ required: true }} render={({ field }) => <DatePickerModal onChange={(date) => field.onChange(date?.getTime())} inputRef={field.ref} value={new Date(field.value)} label="Release date" views={["year", "month"]} fullWidth />} />
          </Stack>
          <TextField register={register} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
          <Stack direction={"row"} alignItems={"flex-end"} gap={2}>
            <ImageUploadComponent isLoading={isCreateImageLoading} onImageSelect={onThumbnailSelect} title={t("Feature.VideoUpload.MovieUploadModal.imageUploadComponentTitle")} />
            <TextField register={register} name="title" size="small" startIcon={<AttachFileIcon fontSize="inherit" />} label="Image url" />
          </Stack>
          <DevTool control={control} />
        </Form>
        <MovieAdditionalInfoComponent formRegister={register} setFormValue={setFormValue} watchFormValue={watch} />
        <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={1}>
          <Button variant="text">{t("Feature.VideoUpload.MovieUploadModal.cancel")}</Button>
          <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleSubmit(onSave)} disabled={isSaveButtonDisabled}>
            {t("Feature.VideoUpload.MovieUploadModal.next")}
          </Button>
        </Stack>
      </Stack>
      <Hidden mdDown>
        <MovieCardComponent title={watch("title")} plotSummary={watch("plotSummary")} thumbnail={thumbnailSrc} />
      </Hidden>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.number().required("Release date is required"),
});
