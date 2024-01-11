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
import EpisodeCreateStep from "./EpisodeCreateStep";
import { CreateEpisodeFormFieldType } from "../../types";
import DialogActions from "@/components/Dialog/DialogActions";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onEpisodeSelect: (episode: File) => void;
  onThumbnailSelect: (episode: File) => void;
  onCreateEpisode: (input: CreateEpisodeFormFieldType) => void;
  isLoading: boolean;
  thumbnailUrl: string;
  seasonId: string;
  progress: number;
}

export interface EpisodeUploadModalRef {
  onNext: () => void;
}

const EpisodeUploadModal = forwardRef(function EpisodeUploadModal({ isVisible, onClose, onFeedback, onCreateEpisode, isLoading, thumbnailUrl, onEpisodeSelect, onThumbnailSelect, progress, seasonId }: EpisodeUploadModalProps, ref: Ref<EpisodeUploadModalRef>) {
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

  const handleOnMovie = () => {
    navigate.navigate("/upload/movie");
  };

  const handleOnTrailer = () => {
    navigate.navigate("/upload/trailer");
  };

  const handleOnNext = () => {
    if (activeStep === 2) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOnEpisodeSelect = (episode: File) => {
    onEpisodeSelect(episode);
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
      label: t("Feature.VideoUpload.EpisodeUploadModal.uploadEpisode"),
      step: <VideoUploadComponent onVideoSelect={handleOnEpisodeSelect} isLoading={isLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} />,
    },
    {
      label: t("Feature.VideoUpload.EpisodeUploadModal.enterEpisodeDetails"),
      step: <EpisodeCreateStep isCreateImageLoading={isLoading} onThumbnailSelect={onThumbnailSelect} isLoading={isLoading} onSave={onCreateEpisode} thumbnailSrc={thumbnailUrl} seasonId={seasonId} isSaveButtonDisabled={isSaveButtonDisabled} />,
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
            <Typography variant="caption">{progress === 100 ? t("Feature.VideoUpload.EpisodeUploadModal.processComplete", { progress }) : t("Feature.VideoUpload.EpisodeUploadModal.uploading", { progress })}</Typography>
          </>
        ) : null}
        <Box flex={"1 0 0"} />
        <Button onClick={onFeedback} variant="text">
          <FeedbackIcon />
        </Button>
        <Button onClick={handleOnMovie} startIcon={<UploadIcon />}>
          {t("Feature.VideoUpload.EpisodeUploadModal.movie")}
        </Button>
        <Button onClick={handleOnTrailer} startIcon={<UploadIcon />}>
          {t("Feature.VideoUpload.EpisodeUploadModal.trailer")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EpisodeUploadModal;
