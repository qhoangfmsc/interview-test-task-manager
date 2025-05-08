import React, { memo } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { config } from "../config/system/config";
import { alpha, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";

const AsideDrawer = ({
  container,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\//, "");

  const handleClickPageChosen = (path) => {
    navigate(path);
  };

  const drawerContent = (
    <div>
      <Toolbar sx={{ p: 2 }}>
        <Link to="/" className="flex items-center gap-2">
          <Avatar alt="Logo" src="/react.svg" sx={{ width: 25, height: 25 }} />
          <Typography variant="h6">React Test</Typography>
        </Link>
      </Toolbar>
      <Divider />
      {Object.keys(config.aside).map((usertype) => (
        <Box key={usertype}>
          <List>
            {config.aside[usertype].map((page, index) => {
              const isActive = `/${currentPath}` === page.path;
              return (
                <Box key={index}>
                  {page.type === "title" && (
                    <Typography
                      sx={{
                        color: (theme) =>
                          alpha(theme.palette.text.primary, 0.55),
                        px: 2,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: "0.6rem",
                        letterSpacing: 2,
                      }}
                    >
                      {page.name}
                    </Typography>
                  )}
                  {page.type === "component" && (
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleClickPageChosen(page.path)}
                        selected={isActive === page.path}
                        sx={{
                          transition: "all 0.2s ease-in-out",
                          color: isActive ? "primary.main" : "text.primary",
                          "& .MuiListItemIcon-root": {
                            color: isActive ? "primary.main" : "inherit",
                          },
                        }}
                      >
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText>
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                            }}
                          >
                            {page.name}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  )}
                </Box>
              );
            })}
          </List>
          <Divider />
        </Box>
      ))}
    </div>
  );

  return (
    <>
      {/* MOBILE */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        onTransitionEnd={handleDrawerTransitionEnd}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "80%",
          },
        }}
        slotProps={{ root: { keepMounted: true } }}
      >
        {drawerContent}
      </Drawer>
      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: config.drawerWidth,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
export default memo(AsideDrawer);
