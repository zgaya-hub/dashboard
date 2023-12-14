import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";
import { ReactNode } from "react";

interface AvatarTitleAndDescCardProps {
  title: string;
  description: string;
  avatar: ReactNode;
}

export default function AvatarTitleAndDescCard({ avatar, title, description }: AvatarTitleAndDescCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  const cardContentStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(8),
  }));

  return (
    <Card sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{description}</Typography>
      </CardContent>
    </Card>
  );
}
