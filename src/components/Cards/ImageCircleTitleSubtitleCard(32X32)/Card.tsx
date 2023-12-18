import Card from "@mui/material/Card";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CardContent, CardMedia, SxProps, Typography } from "@mui/material";

interface ImageCircleTitleSubtitleCardProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function ImageCircleTitleSubtitleCard({ image, title, subtitle }: ImageCircleTitleSubtitleCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    boxShadow: "none",
    width: theme.spacing(32),
    height: theme.spacing(32),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
  }));

  const cardMediaStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(16),
    width: theme.spacing(16),
    borderRadius: theme.spacing(16),
  }));

  const cardContentStyle: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    p: "0!important",
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardMediaStyle} component="img" image={image} />
      <CardContent sx={cardContentStyle}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}
