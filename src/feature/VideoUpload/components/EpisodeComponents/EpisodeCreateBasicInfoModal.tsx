import { Box, Stack, SxProps, useMediaQuery } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Dialog } from "@/components/Dialog";
import { useTranslation } from "react-i18next";
import useTheme from "@/theme/Theme.context";
import Button from "@/components/Button";
import { FeedbackIcon } from "@/components/icons";
import EpisodeCardComponent from "./EpisodeCardComponent";
import { TextInput } from "@/components/Form";
import { useState } from "react";

interface EpisodeCreateBasicInfoModalProps {
  isVisible: boolean;
  onNext: () => void;
  onCancel: () => void;
  onFeedback: () => void;
}

export default function EpisodeCreateBasicInfoModal({ isVisible, onCancel, onNext, onFeedback }: EpisodeCreateBasicInfoModalProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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

  const InputArea = (
    <>
      <TextInput onTextChange={setTitle} label="Title" />
      <TextInput onTextChange={setDescription} label="description" multiline rows={5} />
    </>
  );

  const dialogFooter = (
    <>
      <Button onClick={onFeedback} variant="text">
        <FeedbackIcon />
      </Button>
      <Button variant="text" onClick={onCancel}>
        {t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.cancel")}
      </Button>
      <Button variant="contained" onClick={onNext}>
        {t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.next")}
      </Button>
    </>
  );

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} fullScreen={fullScreen} open={isVisible} headerText={t("Feature.VideoUpload.EpisodeCreateBasicInfoModal.headerText")} onClose={onCancel} outAreaClose={false} dialogAction={dialogFooter}>
      <Stack direction={"row"}>
        <EpisodeCardComponent title={title} description={description} />
        {InputArea}
      </Stack>
    </Dialog>
  );
}
