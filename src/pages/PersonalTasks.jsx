import React, { useMemo } from "react";
import TaskTab from "../components/TaskTab";
import { taskList } from "../config/taskList";
import { useUser } from "../contexts/UserContext";

function PersonalTasks() {
  const { user } = useUser();
  const personalTaskList = useMemo(
    () => taskList.filter((task) => task.assignees.includes(user.uid)),
    [user]
  );

  return <TaskTab taskList={personalTaskList} />;
}

export default PersonalTasks;
