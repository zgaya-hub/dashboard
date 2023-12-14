import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Card, CardContent, Skeleton, SxProps } from "@mui/material";

export default function ImagePlusTitleCardSkeleton() {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(48),
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(24),
  }));

  const cardContentStyle = useThemeStyles<SxProps>((theme) => ({
    height: theme.spacing(8),
  }));

  return (
    <Card sx={cardStyle}>
      <Skeleton variant="rectangular" sx={cardImageStyle} height={200} />
      <CardContent sx={cardContentStyle}>
        <Skeleton width="70%" />
      </CardContent>
    </Card>
  );
}
