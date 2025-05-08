import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const mockData = {
  year: [
    { year: "2019", revenue: 4200, services: 1000 },
    { year: "2020", revenue: 5000, services: 1200 },
    { year: "2021", revenue: 6100, services: 1800 },
    { year: "2022", revenue: 7200, services: 2000 },
    { year: "2023", revenue: 8100, services: 2600 },
  ],
  month: [
    { month: "Jan", revenue: 1200, services: 300 },
    { month: "Feb", revenue: 1400, services: 350 },
    { month: "Mar", revenue: 1600, services: 450 },
    { month: "Apr", revenue: 1900, services: 500 },
    { month: "May", revenue: 2100, services: 600 },
  ],
  week: [
    { week: "W1", revenue: 300, services: 100 },
    { week: "W2", revenue: 450, services: 150 },
    { week: "W3", revenue: 500, services: 200 },
    { week: "W4", revenue: 550, services: 220 },
  ],
};

export default function RevenueDashboard() {
  const [filter, setFilter] = useState("year");

  const handleFilterChange = (event, newFilter) => {
    if (newFilter) setFilter(newFilter);
  };

  const data = mockData[filter];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Company Revenue Overview
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleFilterChange}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
        <ToggleButton value="year">Year</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Trends
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={filter === "year" ? "year" : filter} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue by Services
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={filter === "year" ? "year" : filter} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="services" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
