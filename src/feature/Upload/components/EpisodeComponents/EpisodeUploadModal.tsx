/* eslint-disable react-hooks/exhaustive-deps */
import { MobileStepper, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { ChevronLeftIcon, ChevronRightIcon, FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/useNavigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import { Ref, forwardRef, useImperativeHandle, useMemo, useState } from "react";
import VideoUploadComponent from "../VideoUploadComponent";
import EpisodeCreateStep from "./EpisodeCreateStep";
import { CreateEpisodeFormFieldType } from "../../types";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onEpisodeSelect: (episode: File) => void;
  onThumbnailSelect: (episode: File) => void;
  onCreateEpisode: (input: CreateEpisodeFormFieldType) => void;
  isVideoUploaded: boolean;
  isLoading: boolean;
  thumbnailUrl: string;
  seasonId: string;
  episodeId?: string;
}

export interface EpisodeUploadModalRef {
  onNext: () => void;
}

const EpisodeUploadModal = forwardRef(function EpisodeUploadModal({ isVisible, onClose, onFeedback, onCreateEpisode, isLoading, thumbnailUrl, onEpisodeSelect, onThumbnailSelect, isVideoUploaded, episodeId, seasonId }: EpisodeUploadModalProps, ref: Ref<EpisodeUploadModalRef>) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState<number>(0);

  const isNextButtonDisabled = useMemo(() => {
    if (isVideoUploaded && activeStep === 0) {
      return false;
    }

    return true;
  }, [activeStep]);

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

  const handleOnBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
      step: <EpisodeCreateStep isCreateImageLoading={isLoading} onThumbnailSelect={onThumbnailSelect} isLoading={isLoading} onSave={onCreateEpisode} thumbnailSrc={thumbnailUrl} seasonId={seasonId} />,
    },
  ];

  const dialogFooter = (
    <>
      <Button onClick={onFeedback} variant="text">
        <FeedbackIcon />
      </Button>
      <Button onClick={handleOnMovie} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.EpisodeUploadModal.movie")}
      </Button>
      <Button onClick={handleOnTrailer} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.EpisodeUploadModal.trailer")}
      </Button>
    </>
  );

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={steps[activeStep].label} onClose={onClose} outAreaClose={false} dialogAction={dialogFooter}>
      {steps[activeStep].step}
      <MobileStepper
        variant="progress"
        steps={2}
        position="bottom"
        draggable
        activeStep={activeStep}
        sx={{ width: "100%", flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleOnNext} disabled={isNextButtonDisabled}>
            {t("Feature.VideoUpload.EpisodeUploadModal.next")}
            <ChevronRightIcon />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleOnBack} disabled={activeStep === 0}>
            <ChevronLeftIcon />
            {t("Feature.VideoUpload.EpisodeUploadModal.back")}
          </Button>
        }
      />
    </Dialog>
  );
});

export default EpisodeUploadModal;
