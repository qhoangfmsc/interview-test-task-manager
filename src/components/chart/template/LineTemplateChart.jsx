import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useColorMode } from "../../../contexts/ThemeContext";
import { formatDateMMMMDDYYYY } from "../../../utils/utils";

const LineTemplateChart = ({ config }) => {
  const { mode } = useColorMode();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label text-md">{label}</p>
          <p className="desc text-sm font-bold" style={{ color: "#8884d8" }}>
            <span className="dot" />
            <span>{config.title}</span>:{payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill={mode === "light" ? "#000000" : "#999999"}
          fontSize={12}
        >
          {formatDateMMMMDDYYYY(payload.value)}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={config.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={config.dataKeyX} tick={<CustomXAxisTick />} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => {
            switch (value) {
              case config.dataKeyLine:
                return config.title;
              default:
                return value;
            }
          }}
          wrapperStyle={{
            fontSize: "12px",
          }}
        />
        <Line
          type="monotone"
          dataKey={config.dataKeyLine}
          stroke={config.color}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineTemplateChart;
