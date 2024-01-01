import { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps, CardContent, Typography } from "@mui/material";
import { handleOnTruncateText } from "@/utils";

interface MediaTableCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onClickMenuIcon?: () => void;
  children?: ReactNode;
}

export default function MediaTableCard({ imageSrc, title, description }: MediaTableCardProps) {
  const cardStyle = useThemeStyles<SxProps>(() => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    position: "relative",
    width: theme.spacing(18),
  }));

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardImageStyle} component="img" image={imageSrc} />
      <CardContent>
        <Typography variant="h6">{handleOnTruncateText(title, 30)}</Typography>
        <Typography variant="caption">{handleOnTruncateText(description, 40)}</Typography>
      </CardContent>
    </Card>
  );
}
