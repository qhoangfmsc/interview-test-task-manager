import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import { alpha, Divider, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useAccountList } from "../contexts/AccountListContext";

function AccountSwitchModal({ onClose, selectedValue, open }) {
  const { accountList } = useAccountList();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    enqueueSnackbar(`${value.username} switched`, { variant: "success" });
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Choosing account</DialogTitle>
      <Divider />
      <List
        sx={{
          pt: 0,
          "& .MuiListItem-gutters:hover": {
            transition: "all 0.2s ease-in-out",
            color: "primary.contrastText",
            bgcolor: "primary.main",
          },
        }}
      >
        {accountList.map((account) => (
          <ListItem disablePadding key={account.id}>
            <ListItemButton onClick={() => handleListItemClick(account)}>
              <ListItemAvatar>
                <Avatar
                  src={account.avatar}
                  sx={{ bgcolor: blue[100], color: blue[600] }}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography sx={{ fontSize: "1rem" }}>
                  {account.username}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: (theme) => alpha(theme.palette.text.primary, 0.55),
                  }}
                >
                  {account.email}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default AccountSwitchModal;
