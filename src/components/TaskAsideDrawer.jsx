import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TaskForm from "./TaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
function TaskAsideDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 500, p: 2 }} role="presentation">
      <div className="flex flex-row gap-1">
        <Button color="inherit" onClick={toggleDrawer(false)}>
          <CloseIcon />
        </Button>
        <div className="text-2xl text-center lg:text-left font-bold py-2 text-shadow-lg">
          Add Task
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TaskForm onSubmitSuccess={toggleDrawer(false)} />
      </LocalizationProvider>
    </Box>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        Add Task
      </Button>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default TaskAsideDrawer;
