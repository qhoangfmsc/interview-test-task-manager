import { grey, indigo } from "@mui/material/colors";
import React from "react";
import { useColorMode } from "../../contexts/ThemeContext";
import { Card } from "@mui/material";
import { getDataOverQuarters } from "../../utils/chartUtils";
import BarTemplateChart from "./template/BarTemplateChart";
import { configBoxes } from "../../config/chart/boxes";

function ComparedRevenueChart({ data }) {
  const { mode } = useColorMode();
  const overrallData = getDataOverQuarters(data);
  const filteredData = overrallData.reverse().slice(0, 4).reverse();

  return (
    <Card
      variant="outlined"
      sx={{
        my: 2,
        height: 350,
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
      <div className="text-md font-bold text-left m-6">
        4 Nearest Quarters
      </div>
      <BarTemplateChart
        config={{
          data: filteredData,
          boxes: configBoxes,
          title: "Revenue",
          dataKey: "value",
          unit: "VNĐ",
        }}
      />
    </Card>
  );
}

export default ComparedRevenueChart;
