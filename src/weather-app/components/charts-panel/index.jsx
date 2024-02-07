import { NicenessDistributionChart } from "./niceness-distribution-chart/index.jsx";
import { TemperatureDistributionChart } from "./temperature-distribution-chart/index.jsx";
import { PressureDistributionChart } from "./pressure-distribution-chart/index.jsx";

export const ChartsPanel = () => {

  return (
    <>
      <NicenessDistributionChart/>
      <TemperatureDistributionChart/>
      <PressureDistributionChart/>
    </>
  )
}