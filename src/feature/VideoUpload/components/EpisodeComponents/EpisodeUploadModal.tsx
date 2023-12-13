import { DialogActions, DialogContent, Divider, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import { GetManagerSeriesWithImageAndBasicInfo } from "../../hooks/queryHooks.types";
import SelectSeriesAndSeasonComponent from "./SelectSeriesAndSeasonComponent";

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

  const handleOnMovie = () => {
    navigate.navigate("/video-upload/movie");
  };

  const handleOnTrailer = () => {
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
      <Divider />
      <DialogContent>
        <SelectSeriesAndSeasonComponent/>
        {/* <VideoUploadComponent onVideoDrop={onVideoDrop} isLoading={isLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} /> */}
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
