import { DialogContent, MobileStepper, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { ChevronLeftIcon, ChevronRightIcon, FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
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
  uploadEpisodeProgress: number;
  isLoading: boolean;
  isCreateEpisodeLoading: boolean;
  thumbnailUrl: string;
}

export default function EpisodeUploadModal({ isVisible, onClose, uploadEpisodeProgress, isCreateEpisodeLoading, onFeedback, onCreateEpisode, isLoading, thumbnailUrl, onEpisodeSelect, onThumbnailSelect }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isInitialCall, setIsInitialCall] = useState<boolean>(false);
  const [shouldCallCreateEpisode, setShouldCallCreateEpisode] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialCall(true);
    if (isInitialCall && !isLoading) {
      handleNext();
    }
  }, [isLoading]);

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailer = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const handleNext = () => {
    if (activeStep === 2) return;
    if (activeStep === 1) {
      setShouldCallCreateEpisode(true);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
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
    "& .MuiDialog-paperWidthXl": {
      background: theme.palette.background.default,
    },
  }));

  const steps = [
    {
      label: t("Feature.VideoUpload.EpisodeUploadModal.uploadEpisode"),
      step: <VideoUploadComponent onVideoSelect={handleOnEpisodeSelect} isLoading={isLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} progress={uploadEpisodeProgress} />,
    },
    {
      label: t("Feature.VideoUpload.EpisodeUploadModal.addBasicInformation"),
      step: <EpisodeCreateStep onThumbnailSelect={onThumbnailSelect} isLoading={isCreateEpisodeLoading} onSave={onCreateEpisode} thumbnailSrc={thumbnailUrl} callSave={shouldCallCreateEpisode} />,
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
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={steps[activeStep].label} onClose={onClose} outAreaClose={false}>
      <DialogContent dividers>{steps[activeStep].step}</DialogContent>
      <MobileStepper
        variant="progress"
        steps={3}
        position="bottom"
        draggable
        activeStep={activeStep}
        sx={{ width: "100%", flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
            {t("Feature.VideoUpload.EpisodeUploadModal.next")}
            <ChevronRightIcon />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <ChevronLeftIcon />
            {t("Feature.VideoUpload.EpisodeUploadModal.back")}
          </Button>
        }
      />
      <DialogAction children={dialogFooter} />
    </Dialog>
  );
}
