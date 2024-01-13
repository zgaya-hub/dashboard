import { ReactNode } from "react";
import { CardContent, SxProps, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface MediaTableCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onClickMenuIcon?: () => void;
  children?: ReactNode;
}

export default function MediaTableCard({ imageSrc, title, description }: MediaTableCardProps) {
  const cardStyle = useThemeStyles<SxProps>(theme => ({
    height: theme.spacing(12),
    display: "flex",
    flexDirection: "row",
    width: "100%",
  }));
  
  const cardImageStyle = useThemeStyles<SxProps>(theme => ({
    width: theme.spacing(36),
  }));

  return (
    <Card sx={cardStyle} elevation={0}>
      <CardMedia sx={cardImageStyle} component="img" image={imageSrc} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption" color={'InactiveCaptionText'}>{description}</Typography>
      </CardContent>
    </Card>
  );
}
