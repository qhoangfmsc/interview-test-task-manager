import React from "react";
import TaskTab from "../components/TaskTab";
import { taskList } from "../config/taskList";

function TeamTasks() {
  return <TaskTab taskList={taskList} />;
}

export default TeamTasks;
