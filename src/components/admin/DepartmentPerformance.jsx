import React from "react";
import { Grid, Card, Typography, Paper } from "@mui/material";
import { useColorMode } from "../../contexts/ThemeContext";
import { grey, indigo } from "@mui/material/colors";

const DepartmentPerformance = ({ data }) => {
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
        Department Performance
      </Typography>
      <Grid container spacing={2}>
        {data[data.length - 1].departmentStats.map((dept) => (
          <Grid
            key={dept.department}
            size={{
              sm: 3,
              xs: 6,
            }}
          >
            <Paper elevation={4} variant="elevation" sx={{ p: 2 }}>
              <Typography variant="subtitle1">{dept.department}</Typography>
              <Typography variant="body2">
                Avg. Tasks: {dept.avgTasks}
              </Typography>
              <Typography variant="body2">Members: {dept.members}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </CustomCard>
  );
};

export default DepartmentPerformance;
