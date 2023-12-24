// themes.ts

import { createTheme } from "@mui/material/styles";
import { lightThemeComponents, darkThemeComponents, darkThemePalette, lightThemePalette, typography } from "./values";

export const lightTheme = createTheme({
  palette: lightThemePalette,
  typography: typography,
  components: lightThemeComponents,
});

export const darkTheme = createTheme({
  palette: darkThemePalette,
  typography: typography,
  components: darkThemeComponents,
});
