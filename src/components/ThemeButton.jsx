import React from "react";
import { useColorMode } from "../contexts/ThemeContext";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeButton = () => {
  const { toggleColorMode, mode } = useColorMode();
  const handleThemeChange = () => {
    toggleColorMode();
  };

  return (
    <Button color="inherit" onClick={(e) => handleThemeChange(e)}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
};

export default ThemeButton;
