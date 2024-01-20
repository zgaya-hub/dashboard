import { SxProps } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import useTheme from "@/theme/Theme.context";
import useNavigation from "@/navigation/useNavigation";
import { MenuOpenIcon, MoonSunIcon, SearchIcon, UploadIcon } from "@/components/icons";
import UserAvatar from "./UserAvatar";
import { AppBar, Fab } from "@mui/material";
import { useSidebarContext } from "@/context/SidebarContext";
import Mousetrap from "mousetrap";

export default function LayoutAppBar() {
  const navigation = useNavigation();
  const { handleOnToggleRootSidebar } = useSidebarContext();
  const { toggleTheme } = useTheme();

  const handleOnClickUpload = () => {
    navigation.navigate("/upload/movie");
  };

  const appBarStyle: SxProps = {
    bottom: 0,
    top: "auto",
  };

  const fabContainerStyle = useThemeStyles<SxProps>(() => ({
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    marginX: "auto",
  }));

  Mousetrap.bind("shift+[", handleOnToggleRootSidebar);
  return (
    <AppBar sx={appBarStyle}>
      <CssBaseline />
      <Toolbar>
        <MenuOpenIcon tooltip="shift + [" onClick={handleOnToggleRootSidebar} />
        <Stack width="100%" justifyContent="center" direction="row" gap={3} alignItems="center" sx={fabContainerStyle}>
          <Fab onClick={handleOnClickUpload}>
            <UploadIcon />
          </Fab>
          <Fab onClick={toggleTheme}>
            <MoonSunIcon />
          </Fab>
          <Fab>
            <SearchIcon />
          </Fab>
        </Stack>
        <Stack sx={{ flexGrow: 1 }} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
