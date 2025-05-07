import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { config } from "../config/system/config";
import { useLocation } from "react-router";
import { useColorMode } from "../contexts/ThemeContext";
import { Box, Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountDialog from "./AccountDialog";

const MyAppBar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const ThemeToggleButton = () => {
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

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${config.drawerWidth}px)` },
        ml: { sm: `${config.drawerWidth}px` },
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {config.routes[currentPath]}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ThemeToggleButton />
          <AccountDialog />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(MyAppBar);
