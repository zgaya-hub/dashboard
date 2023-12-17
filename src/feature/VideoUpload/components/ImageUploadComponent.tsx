import { Card, Stack, SxProps, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

interface ImageUploadComponentProps {
  onImageDrop: (video: File) => void;
  title: string;
  isLoading?: boolean;
}

export default function ImageUploadComponent({ onImageDrop, title, isLoading }: ImageUploadComponentProps) {
  const { t } = useTranslation();

  const onDrop = ([video]: File[]) => {
    onImageDrop(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(32),
    pointerEvents: isLoading ? "none" : "all",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  }));

  const dropzoneStyle = useThemeStyles<SxProps>((theme) => ({
    border: isDragActive ? `2px dashed ${theme.palette.primary.main}` : "2px solid transparent",
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    textAlign: "center",
    color: isDragActive ? theme.palette.primary.main : theme.palette.text.primary,
  }));

  return (
    <Card {...getRootProps()} sx={containerStyle}>
      <Stack gap={2} justifyContent={"center"} alignItems={"center"} sx={dropzoneStyle}>
        <Typography variant="subtitle1">{title}</Typography>
        <Button loading={isLoading} variant="contained">
          {isDragActive ? t("Feature.VideoUpload.ImageUploadComponent.dropItHere") : t("Feature.VideoUpload.ImageUploadComponent.browseImage")}
        </Button>
      </Stack>
    </Card>
  );
}
