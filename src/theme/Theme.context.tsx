import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useContext, ReactNode, useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextProps {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    if (currentTheme.palette.mode === "light") {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDarkMode: currentTheme.palette.mode === "dark",
        toggleTheme,
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
