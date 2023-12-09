import { Container, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import Divider from "@/components/Divider";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import { useTranslation } from "react-i18next";
import ScreenChangerComponent from "./ScreenChangerComponent";
import useNavigation from "@/navigation/use-navigation";

interface TrailerUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrailerDrop: (video: File) => void;
  isLoading: boolean;
}

export default function TrailerUploadModal({ isVisible, onClose, onTrailerDrop, isLoading }: TrailerUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();

  const handleOnLeftClick = () => {
    navigate.navigate("/video-upload/episode");
  };

  const handleOnRightClick = () => {
    navigate.navigate("/video-upload/movie");
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    height: "fit-content",
    position: 'relative',
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
    <Dialog maxWidth="xl" sx={dialogBoxStyle} open={isVisible} headerText={t("Feature.VideoUpload.TrailerUploadModal.headerText")} onClose={onClose} outareaClose={false}>
      <ScreenChangerComponent onLeftClick={handleOnLeftClick} leftTooltip={"Upload episode"} onRightClick={handleOnRightClick} rightTooltip={"Upload movie"} />
      <Divider />
      <Container>
        <VideoUploadComponent
          onVideoDrop={onTrailerDrop}
          isLoading={isLoading}
          message={t("Feature.VideoUpload.TrailerUploadModal.message")}
          title={t("Feature.VideoUpload.TrailerUploadModal.title")}
        />
        ;
      </Container>
    </Dialog>
  );
}
