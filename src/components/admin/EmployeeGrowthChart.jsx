import React from "react";
import { Card, Typography } from "@mui/material";
import LineTemplateChart from "../chart/template/LineTemplateChart";
import { useColorMode } from "../../contexts/ThemeContext";
import { grey, indigo } from "@mui/material/colors";

const EmployeeGrowthChart = ({ data }) => {
  const { mode } = useColorMode();
  const CustomCard = ({ children }) => (
    <Card
      variant="outlined"
      sx={{
        my: 2,
        p: 2,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "paper.main",
        color: "inherit",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: mode === "light" ? indigo[100] : grey[900],
      }}
    >
      {children}
    </Card>
  );

  return (
    <CustomCard>
      <Typography variant="h6" gutterBottom>
        Employee Growth Over Years
      </Typography>
      <LineTemplateChart
        config={{
          data,
          dataKeyX: "month",
          dataKeyLine: "totalEmployees",
          title: "Total Employees",
          color: "#8884d8",
        }}
      />
    </CustomCard>
  );
};

export default EmployeeGrowthChart;
