import useTheme from "../Theme.context";
import { Theme } from "@mui/material/styles";

export default function useThemeStyles<T>(styleFunction: (theme: Theme) => T) {
  const { theme } = useTheme();
  return styleFunction(theme);
}
