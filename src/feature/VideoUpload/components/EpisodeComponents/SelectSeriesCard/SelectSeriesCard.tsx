import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import SelectSeriesCardSkeleton from "./SelectSeriesCardSkeleton";
import { SxProps } from "@mui/material";

interface SelectSeriesCardProps {
  thumbnail: string;
  title: string;
  isLoading: boolean;
}

export default function SelectSeriesCard({ thumbnail, title, isLoading }: SelectSeriesCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.sizing.large(theme),
    width: theme.sizing.xlarge(theme),
    position: "relative",
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.sizing.medium(theme),
    width: theme.sizing.xlarge(theme),
    position: "relative",
  }));

  if (isLoading) {
    return <SelectSeriesCardSkeleton />;
  }

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardImageStyle} component="img" image={thumbnail} />
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
      </CardContent>
    </Card>
  );
}
