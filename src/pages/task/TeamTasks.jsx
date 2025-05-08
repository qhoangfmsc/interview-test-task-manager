import React from "react";
import TaskList from "../../components/task/TaskList";
import { useTaskList } from "../../contexts/TaskListContext";

function TeamTasks() {
  const { taskList } = useTaskList();
  return <TaskList taskList={taskList} />;
}

export default TeamTasks;
