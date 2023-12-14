import { Theme } from "@mui/material";

export interface ShadowInterface {
  neutral: string;
  downward: string;
  upward: string;
}
export interface ExtendedTheme {
  shadow: ShadowInterface;
  sizing: SizingInterface;
}

declare module "@mui/material/styles" {
  interface Theme extends ExtendedTheme {}
  interface ThemeOptions extends Theme {}
}

export interface SpaceInterface {
  none: string;
  xxs: string;
  xs: string;
  s_nudge: string;
  s: string;
  m_nudge: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface SizingInterface {
  tiny: (theme: Theme) => string;
  small: (theme: Theme) => string;
  standard: (theme: Theme) => string;
  medium: (theme: Theme) => string;
  large: (theme: Theme) => string;
  xlarge: (theme: Theme) => string;
  xxlarge: (theme: Theme) => string;
  custom: (theme: Theme) => string;
}
