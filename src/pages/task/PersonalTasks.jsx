import React, { useMemo } from "react";
import TaskList from "../../components/TaskList";
import { useUser } from "../../contexts/UserContext";
import { useTaskList } from "../../contexts/TaskListContext";
import { Box } from "@mui/material";

function PersonalTasks() {
  const { user } = useUser();
  const { taskList } = useTaskList();

  const personalTaskList = useMemo(
    () => taskList.filter((task) => task.assignees.includes(user.id)),
    [user, taskList]
  );

  return <TaskList taskList={personalTaskList} />;
}

export default PersonalTasks;
