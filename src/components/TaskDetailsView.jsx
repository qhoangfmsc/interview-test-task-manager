import React from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  TextField,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { taskConfig } from "../config/task/taskConfig";
import { formatDateMMMMDDYYYY } from "../utils/utils";
import { accountList } from "../config/account/accountList";
import PrettoSlider from "./PrettoSlider";

const TaskDetailsView = ({ initialTask }) => {
  const status = taskConfig.status.find((s) => s.value === initialTask.status);
  const priotity = taskConfig.priority.find(
    (p) => p.priority === initialTask.priority
  );

  console.log(status);

  const CustomeTypography = ({ children }) => (
    <Typography
      sx={{ width: 100, fontWeight: "thin", color: grey[600], fontSize: 14 }}
    >
      {children}
    </Typography>
  );
  return (
    <>
      <Stack direction="row" spacing={1} mt={2} alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          {initialTask.title}
        </Typography>
        <Chip
          label={initialTask.priority}
          size="small"
          sx={{
            color: "primary.contrastText",
            bgcolor: priotity?.color || "inherit",
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2} mt={2} alignItems="center">
        <CustomeTypography>Due date:</CustomeTypography>
        <Typography>
          {formatDateMMMMDDYYYY(initialTask.dueDate) || "N/A"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" mt={2}>
        <CustomeTypography>Status:</CustomeTypography>
        <Typography fontWeight={"bold"} color={status.color}>
          {status.status || "Unknown"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" mt={2}>
        <CustomeTypography>Progress:</CustomeTypography>
        <Box sx={{ width: 200 }}>
          <PrettoSlider defaultValue={initialTask.progress} />
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} mt={2} alignItems="center">
        <CustomeTypography>Tags:</CustomeTypography>
        {initialTask.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" color="primary" />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} mt={2} alignItems="center">
        <CustomeTypography>Assignees:</CustomeTypography>
        {initialTask.assignees?.map((assignee, i) => {
          const account = accountList.find((a) => a.id === assignee);
          return (
            <Chip
              key={i}
              avatar={
                <Avatar key={i} alt={account.username} src={account.avatar} />
              }
              label={account.username}
              variant="outlined"
            />
          );
        })}
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" mt={2}>
        <CustomeTypography>Project:</CustomeTypography>
        <Typography>{initialTask.project || "Unknown"}</Typography>
      </Stack>

      <Box mt={3}>
        <Typography gutterBottom>Description</Typography>
        <TextField
          disabled
          multiline
          fullWidth
          minRows={3}
          value={initialTask.description || ""}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6">
          Comments{" "}
          <span className="text-xs text-gray-500">
            ({initialTask.comments?.length || 0})
          </span>
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {initialTask.comments?.map((comment, index) => {
            const account = accountList.find((a) => comment.userid === a.id);
            return (
              <ListItem key={index} alignItems="center">
                <ListItemAvatar>
                  <Avatar alt={account.username} src={account.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.username}
                  secondary={comment.message}
                />
              </ListItem>
            );
          }) || <Typography>No comments.</Typography>}
        </List>
      </Box>
    </>
  );
};

export default TaskDetailsView;
