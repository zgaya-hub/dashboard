/* eslint-disable react-hooks/exhaustive-deps */
import { DialogContent, MobileStepper, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { ChevronLeftIcon, ChevronRightIcon, FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import { useState } from "react";
import VideoUploadComponent from "../VideoUploadComponent";
import EpisodeCreateStep, { CreateEpisodeFormFieldType } from "./EpisodeCreateStep";
import DialogAction from "@/components/Dialog/DialogAction";
import EpisodeCreateAdditionalInfoStep from "./EpisodeCreateAdditionalInfoStep";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onEpisodeSelect: (episode: File) => void;
  onThumbnailSelect: (episode: File) => void;
  onCreateEpisode: (input: CreateEpisodeFormFieldType) => void;
  isLoading: boolean;
  thumbnailUrl: string;
}

export default function EpisodeUploadModal({ isVisible, onClose, onFeedback, onCreateEpisode, isLoading, thumbnailUrl, onEpisodeSelect, onThumbnailSelect }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState<number>(0);

  // TODO: this will need to be redirect to next tab i will work on it soon
  /*   useEffect(() => {
    setIsInitialCall(true);
    if (isInitialCall && !isLoading) {
      handleOnNext();
    }
  }, [isLoading]); */

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailer = () => {
    navigate.navigate("/video-upload/trailer");
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
      label: t("Feature.VideoUpload.EpisodeUploadModal.addBasicInformation"),
      step: <EpisodeCreateStep onThumbnailSelect={onThumbnailSelect} isLoading={isLoading} onSave={onCreateEpisode} thumbnailSrc={thumbnailUrl} />,
    },
    {
      label: t("Feature.VideoUpload.EpisodeUploadModal.addAdditionalInformation"),
      step: <EpisodeCreateAdditionalInfoStep />,
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
        steps={3}
        position="bottom"
        draggable
        activeStep={activeStep}
        sx={{ width: "100%", flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleOnNext} disabled={activeStep > 0}>
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
}
