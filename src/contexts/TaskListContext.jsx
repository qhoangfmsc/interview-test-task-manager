import React, { createContext, useState, useEffect, useContext } from "react";
import { taskList as initialTaskList } from "../config/task/taskList";
import { enqueueSnackbar } from "notistack";

const TaskListContext = createContext(undefined);

export const TaskListProvider = ({ children }) => {
  const [taskListContext, setTaskListContext] = useState([]);

  const handleAddTask = (newTask) => {
    try {
      setTaskListContext((prev) => [...prev, newTask]);
      localStorage.setItem(
        "taskList",
        JSON.stringify([...taskListContext, newTask])
      );

      enqueueSnackbar(`Task created successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Task creation failed`, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks && storedTasks !== "[]") {
      setTaskListContext(JSON.parse(storedTasks));
    } else {
      setTaskListContext(initialTaskList);
    }
  }, []);

  return (
    <TaskListContext.Provider
      value={{ taskList: taskListContext, handleAddTask }}
    >
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
