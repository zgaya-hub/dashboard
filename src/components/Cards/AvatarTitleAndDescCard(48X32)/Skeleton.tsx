import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Card, CardHeader, Skeleton, SxProps } from "@mui/material";

export default function AvatarTitleAndDescCardSkeleton() {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  return (
    <Card sx={cardStyle}>
      <CardHeader avatar={<Skeleton variant="circular" width={64} height={64} />} title={<Skeleton width={150} />} subheader={<Skeleton width={200} />} />
    </Card>
  );
}
