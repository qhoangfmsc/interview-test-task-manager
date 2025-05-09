import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import OverrallDashboard from "../../components/admin/OverrallDashboard";
import { requestAxiosGet } from "../../api/request";
import HeaderDashboard from "../../components/admin/HeaderDashboard";
import ProductChart from "../../components/chart/ProductChart";
import ComparedRevenueChart from "../../components/chart/ComparedRevenueChart";
import ProfitDatagrid from "../../components/admin/ProfitDatagrid";

export default function Dashboard() {
  const [filter, setFilter] = useState("20");
  const [data, setData] = useState([]);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter) setFilter(newFilter);
  };

  useEffect(() => {
    const fetchCompanyRevenueData = async () => {
      try {
        const response = await requestAxiosGet(
          "/mocks/companyRevenuePerQuarterForFiveYears.json"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error loading mock data:", error);
      }
    };

    fetchCompanyRevenueData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <HeaderDashboard
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {data.length && (
        <>
          <OverrallDashboard data={data} filter={filter} />
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <ComparedRevenueChart data={data} />
            <ProductChart data={data} filter={filter} />
          </div>
          <ProfitDatagrid data={data} filter={filter} />
        </>
      )}
    </Box>
  );
}
