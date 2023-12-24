import { SxProps } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Fragment, ReactNode } from "react";
import AppBar from "@/components/AppBar";

interface LayoutHeaderProps {
  children: ReactNode;
}

export default function LayoutHeader({ children }: LayoutHeaderProps) {
  const appBarStyle: SxProps = {
    zIndex: 1,
  };

  const toolbarStyle: SxProps = {
    justifyContent: "flex-end",
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolbarStyle}>{children}</Toolbar>
      </AppBar>
    </Fragment>
  );
}
