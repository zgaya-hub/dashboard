import { lazy } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { lazily } from "react-lazily";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Hidden, Stack } from "@mui/material";
import { extractImageMetadata, extractImageUrl } from "metalyzer";
import * as yup from "yup";
import { ImageVariantEnum } from "zgaya.hub-client-types/lib";

import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../../constants";
import { useCreateImage, useCreateImageByUrl } from "../../hooks";
import { CreateMovieFormFieldType } from "../../types";
import ImageUploadComponent from "../ImageUploadComponent";

const Button = lazy(() => import("@/components/Button"));
const MovieCardComponent = lazy(() => import("./MovieCardComponent"));
const { AttachFileIcon, SaveIcon } = lazily(() => import("@/components/icons"));
const { DatePickerModal, Form, TextField } = lazily(() => import("@/components/Form"));
const MovieAdditionalInfoComponent = lazy(() => import("./MovieAdditionalInfoComponent"));

interface MovieCreateStepProps {
  onSave: (fields: CreateMovieFormFieldType) => void;
  isLoading: boolean;
  isSaveButtonDisabled: boolean;
  movieSource: string;
}

export default function MovieCreateStep({ onSave, isLoading, isSaveButtonDisabled, movieSource }: MovieCreateStepProps) {
  const { t } = useTranslation();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();
  const { mutateAsync: createImageByUrlMutateAsync, isPending: isCreateImageByUrlLoading } = useCreateImageByUrl();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register: formRegister,
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

  const handleOnThumbnailSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = URL.createObjectURL(image);
    setFormValue("thumbnailUrl", await extractImageUrl(image));
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType });
    setFormValue("imageId", result?.ID);
  };

  const handleOnSubmit = async () => {
    if (!watch("imageId") && watch("thumbnailUrl")) {
      const result = await createImageByUrlMutateAsync({
        Url: watch("thumbnailUrl"),
        Variant: ImageVariantEnum.THUMBNAIL,
      });
      setFormValue("imageId", result.ID);
    }
    handleSubmit(onSave)();
  };

  return (
    <Stack direction={"row"} gap={2} height={"100%"}>
      <Stack width={"100%"} gap={2}>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button variant="text">{t("Feature.VideoUpload.MovieUploadModal.reUsePrevious")}</Button>
        </Stack>
        <Form onSubmit={handleOnSubmit} gap={2}>
          <Stack direction={{ md: "row", sm: "column" }} gap={2}>
            <TextField register={formRegister} name="title" label="Title" helperText={errors.title?.message} error={!!errors.title} fullWidth required />
            <DatePickerModal register={formRegister} name="releaseDate" label="Release date" views={["year", "month"]} fullWidth />
          </Stack>
          <TextField register={formRegister} name="plotSummary" label="Plot summary" helperText={errors.plotSummary?.message} error={!!errors.plotSummary} multiline rows={5} fullWidth required />
          <Stack direction={"row"} alignItems={"flex-end"} gap={2}>
            <ImageUploadComponent isLoading={isCreateImageLoading} onImageSelect={handleOnThumbnailSelect} title={t("Feature.VideoUpload.MovieUploadModal.imageUploadComponentTitle")} errorMessage={errors.imageId?.message} />
            <TextField register={formRegister} name="thumbnailUrl" size="small" endIcon={<AttachFileIcon fontSize="inherit" loading={isCreateImageByUrlLoading} />} label="Image url" />
          </Stack>
          <DevTool control={control} />
        </Form>
        <MovieAdditionalInfoComponent formRegister={formRegister} setFormValue={setFormValue} watchFormValue={watch} />
        <Stack direction={"row"} mt={"auto"} justifyContent={"end"} gap={1}>
          <Button variant="text">{t("Feature.VideoUpload.MovieUploadModal.cancel")}</Button>
          <Button loading={isLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit} disabled={isLoading || isSaveButtonDisabled}>
            {t("Feature.VideoUpload.MovieUploadModal.next")}
          </Button>
        </Stack>
      </Stack>
      <Hidden mdDown>
        <MovieCardComponent title={watch("title")} plotSummary={watch("plotSummary")} source={movieSource} />
      </Hidden>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.number().required("Release date is required"),
  imageId: yup.string().required("Thumbnail must required"),
  status: yup.string().required("Status is required"),
});
