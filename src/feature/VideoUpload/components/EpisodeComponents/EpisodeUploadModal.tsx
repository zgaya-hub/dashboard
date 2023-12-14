import { DialogActions, DialogContent, Divider, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { FeedbackIcon, UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import useNavigation from "@/navigation/use-navigation";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import VideoUploadComponent from "../VideoUploadComponent";
import SelectSeriesAndSeasonModal from "./SelectSeriesAndSeasonModal";
import { useState } from "react";

interface EpisodeUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onVideoDrop: (episode: File) => void;
  isLoading: boolean;
}

export default function EpisodeUploadModal({ isVisible, onClose, onFeedback, isLoading, onVideoDrop }: EpisodeUploadModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [isSelectSeriesModalVisible, setIsSelectSeriesModalVisible] = useState<boolean>(true);

  const handleOnSelectSeasonId = (seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setIsSelectSeriesModalVisible(false);
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

  const dialogFooter = (
    <DialogActions>
      <Button onClick={onFeedback} variant="text">
        <FeedbackIcon />
      </Button>
      <Button variant="outlined" onClick={handleOnMovie} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.EpisodeUploadModal.movie")}
      </Button>
      <Button variant="outlined" onClick={handleOnTrailer} startIcon={<UploadIcon />}>
        {t("Feature.VideoUpload.EpisodeUploadModal.trailer")}
      </Button>
    </DialogActions>
  );

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.EpisodeUploadModal.headerText")} onClose={onClose} outAreaClose={false}>
      <Divider />
      <DialogContent>
        <VideoUploadComponent isDisabled={!selectedSeasonId} onVideoDrop={onVideoDrop} isLoading={isLoading} message={t("Feature.VideoUpload.EpisodeUploadModal.message")} title={t("Feature.VideoUpload.EpisodeUploadModal.title")} />
      </DialogContent>
      <Divider />
      {dialogFooter}
      <SelectSeriesAndSeasonModal onNext={handleOnSelectSeasonId} isVisible={isSelectSeriesModalVisible} />
    </Dialog>
  );
}
