import { lazy, useEffect, useState } from "react";
import Page from "@/components/Page";
import { lazily } from "react-lazily";
import { useLocation } from "@/navigation";
import { useTranslation } from "react-i18next";
import { MovieAdditionalInfoForm, MovieUploadModal } from "../components";
import { useChangeImageByMediaId, useGetMovieDataForUpdateForm, useUpdateMovie } from "../hooks";
import { DevTool } from "@hookform/devtools";
import { MovieUpdateFormFieldInterface } from "../types";
import { useForm } from "react-hook-form";
import useNavigation from "@/navigation/useNavigation";
import { FileSelectInput } from "@/components/Form";
import { CardMedia, DialogContentText, LinearProgress, SxProps } from "@mui/material";
import { ConfirmationModal } from "@/components/Modals";
import { extractImageBase64, extractImageMetadata, extractImageUrl } from "metalyzer";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

const Button = lazy(() => import("@/components/Button"));
const { SaveIcon } = lazily(() => import("@/components/icons"));
const { MovieUpdateForm } = lazily(() => import("../components"));
const { Box, Grid, Paper, Stack, Toolbar, Typography } = lazily(() => import("@mui/material"));

export default function MovieUpdateScreen() {
  const { movieId } = useLocation("/movie/update");
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isImageChangeConfirmationModalVisible, setisImageChangeConfirmationModalVisible] = useState(false);
  const [movieUploadModalVisible, setMovieUploadModalVisible] = useState(false);

  const { data: movieDataForUpdateFormData, isLoading: isMovieDataLoading } = useGetMovieDataForUpdateForm({ MovieId: movieId });
  const { mutateAsync: updateMovieMutateAsync, isPending: isUpdateMovieLoading } = useUpdateMovie();
  const { mutateAsync: changeImageMutateAsync, isPending: isChangeImageLoading } = useChangeImageByMediaId();

  const { setValue: setFormValue, handleSubmit: formSubmit, control: formControl, watch: watchFormValue } = useForm<MovieUpdateFormFieldInterface>();

  useEffect(() => {
    if (movieDataForUpdateFormData) {
      setFormValue("genre", movieDataForUpdateFormData.genre);
      setFormValue("originCountry", movieDataForUpdateFormData.originCountry);
      setFormValue("originalLanguage", movieDataForUpdateFormData.originalLanguage);
      setFormValue("releaseDate", movieDataForUpdateFormData.releaseDate);
      setFormValue("plotSummary", movieDataForUpdateFormData.plotSummary);
      setFormValue("status", movieDataForUpdateFormData.status);
      setFormValue("thumbnailUrl", movieDataForUpdateFormData.thumbnailUrl);
      setFormValue("title", movieDataForUpdateFormData.title);
      setThumbnailUrl(movieDataForUpdateFormData.thumbnailUrl);
    }
  }, [movieDataForUpdateFormData]);

  const handleOnImageUploadConfirm = async () => {
    const { mimeType } = await extractImageMetadata(watchFormValue("image"));
    const imageBase64 = await extractImageBase64(watchFormValue("image"));
    setThumbnailUrl(await extractImageUrl(watchFormValue("image")));
    await changeImageMutateAsync({ MediaId: movieId }, { Base64: imageBase64, Mime: mimeType });
  };

  const handleOnUpdateMovie = async (input: MovieUpdateFormFieldInterface) => {
    await updateMovieMutateAsync(
      {
        MovieId: movieId,
      },
      {
        AdditionalInfo: {
          Genre: input.genre,
          OriginalLanguage: input.originalLanguage,
          OriginCountry: input.originCountry,
          Status: input.status,
        },
        PlotSummary: input.plotSummary,
        ReleaseDate: input.releaseDate,
        Title: input.title,
      }
    );
    navigation.goBack();
  };

  const handleOnImageSelect = (image: File) => {
    setFormValue("image", image);
    handleOnToggleImageChangeConfimationModal();
  };

  const handleOnToggleImageChangeConfimationModal = () => {
    setisImageChangeConfirmationModalVisible(!isImageChangeConfirmationModalVisible);
  };

  const handleOnToggleMovieUploadModal = () => {
    setMovieUploadModalVisible(!movieUploadModalVisible);
  };

  return (
    <Page isSuspense>
      <Grid container gap={2}>
        <Grid xs={12} item>
          <Toolbar component={Paper}>
            <Typography variant="h5">{t("Feature.Series.SeriesCreateScreen.createASeries")}</Typography>
            <Box flex="1 0 0" />
            <Stack direction={"row"} gap={1}>
              <Button variant="text">{t("Feature.Series.SeriesCreateScreen.back")}</Button>
              <Button endIcon={<SaveIcon />} variant="contained" onClick={formSubmit(handleOnUpdateMovie)} loading={isUpdateMovieLoading}>
                {t("Feature.Series.SeriesCreateScreen.save")}
              </Button>
            </Stack>
          </Toolbar>
          {isMovieDataLoading ? <LinearProgress /> : null}
        </Grid>
        <Grid xs={12} lg={5.9} container rowGap={2}>
          <MovieUpdateForm formControl={formControl} />
        </Grid>
        <Grid xs={12} lg={5.9} container>
          <Grid component={Paper} p={2} xs={12} md={5.9}>
            <FileSelectInput loading={isChangeImageLoading} onFileSelect={handleOnImageSelect} fullWidth />
            <CardMedia component={"img"} src={thumbnailUrl} />
          </Grid>
          <Grid flexDirection={"row"} justifyContent={"flex-end"} item p={2} xs={12} md={5.9}>
            <Button onClick={handleOnToggleMovieUploadModal}>
              {/* TODO: add text by i18n */}
              Change movie
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12} lg={5.9} container rowGap={2}>
          <MovieAdditionalInfoForm formControl={formControl} setFormValue={setFormValue} watchFormValue={watchFormValue} />
        </Grid>
      </Grid>

      {/* Modals */}
      <DevTool control={formControl} />
      <ConfirmationModal isOpen={isImageChangeConfirmationModalVisible} onClose={handleOnToggleImageChangeConfimationModal} onConfirm={handleOnImageUploadConfirm} title={t("Feature.Quick.SeriesUpdateForm.changeImageWarningModalTitle")} footerText={t("Feature.Quick.SeriesUpdateForm.changeImageWarningModalSuggestion")}>
        <DialogContentText mb={2}>{t("Feature.Quick.SeriesUpdateForm.changeImageWarningModalMessage")}</DialogContentText>
      </ConfirmationModal>
      <MovieUploadModal isVisible={movieUploadModalVisible} onClose={handleOnToggleMovieUploadModal} movieId={movieId} />
    </Page>
  );
}
