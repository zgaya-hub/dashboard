import { SxProps } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import { MenuOpenIcon, SearchIcon } from "@/components/icons";
import UserAvatar from "./UserAvatar";
import { AppBar, useMediaQuery } from "@mui/material";
import { useSidebarContext } from "@/context/SidebarContext";
import useTheme from "@/theme/Theme.context";

export default function LayoutAppBar() {
  const { handleOnToggleRootSidebar } = useSidebarContext();
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const appBarStyle: SxProps = {
    bottom: 0,
    top: "auto",
  };

  return (
    <AppBar sx={appBarStyle}>
      <CssBaseline />
      <Toolbar>
        {isSmallScreen ? <MenuOpenIcon onClick={handleOnToggleRootSidebar} /> : null}
        <SearchIcon iconButton />
        <Stack sx={{ flexGrow: 1 }} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
