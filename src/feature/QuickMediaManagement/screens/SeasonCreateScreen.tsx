import { Stack, Typography } from "@mui/material";
import SeriesCreateForm from "../components/SeriesCreateForm";
import { SeriesCreateFieldInterface } from "../types";
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
import { DUMMY_PLOT_SUMMARY, DUMMY_RELEASE_DATE } from "../constants";

export default function SeasonCreateScreen() {
  const { t } = useTranslation();
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit: handleOnSubmit,
    setValue: setCreateSeriesFormValue,
  } = useForm<SeriesCreateFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DUMMY_PLOT_SUMMARY,
      releaseDate: DUMMY_RELEASE_DATE,
    },
  });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.BACKDROP });
    setCreateSeriesFormValue("mediaImageId", result.createMediaImage.mediaImageId);
  };

  const handleOnCreateEpisode = (input: SeriesCreateFieldInterface) => {
    createSeriesMutateAsync({
      MediaImageId: input.mediaImageId,
      MediaBasicInfo: {
        MediaPlotSummary: input.plotSummary,
        MediaTitle: input.title,
        MediaReleaseDate: +input.releaseDate,
      },
      MediaAdditionalInfo: {},
    });
  };

  const pageHeader = (
    <Elevator p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
      <Typography variant="h5">{t("Feature.SeriesManagement.SeasonCreateScreen.createASeries")}</Typography>
      <Stack direction={"row"} gap={1}>
        <Button variant="text">{t("Feature.SeriesManagement.SeasonCreateScreen.back")}</Button>
        <Button loading={isCreateSeriesLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
          {t("Feature.SeriesManagement.SeasonCreateScreen.save")}
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
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
  mediaImageId: yup.string().required("Backdrop is required"),
});
