import { createContext, ReactNode, useContext, useState } from "react";
import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { darkTheme, lightTheme } from "./theme";

interface ThemeContextProps {
  theme: Theme;
  isDarkMode: boolean;
  handleOnToggleTheme: () => void;
  handleOnToDarkTheme: () => void;
  handleOnToLightTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const handleOnToggleTheme = () => {
    if (currentTheme.palette.mode === "light") {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }
  };

  const handleOnToDarkTheme = () => {
    setCurrentTheme(darkTheme);
  };

  const handleOnToLightTheme = () => {
    setCurrentTheme(lightTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDarkMode: currentTheme.palette.mode === "dark",
        handleOnToggleTheme,
        handleOnToDarkTheme,
        handleOnToLightTheme,
      }}
    >
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
