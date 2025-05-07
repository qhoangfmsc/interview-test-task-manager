import React from "react";
import TaskTab from "../components/TaskTab";
import { useTaskList } from "../contexts/TaskListContext";

function TeamTasks() {
  const { taskList } = useTaskList();
  return <TaskTab taskList={taskList} />;
}

export default TeamTasks;
