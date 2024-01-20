import React, { ReactNode, useEffect, useState } from "react";
import mousetrap from "mousetrap";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, DialogTitle } from "@/components/Dialog";
import { AppBar, DialogContent, Slide, SxProps, Toolbar } from "@mui/material";
import { ClearIcon } from "@/components/icons";
import { TransitionProps } from "@mui/material/transitions";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useSidebarContext } from "./SidebarContext";
import useNavigation from "@/navigation/useNavigation";
import Button from "@/components/Button";

interface KeyboardShortcutsContextProps {
  children: ReactNode;
}

export default function KeyboardShortcutsContext({ children }: KeyboardShortcutsContextProps) {
  const navigation = useNavigation();
  const { handleOnToggleRootSidebar } = useSidebarContext();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  };

  useEffect(() => {
    mousetrap.bind("ctrl+s", toggleDialog);
    mousetrap.bind("shift+[", handleOnToggleRootSidebar);
    mousetrap.bind("ctrl+n", () => navigation.navigate("/upload/movie"));

    return () => {
      mousetrap.unbind("shift+[");
      mousetrap.unbind("ctrl+s");
      mousetrap.unbind("ctrl+n");
    };
  }, []);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={toggleDialog} open={isDialogOpen}>
        <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"} >
          Keyboard Shortcuts
          <ClearIcon onClick={toggleDialog} iconButton={false} />
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="body1">
            <strong>Action:</strong> Save
          </Typography>
          <Typography variant="body2">
            <strong>Shortcut:</strong> Ctrl+S
          </Typography>
          <Typography variant="body1">
            <strong>Action:</strong> Sidebar open
          </Typography>
          <Typography variant="body2">
            <strong>Shortcut:</strong> Shift+[
          </Typography>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}
