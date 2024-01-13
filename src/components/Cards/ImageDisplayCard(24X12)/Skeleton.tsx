import { Skeleton } from "@mui/material";

import useThemeStyles from "@/theme/hooks/useThemeStyles";

export default function ImageDisplay24X12Skeleton() {
  const containerStyle = useThemeStyles((theme) => ({
    height: theme.spacing(12),
    width: theme.spacing(24),
  }));

  return <Skeleton {...containerStyle} />;
}
