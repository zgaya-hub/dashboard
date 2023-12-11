import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CardMedia, SxProps } from "@mui/material";
import Typography from "@/components/Typography";

interface ImageTitleSubtitleCardProps {
  image: string;
  title: string;
  subtitle: string;
  loading?: boolean;
}

export default function ImageTitleSubtitleCard({ image, title, subtitle, loading }: ImageTitleSubtitleCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    boxShadow: "none",
    py: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    background: theme.palette.background.default,
  }));

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    borderRadius: theme.spacing(10),
    height: theme.spacing(18),
    width: theme.spacing(18),
    mb: 1
  }));

  if (loading) {
    return (
      <Card sx={cardStyle}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </Card>
    );
  }

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardMediaStyle} component="img" image={image} />
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
    </Card>
  );
}
