import Page from "@/components/Page";
import { useState } from "react";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import { useCreateMediaImage, useCreateSeries } from "../hooks/queryHooks";
import { MediaImageTypeEnum } from "@/types/enum";
import { CardMedia, Grid, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SeriesCreateFieldInterface } from "../types";
import { Elevator } from "@/components/Tags";
import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { DUMMY_PLOT_SUMMARY, DUMMY_RELEASE_DATE } from "../constants";
import { SeriesAdditionalInformationForm, SeriesBasicInformationForm, SeriesImageSelectComponent } from "../components";

export default function SeriesCreateScreen() {
  const { t } = useTranslation();
  const [backDropUrl, senBackdropUrl] = useState("");
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createMediaImageMutateAsync, isPending: isCreateMediaImageLoading } = useCreateMediaImage();

  const {
    control,
    formState: { errors },
    register,
    setValue: setCreateSeriesFormValue,
    handleSubmit: handleOnSubmit,
    watch: watchCreateSeriesFormValue,
  } = useForm<SeriesCreateFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      plotSummary: DUMMY_PLOT_SUMMARY,
      releaseDate: DUMMY_RELEASE_DATE,
    },
  });

  const handleOnBackdropSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createMediaImageMutateAsync({ MediaImageBase64: imageBase64, MediaImageMime: mimeType, MediaImageType: MediaImageTypeEnum.BACKDROP });
    senBackdropUrl(await extractImageUrl(image));
    setCreateSeriesFormValue("mediaImageId", result.mediaImageId);
  };

  const handleOnCreateEpisode = (input: SeriesCreateFieldInterface) => {
    createSeriesMutateAsync({
      MediaImageId: input.mediaImageId,
      MediaBasicInfo: {
        MediaPlotSummary: input.plotSummary,
        MediaTitle: input.title,
        MediaReleaseDate: +input.releaseDate,
      },
      MediaAdditionalInfo: {
        MediaGenre: input.genre,
        MediaOriginalLanguage: input.originalLanguage,
        MediaOriginCountry: input.originCountry,
        MediaStatus: input.status,
      },
    });
  };

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    height: "100%",
    minHeight: theme.spacing(16),
    backgroundSize: "contain",
    backgroundPosition: "top",
  }));

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
    <Page>
      <Grid container justifyContent={"space-between"} rowGap={4}>
        <Grid xs={12} item lg={12}>
          {pageHeader}
        </Grid>
        <Grid xs={12} item lg={5.9}>
          <SeriesBasicInformationForm control={control} register={register} errors={errors} />
        </Grid>
        <Grid container justifyContent={"space-between"} rowGap={4} xs={12} lg={5.9}>
          <Grid xs={12} item lg={5.9}>
            <SeriesImageSelectComponent onImageDrop={handleOnBackdropSelect} isLoading={isCreateMediaImageLoading} />
          </Grid>
          <Grid xs={12} item lg={5.9}>
            <CardMedia sx={cardMediaStyle} image={backDropUrl} />
          </Grid>
        </Grid>
        <Grid xs={12} item lg={5.9}>
          <SeriesAdditionalInformationForm setCreateSeriesFormValue={setCreateSeriesFormValue} watchCreateSeriesFormValue={watchCreateSeriesFormValue} />
        </Grid>
      </Grid>
    </Page>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
});
