import React from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Chip,
  Avatar,
  Slider,
  Button,
  MenuItem,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller } from "react-hook-form";
import { taskConfig } from "../../config/task/taskConfig";
import dayjs from "dayjs";
import { useAccountList } from "../../contexts/AccountListContext";

const TaskDetailsEdit = ({ initialTask, handleEdit }) => {
  const { accountList } = useAccountList();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialTask.title || "",
      description: initialTask.description || "",
      tags: initialTask.tags || [],
      priority: initialTask.priority || "",
      project: initialTask.project || "",
      progress: initialTask.progress || 0,
      assignees: initialTask.assignees || [],
      dueDate: initialTask.dueDate ? new Date(initialTask.dueDate) : null,
      status: initialTask.status || "",
    },
  });

  const onSubmit = (data) => {
    handleEdit({
      ...initialTask,
      ...data,
      dueDate: (data.dueDate = dayjs(data.dueDate).format("YYYY-MM-DD")),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                required
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                minRows={3}
              />
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
                value={accountList.filter((acc) =>
                  field.value.includes(acc.id)
                )}
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
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                required
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {taskConfig.status
                  .filter((s) => s.value !== "all")
                  .map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.status}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />

          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Priority"
                fullWidth
                required
                error={!!errors.priority}
                helperText={errors.priority?.message}
              >
                {taskConfig.priority
                  .filter((p) => p.value !== "all")
                  .map((p) => (
                    <MenuItem key={p.value} value={p.priority}>
                      {p.priority}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />

          <Controller
            name="project"
            control={control}
            rules={{ required: "Project is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Project"
                fullWidth
                required
                error={!!errors.project}
                helperText={errors.project?.message}
              >
                {taskConfig.project
                  .filter((p) => p.value !== "all")
                  .map((p) => (
                    <MenuItem key={p.value} value={p.project}>
                      {p.project}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />

          <Controller
            name="progress"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography gutterBottom>Progress</Typography>
                <Slider
                  {...field}
                  value={field.value}
                  onChange={(_, val) => field.onChange(val)}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dueDate"
              control={control}
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Due Date"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            type="submit"
            sx={{ width: 200, alignSelf: "center" }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default TaskDetailsEdit;
