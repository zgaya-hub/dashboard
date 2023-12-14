import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";

interface ImagePlusTitleCardProps {
  thumbnail: string;
  title: string;
}

export default function ImagePlusTitleCard({ thumbnail, title }: ImagePlusTitleCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(24),
  }));

  const cardContentStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(8),
  }));

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardImageStyle} component="img" image={thumbnail} />
      <CardContent sx={cardContentStyle}>
        <Typography variant="subtitle1">{title}</Typography>
      </CardContent>
    </Card>
  );
}
