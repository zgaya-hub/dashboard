import { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CardHeader, SxProps, Box, CardContent, Typography } from "@mui/material";
import Avatar from "@/components/Avatar";
import { MoreVertIcon } from "@/components/icons";
import { handleOnTruncateText } from "@/utils";

interface HorizontalCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onClickMenuIcon?: () => void;
  children?: ReactNode;
}

export default function HorizontalCard({ imageSrc, title, description }: HorizontalCardProps) {
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
