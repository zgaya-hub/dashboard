import { lazy, Suspense, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { lazily } from "react-lazily";
import { SxProps, useMediaQuery } from "@mui/material";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { ZgayaHubMediaEnum } from "zgaya.hub-client-types/lib";

import { useSidebarContext } from "@/context/SidebarContext";
import useNavigation from "@/navigation/useNavigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import useTheme from "@/theme/Theme.context";

import { useCreateEpisode, useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../../hooks";
import { CreateEpisodeFormFieldType } from "../../types";

const { Box, DialogContent, Divider, Step, StepLabel, Stepper, Typography } = lazily(() => import("@mui/material"));
const { ClearIcon, FeedbackIcon, SdIcon, UploadIcon } = lazily(() => import("@/components/icons"));
const VideoUploadComponent = lazy(() => import("../VideoUploadComponent"));
const EpisodeCreateStep = lazy(() => import("./EpisodeCreateStep"));
const Button = lazy(() => import("@/components/Button"));
const { Dialog, DialogTitle, DialogActions } = lazily(() => import("@/components/Dialog"));

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onOpenShareModal: () => void;
  seasonId: string;
}

export default function EpisodeUploadModal({ isVisible, onClose, seasonId, onOpenShareModal }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigation();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { handleOnToggleFeedbackSidebar } = useSidebarContext();
  const [activeStep, setActiveStep] = useState<number>(0);

  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending: isGetUploadEpisodeUrlLoading, data: getSignedUrlData } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync, progress } = useUploadVideoOnAwsS3();
  const { mutateAsync: createEpisodeMutateAsync, isPending: isCreateEpisodeLoading } = useCreateEpisode();

  const isSaveButtonDisabled = useMemo(() => {
    if (progress > 0 && progress < 100) {
      return true;
    }
    return false;
  }, [progress]);

  const handleOnEpisodeSelect = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    const result = await getUploadEpisodeUrlMutateAsync({
      Height: episodeMetadata.videoHeight!,
      Width: episodeMetadata.videoWidth!,
      MediaType: ZgayaHubMediaEnum.EPISODE,
      Mime: episodeMetadata.mimeType,
      RunTime: episodeMetadata.videoDuration,
      SizeInKb: episodeMetadata.fileSizeKB,
    });
    handleOnNextStep();
    handleOnUploadOnAwsS3(episode, result?.signedUrl!);
  };

  const handleOnCreateEpisode = async (input: CreateEpisodeFormFieldType) => {
    await createEpisodeMutateAsync({
      Number: input.number,
      ImageId: input.imageId,
      SeasonId: seasonId,
      SignedUrlKeyId: getSignedUrlData?.signedUrlKeyId,
      VideoId: getSignedUrlData?.videoId,
      PlotSummary: input.plotSummary,
      Title: input.title,
      ReleaseDate: input.releaseDate,
    });
    onOpenShareModal();
    onClose();
  };

  const handleOnUploadOnAwsS3 = async (episode: File, signedUrl: string) => {
    const videoBlob = await convertVideoInBlob(episode);
    await uploadVideoOnAwsS3MutateAsync({ SignedUrl: signedUrl, VideoBlob: videoBlob });
  };

  const handleOnNextStep = () => {
    if (activeStep === 1) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
      step: <VideoUploadComponent onVideoSelect={handleOnEpisodeSelect} isLoading={isGetUploadEpisodeUrlLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} />,
    },
    {
      label: t("Feature.VideoUpload.EpisodeUploadModal.enterEpisodeDetails"),
      step: <EpisodeCreateStep isLoading={isCreateEpisodeLoading} onSave={handleOnCreateEpisode} seasonId={seasonId} isSaveButtonDisabled={isSaveButtonDisabled} />,
    },
  ];

  return (
    <Suspense>
      <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible}>
        <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} displayPrint={"block"}>
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
              <Typography variant="caption">{progress === 100 ? t("Feature.VideoUpload.EpisodeUploadModal.processComplete", { progress }) : t("Feature.VideoUpload.EpisodeUploadModal.uploading", { progress })}</Typography>
            </>
          ) : null}
          <Box flex={"1 0 0"} />
          <Button onClick={handleOnToggleFeedbackSidebar} variant="text">
            <FeedbackIcon />
          </Button>
          <Button onClick={() => navigate.navigate("/upload/movie")} startIcon={<UploadIcon />}>
            {t("Feature.VideoUpload.EpisodeUploadModal.movie")}
          </Button>
          <Button onClick={() => navigate.navigate("/upload/trailer")} startIcon={<UploadIcon />}>
            {t("Feature.VideoUpload.EpisodeUploadModal.trailer")}
          </Button>
        </DialogActions>
      </Dialog>
    </Suspense>
  );
}
