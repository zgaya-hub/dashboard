import { Stack, SxProps } from "@mui/material";
import Typography from "@/components/Typography";
import { useDropzone } from "react-dropzone";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import VideoUploadCircleIcon from "./VideoUploadCircleIcon";

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
    gap: theme.spacing(10),
  }));

  return (
    <Stack {...getRootProps()} justifyContent={"center"} alignItems={"center"} direction={"column"} sx={containerStyle}>
      <VideoUploadCircleIcon isLoading={isLoading} isDragActive={isDragActive} />
      <Stack alignItems={"center"} gap={1}>
        <Typography variant="h4">
          {title}
        </Typography>
        <Typography variant="body1">{message}</Typography>
      </Stack>
    </Stack>
  );
}
