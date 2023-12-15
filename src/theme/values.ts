import { PaletteOptions } from "@mui/material/styles/createPalette";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { ThemeOptions } from "@mui/material";

export const lightThemePalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
};

export const darkThemePalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#090909",
  },
};

export const typography: TypographyOptions = {
  fontFamily: ["Roboto", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  fontSize: 15,
  h4: {
    fontWeight: 700,
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 500,
  },
  body1: {
    fontWeight: 400,
  },
  body2: {
    fontWeight: 400,
  },
  subtitle1: {
    fontWeight: 600,
  },
  subtitle2: {
    fontWeight: 400,
  },
  caption: {
    fontWeight: 400,
  },
};

// kindly use this types for spacing
export const spacing = [1, 2, 4, 8, 16, 24, 32, 48, 64, 96];

export const components: ThemeOptions["components"] = {
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: "0",
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
};
