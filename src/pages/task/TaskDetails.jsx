import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useTaskList } from "../../contexts/TaskListContext";
import TaskDetailsView from "../../components/task/TaskDetailsView";
import TaskDetailsEdit from "../../components/task/TaskDetailEdit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const TaskDetails = () => {
  const { taskList, handleUpdateTask, handleDeleteTask } = useTaskList();
  const { id } = useParams();
  const task = taskList.find((t) => t.id === parseInt(id));
  const [editMode, setEditMode] = React.useState(false);
  const navigate = useNavigate();

  const handleEdit = (newTask) => {
    setEditMode(!editMode);
    handleUpdateTask(newTask);
  };

  const handleDelete = () => {
    handleDeleteTask(task.id);
    navigate(-1);
  };

  if (!task) {
    return <Typography p={4}>Task not found.</Typography>;
  }

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Box maxWidth={800} mx="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>Task Details</Box>
        <Box>
          <IconButton variant="text" color="inherit" onClick={toggleEdit}>
            <EditNoteIcon fontSize="small" />
          </IconButton>
          <ConfirmDeleteModal handleDelete={handleDelete} />
        </Box>
      </Box>
      {editMode ? (
        <TaskDetailsEdit
          initialTask={task}
          handleEdit={(value) => handleEdit(value)}
        />
      ) : (
        <TaskDetailsView initialTask={task} />
      )}
    </Box>
  );
};

export default TaskDetails;
