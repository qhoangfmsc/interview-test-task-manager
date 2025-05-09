import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useColorMode } from "../../contexts/ThemeContext";
import { generateIdForData, getDataOverQuarters } from "../../utils/chartUtils";
import { grey, indigo } from "@mui/material/colors";
import { Card } from "@mui/material";

export default function ProfitDatagrid({ data, filter }) {
  const { mode } = useColorMode();
  const overrallData = getDataOverQuarters(data);
  const filteredData = overrallData.reverse().slice(0, filter).reverse();
  const rowData = generateIdForData(filteredData);

  const columns = [
    {
      field: "name",
      headerName: "Time",
      editable: false,
      width: 180,
    },
    {
      field: "profit",
      headerName: "Profit",
      editable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="w-full text-green-700">{`${params.value.toLocaleString()} VNĐ`}</div>
        );
      },
    },
    {
      field: "profitMargin",
      headerName: "Profit Margin",
      editable: false,
      width: 250,
      renderCell: (params) => {
        return <div className="w-full">{`${params.value}%`}</div>;
      },
    },
    {
      field: "totalRevenue",
      headerName: "Total Revenue",
      editable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="w-full">{`${params.value.toLocaleString()} VNĐ`}</div>
        );
      },
    },
    {
      field: "operatingCost",
      headerName: "Operating Cost",
      editable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="w-full text-rose-600">{`-${params.value.toLocaleString()} VNĐ`}</div>
        );
      },
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        my: 2,
        px: 2,
        pb: 2,
        height: 500,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "paper.main",
        color: "inherit",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: mode === "light" ? indigo[100] : grey[900],
      }}
    >
      <div className="text-md lg:text-left font-bold m-6">Profit details</div>
      <DataGrid
        rows={rowData}
        columns={columns}
        sortModel={[{ field: "name", sort: "desc" }]}
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
    </Card>
  );
}
