import { Fragment } from "react";
import { SxProps } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import useTheme from "@/theme/Theme.context";
import useSidebar from "@/context/Sidebar.context";
import { MenuOpenIcon, MoonSunIcon, SearchIcon, UploadIcon } from "@/components/icons";
import UserAvatar from "./UserAvatar";
import useNavigation from "@/navigation/use-navigation";

export default function BottomAppBar() {
  const naviation = useNavigation();
  const { toggleSidebar } = useSidebar();
  const { toggleTheme } = useTheme();

  const handleOnClickUpload = () => {
    naviation.navigate("/video-upload/movie");
  };

  const appBarStyle = useThemeStyles<SxProps>((theme) => ({
    position: "fixed",
    bottom: 0,
    top: "auto",
    background: theme.palette.background.default,
    boxShadow: theme.shadow.neutral,
  }));

  const fabContainerStyle = useThemeStyles<SxProps>(() => ({
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    marginX: "auto",
  }));

  const fabItemStyle = useThemeStyles<SxProps>((theme) => ({
    background: theme.palette.background.default,
    boxShadow: 0,
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      background: theme.palette.background.default,
      boxShadow: 0,
    },
  }));

  return (
    <Fragment>
      <CssBaseline />
      <AppBar sx={appBarStyle}>
        <Toolbar>
          <MenuOpenIcon onClick={toggleSidebar} />
          <Stack width="100%" justifyContent="center" direction="row" gap={3} alignItems="center" sx={fabContainerStyle}>
            <Fab sx={fabItemStyle} onClick={handleOnClickUpload}>
              <UploadIcon />
            </Fab>
            <Fab sx={fabItemStyle} onClick={toggleTheme}>
              <MoonSunIcon />
            </Fab>
            <Fab sx={fabItemStyle}>
              <SearchIcon />
            </Fab>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <UserAvatar />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
