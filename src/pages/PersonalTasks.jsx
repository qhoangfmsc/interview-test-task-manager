import React, { useMemo } from "react";
import TaskTab from "../components/TaskTab";
import { useUser } from "../contexts/UserContext";
import { useTaskList } from "../contexts/TaskListContext";

function PersonalTasks() {
  const { user } = useUser();
  const { taskList } = useTaskList();

  const personalTaskList = useMemo(
    () => taskList.filter((task) => task.assignees.includes(user.uid)),
    [user, taskList]
  );

  return <TaskTab taskList={personalTaskList} />;
}

export default PersonalTasks;
