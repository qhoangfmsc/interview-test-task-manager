import { Card } from "@mui/material";
import { useColorMode } from "../../contexts/ThemeContext";
import { grey, indigo } from "@mui/material/colors";
import TinyLineTemplateChart from "../chart/template/TinyLineTemplateChart";

export default function OverrallBox({ config }) {
  const { mode } = useColorMode();
  const firstData = config.data[0][config.dataKey];
  const lastData = config.data[config.data.length - 1][config.dataKey];
  const range = lastData - firstData;
  const isGood = config.isForwardOperator * Boolean(range >= 0);
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
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
      <div>
        <div
          className="text-md font-bold mx-4 mt-2"
          style={{ color: config.color }}
        >
          {config.title}
        </div>
        <div
          className=" px-4"
          style={{ fontSize: "12px", color: isGood ? "green" : "red" }}
        >
          {`${config.data[config.data.length - 1][config.dataKey].toLocaleString()} ${config.unit} `}
          {isGood
            ? `(+${range.toLocaleString()}${config.unit})`
            : `(-${range.toLocaleString()}${config.unit})`}
        </div>
      </div>
      <TinyLineTemplateChart config={config} />
    </Card>
  );
}
