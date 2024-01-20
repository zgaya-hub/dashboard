import { AirplaneIcon, CheckIcon, SolidUploadIcon } from "@/components/icons";
import { CircularProgress, LinearProgress, Stack, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface MovieUploadIconProps {
  isLoading?: boolean;
  isDragActive: boolean;
  progress: number;
}

export default function MovieUploadIcon({ isLoading, isDragActive, progress }: MovieUploadIconProps) {
  const iconContainerStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(16),
    width: theme.spacing(16),
    position: "relative",
  }));

  const iconStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(8),
    width: theme.spacing(8),
    color: theme.palette.text.secondary,
  }));

  const circularProgressStyle: SxProps = {
    position: "absolute",
  };

  return (
    <Stack sx={iconContainerStyle} justifyContent="center" alignItems="center">
      {isLoading ? <CircularProgress size={96} color="inherit" sx={circularProgressStyle} /> : null}
      <CircularProgress value={progress} size={96} variant="determinate" color="inherit" sx={circularProgressStyle} />
      {isDragActive ? <AirplaneIcon sx={iconStyle} /> : progress === 100 ? <CheckIcon solid sx={iconStyle} /> : <SolidUploadIcon solid sx={iconStyle} />}
      {progress ? <LinearProgress variant="determinate" /> : null}
    </Stack>
  );
}
