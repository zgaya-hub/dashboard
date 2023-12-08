import useSidebar from "@/context/Sidebar.context";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { PaperProps as MuiPaperProps, Paper as MuiPaper, SxProps } from "@mui/material";

interface PaperProps extends MuiPaperProps {}

export function AuthScreenPaper({ children }: PaperProps) {
  const { isCollapsed } = useSidebar();

  const paperStyle = useThemeStyles<SxProps>((theme) => ({
    paddingY: theme.sizing.lg,
    paddingLeft: isCollapsed ? theme.spacing(20) : theme.spacing(34),
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100vw",
  }));

  return <MuiPaper sx={paperStyle}>{children}</MuiPaper>;
}

interface PaperProps extends MuiPaperProps {}

export function UnAuthScreenPaper({ children }: PaperProps) {
  const paperStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100vw",
  }));

  return <MuiPaper sx={paperStyle}>{children}</MuiPaper>;
}
