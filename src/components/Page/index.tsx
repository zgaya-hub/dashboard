import { Paper, PaperProps, SxProps } from "@mui/material";
import { ReactNode } from "react";

import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface PageProps extends PaperProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  const pageStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(12),
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(4),
    background: theme.palette.background.paper,
    minHeight: "100vh",
    width: "100vw",
  }));

  return <Paper sx={pageStyle}>{children}</Paper>;
}
