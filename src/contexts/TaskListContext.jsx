import React, { createContext, useState, useEffect, useContext } from "react";
import { taskList } from "../config/task/taskList";

const TaskListContext = createContext(undefined);

export const TaskListProvider = ({ children }) => {
  const [taskListContext, setTaskListContext] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      setTaskListContext(JSON.parse(storedTasks));
    } else {
      setTaskListContext(taskList);
    }
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [taskListContext]);

  return (
    <TaskListContext.Provider value={{ taskList, taskListContext }}>
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskList = () => {
  const context = useContext(TaskListContext);
  if (!context)
    throw new Error("useTaskList must be used within a TaskListProvider");
  return context;
};
