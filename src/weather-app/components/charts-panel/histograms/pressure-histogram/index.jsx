import { useSelector } from "react-redux";
import { pressureDistributionSelector } from "../../../../cities-data/selectors.js";
import { BaseHistogram } from "../BaseHistogram.jsx";

export const PressureHistogram = () => {
  const pressureDistribution = useSelector(pressureDistributionSelector)
  if (pressureDistribution === null) {
    return null
  }

  const label = { value: "Pressure in hPa", position: 'insideBottomRight' }

  return <BaseHistogram distribution={pressureDistribution} label={label}/>
}