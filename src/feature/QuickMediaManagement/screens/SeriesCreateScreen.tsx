import { Stack, Typography } from "@mui/material";
import SeriesCreateForm from "../components/SeriesCreateForm";
import { SeriesCreateFormFieldInterface } from "../types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Elevator } from "@/components/Tags";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { SaveIcon } from "@/components/icons";
import { useCreateMediaImage, useCreateSeries } from "../hooks";
import { extractImageBase64, extractImageMetadata } from "metalyzer";
import { MediaImageVariantEnum } from "@/types/enum";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../constants";

export default function SeriesCreateScreen() {
  const { t } = useTranslation();
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateMediaImage();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit: handleOnSubmit,
    setValue: setCreateSeriesFormValue,
    watch: watchCreateSeriesFormValue,
  } = useForm<SeriesCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
    },
  });

  const handleOnImageSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: MediaImageVariantEnum.BACKDROP });
    if (result) {
      setCreateSeriesFormValue("mediaImageId", result.ID);
    }
  };

  const handleOnCreateEpisode = async (input: SeriesCreateFormFieldInterface) => {
    await createSeriesMutateAsync({
      MediaImageId: watchCreateSeriesFormValue("mediaImageId"),
      MediaBasicInfo: {
        PlotSummary: input.plotSummary,
        Title: input.title,
        ReleaseDate: +input.releaseDate,
      },
      MediaAdditionalInfo: {},
    });
    window.close();
  };

  const pageHeader = (
    <Elevator p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
      <Typography variant="h5">{t("Feature.QuickMediaManagement.SeriesCreateScreen.createASeries")}</Typography>
      <Stack direction={"row"} gap={1}>
        <Button variant="text">{t("Feature.QuickMediaManagement.SeriesCreateScreen.back")}</Button>
        <Button loading={isCreateSeriesLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
          {t("Feature.QuickMediaManagement.SeriesCreateScreen.save")}
        </Button>
      </Stack>
    </Elevator>
  );

  return (
    <Stack>
      {pageHeader}
      <SeriesCreateForm control={control} errors={errors} register={register} onImageSelect={handleOnImageSelect} isLoading={isCreateImageLoading} />
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
  mediaImageId: yup.string().required("Backdrop is required"),
});
