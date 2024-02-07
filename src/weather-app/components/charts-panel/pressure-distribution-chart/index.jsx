import { useSelector } from "react-redux";
import { pressureDistributionSelector } from "../../../cities-data/selectors.js";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export const PressureDistributionChart = () => {
  const pressureDistribution = useSelector(pressureDistributionSelector)
  if (pressureDistribution === null) {
    return null
  }

  const unit = 'hPa'

  const tooltipFormatter = (value) => [`${value}${unit}`, 'pressure']


  return (
    <AreaChart width={1000} height={500} data={pressureDistribution}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name" angle={-45} tickMargin={30} height={100}
             label={{ value: "City Name", position: 'insideBottomRight' }}/>
      <YAxis type="number" domain={['auto', 'auto']} label={{ value: `Pressure in ${unit}`, angle: -90, position: 'insideLeft' }}/>
      <Tooltip formatter={tooltipFormatter}/>
      <Area type="monotone" dataKey="value" fill="#82ca9d"/>
    </AreaChart>
  )
}