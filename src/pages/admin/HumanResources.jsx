import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import HeaderHR from "../../components/admin/HeaderHR";
import { requestAxiosGet } from "../../api/request";
import { generateIdForData } from "../../utils/chartUtils";
import DepartmentPerformance from "../../components/admin/DepartmentPerformance";
import OverviewEmployee from "../../components/admin/OverviewEmployee";
import EmployeeGrowthChart from "../../components/admin/EmployeeGrowthChart";
import EmployeeGrowthDatagrid from "../../components/admin/EmployeeGrowthDatagrid";

const HumanResources = () => {
  const [filter, setFilter] = useState("24");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCompanyRevenueData = async () => {
      try {
        const response = await requestAxiosGet(
          "/mocks/employeeGrowthForTwentyFourMonths.json"
        );
        const resData = generateIdForData(response.data);
        setData(resData);
      } catch (error) {
        console.error("Error loading mock data:", error);
      }
    };

    fetchCompanyRevenueData();
  }, []);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter) setFilter(newFilter);
  };

  const filteredData = useMemo(() => {
    if (!data || !data.length) return [];
    const monthsToShow = parseInt(filter, 10);
    return data.slice(-monthsToShow);
  }, [data, filter]);

  return (
    <Box sx={{ width: "100%" }}>
      <HeaderHR filter={filter} handleFilterChange={handleFilterChange} />
      {data.length > 0 && (
        <>
          <OverviewEmployee data={filteredData} />
          <DepartmentPerformance data={filteredData} />
          <EmployeeGrowthChart data={filteredData} />
          <EmployeeGrowthDatagrid data={filteredData} />
        </>
      )}
    </Box>
  );
};

export default HumanResources;
