import { AirplaneIcon, SolidUploadIcon } from "@/components/icons";
import { CircularProgress, Stack } from "@mui/material";
import { SxProps } from "@mui/system";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface VideoUploadIconCircleProps {
  isLoading?: boolean;
  isDragActive?: boolean;
}

export default function VideoUploadIconCircle({ isLoading, isDragActive }: VideoUploadIconCircleProps) {
  const iconContainerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.sizing.lg,
    width: theme.sizing.lg,
    // borderColor: isLoading
    //   ? theme.palette.primary.main
    //   : theme.palette.action,
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
  }));

  const iconStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.sizing.xl,
    width: theme.sizing.xl,
    color: theme.palette.text.secondary,
  }));

  if (isLoading) {
    <Stack sx={iconContainerStyle} justifyContent="center" alignItems="center">
      <CircularProgress size={150} color="inherit" />
    </Stack>;
  }

  return (
    <Stack sx={iconContainerStyle} justifyContent="center" alignItems="center">
      {isDragActive ? <AirplaneIcon sx={iconStyle} /> : <SolidUploadIcon sx={iconStyle} />}
    </Stack>
  );
}
