import { Paper, PaperProps, SxProps } from "@mui/material";
import { ReactNode, Suspense } from "react";

import useThemeStyles from "@/theme/hooks/useThemeStyles";

interface PageProps extends PaperProps {
  children: ReactNode;
  isSuspense?: boolean;
}

export default function Page({ children, isSuspense }: PageProps) {
  const pageStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      py: theme.spacing(12),
      pl: theme.spacing(14),
      pr: theme.spacing(4),
    },
    [theme.breakpoints.down("md")]: {
      py: theme.spacing(12),
    },
    minHeight: "100vh",
    width: "100vw",
  }));

  if (isSuspense) {
    return (
      <Suspense>
        <Paper sx={pageStyle}>{children}</Paper>;
      </Suspense>
    );
  }

  return <Paper sx={pageStyle}>{children}</Paper>;
}
