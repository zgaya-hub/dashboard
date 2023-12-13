import { DialogActions, Divider, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import ScreenChangerComponent from "./ScreenChangerComponent";
import { FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
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
        height: theme.spacing(100),
        width: "100%",
      },
    },
    "& .MuiDialog-paperWidthXl": {
      background: theme.palette.background.default,
    },
  }));

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.TrailerUploadModal.headerText")} onClose={onClose} outAreaClose={false}>
      <Divider />
      <VideoUploadComponent onVideoDrop={onVideoDrop} isLoading={isLoading} message={t("Feature.VideoUpload.TrailerUploadModal.message")} title={t("Feature.VideoUpload.TrailerUploadModal.title")} />
      <Divider />
      <DialogActions>
        <Button onClick={onFeedback} variant="text">
          <FeedbackIcon />
        </Button>
        <Button variant="outlined" onClick={handleOnEpisode} startIcon={<UploadIcon />}>
          Episode
        </Button>
        <Button variant="outlined" onClick={handleOnMovie} startIcon={<UploadIcon />}>
          Movie
        </Button>
      </DialogActions>
    </Dialog>
  );
}
