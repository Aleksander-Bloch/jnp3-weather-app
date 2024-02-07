import { useSelector } from "react-redux";
import { nicenessDistributionSelector } from "../../../cities-data/selectors.js";
import { Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { WEATHER_ATTRIBUTES } from "../../../cities-data/const.js";
import { NicenessChartWrapper } from "./NicenessChartWrapper.jsx";

export const NicenessChart = () => {
  const nicenessDistribution = useSelector(nicenessDistributionSelector)
  if (nicenessDistribution === null) {
    return null
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
                <Cell key={entry.niceness} fill={WEATHER_ATTRIBUTES[entry.niceness].color}/>
              ))
            }
            <LabelList dataKey="niceness" formatter={labelListFormatter}/>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </NicenessChartWrapper>
  )
}