import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { config } from "../config/system/config";
import { useLocation, useNavigate } from "react-router";
import { Box, Button } from "@mui/material";
import AccountDialog from "./AccountDialog";
import ThemeButton from "./ThemeButton";
import { getPathSegment } from "../utils/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MyAppBar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathSegment = getPathSegment(currentPath);

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
          <Typography
            component="div"
            sx={{
              fontSize: {
                md: "0.85rem",
                lg: "1rem",
                textTransform: "capitalize",
              },
            }}
          >
            {pathSegment ? (
              <div className="flex flex-row items-center gap-1">
                <IconButton
                  variant="text"
                  color="inherit"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                {pathSegment.resource} #{pathSegment.id}
              </div>
            ) : (
              config.routes[currentPath]
            )}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ThemeButton />
          <AccountDialog />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(MyAppBar);
