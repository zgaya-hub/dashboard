import { DialogActions, Divider, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import VideoUploadComponent from "./VideoUploadComponent";
import ScreenChangerComponent from "./ScreenChangerComponent";
import { FeedbackIcon } from "@/components/icons";

interface VideoUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVideoDrop: (video: File) => void;
  isLoading: boolean;
  onFeedback: () => void;
  headerText: string;
  title: string;
  message: string;
  onLeftIconClick: () => void;
  onRightIconClick: () => void;
  leftTooltip: string;
  rightTooltip: string;
}

export default function VideoUploadModal({ isVisible, onClose, onFeedback, onVideoDrop, isLoading, headerText, leftTooltip, message, onLeftIconClick, onRightIconClick, rightTooltip, title }: VideoUploadModalProps) {
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
    <Dialog maxWidth="xl" sx={dialogBoxStyle} open={isVisible} headerText={headerText} onClose={onClose} outAreaClose={false}>
      <ScreenChangerComponent onLeftClick={onLeftIconClick} leftTooltip={leftTooltip} onRightClick={onRightIconClick} rightTooltip={rightTooltip} />
      <Divider />
      <VideoUploadComponent onVideoDrop={onVideoDrop} isLoading={isLoading} message={message} title={title} />
      <Divider />

      <DialogActions>
        <FeedbackIcon onClick={onFeedback} />
      </DialogActions>
    </Dialog>
  );
}
