import { lazily } from "react-lazily";
import { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, SxProps, Toolbar } from "@mui/material";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import * as yup from "yup";
import { ImageVariantEnum } from "zgaya.hub-client-types/lib";
import useNavigation from "@/navigation/useNavigation";
import Page from "@/components/Page";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../constants";
import { useCreateImage, useCreateSeries } from "../hooks";
import { SeriesCreateFormFieldInterface } from "../types";

const Button = lazy(() => import("@/components/Button"));
const { SaveIcon } = lazily(() => import("@/components/icons"));
const { SeriesAdditionalInfoForm, SeriesBasicInfoForm, SeriesImageSelectComponent } = lazily(() => import("../components"));
const { CardMedia, Grid, Stack, Typography, Paper } = lazily(() => import("@mui/material"));

export default function SeriesCreateScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [backDropUrl, senBackdropUrl] = useState("");
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  const {
    control: formControl,
    formState: { errors },
    register: formRegister,
    setValue: setFormValue,
    handleSubmit: handleOnSubmit,
    watch: watchFormValue,
  } = useForm<SeriesCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      plotSummary: DEFAULT_PLOT_SUMMARY,
      releaseDate: DEFAULT_RELEASE_DATE,
    },
  });

  const handleOnBackdropSelect = async (image: File) => {
    const { mimeType } = await extractImageMetadata(image);
    const imageBase64 = await extractImageBase64(image);
    const result = await createImageMutateAsync({ Base64: imageBase64, Mime: mimeType, Variant: ImageVariantEnum.BACKDROP });
    if (result) {
      senBackdropUrl(await extractImageUrl(image));
      setFormValue("imageId", result.ID);
    }
  };

  const handleOnCreateEpisode = async (input: SeriesCreateFormFieldInterface) => {
    await createSeriesMutateAsync({
      ImageId: input.imageId,
      PlotSummary: input.plotSummary,
      Title: input.title,
      ReleaseDate: +input.releaseDate,
      AdditionalInfo: {
        Genre: input.genre,
        OriginalLanguage: input.originalLanguage,
        OriginCountry: input.originCountry,
        Status: input.status,
      },
    });
    navigation.goBack();
  };

  const fileSelectInputContainerStyle: SxProps = {
    "& .appear-item": {
      display: "none",
    },
    "&:hover .appear-item": {
      display: "block",
    },
  };

  return (
    <Page isSuspense>
      <Grid container justifyContent={"space-between"} rowGap={2}>
        <Grid xs={12} item lg={12}>
          <Toolbar component={Paper}>
            <Typography variant="h5">{t("Feature.Series.SeriesCreateScreen.createASeries")}</Typography>
            <Box flex="1 0 0" />
            <Stack direction={"row"} gap={1}>
              <Button variant="text">{t("Feature.Series.SeriesCreateScreen.back")}</Button>
              <Button loading={isCreateSeriesLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
                {t("Feature.Series.SeriesCreateScreen.save")}
              </Button>
            </Stack>
          </Toolbar>
        </Grid>
        <Grid xs={12} item lg={5.9}>
          <SeriesBasicInfoForm control={formControl} formRegister={formRegister} errors={errors} />
        </Grid>
        <Grid container justifyContent={"space-between"} rowGap={2} xs={12} lg={5.9}>
          <Grid xs={12} item lg={5.9} sx={fileSelectInputContainerStyle} position={"relative"}>
            <SeriesImageSelectComponent errorMessage={errors.imageId?.message} onImageDrop={handleOnBackdropSelect} isLoading={isCreateImageLoading} />
            <CardMedia sx={{ position: "absolute" }} component="img" className="appear-item" image={backDropUrl} />
          </Grid>
        </Grid>
        <Grid xs={12} item lg={5.9} rowGap={2}>
          <SeriesAdditionalInfoForm setFormValue={setFormValue} watchFormValue={watchFormValue} formRegister={formRegister} />
        </Grid>
      </Grid>
    </Page>
  );
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  plotSummary: yup.string().required("Plot summary is required"),
  releaseDate: yup.string().required("Release date is required"),
  imageId: yup.string().required("Backdrop image is required"),
});
