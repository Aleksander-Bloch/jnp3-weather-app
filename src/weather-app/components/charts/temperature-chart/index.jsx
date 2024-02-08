import { useSelector } from "react-redux";
import { temperatureDistributionSelector } from "../../../cities-data/selectors.js";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TemperatureChartWrapper } from "./TemperatureChartWrapper.jsx";
import { TemperatureChartNotAvailableWrapper } from "./TemperatureChartNotAvailableWrapper.jsx";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { TEMPERATURE_UNIT } from "../../../cities-data/const.js";

export const TemperatureChart = () => {
  const theme = useContext(ThemeContext)
  const temperatureDistribution = useSelector(temperatureDistributionSelector)
  if (temperatureDistribution.length === 0) {
    return (
      <TemperatureChartNotAvailableWrapper>
        TEMPERATURE CHART NOT AVAILABLE
      </TemperatureChartNotAvailableWrapper>
    )
  }

  const unit = TEMPERATURE_UNIT
  const tooltipFormatter = (value) => [`${value}${unit}`, 'temperature']

  return (
    <TemperatureChartWrapper>
      <ResponsiveContainer>
        <BarChart data={temperatureDistribution} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" angle={-90} tickMargin={30} height={100}
                 label={{ value: "City Name", position: 'insideBottomRight' }} interval={"preserveStartEnd"}/>
          <YAxis type="number" domain={['auto', 'auto']}
                 label={{ value: `Temperature in ${unit}`, angle: -90, position: 'left' }}/>
          <Tooltip formatter={tooltipFormatter}/>
          <Bar dataKey="value" fill={theme.colors.tChart.fill}/>
        </BarChart>
      </ResponsiveContainer>
    </TemperatureChartWrapper>
  )
}
