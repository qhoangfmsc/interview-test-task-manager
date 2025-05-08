import React from "react";
import Box from "@mui/material/Box";
import AsideDrawer from "../components/AsideDrawer";
import MyAppBar from "../components/AppBar";
import { Outlet } from "react-router";
import { Toolbar } from "@mui/material";
import { config } from "../config/system/config";
import { useTaskList } from "../contexts/TaskListContext";
import Loading from "../components/Loading";

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { isTaskLoading } = useTaskList();

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <MyAppBar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: config.drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <AsideDrawer
          container={container}
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${config.drawerWidth}px)`,
            xs: "100%",
          },
        }}
      >
        <Toolbar />
        {isTaskLoading ? <Loading /> : <Outlet />}
      </Box>
    </Box>
  );
}
export default Layout;
