import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  memo,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "../themes/Theme";

const ColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export const ColorModeProvider = memo(({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider defaultMode="light" theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
});

export const useColorMode = () => useContext(ColorModeContext);
