import { SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import Divider from "@/components/Divider";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import ScreenChangerComponent from "./ScreenChangerComponent";

interface MovieUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onMovieDrop: (video: File) => void;
  isLoading: boolean;
}

export default function MovieUploadModal({ isVisible, onClose, onMovieDrop, isLoading }: MovieUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();

  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/trailer");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/episode");
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
    <Dialog maxWidth="xl" sx={dialogBoxStyle} open={isVisible} headerText={t("Feature.VideoUpload.MovieUploadModal.headerText")} onClose={onClose} outareaClose={false}>
      <ScreenChangerComponent onLeftClick={handleOnLeftClick} leftTooltip={"Upload trailer"} onRightClick={handleOnRightClick} rightTooltip={"Upload episode"} />
      <Divider />
      <VideoUploadComponent onVideoDrop={onMovieDrop} isLoading={isLoading} message={t("Feature.VideoUpload.MovieUploadModal.message")} title={t("Feature.VideoUpload.MovieUploadModal.title")} />;
    </Dialog>
  );
}
