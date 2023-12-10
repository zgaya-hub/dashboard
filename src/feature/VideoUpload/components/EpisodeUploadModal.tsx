import { SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import Divider from "@/components/Divider";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import { useTranslation } from "react-i18next";
import ScreenChangerComponent from "./ScreenChangerComponent";
import useNavigation from "@/navigation/use-navigation";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEpisodeDrop: (video: File) => void;
  isLoading: boolean;
}

export default function EpisodeUploadModal({ isVisible, onClose, onEpisodeDrop, isLoading }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();

  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    height: "fit-content",
    position: "relative",
    ".MuiDialog-paperWidthXl": {
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    "& .MuiDialog-paperWidthXl": {
      background: theme.palette.background.default,
    },
  }));

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} open={isVisible} headerText={t("Feature.VideoUpload.EpisodeUploadModal.headerText")} onClose={onClose} outareaClose={false}>
      <ScreenChangerComponent onLeftClick={handleOnLeftClick} leftTooltip={"Upload movie"} onRightClick={handleOnRightClick} rightTooltip={"Upload trailer"} />
      <Divider />
      <VideoUploadComponent onVideoDrop={onEpisodeDrop} isLoading={isLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} />
    </Dialog>
  );
}
