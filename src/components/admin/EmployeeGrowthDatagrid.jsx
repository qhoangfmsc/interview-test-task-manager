import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatDateMMMMDDYYYY } from "../../utils/utils";
const employeeColumns = [
  {
    field: "month",
    headerName: "Time",
    width: 300,
    renderCell: (params) => (
      <div className="w-full">{formatDateMMMMDDYYYY(params.value)}</div>
    ),
  },
  {
    field: "totalEmployees",
    headerName: "Total Employees",
    width: 300,
    renderCell: (params) => <div className="w-full">{params.value}</div>,
  },
  {
    field: "newHires",
    headerName: "New Hires",
    width: 300,
    renderCell: (params) => (
      <div className="w-full text-green-700">+ {params.value} employee(s)</div>
    ),
  },
  {
    field: "exits",
    headerName: "Exits",
    width: 300,
    renderCell: (params) => (
      <div className="w-full text-rose-600">- {params.value} employee(s)</div>
    ),
  },
];

const EmployeeGrowthDatagrid = ({ data }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={employeeColumns}
        sortModel={[{ field: "month", sort: "desc" }]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default EmployeeGrowthDatagrid;
