import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function HeaderDashboard({ filter, handleFilterChange }) {
  return (
    <div className="flex flex-col lg:flex-row gap-1 justify-between w-full text-2xl text-left font-bold text-shadow-lg mb-2">
      <div className="text-2xl text-left font-bold text-shadow-lg">
        Company Revenue Overview (Over 5 years)
      </div>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleFilterChange}
      >
        <ToggleButton value="2" sx={{ textTransform: "none", width: "20%" }}>
          2Q
        </ToggleButton>
        <ToggleButton value="4" sx={{ textTransform: "none", width: "20%" }}>
          1Y
        </ToggleButton>
        <ToggleButton value="8" sx={{ textTransform: "none", width: "20%" }}>
          2Ys
        </ToggleButton>
        <ToggleButton value="12" sx={{ textTransform: "none", width: "20%" }}>
          3Ys
        </ToggleButton>
        <ToggleButton value="20" sx={{ textTransform: "none", width: "20%" }}>
          5Ys
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
