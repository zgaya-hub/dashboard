import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Paper, PaperProps, SxProps } from "@mui/material";

interface PageProps extends PaperProps {}

export default function Page({ children }: PageProps) {

  const pageStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(12),
    // this 14 is oyut of the theme style
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(4),
    background: theme.palette.background.paper,
    minHeight: "100vh",
    width: "100vw",
  }));

  return <Paper sx={pageStyle}>{children}</Paper>;
}
