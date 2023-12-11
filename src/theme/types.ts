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
