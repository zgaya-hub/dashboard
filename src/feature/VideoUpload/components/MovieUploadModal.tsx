import { DialogActions, Divider, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import { FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";

interface MovieUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVideoDrop: (video: File) => void;
  isLoading: boolean;
  onFeedback: () => void;
}

export default function MovieUploadModal({ isVisible, onClose, onFeedback, onVideoDrop, isLoading }: MovieUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOnTrailer = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const handleOnEpisode = () => {
    navigate.navigate("/video-upload/episode");
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
      <Button onClick={handleOnTrailer} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.MovieUploadModal.trailer")}
      </Button>
      <Button onClick={handleOnEpisode} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.MovieUploadModal.episode")}
      </Button>
    </>
  );

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.MovieUploadModal.headerText")} onClose={onClose} outAreaClose={false} dialogAction={dialogFooter}>
      <VideoUploadComponent onVideoDrop={onVideoDrop} isLoading={isLoading} message={t("Feature.VideoUpload.MovieUploadModal.message")} title={t("Feature.VideoUpload.MovieUploadModal.title")} />
    </Dialog>
  );
}
