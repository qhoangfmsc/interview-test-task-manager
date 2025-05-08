import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useTaskList } from "../contexts/TaskListContext";
import { grey, indigo } from "@mui/material/colors";
import { useColorMode } from "../contexts/ThemeContext";
import { datagridConfig } from "../config/task/datagridConfig";
import TaskAsideDrawer from "./TaskAsideDrawer";
import AutoCompleteTaskSearch from "./AutoCompleteTaskSearch";
import { useNavigate } from "react-router";

export default function TasksDataGrid() {
  const { taskList } = useTaskList();
  const { mode } = useColorMode();
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchValue((prev) => (prev === value ? prev : value));
  };

  const filteredData = React.useMemo(() => {
    if (!searchValue) return taskList;
    return taskList.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [taskList, searchValue]);

  let rowDatas = filteredData;
  const columns = [
    ...datagridConfig.column,
    {
      field: "action",
      headerName: "",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="w-full text-right">
            <Button
              variant="text"
              color="success"
              onClick={() => {
                navigate(`/task/${params.row.id}`);
              }}
            >
              View Details
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <div className="block lg:flex justify-between items-center">
        <div className="flex flex-row gap-1 justify-between w-full text-2xl text-left font-bold text-shadow-lg mr-2">
          <div>Task List</div>
          <TaskAsideDrawer />
        </div>
        <AutoCompleteTaskSearch
          taskList={taskList}
          handleSearch={handleSearch}
        />
      </div>
      <DataGrid
        rows={rowDatas}
        columns={columns}
        getRowClassName={(params) => {
          switch (params.row.status) {
            case "completed":
              return mode === "light" ? "bg-green-100" : "bg-green-200/10";
            default:
              return "";
          }
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: mode === "light" ? indigo[100] : grey[900],
          "& .MuiDataGrid-row:hover": {
            bgcolor: mode === "light" ? indigo[100] : grey[900],
          },
        }}
      />
    </Box>
  );
}
