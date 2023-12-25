import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { SxProps } from "@mui/material";
import MuiGrid, { GridProps as MuiGridProps } from "@mui/material/Grid";

interface GridProps extends MuiGridProps {
  elevation?: number;
  variant?: "default" | "paper";
  padding?: number;
}

export default function Grid({ children, elevation = 1, variant = "default", padding = 0, ...restProps }: GridProps) {
  const gridStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(padding),
    background: theme.palette.background[variant],
    boxShadow: theme.shadows[elevation],
  }));

  return (
    <MuiGrid {...restProps} sx={gridStyle}>
      {children}
    </MuiGrid>
  );
}
