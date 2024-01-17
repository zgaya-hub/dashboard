import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Alert, Card, LinearProgress, Stack, SxProps, Typography } from "@mui/material";

import { AddImageIcon, ErrorIcon, UploadIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface SeriesImageSelectComponentProps {
  onImageDrop: (image: File) => void;
  isLoading: boolean;
  errorMessage?: string;
}

export default function SeriesImageSelectComponent({ onImageDrop, isLoading, errorMessage }: SeriesImageSelectComponentProps) {
  const { t } = useTranslation();
  const onDrop = ([video]: File[]) => {
    onImageDrop(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    minHeight: theme.spacing(16),
    height: "100%",
    pointerEvents: isLoading ? "none" : "all",
    padding: theme.spacing(1),
  }));

  const dropzoneStyle = useThemeStyles<SxProps>((theme) => ({
    border: isDragActive ? `2px dashed ${theme.palette.primary.main}` : "none",
    color: isDragActive ? theme.palette.primary.main : theme.palette.text.primary,
  }));

  const errorIconStyle = useThemeStyles<SxProps>((theme) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  }));

  return (
    <Card {...getRootProps()} sx={containerStyle}>
      {errorMessage ? <ErrorIcon sx={errorIconStyle} color="error" tooltip={errorMessage} /> : null}
      <Stack alignItems={"center"} justifyContent={"center"} height={"100%"} sx={dropzoneStyle} gap={1}>
        <AddImageIcon fontSize="medium" />
        <Typography>{t("Feature.Series.SeriesImageSelectComponent.title")}</Typography>
      </Stack>
      {isLoading ? <LinearProgress /> : null}
    </Card>
  );
}
