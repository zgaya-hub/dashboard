// themes.ts

import { createTheme } from "@mui/material/styles";

import { darkThemeComponents, lightThemeComponents, typography } from "./values";

export const lightTheme = createTheme({
  typography: typography,
  components: lightThemeComponents,
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  typography: typography,
  components: darkThemeComponents,
  palette: {
    mode: "dark",
  },
});
