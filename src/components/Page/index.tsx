import useSidebar from "@/context/Sidebar.context";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Paper, PaperProps } from "../Paper";
import { SxProps } from "@mui/material";

interface AuthScreenPageProps extends PaperProps {}

export function AuthScreenPage({ children }: AuthScreenPageProps) {
  const { isCollapsed } = useSidebar();

  const pageStyle = useThemeStyles<SxProps>((theme) => ({
    paddingY: theme.spacing(10),
    paddingLeft: isCollapsed ? theme.spacing(20) : theme.spacing(34),
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100vw",
  }));

  return <Paper sx={pageStyle}>{children}</Paper>;
}

interface UnAuthScreenPageProps extends PaperProps {}

export function UnAuthScreenPage({ children }: UnAuthScreenPageProps) {
  const pageStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100vw",
  }));

  return <Paper sx={pageStyle}>{children}</Paper>;
}
