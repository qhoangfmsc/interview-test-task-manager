import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import { useTaskList } from "../contexts/TaskListContext";
import { grey, indigo } from "@mui/material/colors";
import { useColorMode } from "../contexts/ThemeContext";
import { datagridConfig } from "../config/task/datagridConfig";

export default function ActionsDataGrid() {
  const [open, setOpen] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);
  const { taskList } = useTaskList();
  const { mode } = useColorMode();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rowDatas = taskList;
  console.log(rowDatas);
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
                setCurrentRow(params.row);
                handleOpen();
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
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20rem",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          {" "}
          {currentRow && (
            <>
              <h2 className="text-2xl font-bold text-center">
                Details Event ID <span>{currentRow.id}</span>
                {Object.keys(currentRow).map((key) => {
                  if (key === "id") {
                    return null;
                  }
                  return (
                    <div key={key} className="flex gap-2 my-4 text-sm">
                      <div className="font-bold">{key}:</div>
                      <div className="font-thin text-left">
                        {currentRow[key]}
                      </div>
                    </div>
                  );
                })}
              </h2>
            </>
          )}
        </Box>
      </Modal>
      <div className="text-2xl text-center lg:text-left font-bold p-8 text-shadow-lg">
        Task List
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
              pageSize: 10,
            },
          },
        }}
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
