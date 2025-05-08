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

  const renderComponent = () => {
    try {
      return (
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
      );
    } catch (error) {
      console.log(error);
      return (
        <DataGrid
          slots={{
            noRowsOverlay: (
              <Box sx={{ color: "error.light" }}>Error Task in List</Box>
            ),
          }}
          columns={columns}
          rows={[]}
        />
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box display={"flex"} justifyContent={"space-between"} sx={{ px: 4 }}>
        <div className="text-2xl text-center lg:text-left font-bold p-8 text-shadow-lg">
          Task List
        </div>
        <div className="flex items-center gap-2">
          <TaskAsideDrawer />
          <AutoCompleteTaskSearch
            taskList={taskList}
            handleSearch={handleSearch}
          />
        </div>
      </Box>
      {renderComponent()}
    </Box>
  );
}
