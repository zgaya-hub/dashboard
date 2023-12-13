// themes.ts

import { createTheme } from "@mui/material";
import { darkThemePalette, darkThemeShadows, lightThemePalette, lightThemeShadows, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  shadow: lightThemeShadows,
  typography: typography
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  shadow: darkThemeShadows,
  typography: typography
});
