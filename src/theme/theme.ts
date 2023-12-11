// themes.ts

import { createTheme } from "@mui/material";
import { darkThemePalette, darkThemeShadows, lightThemePalette, lightThemeShadows } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  shadow: lightThemeShadows,
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  shadow: darkThemeShadows,
});
