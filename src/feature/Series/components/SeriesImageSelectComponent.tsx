import { Alert, Card, LinearProgress, Stack, SxProps, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { UploadIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";

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

  return (
    <Card {...getRootProps()} sx={containerStyle}>
      <Stack alignItems={"center"} justifyContent={"center"} height={"100%"} sx={dropzoneStyle} gap={2} width={"100%"}>
        <UploadIcon fontSize="medium" />
        <Typography variant="body1">{t("Feature.Series.SeriesImageSelectComponent.title")}</Typography>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      </Stack>
      {isLoading ? <LinearProgress /> : null}
    </Card>
  );
}
