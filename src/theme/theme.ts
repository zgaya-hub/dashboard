// themes.ts

import { createTheme } from "@mui/material/styles";
import { typography } from "./values";

export const lightTheme = createTheme({
  typography: typography,
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  typography: typography,
  palette: {
    mode: "dark",
  },
});
