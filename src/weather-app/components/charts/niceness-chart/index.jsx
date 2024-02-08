import { useSelector } from "react-redux";
import { nicenessDistributionSelector } from "../../../cities-data/selectors.js";
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { WEATHER_ATTRIBUTES } from "../../../cities-data/const.js";
import { NicenessChartWrapper } from "./NicenessChartWrapper.jsx";
import { NicenessChartNotAvailableWrapper } from "./NicenessChartNotAvailableWrapper.jsx";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export const NicenessChart = () => {
  const theme = useContext(ThemeContext)
  const nicenessDistribution = useSelector(nicenessDistributionSelector)
  if (nicenessDistribution === null) {
    return (
      <NicenessChartNotAvailableWrapper>
        NICENESS CHART NOT AVAILABLE
      </NicenessChartNotAvailableWrapper>
    )
  }

  const nicenessPieData = Object.entries(nicenessDistribution).map(
    (distEntry) => ({ niceness: distEntry[0], count: distEntry[1].count })
  )

  const tooltipFormatter = (value, name) => [`${value} cities (${nicenessDistribution[name].percent}%)`, `${WEATHER_ATTRIBUTES[name].text}`]
  const labelListFormatter = (value) => nicenessDistribution[value].count > 0 ? `${WEATHER_ATTRIBUTES[value].emoji}` : ''

  // const legendFormatter = (value) => `${WEATHER_ATTRIBUTES[value].text}`

  return (
    <NicenessChartWrapper>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip formatter={tooltipFormatter}/>
          {/*<Legend formatter={legendFormatter} align="left" verticalAlign="middle" layout="vertical"/>*/}
          <Pie data={nicenessPieData} dataKey="count" nameKey="niceness" label>
            {
              nicenessPieData.map((entry) => (
                <Cell key={entry.niceness} fill={theme.colors.nChart[entry.niceness]}/>
              ))
            }
            <LabelList dataKey="niceness" formatter={labelListFormatter}/>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </NicenessChartWrapper>
  )
}