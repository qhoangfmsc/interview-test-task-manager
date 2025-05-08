import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};

export default function ConfirmDeleteModal({ handleDelete }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    if (!open) return;
    setCount(3);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <>
      <IconButton variant="text" color="error" onClick={handleOpen}>
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box display={"flex"} flexDirection={"column"} sx={style}>
          <Box>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              color="warning"
            >
              Warning!
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </Typography>
          </Box>
          <Button
            disabled={count !== 0}
            variant="contained"
            color="error"
            sx={{
              mt: 2,
              alignSelf: "end",
            }}
            onClick={handleDelete}
          >
            Confirm delete {count > 0 && `(${count}s)`}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
