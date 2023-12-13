import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Skeleton, SxProps } from "@mui/material";

export default function SelectSeriesCardSkeleton() {
  const skeletonStyle = useThemeStyles<SxProps>((theme) => ({
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",
    height: theme.spacing(15),
    width: '100%',
  }));

  return <Skeleton variant="rectangular" sx={skeletonStyle} />;
}
