import { useSelector } from "react-redux";
import { temperatureDistributionSelector } from "../../../../cities-data/selectors.js";
import { BaseHistogram } from "../BaseHistogram.jsx";

export const TemperatureHistogram = () => {
  const temperatureDistribution = useSelector(temperatureDistributionSelector)
  if (temperatureDistribution === null) {
    return null
  }

  const label = { value: "Temperature in °C", position: 'insideBottomRight' }

  return <BaseHistogram distribution={temperatureDistribution} label={label}/>
}
