import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { lazily } from "react-lazily";
import { SxProps, useMediaQuery } from "@mui/material";
import { convertVideoInBlob, extractVideoMetadata, extractVideoUrl } from "metalyzer";
import { ZgayaHubMediaEnum } from "zgaya.hub-client-types/lib";

import { useSidebarContext } from "@/context/SidebarContext";
import useNavigation from "@/navigation/useNavigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import useTheme from "@/theme/Theme.context";

import { useCreateMovie, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../../hooks";
import { CreateMovieFormFieldType } from "../../types";

const Button = lazy(() => import("@/components/Button"));
const { VideoUploadComponent, MovieCreateStep } = lazily(() => import(".."));
const { Dialog, DialogActions, DialogTitle } = lazily(() => import("@/components/Dialog"));
const { ClearIcon, FeedbackIcon, SdIcon, UploadIcon } = lazily(() => import("@/components/icons"));
const { Box, DialogContent, Divider, Step, StepLabel, Stepper, Typography } = lazily(() => import("@mui/material"));

interface MovieUploadModalProps {
  isVisible: boolean;
  onOpenShareModal: () => void;
  onClose: () => void;
}

export default function MovieUploadModal({ isVisible, onClose, onOpenShareModal }: MovieUploadModalProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const movieRef = useRef<string>("");
  const { handleOnToggleFeedbackSidebar } = useSidebarContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState<number>(0);

  const { mutateAsync: getUploadMovieUrlMutateAsync, isPending: isGetUploadMovieUrlLoading, data: getSignedUrlData } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync, progress } = useUploadVideoOnAwsS3();
  const { mutateAsync: createMovieMutateAsync, isPending: isCreateMovieLoading } = useCreateMovie();

  const isSaveButtonDisabled = useMemo(() => {
    if (progress > 0 && progress < 100) {
      return true;
    }

    return false;
  }, [progress]);

  const handleOnMovieSelect = async (movie: File) => {
    const movieMetadata = await extractVideoMetadata(movie);
    movieRef.current = await extractVideoUrl(movie);
    const result = await getUploadMovieUrlMutateAsync({
      Height: movieMetadata.videoHeight!,
      Width: movieMetadata.videoWidth!,
      MediaType: ZgayaHubMediaEnum.EPISODE,
      Mime: movieMetadata.mimeType,
      RunTime: movieMetadata.videoDuration,
      SizeInKb: movieMetadata.fileSizeKB,
    });
    handleOnNextStep();
    handleOnUploadOnAwsS3(movie, result?.signedUrl!);
  };

  const handleOnCreateMovie = async (input: CreateMovieFormFieldType) => {
    await createMovieMutateAsync({
      ImageId: input.imageId,
      SignedUrlKeyId: getSignedUrlData?.signedUrlKeyId,
      VideoId: getSignedUrlData?.videoId,
      PlotSummary: input.plotSummary,
      Title: input.title,
      ReleaseDate: input.releaseDate,
      AdditionalInfo: {
        Genre: input.genre,
        OriginalLanguage: input.originalLanguage,
        OriginCountry: input.originCountry,
        Status: input.status,
      },
    });
    onOpenShareModal();
    onClose();
  };

  const handleOnUploadOnAwsS3 = async (movie: File, signedUrl: string) => {
    const videoBlob = await convertVideoInBlob(movie);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: videoBlob });
  };

  const handleOnNextStep = () => {
    if (activeStep === 2) return;
    setActiveStep((v) => v + 1);
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    ".MuiDialog-paperWidthXl": {
      [theme.breakpoints.up("md")]: {
        height: theme.spacing(96),
        width: "100%",
      },
    },
  }));

  const steps = [
    {
      label: t("Feature.VideoUpload.MovieUploadModal.uploadMovie"),
      step: <VideoUploadComponent onVideoSelect={handleOnMovieSelect} isLoading={isGetUploadMovieUrlLoading} message={t("Feature.VideoUpload.MovieUploadModal.message")} title={t("Feature.VideoUpload.MovieUploadModal.title")} />,
    },
    {
      label: t("Feature.VideoUpload.MovieUploadModal.enterMovieDetails"),
      step: <MovieCreateStep isLoading={isCreateMovieLoading} onSave={handleOnCreateMovie} isSaveButtonDisabled={isSaveButtonDisabled} movieSource={movieRef.current} />,
    },
  ];

  return (
    <Suspense>
      <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible}>
        <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} >
          {steps[activeStep].label}
          <ClearIcon iconButton={false} onClick={onClose} />
        </DialogTitle>
        <Divider />
        <Box p={2} bgcolor={"Background"}>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <DialogContent>{steps[activeStep].step}</DialogContent>
        <Divider />
        <DialogActions>
          {activeStep === 1 ? (
            <>
              <UploadIcon color="primary" />
              <SdIcon color="primary" />
              <Typography variant="caption">{progress === 100 ? t("Feature.VideoUpload.MovieUploadModal.processComplete", { progress }) : t("Feature.VideoUpload.MovieUploadModal.uploading", { progress })}</Typography>
            </>
          ) : null}
          <Box flex={"1 0 0"} />
          <Button onClick={handleOnToggleFeedbackSidebar} variant="text">
            <FeedbackIcon />
          </Button>
          <Button onClick={() => navigate.navigate("/upload/trailer")} startIcon={<UploadIcon />}>
            {t("Feature.VideoUpload.MovieUploadModal.trailer")}
          </Button>
          <Button onClick={() => navigate.navigate("/upload/movie")} startIcon={<UploadIcon />}>
            {t("Feature.VideoUpload.MovieUploadModal.movie")}
          </Button>
        </DialogActions>
      </Dialog>
    </Suspense>
  );
}
