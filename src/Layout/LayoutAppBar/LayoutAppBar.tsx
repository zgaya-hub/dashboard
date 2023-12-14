import { SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";

import useThemeStyles from "@/theme/hooks/useThemeStyles";
import useTheme from "@/theme/Theme.context";
import useNavigation from "@/navigation/use-navigation";

import { MoonSunIcon, SearchIcon, UploadIcon } from "@/components/icons";
import UserAvatar from "./UserAvatar";
import AppBar from "@/components/AppBar";
import { Fab } from "@mui/material";

export default function BottomAppBar() {
  const navigation = useNavigation();
  const { toggleTheme } = useTheme();

  const handleOnClickUpload = () => {
    navigation.navigate("/video-upload/movie");
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

  return (
    <AppBar sx={appBarStyle}>
      <CssBaseline />
      <Toolbar>
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
        <Box sx={{ flexGrow: 1 }} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
