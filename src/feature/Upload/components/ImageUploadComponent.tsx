import { Card, LinearProgress, Stack, SxProps, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { UploadIcon } from "@/components/icons";

interface SeriesImageSelectComponentProps {
  onImageDrop: (image: File) => void;
  isLoading: boolean;
  title: string;
}

export default function SeriesImageSelectComponent({ onImageDrop, isLoading, title }: SeriesImageSelectComponentProps) {
  const onDrop = ([video]: File[]) => {
    onImageDrop(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(16),
    bgcolor: "red",
    width: theme.spacing(36),
    pointerEvents: isLoading ? "none" : "all",
    padding: theme.spacing(1),
  }));

  const dropzoneStyle = useThemeStyles<SxProps>((theme) => ({
    border: isDragActive ? `2px dashed ${theme.palette.primary.main}` : "none",
    color: isDragActive ? theme.palette.primary.main : theme.palette.text.primary,
  }));

  return (
    <Card {...getRootProps()} sx={containerStyle}>
      <Stack alignItems={"center"} justifyContent={"center"} height={"100%"} sx={dropzoneStyle} gap={2}>
        <UploadIcon fontSize="medium" />
        <Typography>{title}</Typography>
      </Stack>
      {isLoading ? <LinearProgress /> : null}
    </Card>
  );
}
