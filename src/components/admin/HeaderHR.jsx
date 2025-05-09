import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function HeaderHR({ filter, handleFilterChange }) {
  return (
    <div className="flex flex-col lg:flex-row gap-1 justify-between w-full text-2xl text-left font-bold text-shadow-lg mb-2">
      <div className="text-2xl text-left font-bold text-shadow-lg">
        Employee Growth (Over 24 months)
      </div>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleFilterChange}
      >
        <ToggleButton value="3" sx={{ textTransform: "none", width: "25%" }}>
          3Ms
        </ToggleButton>
        <ToggleButton value="6" sx={{ textTransform: "none", width: "25%" }}>
          6Ms
        </ToggleButton>
        <ToggleButton value="12" sx={{ textTransform: "none", width: "25%" }}>
          12Ms
        </ToggleButton>
        <ToggleButton value="24" sx={{ textTransform: "none", width: "25%" }}>
          24Ms
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
