import { DialogActions, DialogContent, Divider, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import VideoUploadComponent from "../VideoUploadComponent";
import { useGetUploadVideoSignedUrl, useUploadVideoOnAwsS3 } from "../../hooks/queryHooks";
import { convertVideoInBlob, extractVideoMetadata } from "metalyzer";
import { MovierMediaEnum } from "@/types/enum";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFeedback: () => void;
}

export default function EpisodeUploadModal({ isVisible, onClose, onFeedback }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { mutateAsync: getUploadEpisodeUrlMutateAsync, isPending } = useGetUploadVideoSignedUrl();
  const { mutateAsync: uploadVideoOnAwsS3MutateAsync } = useUploadVideoOnAwsS3();

  const handleOnEpisodeDrop = async (episode: File) => {
    const episodeMetadata = await extractVideoMetadata(episode);
    const result = await getUploadEpisodeUrlMutateAsync({
      Height: episodeMetadata.videoHeight!,
      Width: episodeMetadata.videoWidth!,
      MediaType: MovierMediaEnum.EPISODE,
      Mime: episodeMetadata.mimeType,
      RunTime: episodeMetadata.videoDuration,
      SizeInKb: episodeMetadata.fileSizeKB,
    });

    const movieBlob = await convertVideoInBlob(episode);
    uploadVideoOnAwsS3MutateAsync({ SignedUrl: result.getUploadVideoSignedUrl.SignedUrl, VideoBlob: movieBlob });
  };

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailer = () => {
    navigate.navigate("/video-upload/trailer");
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

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.EpisodeUploadModal.headerText")} onClose={onClose} outAreaClose={true}>
      <Divider />
      <DialogContent>
        <VideoUploadComponent onVideoDrop={handleOnEpisodeDrop} isLoading={isPending} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onFeedback} variant="text">
          <FeedbackIcon />
        </Button>
        <Button variant="outlined" onClick={handleOnMovie} startIcon={<UploadIcon />}>
          Movie
        </Button>
        <Button variant="outlined" onClick={handleOnTrailer} startIcon={<UploadIcon />}>
          Trailer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
