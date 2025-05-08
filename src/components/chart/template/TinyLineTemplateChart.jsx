import { Paper } from "@mui/material";
import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const TinyLineTemplateChart = ({ config }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper
          elevation={10}
          sx={{
            position: "absolute",
            top: "7rem",
            width: "max-content",
            padding: "0.5rem",
            textAlign: "left",
          }}
        >
          <p className="text-sm">{`${data.name}`}</p>
          <p className="text-xs">{`${config.title}: ${data[config.dataKey].toLocaleString()} ${config.unit}`}</p>
        </Paper>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={100}>
      <LineChart data={config.data}>
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={config.dataKey}
          stroke={config.color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineTemplateChart;
