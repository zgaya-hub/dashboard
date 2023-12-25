import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Paper, PaperProps, SxProps } from "@mui/material";

interface PageProps extends PaperProps {}

export default function Page({ children }: PageProps) {

  const pageStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(12),
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(2),
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100vw",
  }));

  return <Paper sx={pageStyle}>{children}</Paper>;
}
