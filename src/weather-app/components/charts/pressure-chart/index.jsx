import { useSelector } from "react-redux";
import { pressureDistributionSelector } from "../../../cities-data/selectors.js";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PressureChartWrapper } from "./PressureChartWrapper.jsx";

export const PressureChart = () => {
  const pressureDistribution = useSelector(pressureDistributionSelector)
  if (pressureDistribution === null) {
    return null
  }

  const unit = 'hPa'

  const tooltipFormatter = (value) => [`${value}${unit}`, 'pressure']


  return (
    <PressureChartWrapper>
      <ResponsiveContainer>
        <AreaChart data={pressureDistribution} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" angle={-90} tickMargin={30} height={100}
                 label={{ value: "City Name", position: 'insideBottomRight' }} interval={"preserveStartEnd"}/>
          <YAxis type="number" domain={['auto', 'auto']}
                 label={{ value: `Pressure in ${unit}`, angle: -90, position: 'left' }}/>
          <Tooltip formatter={tooltipFormatter}/>
          <Area type="monotone" dataKey="value" fill="#82ca9d"/>
        </AreaChart>
      </ResponsiveContainer>
    </PressureChartWrapper>
  )
}