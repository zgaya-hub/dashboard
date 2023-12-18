// themes.ts

import { createTheme } from "@mui/material";
import { components, darkThemePalette, lightThemePalette, spacing, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  typography: typography,
  components: components,
  spacing: spacing
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  typography: typography,
  components: components,
});
