import { Stack, SxProps } from "@mui/material";
import Typography from "@/components/Typography";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

import { MovierMediaType } from "../types";
import VideoUploadIconCircle from "./VideoUploadIconCircle";

interface VideoUploadComponentProps {
  mediaType: MovierMediaType;
  onVideoDrop: (video: File) => void;
  isLoading: boolean;
}

export default function VideoUploadComponent({ mediaType, onVideoDrop, isLoading }: VideoUploadComponentProps) {
  const { t } = useTranslation();

  const onDrop = ([video]: File[]) => {
    onVideoDrop(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(80),
    gap: theme.sizing.md,
  }));

  return (
    <Stack {...getRootProps()} justifyContent={"center"} alignItems={"center"} direction={"column"} sx={containerStyle}>
      <VideoUploadIconCircle isLoading={isLoading} isDragActive={isDragActive} />
      <Stack alignItems={"center"} gap={1}>
        <Typography variant="h5" color="primary">
          {t("Feature.VideoUpload.VideoUploadComponent.dragAndDrop", {
            mediaType,
          })}
        </Typography>
        <Typography color="secondary">
          {t("Feature.VideoUpload.VideoUploadComponent.readyToShare", {
            mediaType,
          })}
        </Typography>
      </Stack>
    </Stack>
  );
}
