import { SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import { FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/useNavigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";

interface TrailerUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVideoDrop: (video: File) => void;
  isLoading: boolean;
  onFeedback: () => void;
}

export default function TrailerUploadModal({ isVisible, onClose, onFeedback, onVideoDrop, isLoading }: TrailerUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOnEpisode = () => {
    navigate.navigate("/video-upload/episode");
  };

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
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

  const dialogFooter = (
    <>
      <Button onClick={onFeedback} variant="text">
        <FeedbackIcon />
      </Button>
      <Button onClick={handleOnEpisode} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.TrailerUploadModal.episode")}
      </Button>
      <Button onClick={handleOnMovie} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.TrailerUploadModal.movie")}
      </Button>
    </>
  );

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.TrailerUploadModal.headerText")} onClose={onClose} outAreaClose={false} dialogAction={dialogFooter}>
      <VideoUploadComponent onVideoSelect={onVideoDrop} isLoading={isLoading} message={t("Feature.VideoUpload.TrailerUploadModal.message")} title={t("Feature.VideoUpload.TrailerUploadModal.title")} />
    </Dialog>
  );
}
