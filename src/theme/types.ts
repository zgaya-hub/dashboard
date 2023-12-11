export interface ShadowInterface {
  neutral: string;
  downward: string;
  upward: string;
}
export interface ExtendedTheme {
  shadow: ShadowInterface;
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