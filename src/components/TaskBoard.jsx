import React, { memo, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { taskConfig } from "../config/taskConfig";
import TaskCard from "./TaskCard";

const TaskBoard = ({ taskList, statusTab = "All" }) => {
  const filteredStatusList = useMemo(() => {
    if (statusTab === "All") {
      return taskConfig.status.filter((s) => s.status !== "All");
    }
    return taskConfig.status.filter((s) => s.status === statusTab);
  }, [statusTab]);

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Box
        sx={{
          display: {
            md: "block",
            lg: "flex",
          },
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {filteredStatusList.map((statusObject) => {
          const tasks = taskList[statusObject.value] || [];
          return (
            <Box
              key={statusObject.status}
              sx={{
                flex: `1 1 ${100 / filteredStatusList.length}%`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color={statusObject.color}
                mb={2}
              >
                <span className="text-shadow-lg">
                  {statusObject.status} ({tasks.length})
                </span>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {tasks.length === 0 ? (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      opacity: 0.8,
                    }}
                  >
                    Empty
                  </Typography>
                ) : (
                  tasks.map((task) => (
                    <Box
                      key={task.title}
                      sx={{
                        width: `calc(calc(33.333% * ${filteredStatusList.length}) - 16px)`,
                        minWidth: "250px",
                      }}
                    >
                      <TaskCard task={task} />
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default memo(TaskBoard);
