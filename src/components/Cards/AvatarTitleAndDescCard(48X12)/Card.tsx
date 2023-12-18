import Card from "@mui/material/Card";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CardHeader, SxProps } from "@mui/material";
import { ReactNode } from "react";
import Avatar from "@/components/Avatar";

interface AvatarTitleAndDescCardProps {
  title: string;
  description: string;
  avatar: ReactNode;
  action?: ReactNode;
}

export default function AvatarTitleAndDescCard({ avatar, title, description, action }: AvatarTitleAndDescCardProps) {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  const cardAvatarStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(6),
    width: theme.spacing(6),
    background: theme.palette.common.black,
    color: theme.palette.common.white,
  }));

  return (
    <Card sx={cardStyle}>
      <CardHeader
        avatar={
          <Avatar sx={cardAvatarStyle} aria-label="recipe">
            {avatar}
          </Avatar>
        }
        title={title}
        subheader={description}
        action={action}
      />
    </Card>
  );
}
