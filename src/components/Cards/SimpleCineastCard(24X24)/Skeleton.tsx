import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Card, CardContent, Skeleton, SxProps } from "@mui/material";

export default function SimpleCineastCardSkeleton() {
  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(24),
    height: theme.spacing(36),
  }));

  const cardImageStyle = useThemeStyles<SxProps>((theme) => ({
    width: "100%",
    height: theme.spacing(24),
  }));

  const cardContentStyle: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const textWidth = useThemeStyles<string>((theme) => theme.spacing(16));

  return (
    <Card sx={cardStyle}>
      <Skeleton variant="rectangular" sx={cardImageStyle} height={200} />
      <CardContent sx={cardContentStyle}>
        <Skeleton width={textWidth}></Skeleton>
        <Skeleton width={textWidth}></Skeleton>
      </CardContent>
    </Card>
  );
}
