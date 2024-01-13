import { useDropzone } from "react-dropzone";
import { Card, LinearProgress, Stack, SxProps, Typography } from "@mui/material";

import { AddImageIcon,ErrorIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface ImageUploadComponentProps {
  onImageSelect: (image: File) => void;
  isLoading: boolean;
  errorMessage?: string;
  title: string;
}

export default function ImageUploadComponent({ onImageSelect, isLoading, title, errorMessage }: ImageUploadComponentProps) {
  const onDrop = ([video]: File[]) => {
    onImageSelect(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>(theme => ({
    height: theme.spacing(12),
    width: theme.spacing(24),
    pointerEvents: isLoading ? "none" : "all",
    padding: theme.spacing(1),
    position: "relative",
  }));

  const dropzoneStyle = useThemeStyles<SxProps>(theme => ({
    border: isDragActive ? `2px dashed ${theme.palette.primary.main}` : "none",
    color: isDragActive ? theme.palette.primary.main : theme.palette.text.primary,
  }));

  const errorIconStyle = useThemeStyles<SxProps>(theme => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  }));

  return (
    <Card {...getRootProps()} sx={containerStyle}>
      {errorMessage ? <ErrorIcon sx={errorIconStyle} color="error" tooltip={errorMessage} /> : null}
      <Stack alignItems={"center"} justifyContent={"center"} height={"100%"} sx={dropzoneStyle} gap={1}>
        <AddImageIcon fontSize="medium" />
        <Typography>{title}</Typography>
      </Stack>
      {isLoading ? <LinearProgress /> : null}
    </Card>
  );
}
