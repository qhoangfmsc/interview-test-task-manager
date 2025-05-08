import * as React from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { taskConfig } from "../config/task/taskConfig";
import TaskBoard from "./TaskBoard";
import { filterTasksByStatus } from "../utils/utils";
import AutoCompleteTaskSearch from "./AutoCompleteTaskSearch";

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function tabProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function TaskList({ taskList }) {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!searchValue) return taskList;
    return taskList.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [taskList, searchValue]);

  const tasksByStatus = React.useMemo(() => {
    return filterTasksByStatus(filteredData);
  }, [filteredData]);

  const handleSearch = (value) => {
    setSearchValue((prev) => (prev === value ? prev : value));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant="scrollable"
          scrollButtons
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          {taskConfig.status.map((status) => {
            const count = tasksByStatus[status.value]?.length || 0;
            return (
              <Tab
                key={status.id}
                label={
                  <div className="capitalize">
                    {status.status}{" "}
                    {status.value !== "all" && <span>({count})</span>}
                  </div>
                }
                {...tabProps(status.id)}
              />
            );
          })}
        </Tabs>
        <AutoCompleteTaskSearch
          taskList={taskList}
          handleSearch={handleSearch}
        />
      </div>
      {tasksByStatus &&
        taskConfig.status.map((status) => (
          <CustomTabPanel key={status.id} value={value} index={status.id}>
            <TaskBoard taskList={tasksByStatus} statusTab={status.status} />
          </CustomTabPanel>
        ))}
    </Box>
  );
}

export default TaskList;
