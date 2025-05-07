import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { taskConfig } from "../config/taskConfig";
import TaskBoard from "./TaskBoard";
import { filterTasksByStatus } from "../utils/utils";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function tabProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function TaskTab({ taskList }) {
  const [value, setValue] = React.useState(0);
  const tasksByStatus = React.useMemo(() => {
    return filterTasksByStatus(taskList);
  }, [taskList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {taskConfig.status.map((status) => {
            const count = tasksByStatus[status.value]?.length || 0;
            return (
              <Tab
                key={status.sid}
                label={
                  <div className="capitalize">
                    {status.status}{" "}
                    {status.value !== "all" && <span>({count})</span>}
                  </div>
                }
                {...tabProps(status.sid)}
              />
            );
          })}
        </Tabs>
      </Box>
      {tasksByStatus &&
        taskConfig.status.map((status) => (
          <CustomTabPanel key={status.sid} value={value} index={status.sid}>
            <TaskBoard taskList={tasksByStatus} statusTab={status.status} />
          </CustomTabPanel>
        ))}
    </Box>
  );
}

export default TaskTab;
