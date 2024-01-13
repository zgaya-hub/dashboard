import { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CardHeader, SxProps, Box, CardContent } from "@mui/material";
import Avatar from "@/components/Avatar";
import { MoreVertIcon } from "@/components/icons";

interface VideoPlayCardProps {
  videoUrl: string;
  title: string;
  description: string;
  onClickMenuIcon?: () => void;
  avatar?: string;
  children?: ReactNode;
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function VideoPlayCard({ videoUrl, children, title, description, onClickMenuIcon, avatar }: VideoPlayCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(32),
  }));

  const cardImageContainerStyle = useThemeStyles<SxProps>((theme) => ({
    position: "relative",
    height: theme.spacing(16),
  }));

  const cardImageStyle: SxProps = {
    width: "100%",
    height: "100%",
  };

  const cardContentStyle = useThemeStyles<SxProps>((theme) => ({
    padding: `${theme.spacing(1)} !important`,
  }));

  const cardAvatarStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(4),
    width: theme.spacing(4),
  }));

  const cardHeaderStyle = useThemeStyles<SxProps>((theme) => ({
    padding: `${theme.spacing(1)} !important`,
  }));

  return (
    <Card sx={cardStyle}>
      <Box sx={cardImageContainerStyle}>
        <CardMedia sx={cardImageStyle} controllers component="video" src={videoUrl} />
      </Box>
      <CardHeader sx={cardHeaderStyle} avatar={<Avatar sx={cardAvatarStyle} src={avatar} />} title={truncateText(title, 15)} subheader={truncateText(description, 18)} action={<MoreVertIcon onClick={onClickMenuIcon} />} />
      <CardContent sx={cardContentStyle}>{children}</CardContent>
    </Card>
  );
}
