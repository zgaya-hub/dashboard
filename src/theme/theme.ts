// themes.ts

import { createTheme } from "@mui/material";
import { components, darkThemePalette, darkThemeShadows, lightThemePalette, lightThemeShadows, radius, sizing, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  shadow: lightThemeShadows,
  typography: typography,
  // components: components,
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  shadow: darkThemeShadows,
  typography: typography,
  // components: components,
});

