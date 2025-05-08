import React, { createContext, useState, useEffect, useContext } from "react";
import { enqueueSnackbar } from "notistack";
import { requestAxiosGet } from "../api/request";

const TaskListContext = createContext(undefined);

export const TaskListProvider = ({ children }) => {
  const [taskListContext, setTaskListContext] = useState([]);
  const [isTaskLoading, setTaskIsLoading] = useState(true);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const storedTasks = localStorage.getItem("taskList");
        if (storedTasks && storedTasks !== "[]") {
          setTaskListContext(JSON.parse(storedTasks));
        } else {
          const response = await requestAxiosGet("/mocks/taskList.json");
          setTaskListContext(response.data);
        }
      } catch (error) {
        console.error("Error loading mock tasks:", error);
      } finally {
        setTaskIsLoading(false);
      }
    };

    fetchTaskList();
  }, []);

  const handleAddTask = (newTask) => {
    try {
      setTaskListContext((prev) => {
        const updatedList = [...prev, newTask];
        localStorage.setItem("taskList", JSON.stringify(updatedList));
        return updatedList;
      });

      enqueueSnackbar(`Task created successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Task creation failed`, {
        variant: "error",
      });
    }
  };

  const handleUpdateTask = (newTask) => {
    try {
      setTaskListContext((prev) => {
        const updatedTaskList = prev.map((task) =>
          task.id === newTask.id ? newTask : task
        );
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        return updatedTaskList;
      });

      enqueueSnackbar(`Task updated successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Task update failed`, {
        variant: "error",
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    try {
      setTaskListContext((prev) => {
        const updatedTaskList = prev.filter((task) => task.id !== taskId);
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        return updatedTaskList;
      });

      enqueueSnackbar(`Task deleted successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Task deletion failed`, {
        variant: "error",
      });
    }
  };

  return (
    <TaskListContext.Provider
      value={{
        taskList: taskListContext,
        isTaskLoading,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
      }}
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
