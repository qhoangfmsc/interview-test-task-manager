import { configBoxes } from "../../config/chart/boxes";
import { getDataOverQuarters } from "../../utils/chartUtils";
import OverrallBox from "./OverrallBox";

export default function OverrallDashboard({ data, filter }) {
  const overrallData = getDataOverQuarters(data);
  const filteredData = overrallData.reverse().slice(0, filter).reverse();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {configBoxes.map((config, index) => (
        <OverrallBox key={index} config={{ ...config, data: filteredData }} />
      ))}
    </div>
  );
}
