import { PaletteOptions } from "@mui/material/styles/createPalette";
import { ComponentsOverrides, Theme, ThemeOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { ShadowInterface, SizingInterface } from "./types";

const commonShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";
const commonOverrides = {
  root: {
    fontSize: 15,
    fontWeight: 600,
  },
  sizeSmall: {
    fontSize: 12,
    fontWeight: 600,
  },
  sizeLarge: {
    fontSize: 18,
    fontWeight: 600,
  },
};

export const lightThemePalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#4361EE",
  },
  secondary: {
    main: "#899DFC",
  },
  error: {
    main: "#FF0000",
  },
  success: {
    main: "#4CAF50",
  },
  warning: {
    main: "#FFC107",
  },
  info: {
    main: "#2196F3",
  },
  text: {
    primary: "#050505",
    secondary: "#65676b",
    disabled: "",
  },
  divider: "#E7E8EF",
  background: {
    paper: "#f0f2f5",
    default: "#ffffff",
  },
  common: {
    black: "#000000",
    white: "#ffffff",
  },
  action: {
    active: "#f0f2f5",
    hover: "#f0f2f5",
    selected: "#f0f2f5",
    disabled: "#f0f2f5",
    disabledBackground: "#f0f2f5",
  },
};

export const darkThemePalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#4361EE",
  },
  secondary: {
    main: "#899DFC",
  },
  error: {
    main: "#FF0000",
  },
  success: {
    main: "#4CAF50",
  },
  warning: {
    main: "#FFC107",
  },
  info: {
    main: "#2196F3",
  },
  text: {
    primary: "#fefefe",
    secondary: "#3a3b3e",
    disabled: "#777",
  },
  divider: "#2C2F41",
  background: {
    paper: "#3A3B3C",
    default: "#1f1f1f",
  },
  common: {
    black: "#000000",
    white: "#ffffff",
  },
  action: {
    active: "#3A3B3C",
    hover: "#3A3B3C",
    selected: "#3A3B3C",
    disabled: "#3A3B3C",
    disabledBackground: "#3A3B3C",
  },
};

export const typography: TypographyOptions = {
  fontFamily: ["Roboto", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  fontSize: 15,
  h1: {
    fontSize: 36,
    fontWeight: 700,
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
  },
  h3: {
    fontSize: 20,
    fontWeight: 700,
  },
  h4: {
    fontSize: 17,
    fontWeight: 600,
  },
  h5: {
    fontSize: 15,
    fontWeight: 600,
  },
  h6: {
    fontSize: 15,
    fontWeight: 500,
  },
  body1: {
    fontSize: 15,
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: 13,
    fontWeight: 600,
  },
  caption: {
    fontSize: 13,
    fontWeight: 400,
  },
  button: {
    fontSize: 20,
    fontWeight: 600,
  },
  overline: {
    fontSize: 10,
  },
};

export const radius: Theme["shape"] = {
  borderRadius: 6,
};

export const lightThemeShadows: ShadowInterface = {
  downward: `${commonShadow}, 0px 4px 8px rgba(0, 0, 0, 0.1)`,
  neutral: commonShadow,
  upward: `${commonShadow}, 0px -4px 8px rgba(0, 0, 0, 0.1)`,
};

export const darkThemeShadows: ShadowInterface = {
  downward: `${commonShadow}, 0px 4px 8px rgba(0, 0, 0, 0.4)`,
  neutral: commonShadow,
  upward: `${commonShadow}, 0px -4px 8px rgba(0, 0, 0, 0.4)`,
};

export const sizing: SizingInterface = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  menuWidth: (theme: Theme) => theme.spacing(40),
};

export const components: ThemeOptions["components"] = {
  MuiTab: {
    styleOverrides: commonOverrides,
  },
  MuiButton: {
    styleOverrides: commonOverrides,
  },
};