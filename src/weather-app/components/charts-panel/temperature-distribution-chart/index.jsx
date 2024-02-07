import { useSelector } from "react-redux";
import { temperatureDistributionSelector } from "../../../cities-data/selectors.js";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export const TemperatureDistributionChart = () => {
  const temperatureDistribution = useSelector(temperatureDistributionSelector)
  if (temperatureDistribution === null) {
    return null
  }

  const unit = '°C'
  const tooltipFormatter = (value) => [`${value}${unit}`, 'temperature']

  return (
    <BarChart width={1000} height={500} data={temperatureDistribution}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name" angle={-45} tickMargin={30} height={100}
             label={{ value: "City Name", position: 'insideBottomRight' }}/>
      <YAxis type="number" domain={['auto', 'auto']} label={{ value: `Temperature in ${unit}`, angle: -90, position: 'insideLeft' }}/>
      <Tooltip formatter={tooltipFormatter}/>
      <Bar dataKey="value" fill="#82ca9d"/>
    </BarChart>
  )
}
