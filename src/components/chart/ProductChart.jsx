import { grey, indigo } from "@mui/material/colors";
import React from "react";
import { useColorMode } from "../../contexts/ThemeContext";
import PieTemplateChart from "./template/PieTemplateChart";
import { Card } from "@mui/material";
import {
  addColorsToData,
  getProductsOverQuarters,
  summarizeProductData,
} from "../../utils/chartUtils";

function ProductChart({ data, filter }) {
  const { mode } = useColorMode();
  const overrallData = getProductsOverQuarters(data);
  const filteredData = overrallData.reverse().slice(0, filter).reverse();
  const summariedProductData = summarizeProductData(filteredData);
  const piechartData = addColorsToData(summariedProductData);

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
      <div className="text-md font-bold m-6 mb-0">Products Sales</div>
      <PieTemplateChart
        config={{
          data: piechartData,
          title: "Revenue",
          dataKey: "value",
          unit: "VNĐ",
        }}
      />
    </Card>
  );
}

export default ProductChart;
