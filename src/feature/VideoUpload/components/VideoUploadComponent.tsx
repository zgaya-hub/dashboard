import { Stack, SxProps } from "@mui/material";
import Typography from "@/components/Typography";
import { useDropzone } from "react-dropzone";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import VideoUploadCircleIcon from "./VideoUploadCircleIcon";
import { useTranslation } from "react-i18next";

interface VideoUploadComponentProps {
  onVideoDrop: (video: File) => void;
  isLoading: boolean;
  title: string;
  message: string;
}

export default function VideoUploadComponent({ onVideoDrop, isLoading, message, title }: VideoUploadComponentProps) {
  const onDrop = ([video]: File[]) => {
    onVideoDrop(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(95),
    widht: theme.spacing(95),
    gap: theme.sizing.md,
  }));

  return (
    <Stack {...getRootProps()} justifyContent={"center"} alignItems={"center"} direction={"column"} sx={containerStyle}>
      <VideoUploadCircleIcon isLoading={isLoading} isDragActive={isDragActive} />
      <Stack alignItems={"center"} gap={1}>
        <Typography variant="h5" color="primary">
          {title}
        </Typography>
        <Typography color="secondary">{message}</Typography>
      </Stack>
    </Stack>
  );
}
