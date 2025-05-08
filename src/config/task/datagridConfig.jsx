import {
  Avatar,
  AvatarGroup,
  Chip,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { formatDateMMMMDDYYYY } from "../../utils/utils";
import { taskConfig } from "./taskConfig";

export const datagridConfig = (accountList) => {
  return {
    column: [
      {
        field: "id",
        headerName: "ID",
        editable: false,
        width: 100,
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        editable: false,
        width: 150,
        renderCell: (params) => {
          return (
            <div className="w-full">{formatDateMMMMDDYYYY(params.value)}</div>
          );
        },
      },
      {
        field: "title",
        headerName: "Title",
        editable: false,
        width: 250,
        renderCell: (params) => {
          return (
            <Tooltip title={params.value} placement="top-start">
              {params.value}
            </Tooltip>
          );
        },
      },
      {
        field: "priority",
        headerName: "Priority",
        editable: false,
        width: 120,
        sortComparator: (v1, v2) => {
          const getPid = (val) => {
            const findValue = taskConfig.priority.find(
              (p) => p.priority === val
            );
            return findValue?.id ?? 0;
          };
          return getPid(v1) - getPid(v2);
        },
        renderCell: (params) => {
          return (
            <Chip
              label={params.value}
              size="small"
              sx={{
                width: "100%",
                color: "primary.contrastText",
                bgcolor:
                  taskConfig.priority.find((p) => p.priority === params.value)
                    ?.color || "inherit",
              }}
            />
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        editable: false,
        width: 150,
        renderCell: (params) => {
          switch (params.value) {
            case "ongoing":
              return <div className="w-full text-blue-400">On Going</div>;
            case "inprogress":
              return <div className="w-full text-yellow-600">In Progress</div>;
            case "completed":
              return <div className="w-full text-green-700">Completed</div>;
            default:
              return <div className="w-full">{params.value}</div>;
          }
        },
      },
      {
        field: "progress",
        headerName: "Progress",
        editable: false,
        width: 160,
        renderCell: (params) => {
          return (
            <div className="relative w-full h-full content-center gap-1">
              <LinearProgress
                variant="determinate"
                color={params.value === 100 ? "success" : "primary"}
                value={params.value}
                sx={{ height: 20, borderRadius: 2 }}
              />
              <span
                className="absolute text-white"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {params.value}%
              </span>
            </div>
          );
        },
      },
      {
        field: "assignees",
        headerName: "Assignees",
        editable: false,
        width: 150,
        renderCell: (params) => {
          return (
            <div className="h-full flex flex-row gap-1 items-center">
              <AvatarGroup max={params.value.length}>
                {params.value.map((id) => {
                  const user = accountList.find((account) => account.id === id);
                  return (
                    <Avatar alt={user?.username} sx={{ width: 24, height: 24 }}>
                      <Tooltip title={user?.username} key={id} placement="top">
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
            </div>
          );
        },
      },
    ],
  };
};
