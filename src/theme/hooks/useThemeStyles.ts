import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";
import useTheme from "../Theme.context";

export default function useThemeStyles<T extends SxProps>(styleFunction: (theme: Theme) => T) {
  const { theme } = useTheme();
  return styleFunction(theme);
}
