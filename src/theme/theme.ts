// themes.ts

import { createTheme } from "@mui/material";
import { darkThemePalette, darkThemeShadows, lightThemePalette, lightThemeShadows, radius, sizing, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  typography: typography,
  shape: radius,
  shadow: lightThemeShadows,
  sizing: sizing,
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  typography: typography,
  shape: radius,
  shadow: darkThemeShadows,
  sizing: sizing,
});
