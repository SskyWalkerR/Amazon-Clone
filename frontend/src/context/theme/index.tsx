import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

interface AppThemeContextType {
  currentTheme: "light" | "dark";
  toggleTheme: () => void;
}

interface AppThemeProviderProps {
  children: ReactNode;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () =>
    useMemo(() => setCurrentTheme((prevMode) => (prevMode === "light" ? "dark" : "light")), []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme,
        },
      }),
    [currentTheme]
  );
  return (
    <AppThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </AppThemeContext.Provider>
  );
};

// Custom hook to access the theme context
const useAppTheme = (): AppThemeContextType => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { AppThemeProvider, useAppTheme };
