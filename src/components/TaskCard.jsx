import React, { memo } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
  Stack,
  LinearProgress,
  Tooltip,
  AvatarGroup,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { taskConfig } from "../config/task/taskConfig";
import { useColorMode } from "../contexts/ThemeContext";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import EventIcon from "@mui/icons-material/Event";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { formatDateMMMMDDYYYY, getRemainingDays } from "../utils/utils";
import { accountList } from "../config/account/accountList";

const TaskCard = ({ task }) => {
  const { mode } = useColorMode();
  const remainingDay = getRemainingDays(task.dueDate);

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        bgcolor: "paper.main",
        color: "inherit",
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: mode === "light" ? indigo[100] : grey[900],
      }}
    >
      <Typography variant="subtitle1" fontWeight={600}>
        <Typography variant="caption" color="text.secondary">
          #{task.id}.&nbsp;
        </Typography>
        {task.title}
      </Typography>

      <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
        {task.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" color="primary" />
        ))}
        <Chip
          label={task.priority}
          size="small"
          sx={{
            color: "primary.contrastText",
            bgcolor:
              taskConfig.priority.find((p) => p.priority === task.priority)
                ?.color || "inherit",
          }}
        />
      </Stack>
      {task.status !== "completed" && (
        <Tooltip title="Remaning days" placement="left">
          <Box
            variant="caption"
            color={
              remainingDay === "Expired"
                ? "error.light"
                : remainingDay === "Today"
                  ? "warning.light"
                  : "gray"
            }
            sx={{ display: "flex", gap: 1, placeItems: "center" }}
          >
            <AvTimerIcon fontSize={"10px"} />
            <Typography variant="caption" fontWeight={"bold"}>
              {remainingDay}
            </Typography>
          </Box>
        </Tooltip>
      )}
      <Tooltip title="Due Date" placement="left">
        <Box
          variant="caption"
          color="gray"
          sx={{ display: "flex", gap: 1, placeItems: "center" }}
        >
          <EventIcon fontSize={"10px"} />
          <Typography variant="caption" color="gray">
            {formatDateMMMMDDYYYY(task.dueDate)}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip title="Project" placement="left">
        <Box
          variant="caption"
          color="gray"
          sx={{ display: "flex", gap: 1, placeItems: "center" }}
        >
          <AdsClickIcon fontSize={"10px"} />
          <Typography variant="caption" color="gray">
            {task.project}
          </Typography>
        </Box>
      </Tooltip>
      <Box mt={1}>
        <LinearProgress
          variant="determinate"
          value={task.progress}
          sx={{ height: 6, borderRadius: 2 }}
        />
      </Box>
      <hr
        className={
          mode === "light" ? "border-gray-300 mt-6" : "border-gray-600 mt-6"
        }
      />
      <Stack direction="row" justifyContent="space-between" spacing={1} mt={2}>
        <AvatarGroup max={task.assignees.length}>
          {task.assignees.map((uid) => {
            const user = accountList.find((account) => account.uid === uid);
            return (
              <Avatar alt={user?.username} sx={{ width: 24, height: 24 }}>
                <Tooltip title={user?.username} key={uid} placement="top">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </Tooltip>
              </Avatar>
            );
          })}
        </AvatarGroup>
        <Box
          display="flex"
          variant="caption"
          color="gray"
          sx={{ gap: 0.5, placeItems: "center" }}
        >
          <ChatBubbleOutlineIcon fontSize="small" />
          <Typography fontSize="small">{task.comments.length}</Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default memo(TaskCard);
