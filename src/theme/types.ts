import { Theme } from "@mui/material/styles";

export interface SizingInterface {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  menuWidth: (theme: Theme) => string
}
export interface ShadowInterface {
  neutral: string;
  downward: string;
  upward: string;
}
export interface ExtendedTheme {
  sizing: SizingInterface;
  shadow: ShadowInterface;
}

declare module "@mui/material/styles" {
  interface Theme extends ExtendedTheme {}
  interface ThemeOptions extends Theme {}
}
