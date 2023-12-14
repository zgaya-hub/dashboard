// themes.ts

import { createTheme } from "@mui/material";
import { components, darkThemePalette, lightThemePalette, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  typography: typography,
  components: components,
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  typography: typography,
  components: components,
});
