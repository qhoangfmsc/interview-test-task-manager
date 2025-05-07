import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";
import { useUser } from "../contexts/UserContext";
import AccountSwitchModal from "./AccountSwitchModal";

export default function AccountDialog() {
  const { user, handleChangeUser } = useUser();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef();

  const handleClickOpen = () => {
    buttonRef.current?.blur();
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) handleChangeUser(value);
  };

  return (
    <div>
      <Button
        ref={buttonRef}
        color="inherit"
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          gap: 0.5,
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{ bgcolor: blue[100], color: blue[600], width: 30, height: 30 }}
        />
        <Typography
          sx={{
            fontSize: "0.9rem",
          }}
        >
          {typeof selectedValue === "string" ? "Choose account" : user.username}
        </Typography>
      </Button>
      <AccountSwitchModal
        selectedValue={user}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
