import { ReactNode, useEffect, useState } from "react";
import mousetrap from "mousetrap";
import Typography from "@mui/material/Typography";
import { Dialog, DialogTitle } from "@/components/Dialog";
import { DialogContent } from "@mui/material";
import { ClearIcon } from "@/components/icons";
import useNavigation from "@/navigation/useNavigation";

interface KeyboardShortcutsContextProps {
  children: ReactNode;
}

export default function KeyboardShortcutsContext({ children }: KeyboardShortcutsContextProps) {
  const navigation = useNavigation();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  };

  useEffect(() => {
    mousetrap.bind("ctrl+s", toggleDialog);
    mousetrap.bind("ctrl+n", () => navigation.navigate("/upload/movie"));

    return () => {
      mousetrap.unbind("ctrl+s");
      mousetrap.unbind("ctrl+n");
    };
  }, []);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={toggleDialog} open={isDialogOpen}>
        <DialogTitle variant="h5" flexDirection={"row"} justifyContent={"space-between"} display={"flex"} alignItems={"center"}>
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
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}
