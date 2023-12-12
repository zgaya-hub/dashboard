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
import IconButon from "@/components/IconButton";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVideoDrop: (video: File) => void;
  isLoading: boolean;
  onFeedback: () => void;
}

export default function EpisodeUploadModal({ isVisible, onClose, onFeedback, onVideoDrop, isLoading }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/trailer");
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
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.EpisodeUploadModal.headerText")} onClose={onClose} outAreaClose={true}>
      <ScreenChangerComponent onLeftClick={handleOnLeftClick} leftTooltip={"Upload movie"} onRightClick={handleOnRightClick} rightTooltip={"Upload trailer"} />
      <Divider />
      <VideoUploadComponent onVideoDrop={onVideoDrop} isLoading={isLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} />
      <Divider />
      <DialogActions>
        <Button onClick={onFeedback} variant="text">
          <FeedbackIcon />
        </Button>
        <Button variant="outlined" startIcon={<UploadIcon />}>
          Movie
        </Button>
        <Button variant="outlined" startIcon={<UploadIcon />}>
          Trailer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
