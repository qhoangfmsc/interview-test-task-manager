import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarTemplateChart({ config }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={config.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {config.boxes
          .filter((box) => box.dataKey !== "profitMargin")
          .map((box) => (
            <Bar
              dataKey={box.dataKey}
              fill={box.color}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
