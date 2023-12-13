import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FastForwardIcon, FastRewindIcon, PlayArrowIcon } from "@/components/icons";
import { ButtonBase, Stack, SxProps } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import SelectSeriesCardSkeleton from "./SelectSeriesCardSkeleton";

interface SelectSeriesCardProps {
  thumbnail: string;
  title: string;
  isLoading: boolean;
}

export default function SelectSeriesCard({ thumbnail, title, isLoading }: SelectSeriesCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",
    height: theme.spacing(20),
    width: "100%",
    bgcolor: 'red',
    position: "relative",
  }));

  const titleContainerStyle = useThemeStyles<SxProps>((theme) => ({
    position: 'absolute',
    rotate: '90deg',
    right: 0,
    bgcolor: 'red',
    fontSize: theme.typography.subtitle2,
    top: '50%',
    transform: 'translateX(-10%)',

  }));

  if (isLoading) {
    return <SelectSeriesCardSkeleton />;
  }

  return (
    <Card sx={cardStyle}>
      {/* <Typography variant="body1">{title}</Typography> */}
      <CardMedia component="img" sx={{ width: "100%" }} image={thumbnail} />
      <Stack sx={titleContainerStyle}>{title}</Stack>
    </Card>
  );
}
