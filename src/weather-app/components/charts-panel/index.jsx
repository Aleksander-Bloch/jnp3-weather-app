import { NicenessChart } from "./niceness-chart/index.jsx";
import { TemperatureHistogram } from "./histograms/temperature-histogram/index.jsx";
import { PressureHistogram } from "./histograms/pressure-histogram/index.jsx";

export const ChartsPanel = () => {

  return (
    <>
      <NicenessChart/>
      <TemperatureHistogram/>
      <PressureHistogram/>
    </>
  )
}