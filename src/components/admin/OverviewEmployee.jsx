import React from "react";
import { Card, Typography, Stack, Chip } from "@mui/material";
import { useColorMode } from "../../contexts/ThemeContext";
import { grey, indigo } from "@mui/material/colors";

const OverviewEmployee = ({ data }) => {
  const { mode } = useColorMode();
  function getTextSizeByIndex(index) {
    switch (index) {
      case 0:
        return "text-2xl";
      case 1:
        return "text-xl";
      case 2:
        return "text-md";
      default:
        return "text-xs";
    }
  }

  function getColorByIndex(index) {
    switch (index) {
      case 0:
        return "success";
      case 1:
        return "primary";
      case 2:
        return "warning";
      default:
        return "inherit";
    }
  }

  const CustomCard = ({ children }) => (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        height: "100%",
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
      {children}
    </Card>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full">
      <CustomCard>
        <Typography variant="h6">Top Quantity Departments</Typography>
        <Stack direction="row" spacing={1} mt={1}>
          {data[data.length - 1].departmentStats
            .sort((a, b) => b.members - a.members)
            .map((dept, index) => (
              <Chip
                key={dept.department}
                label={
                  <>
                    <span className={getTextSizeByIndex(index)}>
                      {index + 1}.{" "}
                    </span>
                    <span>{dept.department}</span>
                  </>
                }
                color={getColorByIndex(index)}
              />
            ))}
        </Stack>
      </CustomCard>
      <CustomCard>
        <Typography variant="h6">Total Employees</Typography>
        <Typography variant="h4">
          {data[data.length - 1].totalEmployees.toLocaleString()}
        </Typography>
      </CustomCard>
      <CustomCard>
        <Typography variant="h6">New Hires</Typography>
        <Typography variant="h4" color="green">
          {`+${data[data.length - 1].newHires} employee(s)`}
        </Typography>
      </CustomCard>
    </div>
  );
};

export default OverviewEmployee;
