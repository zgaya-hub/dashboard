/* eslint-disable react-hooks/exhaustive-deps */
import { Box, DialogContent, Divider, Step, StepLabel, Stepper, SxProps, Typography, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog, DialogTitle } from "@/components/Dialog";
import { ClearIcon, FeedbackIcon, SdIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/useNavigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import { Ref, forwardRef, useImperativeHandle, useMemo, useState } from "react";
import VideoUploadComponent from "../VideoUploadComponent";
import { CreateMovieFormFieldType } from "../../types";
import DialogActions from "@/components/Dialog/DialogActions";
import MovieCreateStep from "./MovieCreateStep";

interface MovieUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onMovieSelect: (episode: File) => void;
  onThumbnailSelect: (episode: File) => void;
  onCreateMovie: (input: CreateMovieFormFieldType) => void;
  isLoading: boolean;
  progress: number;
}

export interface MovieUploadModalRef {
  onNext: () => void;
}

const MovieUploadModal = forwardRef(function MovieUploadModal({ isVisible, onClose, onFeedback, onCreateMovie, isLoading, onMovieSelect, onThumbnailSelect, progress }: MovieUploadModalProps, ref: Ref<MovieUploadModalRef>) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState<number>(0);

  const isSaveButtonDisabled = useMemo(() => {
    if (progress > 0 && progress < 100) {
      return true;
    }

    return false;
  }, [progress]);

  useImperativeHandle(ref, () => ({
    onNext: handleOnNext,
  }));

  const handleOnTrailer = () => {
    navigate.navigate("/upload/trailer");
  };

  const handleOnEpisode = () => {
    navigate.navigate("/upload/episode");
  };

  const handleOnNext = () => {
    if (activeStep === 2) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOnMovieSelect = (episode: File) => {
    onMovieSelect(episode);
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
      step: <VideoUploadComponent onVideoSelect={handleOnMovieSelect} isLoading={isLoading} message={t("Feature.VideoUpload.MovieUploadModal.message")} title={t("Feature.VideoUpload.MovieUploadModal.title")} />,
    },
    {
      label: t("Feature.VideoUpload.MovieUploadModal.enterMovieDetails"),
      step: <MovieCreateStep isCreateImageLoading={isLoading} isLoading={isLoading} onSave={onCreateMovie} isSaveButtonDisabled={isSaveButtonDisabled} />,
    },
  ];

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible}>
      <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} displayPrint={"block"}>
        {steps[activeStep].label}
        <ClearIcon onClick={onClose} />
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
        <Button onClick={onFeedback} variant="text">
          <FeedbackIcon />
        </Button>
        <Button onClick={handleOnTrailer} startIcon={<UploadIcon />}>
          {t("Feature.VideoUpload.MovieUploadModal.trailer")}
        </Button>
        <Button onClick={handleOnEpisode} startIcon={<UploadIcon />}>
          {t("Feature.VideoUpload.MovieUploadModal.episode")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default MovieUploadModal;
