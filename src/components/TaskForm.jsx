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
  Autocomplete,
  Avatar,
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
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={taskConfig.tag
                  .filter((t) => t.value !== "all")
                  .map((t) => t.tag)}
                value={value}
                onChange={(e, newValue) => {
                  if (newValue.length <= 3) onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    fullWidth
                    helperText={`${value.length}/3 selected`}
                  />
                )}
              />
            )}
          />

          <Controller
            name="assignees"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || "At least one assignee is required",
            }}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={accountList.filter((acc) => acc.usertype === "user")}
                onChange={(e, newValue) =>
                  field.onChange(newValue.map((acc) => acc.id))
                }
                getOptionLabel={(option) => option.username}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      avatar={<Avatar src={option.avatar} />}
                      label={option.username}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignees"
                    fullWidth
                    required
                    error={!!errors.assignees}
                    helperText={errors.assignees?.message}
                  />
                )}
              />
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
