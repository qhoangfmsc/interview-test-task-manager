import React, { useMemo } from "react";
import TaskList from "../../components/task/TaskList";
import { useUser } from "../../contexts/UserContext";
import { useTaskList } from "../../contexts/TaskListContext";

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
