import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, AvatarGroup, Box, Tooltip } from "@mui/material";
import { useAccountList } from "../../contexts/AccountListContext";
import { formatDateMMMMDDYYYY } from "../../utils/utils";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function AutoCompleteTaskSearch({ taskList, handleSearch }) {
  const { accountList } = useAccountList();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(300);
      setLoading(false);
      setOptions(taskList);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleChange = (event, value) => {
    setValue(value);
    handleSearch(value);
  };

  return (
    <Tooltip title={value ? value : "Searching task"} placement="top-start">
      <Autocomplete
        size="small"
        sx={{
          my: 2,
          width: {
            lg: 400,
            xs: "100%",
          },
        }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        onInputChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search task..."
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              },
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              <div className="flex flex-col">
                <div className="text-sm">
                  <span className="text-xs">(#{option.id})</span> {option.title}
                </div>
                <div className="flex flex-row">
                  <div className="h-full flex flex-row gap-1 items-center">
                    <AvatarGroup max={option.assignees.length}>
                      {option.assignees.map((id) => {
                        const user = accountList.find(
                          (account) => account.id === id
                        );
                        return (
                          <Avatar
                            alt={user?.username}
                            sx={{ width: 12, height: 12 }}
                          >
                            <img
                              src={user?.avatar}
                              alt={user?.username}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                              }}
                            />
                          </Avatar>
                        );
                      })}
                    </AvatarGroup>
                  </div>
                  <div className="text-xs text-gray-500 ml-2">
                    Due to {formatDateMMMMDDYYYY(option.dueDate)}
                  </div>
                </div>
              </div>
            </Box>
          );
        }}
      />
    </Tooltip>
  );
}

export default React.memo(AutoCompleteTaskSearch);
