import { Card, Stack, SxProps, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { UploadIcon } from "@/components/icons";

interface ImageUploadComponentProps {
  onImageDrop: (video: File) => void;
  title: string;
  isLoading?: boolean;
}

export default function ImageUploadComponent({ onImageDrop, title, isLoading }: ImageUploadComponentProps) {
  const onDrop = ([video]: File[]) => {
    onImageDrop(video);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const containerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(14),
    width: theme.spacing(24),
    padding: theme.spacing(1),
    pointerEvents: isLoading ? "none" : "all",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  const dropzoneStyle = useThemeStyles<SxProps>((theme) => ({
    border: isDragActive ? `2px dashed ${theme.palette.primary.main}` : "2px solid transparent",
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    textAlign: "center",
    color: isDragActive ? theme.palette.primary.main : theme.palette.text.primary,
  }));

  return (
    <Card {...getRootProps()} sx={containerStyle}>
      <Stack sx={dropzoneStyle} justifyContent={"center"} alignItems={"center"} gap={1}>
        <UploadIcon />
        <Typography variant="subtitle2">{title}</Typography>
      </Stack>
    </Card>
  );
}
