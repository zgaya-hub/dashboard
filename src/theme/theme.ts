// themes.ts

import { createTheme } from "@mui/material";
import { components, darkThemePalette, darkThemeShadows, lightThemePalette, lightThemeShadows, radius, sizing, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  typography: typography,
  shape: radius,
  shadow: lightThemeShadows,
  sizing: sizing,
  components: components,
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  typography: typography,
  shape: radius,
  shadow: darkThemeShadows,
  sizing: sizing,
  components: components,
});
