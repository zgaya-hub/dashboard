import Page from "@/components/Page";
import { useState } from "react";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import { useCreateImage, useCreateSeries } from "../hooks";
import { ImageVariantEnum } from "@/types/enum";
import { CardMedia, Grid, Stack, SxProps, Typography } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SeriesCreateFormFieldInterface } from "../types";
import { Elevator } from "@/components/Tags";
import Button from "@/components/Button";
import { SaveIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { DEFAULT_PLOT_SUMMARY, DEFAULT_RELEASE_DATE } from "../constants";
import { SeriesAdditionalInfoForm, SeriesBasicInfoForm, SeriesImageSelectComponent } from "../components";
import useNavigation from "@/navigation/useNavigation";

export default function SeriesCreateScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [backDropUrl, senBackdropUrl] = useState("");
  const { mutateAsync: createSeriesMutateAsync, isPending: isCreateSeriesLoading } = useCreateSeries();
  const { mutateAsync: createImageMutateAsync, isPending: isCreateImageLoading } = useCreateImage();

  const {
    control,
    formState: { errors },
    register: formRegister,
    setValue: setFormValue,
    handleSubmit: handleOnSubmit,
    watch: watchFormValue,
  } = useForm<SeriesCreateFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
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

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    height: "100%",
    minHeight: theme.spacing(16),
    backgroundSize: "contain",
    backgroundPosition: "top",
  }));

  const pageHeader = (
    <Elevator p={2} justifyContent={"space-between"} direction={"row"} gap={1} alignItems={"center"}>
      <Typography variant="h5">{t("Feature.Series.SeriesCreateScreen.createASeries")}</Typography>
      <Stack direction={"row"} gap={1}>
        <Button variant="text">{t("Feature.Series.SeriesCreateScreen.back")}</Button>
        <Button loading={isCreateSeriesLoading} endIcon={<SaveIcon />} variant="contained" onClick={handleOnSubmit(handleOnCreateEpisode)}>
          {t("Feature.Series.SeriesCreateScreen.save")}
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
          <SeriesBasicInfoForm control={control} formRegister={formRegister} errors={errors} />
        </Grid>
        <Grid container justifyContent={"space-between"} rowGap={4} xs={12} lg={5.9}>
          <Grid xs={12} item lg={5.9}>
            <SeriesImageSelectComponent errorMessage={errors.imageId?.message} onImageDrop={handleOnBackdropSelect} isLoading={isCreateImageLoading} />
          </Grid>
          <Grid xs={12} item lg={5.9}>
            <CardMedia sx={cardStyle} image={backDropUrl} />
          </Grid>
        </Grid>
        <Grid xs={12} item lg={5.9}>
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
