import { Stack, Typography } from "@mui/material";
import SeriesCreateForm from "../components/SeriesCreateForm";
import { SeriesCreateFieldType } from "../types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Elevator } from "@/components/Tags";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { SaveIcon } from "@/components/icons";
import { useCreateMediaImage, useCreateSeries } from "../hooks/queryHooks";
import { extractImageBase64, extractImageMetadata } from "metalyzer";
import { MediaImageTypeEnum } from "@/types/enum";

export default function SeriesCreateScreen() {
  const { t } = useTranslation();
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit: handleOnSubmit,
    setValue: setCreateSeriesFormValue,
    watch: watchCreateSeriesFormValue,
  } = useForm<SeriesCreateFieldType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      mediaTitle: "",
      mediaPlotSummary: DUMMY_PLOT_SUMMARY,
      mediaReleaseDate: new Date().getTime(),
    },
  });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.BACKDROP });
    setCreateSeriesFormValue("mediaImageId", result.createMediaImage.mediaImageId);
  };

  const handleOnCreateEpisode = (input: SeriesCreateFieldType) => {
    createSeriesMutateAsync({
      MediaImageId: watchCreateSeriesFormValue("mediaImageId"),
      MediaBasicInfo: {
        MediaPlotSummary: input.mediaPlotSummary,
        MediaTitle: input.mediaTitle,
        MediaReleaseDate: +input.mediaReleaseDate,
      },
      MediaAdditionalInfo: {},
    });
  };

  const pageHeader = (
    <Elevator p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeriesCreateScreen.createASeries")}</Typography>
      <Stack direction={"row"} gap={1}>
        <Button variant="text">{t("Feature.SeriesManagement.SeriesCreateScreen.back")}</Button>
        <Button loading={isCreateSeriesLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
          {t("Feature.SeriesManagement.SeriesCreateScreen.save")}
        </Button>
      </Stack>
    </Elevator>
  );

  return (
    <Stack>
      {pageHeader}
      <SeriesCreateForm control={control} errors={errors} register={register} onImageSelect={handleOnImageSelect} isLoading={isCreateMediaImageLoading} />
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  mediaTitle: yup.string().required("Title is required"),
  mediaPlotSummary: yup.string().required("Plot summary is required"),
  mediaReleaseDate: yup.string().required("Release date is required"),
  mediaImageId: yup.string().required("Backdrop is required"),
});

const DUMMY_PLOT_SUMMARY = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing ";
