import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CardHeader, SxProps } from "@mui/material";
import Avatar from "@/components/Avatar";
import { MoreVertIcon } from "@/components/icons";

interface VideoDisplayCardProps {
  thumbnail: string;
  title: string;
  description: string;
  onClickMenuIcon?: () => void;
  avatarSrc?: string;
}

export default function VideoDisplayCard({ thumbnail, title, description, onClickMenuIcon, avatarSrc }: VideoDisplayCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
    boxShadow: 'none'
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(24),
  }));

  const cardAvatarStyle = useThemeStyles<SxProps>((theme) => ({}));

  console.log(title);

  return (
    <Card sx={cardStyle}>
      <CardMedia sx={cardImageStyle} component="img" image={thumbnail} />
      <CardHeader
        avatar={<Avatar sx={cardAvatarStyle} aria-label="recipe" src={avatarSrc} />}
        titleTypographyProps={{
          variant: "subtitle1",
        }}
        subheaderTypographyProps={{
          variant: "subtitle2",
        }}
        title={title}
        subheader={description.slice(0, 30)}
        action={<MoreVertIcon onClick={onClickMenuIcon} />}
      />
    </Card>
  );
}
