import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  Chip,
  Box,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getConfigListWithoutZeroItem } from "../utils/utils";
import { taskConfig } from "../config/task/taskConfig";
import { accountList } from "../config/account/accountList";
import { useTaskList } from "../contexts/TaskListContext";

const TAG_OPTIONS = getConfigListWithoutZeroItem(taskConfig.tag);
const PRIORITY_OPTIONS = getConfigListWithoutZeroItem(taskConfig.priority);
const PROJECT_OPTIONS = getConfigListWithoutZeroItem(taskConfig.project);
const ASSIGNEE_OPTIONS = getConfigListWithoutZeroItem(accountList);

const TaskForm = ({ onSubmitSuccess }) => {
  const { taskList, handleAddTask } = useTaskList();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      priority: "",
      project: "",
      progress: 0,
      assignees: [],
      comments: [],
      dueDate: null,
      status: "ongoing",
    },
  });
  const onSubmit = (data) => {
    data.dueDate = dayjs(data.dueDate).format("YYYY-MM-DD");
    data.id = taskList.length;
    onSubmitSuccess();
    handleAddTask(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} direction="column">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="dueDate"
            control={control}
            rules={{ required: "Due date is required" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Due Date"
                disablePast
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.toISOString() : null)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dueDate,
                    helperText: errors.dueDate?.message,
                  },
                }}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority</InputLabel>
                <Select {...field} label="Priority">
                  {PRIORITY_OPTIONS.map((optionItem) => (
                    <MenuItem key={optionItem.id} value={optionItem.priority}>
                      {optionItem.priority}
                    </MenuItem>
                  ))}
                </Select>
                {errors.priority && (
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      margin: "3px 14px 0px 14px",
                    }}
                  >
                    {errors.priority.message}
                  </span>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="tags"
            control={control}
            rules={{
              validate: (value) =>
                value.length <= 3 || "Maximum 3 tags allowed",
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.tags}>
                <InputLabel>Tags (optional, max 3)</InputLabel>
                <Select
                  {...field}
                  multiple
                  input={<OutlinedInput label="Tags (optional, max 3)" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {TAG_OPTIONS.map((tagItem) => (
                    <MenuItem key={tagItem.id} value={tagItem.tag}>
                      {tagItem.tag}
                    </MenuItem>
                  ))}
                </Select>
                {errors.tags && (
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      margin: "3px 14px 0px 14px",
                    }}
                  >
                    {errors.tags.message}
                  </span>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="assignees"
            control={control}
            rules={{
              required: "Assignees is required",
              validate: (value) =>
                value.length > 0 || "Need at least 1 assignee",
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.assignees}>
                <InputLabel>Assignees</InputLabel>
                <Select
                  {...field}
                  multiple
                  input={<OutlinedInput label="Assignees" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      {selected.map((id) => {
                        const assignee = ASSIGNEE_OPTIONS.find(
                          (u) => u.id === id
                        );
                        return (
                          <Chip key={id} label={assignee?.username || id} />
                        );
                      })}
                    </Box>
                  )}
                >
                  {ASSIGNEE_OPTIONS.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
                {errors.assignees && (
                  <Box
                    sx={{
                      color: "red",
                      fontSize: 12,
                      margin: "3px 14px 0px 14px",
                    }}
                  >
                    {errors.assignees.message}
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="project"
            control={control}
            rules={{ required: "Project type is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.project}>
                <InputLabel>Project</InputLabel>
                <Select {...field} label="Project">
                  {PROJECT_OPTIONS.map((option) => (
                    <MenuItem key={option.project} value={option.project}>
                      {option.project}
                    </MenuItem>
                  ))}
                </Select>
                {errors.project && (
                  <Box
                    sx={{
                      color: "red",
                      fontSize: 12,
                      margin: "3px 14px 0px 14px",
                    }}
                  >
                    {errors.project.message}
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description (optional)"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default TaskForm;
